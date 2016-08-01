const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('yo kk578 MyProject', () => {
	before(() => {
		helpers.run(path.join(__dirname, '../generators/app'))
			.inDir(path.join(__dirname, './tmp/app'))
			.withPrompts({ appName: 'MyProject' })
			.toPromise();
	});

	describe('Git', () => {
		it('should generate git config files', () => {
			assert.file(['.gitignore', '.gitattributes']);
		});

		it('should initialise a git repository', () => {
			assert.file('.git/');
		});
	});

	it('should generate package.json with MyProject', () => {
		assert.file('package.json');
		assert.fileContent('package.json', /"name": "MyProject"/);
	});

	it('should generate misc. files', () => {
		assert.file(['.editorconfig', '.eslintrc.json', 'README.md', 'LICENSE']);
	});

	it('should generate grunt files', () => {
		assert.file('gruntfile.js');
		assert.file(['configs/grunt/']);
	});
});
