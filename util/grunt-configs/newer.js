function create(options) {
	const newer = {};

	if (options.nodeServer) {
		newer.options = {
			cache: '.cache/grunt-newer/'
		};
	}

	return newer;
}

module.exports = {
	name: 'newer',
	create: create
};
