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

	it('should generate extra dependencies to package.json', () => {
		assert.fileContent('package.json', /"express"/);
		assert.fileContent('package.json', /"morgan"/);
		assert.fileContent('package.json', /"ejs"/);
		assert.fileContent('package.json', /"compression"/);
		assert.fileContent('package.json', /"browser-sync"/);
		assert.fileContent('package.json', /"grunt-express-server"/);
		assert.fileContent('package.json', /"grunt-contrib-watch"/);
		assert.fileContent('package.json', /"grunt-contrib-uglify"/);
	});

	it('should generate npm-shrinkwrap for uglifyjs', () => {
		assert.file('npm-shrinkwrap.json');
		assert.jsonFileContent('npm-shrinkwrap.json', {
			name: 'MyNodeServerProject',
			dependencies: {
				'uglify-js': {
					from: 'mishoo/UglifyJS2#harmony'
				}
			}
		});
	});

	it('should generate grunt configs for dependencies', () => {
		assert.file([
			'grunt/express.js',
			'grunt/watch.js',
			'grunt/uglify.js'
		]);
	});

	it('should generate server scripts for express', () => {
		assert.file([
			'server/start.js',
			'server/server.js'
		]);
		assert.file([
			'server/configs/browser-sync.js',
			'server/configs/logs.js',
			'server/configs/router.js',
			'server/configs/setup.js'
		]);
		assert.file([
			'server/routes/static.js',
			'server/routes/dev-404.js'
		]);
	});

	it('should generate a .env file', () => {
		assert.file(['.env']);
		assert.fileContent('.env', /NODE_ENV=development/);
		assert.fileContent('.env', /PORT=[0-9]*/);
		assert.fileContent('.env', /PORT_BROWSER_SYNC=[0-9]*/);
	});

	it('should not copy files from development', () => {
		assert.noFile(['build/', 'node_modules/']);
	});
});
