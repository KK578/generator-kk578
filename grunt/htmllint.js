module.exports = {
	options: {
		htmllintrc: true,
		format: 'node_modules/eslint-formatter-pretty'
	},
	'polymer-app': {
		files: [
			{
				expand: true,
				cwd: 'generators/polymer-app/templates/public/',
				src: ['**/*.html']
			}
		]
	}
};
