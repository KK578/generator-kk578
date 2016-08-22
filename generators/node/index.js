﻿const generators = require('yeoman-generator');
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

		util.prompts.node.map(p => {
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
		let requiredPrompts = [];

		if (!this.appName) {
			requiredPrompts.push(util.prompts.appName);
		}

		util.prompts.node.map(p => {
			// Check that this hasn't been enabled already as an option.
			if (!this.options[p.name]) {
				// Bind the current git remote to default.
				if (p.name === 'gitRemoteUrl') {
					p.default = this.git.remoteUrl;
				}

				requiredPrompts.push(p);
			}
		});

		return this.prompt(requiredPrompts)
			.then(answers => {
				requiredPrompts.map(p => {
					this.options[p.name] = answers[p.name];
				});

				this.composeWith('kk578:app', { options: this.options });
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
			Object.assign(packageJson.dependencies, { express: '4.14.0' });

			Object.assign(packageJson.devDependencies, {
				'browser-sync': '2.14.0',
				'grunt-contrib-uglify': '^2.0.0',
				'grunt-contrib-watch': '^1.0.0',
				'grunt-express-server': '^0.5.3'
			});
		}

		this.options.packageJson = packageJson;
	},
	writing() {
		this.copy('.eslintrc.json');
		this.copy('gruntfile.js');
		this.copy('grunt/eslint.js', 'configs/grunt/eslint.js');
		this.write('package.json', JSON.stringify(this.options.packageJson, null, 2));
	}
});

module.exports = generator;