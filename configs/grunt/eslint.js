module.exports = {
	options: { format: 'node_modules/eslint-formatter-pretty' },
	project: {
		files: [
			{
				expand: true,
				src: [
					'gruntfile.js',
					'configs/grunt/*.js',
					'test/**/*.js'
				]
			}
		]
	},
	app: {
		files: [
			{ src: 'generators/app/index.js' },
			{
				expand: true,
				cwd: 'generators/app/templates',
				src: [
					'gruntfile.js',
					'configs/grunt/*.js'
				]
			}
		]
	}
};
