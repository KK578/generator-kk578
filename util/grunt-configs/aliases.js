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
				'newer:uglify:server',
				'newer:copy:server'
			]
		};

		if (options.polymerApp) {
			aliases.lint.tasks.push('sasslint');

			aliases['build:bower'] = {
				description: 'Build task for bower components',
				tasks: [
					'newer:minifyPolymer:bower',
					'newer:minifyPolymerCSS:bower',
					'newer:uglify:bower'
				]
			};

			aliases['build:components'] = {
				description: 'Build task for custom components',
				tasks: [
					'newer:minifyPolymer:components',
					'newer:sass:components',
					'newer:uglify:components'
				]
			};

			aliases['build:views'] = {
				description: 'Build task for views',
				tasks: [
					'newer:minifyPolymer:views',
					'newer:sass:views',
					'newer:uglify:views'
				]
			};
		}
	}

	return aliases;
};
