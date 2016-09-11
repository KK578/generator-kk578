function create(options) {
	const babel = {};

	if (options.polymerApp) {
		babel.options = {
			presets: ['es2015']
		};

		babel.views = {
			files: [
				{
					expand: true,
					cwd: 'build/public/scripts/',
					src: [
						'**/*.js',
						'!es6-support.js'
					],
					ext: 'es5.js',
					dest: 'build/public/scripts/'
				}
			]
		};

		babel.production = {
			files: [
				{
					expand: true,
					cwd: 'build/public/scripts/',
					src: [
						'elements.js',
						'splash-elements.js'
					],
					ext: 'es5.js',
					dest: 'build/public/scripts/'
				}
			]
		};
	}

	return babel;
}

module.exports = {
	name: 'babel',
	create: create
};
