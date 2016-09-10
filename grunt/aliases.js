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
			'htmllint',
			'eslint',
			'sasslint'
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
