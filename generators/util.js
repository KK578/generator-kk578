const fs = require('fs');
const path = require('path');
const spawn = require('child_process').spawn;

function checkForGit(dir, callback) {
	fs.access(dir, fs.constants.F_OK, err => {
		let git = {
			initialised: false,
			remoteUrl: ''
		}

		if (err) {
			callback(git);
		}
		else {
			git.initialised = true;
			const gitConfig = spawn('git', ['config', '--get', 'remote.origin.url']);

			gitConfig.stdout.on('data', data => {
				git.remoteUrl = data.toString('utf8').replace('\n', '');
			});

			gitConfig.on('close', () => {
				callback(git);
			});
		}
	});
}

const prompts = {
	appName: {
		type: 'input',
		name: 'appName',
		message: 'Your project name'
	},
	app: [
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
	]
};

exports.checkForGit = checkForGit;
exports.prompts = prompts;
