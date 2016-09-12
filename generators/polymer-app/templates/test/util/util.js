module.exports = {
	request: require('supertest'),
	expect: require('chai').expect,
	server: require('../tmp/build/server/server.js')()
};
