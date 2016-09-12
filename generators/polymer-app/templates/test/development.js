process.env.NODE_ENV = 'development';

const util = require('./util/util.js');

function importTest(path) {
	require(path)(util);
}

describe('Common', () => {
	importTest('./production/route-static.js');
});

describe('Development', () => {
	importTest('./development/route-404-dev.js');
	importTest('./development/bower-dev.js');
	importTest('./development/components-dev.js');
});
