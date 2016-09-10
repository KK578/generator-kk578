const generators = require('yeoman-generator');

const util = require('../../util/util.js');
const prompts = util.prompts.node;

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
	packageJson() {
		this.packageJson = util.packageJson.create(this.options);
	},
	gruntTasks() {
		const done = this.async();

		util.gruntConfigs.initialise(this.options, (err, configs) => {
			this.gruntConfigs = util.gruntConfigs.stringify(configs);
			done();
		});
	},
	composition() {
		this.composeWith('kk578:app', { options: this.options });
	},
	writing() {
		this.copy('.eslintrc.json');

		this.write('package.json', JSON.stringify(this.packageJson, null, 2));

		this.copy('gruntfile.js');
		this.gruntConfigs.map((config) => {
			this.write(config.file, config.content);
		});
	}
});

module.exports = generator;
