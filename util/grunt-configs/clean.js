function create(options) {
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

			clean.test = ['test/tmp/**/*'];
		}
	}

	return clean;
}

module.exports = {
	name: 'clean',
	create: create
};
