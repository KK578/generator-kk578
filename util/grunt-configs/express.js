module.exports = (options) => {
	const express = {};

	if (options.nodeServer) {
		express.server = {
			options: {
				script: 'build/server/start.js'
			}
		};
	}

	return express;
};
