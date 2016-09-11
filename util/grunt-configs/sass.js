function create(options) {
	const sass = {};

	if (options.polymerApp) {
		sass.components = {
			files: [
				{
					expand: true,
					cwd: 'public/custom-components/',
					src: ['**/*.scss'],
					ext: '.css',
					dest: 'build/public/custom-components/'
				}
			]
		};

		sass.views = {
			files: [
				{
					expand: true,
					cwd: 'public/stylesheets/',
					src: ['*.scss'],
					ext: '.css',
					dest: 'build/public/stylesheets/'
				}
			]
		};
	}

	return sass;
}

module.exports = {
	name: 'sass',
	create: create
};
