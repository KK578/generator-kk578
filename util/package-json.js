const sortObject = require('sort-object-keys');

function create(options) {
	const packageJson = {
		name: options.appName,
		version: '0.0.0',
		author: {
			name: options.name,
			email: options.email
		},
		license: 'BSD-3-Clause',
		dependencies: {},
		devDependencies: {
			'eslint-formatter-pretty': '^0.2.2',
			'grunt': '^1.0.1',
			'grunt-eslint': 'KK578/grunt-eslint',
			'jit-grunt': '^0.10.0',
			'load-grunt-config': '^0.19.2',
			'time-grunt': '^1.4.0'
		}
	};

	if (options.gitRemoteUrl) {
		packageJson.repository = {
			type: 'git',
			url: options.gitRemoteUrl
		};
	}

	if (options.nodeServer) {
		Object.assign(packageJson.dependencies, {
			compression: '^1.6.2',
			dotenv: '^2.0.0',
			ejs: '^2.5.1',
			express: '^4.14.0',
			morgan: '^1.7.0'
		});

		Object.assign(packageJson.devDependencies, {
			'browser-sync': '^2.14.0',
			'chai': '^3.5.0',
			'grunt-contrib-clean': '^1.0.0',
			'grunt-contrib-copy': '^1.0.0',
			'grunt-contrib-uglify': '^2.0.0',
			'grunt-contrib-watch': '^1.0.0',
			'grunt-express-server': 'KK578/grunt-express-server',
			'grunt-newer': '^1.2.0',
			'supertest': '^2.0.0'
		});

		if (options.polymerApp) {
			Object.assign(packageJson.devDependencies, {
				'glob': '^7.0.6',
				'grunt-babel': '^6.0.0',
				'grunt-bower-task': '^0.4.0',
				'grunt-htmllint': 'KK578/grunt-htmllint',
				'grunt-minify-polymer': '^2.1.1',
				'grunt-mocha-test': '^0.12.7',
				'grunt-sass': '^1.2.1',
				'grunt-sass-lint': 'KK578/grunt-sass-lint',
				'grunt-vulcanize': '^1.0.0',
				'mocha': '^3.0.0'
			});
		}
	}

	packageJson.dependencies = sortObject(packageJson.dependencies);
	packageJson.devDependencies = sortObject(packageJson.devDependencies);

	return packageJson;
}

module.exports = {
	create: create
};
