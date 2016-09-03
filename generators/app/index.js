const generators = require('yeoman-generator');

const util = require('../../util/util.js');
const prompts = util.prompts.app;

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
	gitInit() {
		if (!this.git.initialised) {
			const done = this.async();

			util.git.create(() => {
				this.log('Git repository initialised.');
				done();
			});
		}
	},
	gitRemote() {
		if (!this.options.gitRemoteUrl) {
			return;
		}

		if (this.git.remoteUrl !== this.options.gitRemoteUrl) {
			const done = this.async();

			util.git.addRemote('origin', this.options.gitRemoteUrl, () => {
				this.log(`Git remote url set to "${this.options.gitRemoteUrl}"`);
				done();
			});
		}
	},
	writing() {
		this.copy('.editorconfig');
		this.copy('.gitattributes');
		this.copy('.gitignore');
		this.template('LICENSE.md', 'LICENSE.md', this.options);
		this.template('README.md', 'README.md', this.options);
	}
});

module.exports = generator;
