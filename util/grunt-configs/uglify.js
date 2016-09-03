module.exports = (options) => {
	const uglify = {};

	if (options.nodeServer) {
		uglify.server = {
			files: [
				{
					expand: true,
					cwd: 'server/',
					src: ['**/*.js'],
					dest: 'build/server/'
				}
			]
		};

		if (options.polymerApp) {
			uglify.bower = {
				files: [
					{
						expand: true,
						cwd: 'public/bower-components/',
						src: [
							'**/*.js',
							'!**/*.min.js',
							'!**/{grunt,gulp}file.js',
							'!**/{demo,demos,docs,explainer,node_modules,test,tests}/**/*'
						],
						dest: 'build/public/bower-components/'
					}
				]
			};

			uglify.components = {
				files: [
					{
						expand: true,
						cwd: 'public/custom-components/',
						src: ['**/*.js'],
						dest: 'build/public/custom-components/'
					}
				]
			};

			uglify.views = {
				files: [
					{
						expand: true,
						cwd: 'public/scripts/',
						src: ['**/*.js'],
						dest: 'build/public/scripts/'
					}
				]
			};
		}
	}

	return uglify;
};
