process.env.NODE_ENV = 'development';

const util = require('./util/util.js');

function importTest(path) {
	require(path)(util);
}

describe('Development', function () {
	importTest('./development/route-404-dev.js');
});
