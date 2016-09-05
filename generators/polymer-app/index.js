const generators = require('yeoman-generator');

const util = require('../../util/util.js');
const prompts = util.prompts.polymerApp;

const generator = generators.Base.extend({
	// Cannot use arrow notation due to this object not referencing the correct object.
	constructor: function () {
		generators.Base.apply(this, arguments);
		util.generator.constructor.call(this, prompts);
	},
	initializing() {
		const done = this.async();

		util.generator.initializing.call(this, done);
	},
	prompting() {
		return util.generator.prompting.call(this, prompts);
	},
	composition() {
		this.options.polymerApp = true;
		this.composeWith('kk578:node-server', { options: this.options });
	},
	bowerJson() {
		this.bowerJson = util.bowerJson.create(this.options);
	},
	writing() {
		/* eslint max-statements: "off" */
		this.copy('.bowerrc');
		this.write('bower.json', JSON.stringify(this.bowerJson, null, 2));

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
