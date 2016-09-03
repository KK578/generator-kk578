const prompts = {
	all: [
		{
			type: 'input',
			name: 'appName',
			message: 'Your project name'
		}
	]
};

prompts.app = prompts.all.concat([
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
]);

// Node
prompts.node = prompts.app;
prompts.nodeServer = prompts.node;

// Polymer
prompts.polymerApp = prompts.nodeServer;

module.exports = prompts;
