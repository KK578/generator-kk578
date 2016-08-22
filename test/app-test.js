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
