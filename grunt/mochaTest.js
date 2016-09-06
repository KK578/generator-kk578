module.exports = {
	options: { reporter: 'spec' },
	all: {
		src: [
			'test/app-test.js',
			'test/node-test.js',
			'test/node-server-test.js',
			'test/polymer-app-test.js'
		]
	},
	app: { src: 'test/app-test.js' },
	node: { src: 'test/node-test.js' },
	'node-server': { src: 'test/node-server-test.js' },
	'polymer-app': { src: 'test/polymer-app-test.js' }
};
