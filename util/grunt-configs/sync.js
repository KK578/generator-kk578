module.exports = (options) => {
	const sync = {};

	if (options.nodeServer) {
		sync.server = {
			files: {
				'build/.env': '.env'
			}
		};
	}

	return sync;
};
