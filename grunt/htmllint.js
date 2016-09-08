module.exports = {
	options: {
		htmllintrc: true,
		force: true
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
