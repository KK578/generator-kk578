﻿module.exports = {
	options: { format: 'node_modules/eslint-formatter-pretty' },
	project: {
		files: [
			{
				expand: true,
				src: [
					'gruntfile.js',
					'configs/grunt/*.js'
				]
			}
		]
	}
};