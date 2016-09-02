const generators = require('yeoman-generator');

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
				'lodash': '^4.15.0',
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

		this.copy('server/routes/bower.dev.js');
		this.copy('server/routes/components.dev.js');
		this.copy('server/routes/wct.dev.js');

		this.copy('server/configs/browser-sync/plugins/scroll.js');
		this.copy('server/configs/browser-sync/plugins/polymer-style-inject.js');
		this.copy('server/configs/browser-sync/handlers/polymer-style-inject.js');

		this.template('public/404.html', 'public/404.html', this.options);
		this.template('public/bower.html', 'public/bower.html', this.options);
		this.template('public/index.html', 'public/index.html', this.options);
		this.copy('public/elements.html');
		this.copy('public/splash-elements.html');

		this.copy('public/stylesheets/404.scss');
		this.copy('public/stylesheets/bower.scss');
		this.copy('public/stylesheets/index.scss');
		this.copy('public/stylesheets/partials/_layouts.scss');
		this.copy('public/stylesheets/partials/_material_color.scss');
		this.copy('public/stylesheets/partials/_mixins.scss');
		this.copy('public/stylesheets/partials/_theme.scss');

		this.copy('public/scripts/bower.js');
		this.copy('public/scripts/es6-support.js');
		this.copy('public/scripts/load.js');

	}
});

module.exports = generator;
