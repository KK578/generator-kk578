const express = require('express');
const logs = require('./configs/logs.js');

module.exports = () => {
	const server = express();

	// Run configuration scripts here.
	logs(server);
	// End configuration.

	return server;
};
