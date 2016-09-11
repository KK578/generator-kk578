function create(options) {
	const minifyPolymerCss = {};

	if (options.polymerApp) {
		minifyPolymerCss.bower = {
			files: [
				{
					expand: true,
					cwd: 'public/bower-components/',
					src: [
						'**/*.css',
						'!**/{index,demo}.css',
						'!**/{demo,demos,docs,explainer,node_modules,test,tests}/**/*'
					],
					dest: 'build/public/bower-components/'
				}
			]
		};
	}

	return minifyPolymerCss;
}

module.exports = {
	name: 'minifyPolymerCSS',
	create: create
};
