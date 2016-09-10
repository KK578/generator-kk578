module.exports = (options) => {
	const htmllint = {};

	if (options.polymerApp) {
		htmllint.options = {
			htmllintrc: true,
			force: true,
			formatter: 'node_modules/eslint-formatter-pretty'
		};

		htmllint.views = {
			files: [
				{
					expand: true,
					cwd: 'public/',
					src: ['*.html']
				}
			]
		};

		htmllint.components = {
			files: [
				{
					expand: true,
					cwd: 'public/custom-components/',
					src: ['**/*.html']
				}
			]
		};
	}

	return htmllint;
};
