module.exports = {
	default: {
		description: 'Lint the project and run mocha test suite.',
		tasks: [
			'lint',
			'test'
		]
	},
	lint: {
		description: 'Lint the project',
		tasks: [
			'eslint',
			'sassLint'
		]
	},
	test: {
		description: 'Run mocha test suite.',
		tasks: [
			'clean',
			'mochaTest:all'
		]
	}
};
