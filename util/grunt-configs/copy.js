module.exports = (options) => {
	const copy = {};

	if (options.nodeServer) {
		copy.server = {
			files: {
				'build/.env': '.env'
			}
		};
	}

	return copy;
};
