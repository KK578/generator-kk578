const generators = require('yeoman-generator');
const spawn = require('child_process').spawn;

const util = require('../util.js');

const generator = generators.Base.extend({
	// Cannot use arrow notation due to this object not referencing the correct object.
	constructor: function () {
		generators.Base.apply(this, arguments);
		util.generatorConstructor.call(this, util.prompts.app);
	},
	initializing() {
		const done = this.async();

		util.generatorInitializing.call(this, done);
	},
	prompting() {
		return util.generatorPrompting.call(this, util.prompts.app);
	},
	gitInit() {
		if (!this.git.initialised) {
			const done = this.async();
			const gitInit = spawn('git', ['init']);

			gitInit.on('close', () => {
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
			const gitRemote = spawn('git', ['remote', 'add', 'origin', this.options.gitRemoteUrl]);

			gitRemote.on('close', () => {
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
