const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('yo kk578:node-server MyNodeServerProject', () => {
	const dummies = [
		path.join(__dirname, '../generators/node'),
		[helpers.createDummyGenerator(), 'kk578:app']
	];

	before(() => {
		return helpers.run(path.join(__dirname, '../generators/node-server'))
			.withGenerators(dummies)
			.inDir(path.join(__dirname, './tmp/node-server'))
			.withArguments('MyNodeServerProject')
			.withPrompts({
				name: 'The Tester',
				email: 'tester@test.test',
				gitRemoteUrl: 'git@test.test:KK578/MyNodeProject.git'
			})
			.toPromise();
	});

	it('should add new dependencies to package.json', () => {
		assert.fileContent('package.json', /browser-sync/);
		assert.fileContent('package.json', /grunt-contrib-uglify/);
	});

	it('should not copy files from development', () => {
		assert.noFile(['build/', 'node_modules/']);
	});
});
