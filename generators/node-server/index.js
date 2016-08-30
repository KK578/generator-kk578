const generators = require('yeoman-generator');

const util = require('../util.js');

const generator = generators.Base.extend({
	// Cannot use arrow notation due to this object not referencing the correct object.
	constructor: function () {
		generators.Base.apply(this, arguments);
		util.generatorConstructor.call(this, util.prompts.nodeServer);
	},
	initializing() {
		const done = this.async();

		util.generatorInitializing.call(this, done);
	},
	prompting() {
		return util.generatorPrompting.call(this, util.prompts.nodeServer);
	},
	composition() {
		this.options.nodeServer = true;
		this.composeWith('kk578:node', { options: this.options });
	},
	writing() {
		this.template('npm-shrinkwrap.json', 'npm-shrinkwrap.json', this.options);
		this.copy('.env');

		this.copy('grunt/express.js');
		this.copy('grunt/sync.js');
		this.copy('grunt/uglify.js');
		this.copy('grunt/watch.js');

		this.copy('server/server.js');
		this.copy('server/start.js');

		this.copy('server/configs/logs.js');
		this.copy('server/configs/setup.js');
		this.copy('server/configs/router.js');
		this.copy('server/configs/browser-sync.js');

		this.copy('server/routes/static.js');
		this.copy('server/routes/dev-404.js');
	}
});

module.exports = generator;
