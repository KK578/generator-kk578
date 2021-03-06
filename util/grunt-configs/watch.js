function create(options) {
	const watch = {};

	if (options.nodeServer) {
		watch.options = {
			spawn: false,
			interrupt: true
		};

		watch.server = {
			options: {
				reload: true
			},
			files: [
				'gruntfile.js',
				'grunt/*.js',
				'server/**/*.js'
			],
			tasks: [
				'express:server:stop',
				'eslint:server',
				'build:server',
				'express:server'
			]
		};

		if (options.polymerApp) {
			watch.bower = {
				files: ['bower.json'],
				tasks: ['build:bower']
			};

			watch.components = {
				files: ['public/custom-components/**/*'],
				tasks: [
					'htmllint:components',
					'sasslint:components',
					'eslint:components',
					'build:components'
				]
			};

			watch['sass-partials'] = {
				files: ['public/stylesheets/partials/*.scss'],
				tasks: [
					'sasslint',
					'sass'
				]
			};

			watch.views = {
				files: [
					'public/*.html',
					'public/stylesheets/*.scss',
					'public/scripts/**/*.js'
				],
				tasks: [
					'htmllint:views',
					'sasslint:views',
					'eslint:views',
					'build:views'
				]
			};
		}
	}

	return watch;
}

module.exports = {
	name: 'watch',
	create: create
};
