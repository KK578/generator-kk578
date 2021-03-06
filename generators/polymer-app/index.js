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
		this.copy('.htmllintrc');
		this.copy('.sass-lint.yml');

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

		this.template('public/custom-components/splash-screen/splash-screen.html',
			'public/custom-components/splash-screen/splash-screen.html', this.options);
		this.copy('public/custom-components/splash-screen/splash-screen.js');
		this.copy('public/custom-components/splash-screen/splash-screen.scss');

		this.template('public/custom-components/app-element/app-element.html',
			'public/custom-components/app-element/app-element.html', this.options);
		this.copy('public/custom-components/app-element/app-element.js');
		this.copy('public/custom-components/app-element/app-element.scss');

		this.copy('public/scripts/bower.js');
		this.copy('public/scripts/es6-support.js');
		this.copy('public/scripts/load.js');

		this.copy('test/util.js');
		this.copy('test/development-test.js');
		this.copy('test/development/route-404-test.js');
		this.copy('test/development/route-bower-test.js');
		this.copy('test/development/route-components-test.js');
		this.copy('test/production/route-static-test.js');

		this.copy('test/fixtures/build/public/custom-components/fake-element/fake-element.css');
		this.copy('test/fixtures/build/public/custom-components/fake-element/fake-element.html');
		this.copy('test/fixtures/build/public/custom-components/fake-element/fake-element.js');
		this.copy('test/fixtures/public/bower-components/paper-fake-material/index.html');
		this.copy('test/fixtures/public/bower-components/paper-no-demo/paper-no-demo.html');
	}
});

module.exports = generator;
