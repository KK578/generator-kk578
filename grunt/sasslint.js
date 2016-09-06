module.exports = {
	options: {
		configFile: '.sass-lint.yml'
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
