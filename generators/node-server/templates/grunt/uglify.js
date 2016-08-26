module.exports = {
	server: {
		files: [
			{
				expand: true,
				cwd: 'server/',
				src: ['**/*.js'],
				dest: 'build/server/'
			}
		]
	}
};
