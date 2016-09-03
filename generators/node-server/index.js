const generators = require('yeoman-generator');

const util = require('../../util/util.js');
const prompts = util.prompts.nodeServer;

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
		this.options.nodeServer = true;
		this.composeWith('kk578:node', { options: this.options });
	},
	writing() {
		this.template('npm-shrinkwrap.json', 'npm-shrinkwrap.json', this.options);
		this.copy('.env');

		this.copy('server/server.js');
		this.copy('server/start.js');

		this.copy('server/configs/logs.js');
		this.copy('server/configs/setup.js');
		this.copy('server/configs/router.js');
		this.copy('server/configs/browser-sync.js');

		this.copy('server/routes/static.js');
		this.copy('server/routes/404.dev.js');
	}
});

module.exports = generator;
