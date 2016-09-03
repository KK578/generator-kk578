function create(options) {
	const bowerJson = {
		name: options.appName,
		version: '0.0.0',
		ignore: [
			'**/.*',
			'node_modules',
			'bower_components',
			'test',
			'tests'
		],
		authors: [{
			name: options.name,
			email: options.email
		}],
		license: 'BSD-3-Clause',
		dependencies: {},
		devDependencies: {}
	};

	if (options.gitRemoteUrl) {
		bowerJson.repository = {
			type: 'git',
			url: options.gitRemoteUrl
		};
	}

	if (options.polymerApp) {
		Object.assign(bowerJson.dependencies, {
			'lodash': '^4.15.0',
			'polymer': 'Polymer/polymer#^1.6.1',
			'paper-elements': 'PolymerElements/paper-elements#^1.0.7'
		});

		Object.assign(bowerJson.devDependencies, {
			'iron-component-page': 'PolymerElements/iron-component-page#^1.1.7'
		});
	}

	return bowerJson;
}

module.exports = {
	create: create
};
