const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');
const fs = require('fs');

describe('yo kk578:node MyNodeProject', () => {
	const dummies = [
		[helpers.createDummyGenerator(), 'kk578:app']
	];

	before(() => {
		return helpers.run(path.join(__dirname, '../generators/node'))
			.withGenerators(dummies)
			.inDir(path.join(__dirname, './tmp/node'))
			.withArguments('MyNodeProject')
			.withPrompts({
				name: 'The Tester',
				email: 'tester@test.test',
				gitRemoteUrl: 'git@test.test:KK578/MyNodeProject.git'
			})
			.toPromise();
	});

	it('should generate package.json with MyNodeProject', (done) => {
		assert.file('package.json');

		assert.jsonFileContent('package.json', {
			name: 'MyNodeProject',
			email: 'tester@test.test',
			repository: {
				type: 'git',
				url: 'git@test.test:KK578/MyNodeProject.git'
			}
		});
	});

	it('should generate grunt files', () => {
		assert.file('gruntfile.js');
		assert.file(['configs/grunt/']);
	});

	it('should generate misc. config files', () => {
		assert.file(['.eslintrc.json']);
	});
});
