const generators = require('yeoman-generator');
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

		util.prompts.node.map((p) => {
			this.option(p.name);
		});
	},
	initializing() {
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
		const requiredPrompts = [];

		util.prompts.node.map((p) => {
			// Check that this hasn't been enabled already as an option.
			if (this.options[p.name] === undefined) {
				// Bind the current git remote to default.
				if (p.name === 'gitRemoteUrl') {
					p.default = this.git.remoteUrl;
				}

				requiredPrompts.push(p);
			}
		});

		return this.prompt(requiredPrompts)
			.then((answers) => {
				requiredPrompts.map((p) => {
					this.options[p.name] = answers[p.name];
				});
			});
	},
	packageJson() {
		const packageJson = {
			name: this.options.appName,
			version: '0.0.0',
			author: {
				name: this.options.name,
				email: this.options.email
			},
			license: 'BSD-3-Clause',
			dependencies: {},
			devDependencies: {
				'eslint-formatter-pretty': '^0.2.2',
				'grunt': '^1.0.1',
				'grunt-eslint': '^19.0.0',
				'jit-grunt': '^0.10.0',
				'load-grunt-config': '^0.19.2',
				'time-grunt': '^1.4.0'
			}
		};

		if (this.options.gitRemoteUrl) {
			packageJson.repository = {
				type: 'git',
				url: this.options.gitRemoteUrl
			};
		}

		if (this.options.nodeServer) {
			Object.assign(packageJson.dependencies, {
				compression: '1.6.2',
				ejs: '2.5.1',
				express: '4.14.0',
				morgan: '1.7.0'
			});

			Object.assign(packageJson.devDependencies, {
				'browser-sync': '2.14.0',
				'grunt-contrib-uglify': '^2.0.0',
				'grunt-contrib-watch': '^1.0.0',
				'grunt-express-server': 'KK578/grunt-express-server'
			});
		}

		this.options.packageJson = packageJson;
	},
	gruntAlias() {
		const aliases = {};

		aliases.lint = {
			description: 'Lint files in the project.',
			tasks: [
				'eslint'
			]
		};

		if (this.options.nodeServer) {
			aliases.serve = {
				description: 'Start server and watch for file changes',
				tasks: [
					'express',
					'watch'
				]
			};

			aliases['watch-build:server'] = {
				description: 'Watch task for building server files',
				tasks: [
					'eslint:server',
					'uglify:server'
				]
			};
		}

		this.options.grunt = {};
		this.options.grunt.aliases = aliases;
	},
	composition() {
		this.composeWith('kk578:app', { options: this.options });
	},
	writing() {
		this.copy('.eslintrc.json');
		this.copy('gruntfile.js');
		this.copy('grunt/eslint.js', 'grunt/eslint.js');
		this.write('grunt/aliases.js', `module.exports = ${JSON.stringify(this.options.grunt.aliases, null, 2)};`);
		this.write('package.json', JSON.stringify(this.options.packageJson, null, 2));
	}
});

module.exports = generator;
