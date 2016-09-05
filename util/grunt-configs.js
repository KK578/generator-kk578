const stringifyObject = require('stringify-object');

function initialise(options) {
	const grunt = {};

	// Node
	grunt.aliases = require('./grunt-configs/aliases.js')(options);
	grunt.eslint = require('./grunt-configs/eslint.js')(options);

	// Node Server
	grunt.express = require('./grunt-configs/express.js')(options);
	grunt.sync = require('./grunt-configs/sync.js')(options);
	grunt.uglify = require('./grunt-configs/uglify.js')(options);
	grunt.watch = require('./grunt-configs/watch.js')(options);

	// Polymer App
	grunt.babel = require('./grunt-configs/babel.js')(options);
	grunt.bower = require('./grunt-configs/bower.js')(options);
	grunt.minifyPolymer = require('./grunt-configs/minify-polymer.js')(options);
	grunt.minifyPolymerCSS = require('./grunt-configs/minify-polymer-css.js')(options);
	grunt.sass = require('./grunt-configs/sass.js')(options);
	grunt.vulcanize = require('./grunt-configs/vulcanize.js')(options);

	return grunt;
}

function stringify(configs) {
	const stringifiedConfigs = [];
	const keys = Object.keys(configs);

	keys.map((key) => {
		if (Object.keys(configs[key]).length !== 0) {
			const configString = stringifyObject(configs[key]).replace(/\n/g, '\r\n');

			stringifiedConfigs.push({
				file: `grunt/${key}.js`,
				content: `module.exports = ${configString};\r\n`
			});
		}
	});

	return stringifiedConfigs;
}

module.exports = {
	initialise: initialise,
	stringify: stringify
};
