const generators = require('yeoman-generator');
const path = require('path');

const util = require('../util.js');

const generator = generators.Base.extend({
	// Cannot use arrow notation due to this object not referencing the correct object.
	constructor: function () {
		generators.Base.apply(this, arguments);
		util.generatorConstructor.call(this, util.prompts.polymerApp);
	},
	initializing() {
		const done = this.async();

		util.generatorInitializing.call(this, done);
	},
	prompting() {
		return util.generatorPrompting.call(this, util.prompts.polymerApp);
	},
	bowerJson() {
		const bowerJson = {
			name: this.options.appName,
			version: '0.0.0',
			ignore: [
				'**/.*',
				'node_modules',
				'bower_components',
				'test',
				'tests'
			],
			authors: [{
				name: this.options.name,
				email: this.options.email
			}],
			license: 'BSD-3-Clause',
			dependencies: {
				'polymer': 'Polymer/polymer#^1.6.1',
				'paper-elements': 'PolymerElements/paper-elements#^1.0.7'
			},
			devDependencies: {
				'iron-component-page': 'PolymerElements/iron-component-page#^1.1.7'
			}
		};

		if (this.options.gitRemoteUrl) {
			bowerJson.repository = {
				type: 'git',
				url: this.options.gitRemoteUrl
			};
		}

		this.options.bowerJson = bowerJson;
	},
	composition() {
		this.options.polymerApp = true;
		this.composeWith('kk578:node-server', { options: this.options });
	},
	writing() {
		this.copy('.bowerrc');
		this.write('bower.json', JSON.stringify(this.options.bowerJson, null, 2));
	}
});

module.exports = generator;
