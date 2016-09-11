function create(options) {
	const htmllint = {};

	if (options.polymerApp) {
		htmllint.options = {
			htmllintrc: true,
			force: true,
			format: 'node_modules/eslint-formatter-pretty'
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
}

module.exports = {
	name: 'htmllint',
	create: create
};
