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
			files: 'server/**/*.js'
		};

		eslint.components = {
			files: ['public/custom-components/**/*.js']
		};

		eslint.views = {
			src: ['public/scripts/**/*.js']
		};
	}

	return eslint;
};
