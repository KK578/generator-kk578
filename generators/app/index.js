const generators = require('yeoman-generator');
const spawn = require('child_process').spawn;
const path = require('path');

const util = require('../util.js');

const generator = generators.Base.extend({
	// Cannot use arrow notation due to this object not referencing the correct object.
	constructor: function () {
		generators.Base.apply(this, arguments);

		this.argument('appName', {
			type: String,
			description: 'Name for your application',
			required: false,
			optional: true
		});

		util.prompts.app.map(p => {
			this.option(p.name);
		});
	},
	initializing() {
		// Check for git.
		const done = this.async();

		if (this.appName) {
			this.options.appName = this.appName;
		}

		util.checkForGit(path.join(process.cwd(), '.git'), (git) => {
			this.git = git;
			done();
		});
	},
	prompting() {
		let requiredPrompts = [];

		if (!this.options.appName) {
			requiredPrompts.push(util.prompts.appName);
		}

		util.prompts.app.map(p => {
			// Check that this hasn't been enabled already as an option.
			if (!this.options[p.name]) {
				// Bind the current git remote to default.
				if (p.name == 'gitRemoteUrl') {
					p.default = this.git.remoteUrl
				}

				requiredPrompts.push(p);
			}
		});

		return this.prompt(requiredPrompts)
			.then(answers => {
				requiredPrompts.map(p => {
					this.options[p.name] = answers[p.name];
				});
			});
	},
	gitInit() {
		if (!this.git.initialised) {
			const done = this.async();
			const gitInit = spawn('git', ['init']);

			gitInit.on('close', () => {
				this.log('Git repository initialised.');
				done();
			});
		}
	},
	gitRemote() {
		if (!this.options.gitRemoteUrl) {
			return;
		}

		if (this.git.remoteUrl !== this.options.gitRemoteUrl) {
			const done = this.async();
			const gitRemote = spawn('git', ['remote', 'add', 'origin', this.options.gitRemoteUrl]);

			gitRemote.on('close', () => {
				this.log(`Git remote url set to "${this.options.gitRemoteUrl}"`);
				done();
			});
		}
	},
	writing() {
		this.copy('.editorconfig');
		this.copy('.gitattributes');
		this.copy('.gitignore');
		this.template('LICENSE.md', 'LICENSE.md', this.options);
		this.template('README.md', 'README.md', this.options);
	}
});

module.exports = generator;
