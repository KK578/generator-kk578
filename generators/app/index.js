const generators = require('yeoman-generator');

const generator = generators.Base.extend({
	prompting() {
		const prompts = [
			{
				type: 'input',
				name: 'appName',
				message: 'Your project name'
			}
		];

		return this.prompt(prompts)
			.then(answers => {
				this.log('App Name:', answers.appName);
			});
	}
});

module.exports = generator;
