﻿const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

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

	it('should generate package.json with MyNodeProject', () => {
		assert.file('package.json');

		assert.jsonFileContent('package.json', { name: 'MyNodeProject' });
		assert.jsonFileContent('package.json', {
			author: { name: 'The Tester', email: 'tester@test.test' }
		});
		assert.jsonFileContent('package.json', {
			repository: { type: 'git', url: 'git@test.test:KK578/MyNodeProject.git' }
		});
	});

	it('should not generate dependencies for package.json for node-server', () => {
		assert.noFileContent('package.json', /"express"/);
		assert.noFileContent('package.json', /"browser-sync"/);
		assert.noFileContent('package.json', /"grunt-express-server"/);
		assert.noFileContent('package.json', /"grunt-contrib-watch"/);
		assert.noFileContent('package.json', /"grunt-contrib-uglify"/);
	});

	it('should generate grunt files', () => {
		assert.file([
			'gruntfile.js',
			'grunt/eslint.js',
			'grunt/aliases.js'
		]);
	});

	it('should generate misc. config files', () => {
		assert.file(['.eslintrc.json']);
	});

	it('should not copy files from development', () => {
		assert.noFile('node_modules/');
	});
});
