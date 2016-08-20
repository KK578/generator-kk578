const generators = require('yeoman-generator');
const spawn = require('child_process').spawn;

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
	},
	prompting() {
		let prompts = [];

		if (!this.appName) {
			prompts.push({
				type: 'input',
				name: 'appName',
				message: 'Your project name'
			});
		}

		prompts.push(
			{
				type: 'input',
				name: 'name',
				message: 'Your name',
				store: true
			},
			{
				type: 'input',
				name: 'email',
				message: 'Your email address',
				store: true
			},
			{
				type: 'input',
				name: 'gitRemoteUrl',
				message: 'Remote Git repository URL',
				optional: true
			}
		);

		return this.prompt(prompts)
			.then(answers => {
				this.answers = answers;
			});
	},
	gitInit() {
		// TODO: Check if a git repo already exists.
		const done = this.async();
		const gitInit = spawn('git', ['init']);

		gitInit.on('close', done);
	},
	gitRemote: function () {
		// TODO: Check if a git repo already exists.
		if (!this.answers.gitRemoteUrl) {
			return;
		}

		const done = this.async();
		const gitRemote = spawn('git', ['remote', 'add', 'origin', this.answers.gitRemoteUrl]);

		gitRemote.on('close', done);
	}
});

module.exports = generator;
