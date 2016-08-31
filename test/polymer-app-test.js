const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('yo kk578:polymer-app MyPolymerAppProject', () => {
	before(() => {
		const dummies = [
			path.join(__dirname, '../generators/node-server'),
			path.join(__dirname, '../generators/node'),
			[helpers.createDummyGenerator(), 'kk578:app']
		];

		return helpers.run(path.join(__dirname, '../generators/polymer-app'))
			.withGenerators(dummies)
			.inDir(path.join(__dirname, './tmp/polymer-app'))
			.withArguments('MyPolymerAppProject')
			.withPrompts({
				name: 'The Tester',
				email: 'tester@test.test',
				gitRemoteUrl: 'git@test.test:KK578/MyPolymerAppProject.git'
			})
			.toPromise();
	});

	///////////////////////////////////////////////////////////////////////////////////////////////

	it('should not copy files from development', () => {
		assert.noFile(['build/', 'node_modules/']);
	});

	describe('Bower', () => {
		it('should generate bower.json with MyPolymerAppProject', () => {
			assert.file('bower.json');

			assert.jsonFileContent('bower.json', {
				name: 'MyPolymerAppProject',
				authors: [
					{ name: 'The Tester', email: 'tester@test.test' }
				],
				repository: { type: 'git', url: 'git@test.test:KK578/MyPolymerAppProject.git' }
			});
		});

		it('should have basic polymer dependencies', () => {
			assert.fileContent('bower.json', /"polymer": "Polymer\/polymer.*"/);
			assert.fileContent('bower.json',
				/"paper-elements": "PolymerElements\/paper-elements.*"/);
		});

		it('should have basic polymer devDependencies', () => {
			assert.fileContent('bower.json', /"polymer": "Polymer\/polymer.*"/);
			assert.fileContent('bower.json',
				/"iron-component-page": "PolymerElements\/iron-component-page.*"/);
		});

		it('should generate a .bowerrc', () => {
			assert.file('.bowerrc');
		});
	});

	describe('npm', () => {
		it('should generate extra devDependencies to package.json', () => {
			assert.fileContent('package.json', /"grunt-babel"/);
			assert.fileContent('package.json', /"grunt-bower-task"/);
			assert.fileContent('package.json', /"grunt-minify-polymer"/);
			assert.fileContent('package.json', /"grunt-sass"/);
			assert.fileContent('package.json', /"grunt-vulcanize"/);
		});
	});

	describe('Server', () => {
		it('should generate browser-sync plugins', () => {
			assert.file([
				'server/configs/browser-sync/plugins/scroll.js',
				'server/configs/browser-sync/handlers/polymer-style-inject.js'
			]);
		});

		it('should generate additional server routes', () => {
			assert.file([
				'server/routes/bower.js',
				'server/routes/staging.js',
				'server/routes/wct.js'
			]);
		});
	});

	describe('Grunt', () => {
		it('should generate additional grunt configs for polymer-app', () => {
			assert.file([
				'grunt/babel.js',
				'grunt/bower.js',
				'grunt/minifyPolymer.js',
				'grunt/minifyPolymerCSS.js',
				'grunt/sass.js',
				'grunt/vulcanize.js'
			]);
		});

		it('should add new tasks for Bower', () => {
			assert.fileContent('grunt/aliases.js', /build:bower/);
			assert.fileContent('grunt/uglify.js', /bower/);
			assert.fileContent('grunt/watch.js', /bower/);
			assert.fileContent('grunt/minifyPolymer.js', /bower/);
			assert.fileContent('grunt/minifyPolymerCSS.js', /bower/);
		});
	});

	describe('Public', () => {
		it('should generate basic views', () => {
			assert.file([
				'404.html',
				'bower.html',
				'elements.html',
				'index.html'
			]);
		});
	});
});
