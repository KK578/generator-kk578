module.exports = (options) => {
	const minifyPolymer = {};

	if (options.polymerApp) {
		minifyPolymer.bower = {
			files: [
				{
					expand: true,
					cwd: 'public/bower-components/',
					src: [
						'**/*.html',
						'!**/{index,demo}.html',
						'!**/{demo,demos,docs,explainer,node_modules,test,tests}/**/*'
					],
					dest: 'build/public/bower-components/'
				}
			]
		};

		minifyPolymer.components = {
			files: [
				{
					expand: true,
					cwd: 'public/custom-components/',
					src: ['**/*.html'],
					dest: 'build/public/custom-components/'
				}
			]
		};

		minifyPolymer.views = {
			files: [
				{
					expand: true,
					cwd: 'public/',
					src: ['*.html'],
					dest: 'build/public/'
				}
			]
		};
	}

	return minifyPolymer;
};
