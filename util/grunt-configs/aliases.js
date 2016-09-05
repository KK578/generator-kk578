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
		aliases.default = {
			description: 'Build project for development and start up server.',
			tasks: [
				'eslint',
				// polymer-app: bower:development
				'build:all',
				'serve',
				'watch'
			]
		};

		aliases.serve = {
			description: 'Start server and watch for file changes',
			tasks: [
				'express',
				'watch'
			]
		};

		aliases['build:all'] = {
			description: 'Helper task to build all project files',
			tasks: [
				'build:server'
				// polymer-app: 'build:bower'
				// polymer-app: 'build:components'
				// polymer-app: 'build:views'
			]
		};

		aliases['build:development'] = {
			description: 'Build project files for development',
			tasks: [
				'clean',
				// polymer-app: bower:development
				'build:all'
			]
		};

		aliases['build:production'] = {
			description: 'Build project for production.',
			tasks: [
				'clean',
				'build:all'
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
			aliases['build:all'].tasks.push(
				'build:bower',
				'build:components',
				'build:views'
			);

			aliases.default.tasks.splice(1, 0, 'bower:development');
			aliases['build:development'].tasks.splice(1, 0, 'bower:development');

			aliases['build:production'].tasks.push(
				'vulcanize',
				'babel:production',
				'minifyPolymer:production',
				'clean:production'
			);

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
