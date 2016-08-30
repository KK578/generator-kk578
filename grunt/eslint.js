module.exports = {
	options: { format: 'node_modules/eslint-formatter-pretty' },
	project: {
		files: [
			{
				expand: true,
				src: [
					'gruntfile.js',
					'configs/grunt/*.js',
					'test/*.js',
					'generators/util*.js'
				]
			}
		]
	},
	app: {
		files: { src: 'generators/app/index.js' }
	},
	node: {
		files: [
			{ src: 'generators/node/index.js' },
			{
				expand: true,
				cwd: 'generators/node/templates',
				src: [
					'gruntfile.js',
					'configs/grunt/*.js'
				]
			}
		]
	},
	nodeServer: {
		files: [
			{ src: 'generators/node-server/index.js' },
			{
				expand: true,
				cwd: 'generators/node-server/templates',
				src: [
					'server/*.js',
					'server/**/*.js'
				]
			}
		]
	}
};
