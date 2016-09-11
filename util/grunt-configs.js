const stringifyObject = require('stringify-object');
const fs = require('fs');
const path = require('path');

function initialise(options, callback) {
	const grunt = {};
	const configsDir = path.join(__dirname, 'grunt-configs/');

	fs.readdir(configsDir, (err, files) => {
		if (err) {
			return callback(err);
		}

		files.map((c) => {
			const config = require(path.join(configsDir, c));

			grunt[config.name] = config.create(options);
		});

		callback(null, grunt);
	});
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
