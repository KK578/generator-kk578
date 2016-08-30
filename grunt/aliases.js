module.exports = {
	default: {
		description: 'Lint the project and run mocha test suite.',
		tasks: [
			'eslint',
			'test'
		]
	},
	lint: {
		description: 'Lint the project',
		tasks: ['eslint']
	},
	test: {
		description: 'Run mocha test suite.',
		tasks: [
			'clean',
			'mochaTest:all'
		]
	}
};
