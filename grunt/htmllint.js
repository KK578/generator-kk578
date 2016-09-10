module.exports = {
	options: {
		htmllintrc: true,
		force: true,
		formatter: 'node_modules/eslint-formatter-pretty'
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
