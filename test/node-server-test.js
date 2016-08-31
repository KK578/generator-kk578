const path = require('path');
const helpers = require('yeoman-test');
const assert = require('yeoman-assert');

describe('yo kk578:node-server MyNodeServerProject', () => {
	before(() => {
		const dummies = [
			path.join(__dirname, '../generators/node'),
			[helpers.createDummyGenerator(), 'kk578:app']
		];

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

	///////////////////////////////////////////////////////////////////////////////////////////////

	it('should generate a .env file', () => {
		assert.file(['.env']);
		assert.fileContent('.env', /NODE_ENV=development/);
		assert.fileContent('.env', /PORT=[0-9]*/);
		assert.fileContent('.env', /PORT_BROWSER_SYNC=[0-9]*/);
	});

	it('should not copy files from development', () => {
		assert.noFile(['build/', 'node_modules/']);
	});

	describe('npm', () => {
		it('should generate extra dependencies to package.json', () => {
			assert.fileContent('package.json', /"express"/);
			assert.fileContent('package.json', /"morgan"/);
			assert.fileContent('package.json', /"ejs"/);
			assert.fileContent('package.json', /"compression"/);
		});

		it('should generate extra devDependencies to package.json', () => {
			assert.fileContent('package.json', /"browser-sync"/);
			assert.fileContent('package.json', /"grunt-express-server"/);
			assert.fileContent('package.json', /"grunt-contrib-watch"/);
			assert.fileContent('package.json', /"grunt-contrib-uglify"/);
		});

		it('should generate npm-shrinkwrap for uglify-js', () => {
			assert.file('npm-shrinkwrap.json');

			assert.jsonFileContent('npm-shrinkwrap.json', {
				name: 'MyNodeServerProject',
				dependencies: {
					'uglify-js': { from: 'mishoo/UglifyJS2#harmony' }
				}
			});
		});
	});

	describe('Grunt', () => {
		it('should add additional tasks specific to node-server', () => {
			assert.fileContent('grunt/aliases.js', /serve/);
			assert.fileContent('grunt/aliases.js', /build:server/);
			assert.fileContent('grunt/eslint.js', /server/);
			assert.fileContent('grunt/watch.js', /server/);
		});

		it('should not add configs specific to polymer-app', () => {
			assert.noFile([
				'grunt/babel.js',
				'grunt/bower.js',
				'grunt/minifyPolymer.js',
				'grunt/minifyPolymerCSS.js',
				'grunt/sass.js',
				'grunt/vulcanize.js'
			]);
		});

		it('should not add tasks specific to polymer-app for Bower', () => {
			assert.noFileContent('grunt/aliases.js', /build:bower/);
			assert.noFileContent('grunt/uglify.js', /bower/);
			assert.noFileContent('grunt/watch.js', /bower/);
		});

		it('should generate additional grunt configs for node-server', () => {
			assert.file([
				'grunt/express.js',
				'grunt/sync.js',
				'grunt/uglify.js',
				'grunt/watch.js'
			]);
		});
	});

	describe('Server', () => {
		it('should generate server scripts for express', () => {
			assert.file([
				'server/start.js',
				'server/server.js'
			]);
		});

		it('should generate server configs', () => {
			assert.file([
				'server/configs/browser-sync.js',
				'server/configs/logs.js',
				'server/configs/router.js',
				'server/configs/setup.js'
			]);
		});

		it('should generate server routes', () => {
			assert.file([
				'server/routes/static.js',
				'server/routes/dev-404.js'
			]);
		});
	});
});
