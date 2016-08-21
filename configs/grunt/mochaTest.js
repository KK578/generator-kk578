module.exports = {
	options: { reporter: 'spec' },
	all: { src: 'test/*-test.js' },
	app: { src: 'test/app-test.js' },
	node: { src: 'test/node-test.js' },
	nodeServer: { src: 'test/node-server-test.js' }
};
