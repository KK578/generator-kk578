module.exports = {
	options: { reporter: 'spec' },
	all: {
		src: [
			'test/app-test.js',
			'test/node-test.js',
			'test/node-server-test.js'
		]
	},
	app: { src: 'test/app-test.js' },
	node: { src: 'test/node-test.js' },
	nodeServer: { src: 'test/node-server-test.js' }
};
