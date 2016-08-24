module.exports = {
	options: {
		spawn: false,
		interrupt: true
	},
	server: {
		options: {
			reload: true
		},
		files: ['server/**/*.js'],
		tasks: ['watch-build:server']
	}
};
