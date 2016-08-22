const express = require('express');
const logs = require('./configs/logs.js');
const setup = require('./configs/setup.js');
const router = require('./configs/router.js');

module.exports = () => {
	const server = express();

	// Run configuration scripts here.
	logs(server);
	setup(server);
	router(server);
	// End configuration.

	return server;
};
