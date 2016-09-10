function create(options) {
	const express = {};

	if (options.nodeServer) {
		express.server = {
			options: {
				script: 'build/server/start.js'
			}
		};
	}

	return express;
}

module.exports = {
	name: 'express',
	create: create
};
