module.exports = (options) => {
	const eslint = {
		options: {
			format: 'node_modules/eslint-formatter-pretty'
		},
		project: {
			files: [
				{
					expand: true,
					src: [
						'gruntfile.js',
						'grunt/*.js'
					]
				}
			]
		}
	};

	if (options.nodeServer) {
		eslint.server = {
			files: [
				{
					expand: true,
					src: 'server/**/*.js'
				}
			]
		};

		if (options.polymerApp) {
			eslint.components = {
				files: [
					{
						expand: true,
						src: 'public/custom-components/**/*.js'
					}
				]
			};

			eslint.views = {
				files: [
					{
						expand: true,
						src: ['public/scripts/**/*.js']
					}
				]
			};
		}
	}

	return eslint;
};
