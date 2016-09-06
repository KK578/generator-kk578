module.exports = (options) => {
	const newer = {};

	if (options.nodeServer) {
		newer.options = {
			cache: '.cache/grunt-newer/'
		};
	}

	return newer;
};
