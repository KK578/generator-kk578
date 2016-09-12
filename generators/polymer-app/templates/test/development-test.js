process.env.NODE_ENV = 'development';

const util = require('./util/util.js');

function importTest(path) {
	require(path)(util);
}

describe('Common', () => {
	importTest('./production/route-static-test.js');
});

describe('Development', () => {
	importTest('./development/route-404-test.js');
	importTest('./development/route-bower-test.js');
	importTest('./development/route-components-test.js');
});
