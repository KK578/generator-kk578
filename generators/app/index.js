const generators = require('yeoman-generator');
const spawn = require('child_process').spawn;
const fs = require('fs');
const path = require('path');

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
	initializing() {
		// Check for git.
		const done = this.async();

		fs.access(path.join(process.cwd(), '.git'), fs.constants.F_OK, err => {
			this.git = {
				initialised: false,
				remoteUrl: ''
			};

			if (err) {
				// No git repository exists.
				done();
			}
			else {
				// Git repository exists, load the remote url for later use.
				this.git.initialised = true;
				const gitConfig = spawn('git', ['config', '--get', 'remote.origin.url']);

				gitConfig.stdout.on('data', data => {
					this.git.remoteUrl = data.toString('utf8').replace('\n', '');
				});

				gitConfig.on('close', () => {
					done();
				});
			}
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
				default: this.git.remoteUrl,
				optional: true
			}
		);

		return this.prompt(prompts)
			.then(answers => {
				this.answers = answers;
			});
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
	gitRemote: function () {
		if (!this.answers.gitRemoteUrl) {
			return;
		}

		if (this.git.remoteUrl !== this.answers.gitRemoteUrl) {
			const done = this.async();
			const gitRemote = spawn('git', ['remote', 'add', 'origin', this.answers.gitRemoteUrl]);

			gitRemote.on('close', () => {
				this.log(`Git remote url set to "${this.answers.gitRemoteUrl}"`);
				done();
			});
		}
	}
});

module.exports = generator;
