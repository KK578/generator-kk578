function create(options) {
	const mochaTest = {};

	if (options.polymerApp) {
		mochaTest.options = { reporter: 'spec' };

		mochaTest.all = { src: 'test/*-test.js' };
		mochaTest.development = { src: 'test/development-test.js' };
		mochaTest.production = { src: 'test/production-test.js' };
	}

	return mochaTest;
}

module.exports = {
	name: 'mochaTest',
	create: create
};
