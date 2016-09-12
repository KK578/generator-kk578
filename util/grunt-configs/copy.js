function create(options) {
	const copy = {};

	if (options.nodeServer) {
		copy.server = {
			files: {
				'build/.env': '.env'
			}
		};

		copy.test = {
			files: [
				{
					expand: true,
					src: ['build/**/*'],
					dest: 'test/tmp/'
				},
				{
					expand: true,
					cwd: 'test/fixtures/',
					src: ['**/*'],
					dest: 'test/tmp/'
				}
			]
		};
	}

	return copy;
}

module.exports = {
	name: 'copy',
	create: create
};
