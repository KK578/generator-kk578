///////////////////////////////////////////////////////////////////////////////////////////////////
// Grunt config customisations
function gruntAliases(options) {
	const aliases = {
		lint: {
			description: 'Lint files in the project.',
			tasks: [
				'eslint'
			]
		}
	};

	if (options.nodeServer) {
		aliases.serve = {
			description: 'Start server and watch for file changes',
			tasks: [
				'express',
				'watch'
			]
		};

		aliases['build:server'] = {
			description: 'Watch task for building server files',
			tasks: [
				'eslint:server',
				'uglify:server',
				'sync:server'
			]
		};
	}

	return aliases;
}

function gruntEslint(options) {
	const eslint = {
		options: {
			format: 'node_modules/eslint-formatter-pretty'
		},
		project: {
			files: [
				{
					expand: true,
					src: [
						'gruntfile.js',
						'grunt/*.js'
					]
				}
			]
		}
	};

	if (options.nodeServer) {
		eslint.server = {
			files: 'server/**/*.js'
		};
	}

	return eslint;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Initialisation and preparation for writing
function prepareConfigs(options) {
	const grunt = {};

	grunt.aliases = gruntAliases(options);
	grunt.eslint = gruntEslint(options);

	return grunt;
}

function stringifyConfigs(configs) {
	const stringifiedConfigs = [];
	const keys = Object.keys(configs);

	keys.map((key) => {
		stringifiedConfigs.push({
			file: `grunt/${key}.js`,
			content: `module.exports = ${JSON.stringify(configs[key], null, '\t')};`
		});
	});

	return stringifiedConfigs;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Exports
exports.prepareConfigs = prepareConfigs;
exports.stringifyConfigs = stringifyConfigs;
