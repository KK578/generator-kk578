﻿const stringify = require('stringify-object');

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
			description: 'Build task for server files',
			tasks: [
				'eslint:server',
				'uglify:server',
				'sync:server'
			]
		};

		if (options.polymerApp) {
			aliases['build:bower'] = {
				description: 'Build task for bower components',
				tasks: [
					'minifyPolymer:bower',
					'minifyPolymerCSS:bower',
					'uglify:bower'
				]
			};

			aliases['build:components'] = {
				description: 'Build task for custom components',
				tasks: [
					'minifyPolymer:components',
					'sass:components',
					'uglify:components'
				]
			};

			aliases['build:views'] = {
				description: 'Build task for views',
				tasks: [
					'minifyPolymer:views',
					'sass:views',
					'uglify:views'
				]
			};
		}
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

		eslint.components = {
			files: ['public/custom-components/**/*.js']
		};

		eslint.views = {
			src: ['public/scripts/**/*.js']
		};
	}

	return eslint;
}

function gruntExpress(options) {
	const express = {};

	if (options.nodeServer) {
		express.server = {
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
		};

		if (options.polymerApp) {
			uglify.bower = {
				files: [
					{
						expand: true,
						cwd: 'public/bower-components/',
						src: [
							'**/*.js',
							'!**/*.min.js',
							'!**/{grunt,gulp}file.js',
							'!**/{demo,demos,docs,explainer,node_modules,test,tests}/**/*'
						],
						dest: 'build/public/bower-components/'
					}
				]
			};

			uglify.components = {
				files: [
					{
						expand: true,
						cwd: 'public/custom-components/',
						src: ['**/*.js'],
						dest: 'build/public/custom-components/'
					}
				]
			};

			uglify.views = {
				files: [
					{
						expand: true,
						cwd: 'public/scripts/',
						src: ['**/*.js'],
						dest: 'build/public/scripts/'
					}
				]
			};
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
				'express:server:stop',
				'eslint:server',
				'build:server',
				'express:server'
			]
		};

		if (options.polymerApp) {
			watch.bower = {
				files: ['bower.json'],
				tasks: ['build:bower']
			};

			watch.components = {
				files: ['public/custom-components/**/*'],
				tasks: [
					'eslint:components',
					'build:components'
				]
			};

			watch['sass-partials'] = {
				files: ['public/stylesheets/partials/*.scss'],
				tasks: ['sass']
			},

			watch.views = {
				files: [
					'public/*.html',
					'public/stylesheets/*.scss',
					'public/scripts/**/*.js'
				],
				tasks: [
					'eslint:views',
					'build:views'
				]
			};
		}
	}

	return watch;
}

function gruntBower(options) {
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

function gruntMinifyPolymer(options) {
	const minifyPolymer = {};

	if (options.polymerApp) {
		minifyPolymer.bower = {
			files: [
				{
					expand: true,
					cwd: 'public/bower-components/',
					src: [
						'**/*.html',
						'!**/{index,demo}.html',
						'!**/{demo,demos,docs,explainer,node_modules,test,tests}/**/*'
					],
					dest: 'build/public/bower-components/'
				}
			]
		};

		minifyPolymer.components = {
			files: [
				{
					expand: true,
					cwd: 'public/custom-components/',
					src: ['**/*.html'],
					dest: 'build/public/custom-components/'
				}
			]
		};

		minifyPolymer.views = {
			files: [
				{
					expand: true,
					cwd: 'public/',
					src: ['*.html'],
					dest: 'build/public/'
				}
			]
		};
	}

	return minifyPolymer;
}

function gruntMinifyPolymerCss(options) {
	const minifyPolymerCss = {};

	if (options.polymerApp) {
		minifyPolymerCss.bower = {
			files: [
				{
					expand: true,
					cwd: 'public/bower-components/',
					src: [
						'**/*.css',
						'!**/{index,demo}.css',
						'!**/{demo,demos,docs,explainer,node_modules,test,tests}/**/*'
					],
					dest: 'build/public/bower-components/'
				}
			]
		};
	}

	return minifyPolymerCss;
}

function gruntSass(options) {
	const sass = {};

	if (options.polymerApp) {
		sass.components = {
			files: [
				{
					expand: true,
					cwd: 'public/custom-components/',
					src: ['**/*.scss'],
					ext: '.css',
					dest: 'build/public/custom-components/'
				}
			]
		};

		sass.views = {
			files: [
				{
					expand: true,
					cwd: 'public/stylesheets/',
					src: ['*.scss'],
					ext: '.css',
					dest: 'build/public/stylesheets/'
				}
			]
		};
	}

	return sass;
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

	// Polymer App
	grunt.bower = gruntBower(options);
	grunt.minifyPolymer = gruntMinifyPolymer(options);
	grunt.minifyPolymerCss = gruntMinifyPolymerCss(options);
	grunt.sass = gruntSass(options);

	return grunt;
}

function stringifyConfigs(configs) {
	const stringifiedConfigs = [];
	const keys = Object.keys(configs);

	keys.map((key) => {
		if (Object.keys(configs[key]).length !== 0) {
			const configString = stringify(configs[key]).replace(/\n/g, '\r\n');

			stringifiedConfigs.push({
				file: `grunt/${key}.js`,
				content: `module.exports = ${configString};\r\n`
			});
		}
	});

	return stringifiedConfigs;
}

///////////////////////////////////////////////////////////////////////////////////////////////////
// Exports
exports.prepareConfigs = prepareConfigs;
exports.stringifyConfigs = stringifyConfigs;
