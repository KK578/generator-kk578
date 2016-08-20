module.exports = {
	test: {
		description: 'Run mocha test suite.',
		tasks: [
			'clean',
			'mochaTest:all'
		]
	}
};
