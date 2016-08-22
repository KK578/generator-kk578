const generators = require('yeoman-generator');
const path = require('path');

const util = require('../util.js');

const generator = generators.Base.extend({
	// Cannot use arrow notation due to this object not referencing the correct object.
	constructor: function () {
		generators.Base.apply(this, arguments);

		this.argument('appName', {
			type: String,
			description: 'Name for your application',
			required: false,
			optional: true
		});

		util.prompts.nodeServer.map((p) => {
			this.option(p.name);
		});
	},
	initializing() {
		const done = this.async();

		if (this.appName) {
			this.options.appName = this.appName;
		}

		util.checkForGit(path.join(process.cwd(), '.git'), (git) => {
			this.git = git;
			done();
		});
	},
	prompting() {
		const requiredPrompts = [];

		util.prompts.node.map((p) => {
			// Check that this hasn't been enabled already as an option.
			if (this.options[p.name] === undefined) {
				// Bind the current git remote to default.
				if (p.name === 'gitRemoteUrl') {
					p.default = this.git.remoteUrl;
				}

				requiredPrompts.push(p);
			}
		});

		return this.prompt(requiredPrompts)
			.then((answers) => {
				requiredPrompts.map((p) => {
					this.options[p.name] = answers[p.name];
				});
			});
	},
	composition() {
		this.options.nodeServer = true;
		this.composeWith('kk578:node', { options: this.options });
	}
});

module.exports = generator;
