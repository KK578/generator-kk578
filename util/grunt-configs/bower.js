function create(options) {
	const bower = {};

	if (options.polymerApp) {
		bower.options = {
			copy: false,
			targetDir: 'public/bower-components/',
			layout: 'byComponent'
		};

		bower.development = {
			options: { verbose: true }
		};

		bower.production = {
			options: {
				bowerOptions: { production: true }
			}
		};
	}

	return bower;
}

module.exports = {
	name: 'bower',
	create: create
};
