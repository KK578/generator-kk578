module.exports = (options) => {
	const aliases = {
		lint: {
			description: 'Lint files in the project.',
			tasks: [
				'eslint'
			]
		}
	};

	if (options.nodeServer) {
		aliases.serve = {
			description: 'Start server and watch for file changes',
			tasks: [
				'express',
				'watch'
			]
		};

		aliases['build:server'] = {
			description: 'Build task for server files',
			tasks: [
				'eslint:server',
				'uglify:server',
				'sync:server'
			]
		};

		if (options.polymerApp) {
			aliases['build:bower'] = {
				description: 'Build task for bower components',
				tasks: [
					'minifyPolymer:bower',
					'minifyPolymerCSS:bower',
					'uglify:bower'
				]
			};

			aliases['build:components'] = {
				description: 'Build task for custom components',
				tasks: [
					'minifyPolymer:components',
					'sass:components',
					'uglify:components'
				]
			};

			aliases['build:views'] = {
				description: 'Build task for views',
				tasks: [
					'minifyPolymer:views',
					'sass:views',
					'uglify:views'
				]
			};
		}
	}

	return aliases;
};
