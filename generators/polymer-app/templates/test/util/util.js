module.exports = {
	request: require('supertest'),
	expect: require('chai').expect,
	server: require('../tmp/server/server.js')()
};
