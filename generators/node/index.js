﻿const generators = require('yeoman-generator');

const util = require('../util.js');

const generator = generators.Base.extend({
	// Cannot use arrow notation due to this object not referencing the correct object.
	constructor: function () {
		generators.Base.apply(this, arguments);
		util.generatorConstructor.call(this, util.prompts.node);
	},
	initializing() {
		const done = this.async();

		util.generatorInitializing.call(this, done);
	},
	prompting() {
		return util.generatorPrompting.call(this, util.prompts.node);
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
	gruntTasks() {
		this.options.grunt = util.prepareGruntConfigs(this.options);
	},
	composition() {
		this.composeWith('kk578:app', { options: this.options });
	},
	writing() {
		const gruntConfigs = util.stringifyGruntConfigs(this.options.grunt);

		this.copy('.eslintrc.json');

		this.write('package.json', JSON.stringify(this.options.packageJson, null, 2));

		this.copy('gruntfile.js');
		gruntConfigs.map((config) => {
			this.write(config.file, config.content);
		});
	}
});

module.exports = generator;
