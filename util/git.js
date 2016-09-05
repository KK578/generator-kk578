const fs = require('fs');
const spawn = require('child_process').spawn;

/**
 * Helper function to determine if a git repo is already present in the directory.
 *
 * @param dir String - Directory to check.
 * @param callback Function (Object) - Callback returning an object with the origin git remote
 *										url at origin (May be empty).
 *										{ initialized: Boolean, url: String }
 *
 */
function exists(dir, callback) {
	fs.stat(dir, (err, stats) => {
		const git = {
			initialised: false,
			remoteUrl: ''
		};

		// Err implies that the directory does not exist.
		// !stats.isDirectory() ensures that .git is not a directory.
		if (err || !stats.isDirectory()) {
			callback(git);
		}
		else {
			git.initialised = true;
			const gitConfig = spawn('git', ['config', '--get', 'remote.origin.url']);

			gitConfig.stdout.on('data', (data) => {
				git.url = data.toString('utf8').replace('\n', '');
			});

			gitConfig.on('close', () => {
				callback(git);
			});
		}
	});
}

function create(callback) {
	const gitInit = spawn('git', ['init']);

	gitInit.on('close', () => {
		callback();
	});
}

function addRemote(remote, url, callback) {
	const gitRemote = spawn('git', ['remote', 'add', remote, url]);

	gitRemote.on('close', () => {
		callback();
	});
}

module.exports = {
	exists: exists,
	create: create,
	addRemote: addRemote
};
