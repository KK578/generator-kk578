module.exports = {
	options: {
		spawn: false,
		interrupt: true
	},
	server: {
		options: {
			reload: true
		},
		files: [
			'gruntfile.js',
			'grunt/*.js',
			'server/**/*.js'
		],
		tasks: [
			'express:stop',
			'eslint:server',
			'build:server',
			'express'
		]
	}
};
