const path = require('path');
const gitUtil = require('./git.js');

/**
 * Helper function for all generators to set appName argument and all prompts up as options.
 *
 * @param prompts [Object] - Item from util.prompts representing questions the user should be asked
								when running the generator.
 */
function constructor(prompts) {
	this.argument('appName', {
		type: String,
		description: 'Name for your application',
		required: false,
		optional: true
	});

	prompts.map((prompt) => {
		this.option(prompt.name);
	});
}

/**
 * Helper function for all generators to setup options object in preperation for prompting.
 *
 * @param done Function () - Callback to pass control back to original caller.
 */
function initializing(done) {
	if (this.appName) {
		this.options.appName = this.appName;
	}

	const dir = path.join(process.cwd(), '.git');

	gitUtil.exists(dir, (git) => {
		this.git = git;
		done();
	});
}

/**
 * Helper function for all generators to setup prompts that haven't already been filled in,
 *  and handle response.
 *
 * @param prompts [Object] - Item from util.prompts representing questions the user should be asked
								when running the generator.
 */
function prompting(prompts) {
	const requiredPrompts = [];

	prompts.map((prompt) => {
		// Check that the value hasn't already been attained elsewhere.
		// Must explicitly check for undefined as some values may be empty strings.
		if (this.options[prompt.name] === undefined) {
			// In the case of git remote, we add the value attained by checkForGit as a default.
			if (prompt.name === 'gitRemoteUrl') {
				prompt.default = this.git.url;
			}

			requiredPrompts.push(prompt);
		}
	});

	return this.prompt(requiredPrompts)
		.then((answers) => {
			// Then for every answer obtained, add it to the options object for templating.
			requiredPrompts.map((prompt) => {
				this.options[prompt.name] = answers[prompt.name];
			});
		});
}

module.exports = {
	constructor: constructor,
	initializing: initializing,
	prompting: prompting
};
