module.exports = (options) => {
	const clean = {};

	if (options.nodeServer) {
		clean.build = ['build/**/*'];

		if (options.polymerApp) {
			clean.bower = ['public/bower-components/**/*'];
			clean.production = [
				'build/public/bower-components/',
				'build/public/custom-components/',
				'build/public/stylesheets/'
			];
		}
	}

	return clean;
};
