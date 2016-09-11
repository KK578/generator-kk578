const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('yo kk578:node MyNodeProject', () => {
	before(() => {
		const dummies = [
			[helpers.createDummyGenerator(), 'kk578:app']
		];

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

	///////////////////////////////////////////////////////////////////////////////////////////////

	it('should generate misc. config files', () => {
		assert.file(['.eslintrc.json']);
	});

	it('should not copy files from development', () => {
		assert.noFile('node_modules/');
	});

	describe('npm', () => {
		it('should generate package.json with MyNodeProject', () => {
			assert.file('package.json');

			assert.jsonFileContent('package.json', {
				name: 'MyNodeProject',
				author: { name: 'The Tester', email: 'tester@test.test' },
				repository: { type: 'git', url: 'git@test.test:KK578/MyNodeProject.git' }
			});
		});

		it('should not generate dependencies to package.json for node-server', () => {
			assert.noFileContent('package.json', /"express"/);
			assert.noFileContent('package.json', /"morgan"/);
			assert.noFileContent('package.json', /"ejs"/);
			assert.noFileContent('package.json', /"compression"/);
		});

		it('should not generate devDependencies to package.json for node-server', () => {
			assert.noFileContent('package.json', /"browser-sync"/);
			assert.noFileContent('package.json', /"grunt-express-server"/);
			assert.noFileContent('package.json', /"grunt-contrib-watch"/);
			assert.noFileContent('package.json', /"grunt-contrib-uglify"/);
		});
	});

	describe('Grunt', () => {
		it('should generate gruntfile.js', () => {
			assert.file('gruntfile.js');
		});

		it('should generate grunt configs', () => {
			assert.file([
				'grunt/eslint.js',
				'grunt/aliases.js'
			]);
		});

		it('should not add tasks specific to node-server', () => {
			assert.noFileContent('grunt/aliases.js', /serve/);
			assert.noFileContent('grunt/aliases.js', /build:server/);
			assert.noFileContent('grunt/eslint.js', /server/);
		});

		it('should not generate grunt configs for node-server', () => {
			assert.noFile([
				'grunt/express.js',
				'grunt/sync.js',
				'grunt/uglify.js',
				'grunt/watch.js'
			]);
		});
	});
});
