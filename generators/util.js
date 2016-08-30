const fs = require('fs');
const spawn = require('child_process').spawn;
const path = require('path');

///////////////////////////////////////////////////////////////////////////////////////////////////
// Helpers
/**
 * Helper function to determine if a git repo is already present in the directory.
 *
 * @param dir String - Directory to check.
 * @param callback Function (Object) - Callback returning an object with the origin git remote
										url at origin (May be empty).
										{ initialized: Boolean, url: String }

 */
function checkForGit(dir, callback) {
	fs.access(dir, fs.constants.F_OK, (err) => {
		const git = {
			initialised: false,
			remoteUrl: ''
		};

		if (err) {
			callback(git);
		}
		else {
			git.initialised = true;
			const gitConfig = spawn('git', ['config', '--get', 'remote.origin.url']);

			gitConfig.stdout.on('data', (data) => {
				git.url = data.toString('utf8').replace('\n', '');
			});

			gitConfig.on('close', () => {
				callback(git);
			});
		}
	});
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Base generator helpers
/**
 * Helper function for all generators to set appName argument and all prompts up as options.
 *
 * @param prompts [Object] - Item from util.prompts representing questions the user should be asked
								when running the generator.
 */
function generatorConstructor(prompts) {
	this.argument('appName', {
		type: String,
		description: 'Name for your application',
		required: false,
		optional: true
	});

	prompts.map((prompt) => {
		this.option(prompt.name);
	});
}

/**
 * Helper function for all generators to setup options object in preperation for prompting.
 *
 * @param done Function () - Callback to pass control back to original caller.
 */
function generatorInitializing(done) {
	if (this.appName) {
		this.options.appName = this.appName;
	}

	const dir = path.join(process.cwd(), '.git');

	checkForGit(dir, (git) => {
		this.git = git;
		done();
	});
}

/**
 * Helper function for all generators to setup prompts that haven't already been filled in,
 *  and handle response.
 *
 * @param prompts [Object] - Item from util.prompts representing questions the user should be asked
								when running the generator.
 */
function generatorPrompting(prompts) {
	const requiredPrompts = [];

	prompts.map((prompt) => {
		// Check that the value hasn't already been attained elsewhere.
		// Must explicitly check for undefined as some values may be empty strings.
		if (this.options[prompt.name] === undefined) {
			// In the case of git remote, we add the value attained by checkForGit as a default.
			if (prompt.name === 'gitRemoteUrl') {
				prompt.default = this.git.url;
			}

			requiredPrompts.push(prompt);
		}
	});

	return this.prompt(requiredPrompts)
		.then((answers) => {
			// Then for every answer obtained, add it to the options object for templating.
			requiredPrompts.map((prompt) => {
				this.options[prompt.name] = answers[prompt.name];
			});
		});
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Prompts
const prompts = {
	all: [
		{
			type: 'input',
			name: 'appName',
			message: 'Your project name'
		}
	]
};

prompts.app = prompts.all.concat([
	{
		type: 'input',
		name: 'name',
		message: 'Your name',
		store: true
	},
	{
		type: 'input',
		name: 'email',
		message: 'Your email address',
		store: true
	},
	{
		type: 'input',
		name: 'gitRemoteUrl',
		message: 'Remote Git repository URL',
		optional: true
	}
]);

prompts.node = prompts.app;
prompts.nodeServer = prompts.node;

prompts.polymerApp = prompts.nodeServer;

///////////////////////////////////////////////////////////////////////////////////////////////////
// Grunt Configs
function prepareGruntConfigs(options) {
	const grunt = {};

	grunt.aliases = gruntAliases(options);

	return grunt;
}

function stringifyGruntConfigs(configs) {
	const stringifiedConfigs = [];
	const keys = Object.keys(configs);

	keys.map((key) => {
		stringifiedConfigs.push({
			file: `grunt/${key}.js`,
			content: `module.exports = ${JSON.stringify(configs[key], null, '\t')};`
		});
	});

	return stringifiedConfigs;
}

function gruntAliases(options) {
	const aliases = {};

	aliases.lint = {
		description: 'Lint files in the project.',
		tasks: [
			'eslint'
		]
	};

	if (options.nodeServer) {
		aliases.serve = {
			description: 'Start server and watch for file changes',
			tasks: [
				'express',
				'watch'
			]
		};

		aliases['build:server'] = {
			description: 'Watch task for building server files',
			tasks: [
				'eslint:server',
				'uglify:server',
				'sync:server'
			]
		};
	}

	return aliases;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Exports
exports.generatorConstructor = generatorConstructor;
exports.generatorInitializing = generatorInitializing;
exports.generatorPrompting = generatorPrompting;

exports.prompts = prompts;

exports.prepareGruntConfigs = prepareGruntConfigs;
exports.stringifyGruntConfigs = stringifyGruntConfigs;
