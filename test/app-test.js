const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('yo kk578 MyProject', () => {
	before(() => {
		return helpers.run(path.join(__dirname, '../generators/app'))
			.inDir(path.join(__dirname, './tmp/app'))
			.withArguments('MyProject')
			.withPrompts({
				name: 'The Tester',
				email: 'tester@test.test',
				gitRemoteUrl: 'git@test.test:KK578/MyProject.git'
			})
			.toPromise();
	});

	describe('Git', () => {
		it('should generate git config files', () => {
			assert.file(['.gitignore', '.gitattributes']);
		});

		it('should initialise a git repository', () => {
			assert.file('.git/');
			assert.fileContent('.git/config', /url = git@test.test:KK578\/MyProject\.git/m);
		});
	});

	it('should generate misc. config files', () => {
		assert.file(['.editorconfig', 'README.md', 'LICENSE.md']);
		assert.fileContent('README.md', /^\# MyProject/);
	});
});

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
				email: 'tester@test.test'
			})
			.toPromise();
	});

	it('should generate package.json with MyProject', () => {
		assert.file('package.json');
		assert.fileContent('package.json', /"name": "MyNodeProject"/);
	});

	it('should generate grunt files', () => {
		assert.file('gruntfile.js');
		assert.file(['configs/grunt/']);
	});

	it('should generate misc. config files', () => {
		assert.file(['.eslintrc.json']);
	});
});
