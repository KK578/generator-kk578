function create(options) {
	const copy = {};

	if (options.nodeServer) {
		copy.server = {
			files: {
				'build/.env': '.env'
			}
		};
	}

	return copy;
}

module.exports = {
	name: 'copy',
	create: create
};
