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

		if (options.polymerApp) {
			copy.bower = {
				files: [
					{
						expand: true,
						cwd: 'public/bower-components/',
						src: [
							'**/*.min.js',
							'!**/{demo,demos,docs,explainer,node_modules,test,tests}/**/*'
						],
						dest: 'build/public/bower-components/'
					}
				]
			};
		}
	}

	return copy;
}

module.exports = {
	name: 'copy',
	create: create
};
