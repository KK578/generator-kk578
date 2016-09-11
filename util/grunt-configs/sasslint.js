module.exports = (options) => {
	const sasslint = {};

	if (options.polymerApp) {
		sasslint.options = {
			configFile: '.sass-lint.yml',
			format: 'node_modules/eslint-formatter-pretty'
		};

		sasslint.components = {
			files: [
				{
					expand: true,
					cwd: 'public/custom-components/',
					src: ['**/*.scss']
				}
			]
		};

		sasslint.views = {
			files: [
				{
					expand: true,
					cwd: 'public/stylesheets/',
					src: ['*.scss']
				}
			]
		};
	}

	return sasslint;
};
