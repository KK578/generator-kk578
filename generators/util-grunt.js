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

function gruntExpress(options) {
	const express = {};

	if (options.nodeServer) {
		express.all = {
			options: {
				script: 'build/server/start.js'
			}
		};
	}

	return express;
}

function gruntSync(options) {
	const sync = {};

	if (options.nodeServer) {
		sync.server = {
			files: {
				'build/.env': '.env'
			}
		};
	}

	return sync;
}

function gruntUglify(options) {
	const uglify = {};

	if (options.nodeServer) {
		uglify.server = {
			files: [
				{
					expand: true,
					cwd: 'server/',
					src: ['**/*.js'],
					dest: 'build/server/'
				}
			]
		}
	}

	return uglify;
}

function gruntWatch(options) {
	const watch = {};

	if (options.nodeServer) {
		watch.options = {
			spawn: false,
			interrupt: true
		};

		watch.server = {
			options: {
				reload: true
			},
			files: [
				'gruntfile.js',
				'grunt/*.js',
				'server/**/*.js'
			],
			tasks: [
				'express:stop',
				'eslint:server',
				'build:server',
				'express'
			]
		};
	}

	return watch;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Initialisation and preparation for writing
function prepareConfigs(options) {
	const grunt = {};

	// App
	grunt.aliases = gruntAliases(options);
	grunt.eslint = gruntEslint(options);

	// Node Server
	grunt.express = gruntExpress(options);
	grunt.sync = gruntSync(options);
	grunt.uglify = gruntUglify(options);
	grunt.watch = gruntWatch(options);

	return grunt;
}

function stringifyConfigs(configs) {
	const stringifiedConfigs = [];
	const keys = Object.keys(configs);

	keys.map((key) => {
		if (Object.keys(configs[key]).length !== 0) {
			stringifiedConfigs.push({
				file: `grunt/${key}.js`,
				content: `module.exports = ${JSON.stringify(configs[key], null, '\t')};`
			});
		}
	});

	return stringifiedConfigs;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Exports
exports.prepareConfigs = prepareConfigs;
exports.stringifyConfigs = stringifyConfigs;
