module.exports = (options) => {
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
	}

	return babel;
};
