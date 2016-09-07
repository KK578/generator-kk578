module.exports = {
	options: {
		configFile: '.sass-lint.yml',
		format: 'node_modules/eslint-formatter-pretty'
	},
	'polymer-app': {
		files: [
			{
				expand: true,
				cwd: 'generators/polymer-app/templates/public/',
				src: [
					'**/*.scss',
					'!stylesheets/partials/_layouts.scss',
					'!stylesheets/partials/_mixins.scss'
				]
			}
		]
	}
};
