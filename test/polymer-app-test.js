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

	it('should generate misc. config files', () => {
		assert.file([
			//'.sass-lint.yml',
			'.htmllintrc'
		]);
	});

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
			assert.fileContent('bower.json', /"lodash"/);
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
			assert.fileContent('package.json', /"grunt-htmllint"/);
			assert.fileContent('package.json', /"grunt-minify-polymer"/);
			assert.fileContent('package.json', /"grunt-sass"/);
			//assert.fileContent('package.json', /"grunt-sass-lint"/);
			assert.fileContent('package.json', /"grunt-vulcanize"/);
		});
	});

	describe('Server', () => {
		it('should generate browser-sync plugins', () => {
			assert.file([
				'server/configs/browser-sync/plugins/scroll.js',
				'server/configs/browser-sync/plugins/polymer-style-inject.js',
				'server/configs/browser-sync/handlers/polymer-style-inject.js'
			]);
		});

		it('should generate additional server routes', () => {
			assert.file([
				'server/routes/bower.dev.js',
				'server/routes/components.dev.js',
				//'server/routes/staging.dev.js',
				'server/routes/wct.dev.js'
			]);
		});
	});

	describe('Grunt', () => {
		it('should generate additional grunt configs for polymer-app', () => {
			assert.file([
				'grunt/babel.js',
				'grunt/bower.js',
				'grunt/htmllint.js',
				'grunt/minifyPolymer.js',
				'grunt/minifyPolymerCSS.js',
				'grunt/sass.js',
				//'grunt/sasslint.js',
				'grunt/vulcanize.js'
			]);
		});

		it('should add new tasks for Bower', () => {
			assert.fileContent('grunt/aliases.js', /build:bower/);
			assert.fileContent('grunt/bower.js', /development/);
			assert.fileContent('grunt/bower.js', /production/);
			assert.fileContent('grunt/minifyPolymer.js', /bower/);
			assert.fileContent('grunt/minifyPolymerCSS.js', /bower/);
			assert.fileContent('grunt/uglify.js', /bower/);
			assert.fileContent('grunt/watch.js', /bower/);
		});

		it('should add new tasks for views', () => {
			assert.fileContent('grunt/aliases.js', /build:views/);
			assert.fileContent('grunt/babel.js', /views/);
			assert.fileContent('grunt/eslint.js', /views/);
			assert.fileContent('grunt/htmllint.js', /views/);
			assert.fileContent('grunt/minifyPolymer.js', /views/);
			assert.fileContent('grunt/sass.js', /views/);
			//assert.fileContent('grunt/sasslint.js', /views/);
			assert.fileContent('grunt/uglify.js', /views/);
			assert.fileContent('grunt/watch.js', /views/);
			assert.fileContent('grunt/watch.js', /sass-partials/);
		});

		it('should add new tasks for custom components', () => {
			assert.fileContent('grunt/aliases.js', /build:components/);
			assert.fileContent('grunt/eslint.js', /components/);
			assert.fileContent('grunt/htmllint.js', /components/);
			assert.fileContent('grunt/minifyPolymer.js', /components/);
			assert.fileContent('grunt/sass.js', /components/);
			//assert.fileContent('grunt/sasslint.js', /components/);
			assert.fileContent('grunt/uglify.js', /components/);
			assert.fileContent('grunt/watch.js', /components/);
		});

		it('should add new tasks for production build', () => {
			assert.fileContent('grunt/babel.js', /production/);
			assert.fileContent('grunt/minifyPolymer.js', /production/);
			assert.fileContent('grunt/vulcanize.js', /[^(splash\-)]elements/);
			assert.fileContent('grunt/vulcanize.js', /splash-elements/);
		});

		it('should add html linting to tasks', () => {
			assert.fileContent('grunt/aliases.js', /'htmllint'/);
			assert.fileContent('grunt/watch.js', /htmllint:views/);
			assert.fileContent('grunt/watch.js', /htmllint:components/);
		});

		//it('should add sass linting to tasks', () => {
		//	assert.fileContent('grunt/aliases.js', /'sasslint'/);
		//	assert.fileContent('grunt/watch.js', /'sasslint'/);
		//	assert.fileContent('grunt/watch.js', /sasslint:views/);
		//	assert.fileContent('grunt/watch.js', /sasslint:components/);
		//});
	});

	describe('Public', () => {
		it('should generate basic views', () => {
			assert.file([
				'public/404.html',
				'public/bower.html',
				'public/elements.html',
				'public/splash-elements.html',
				'public/index.html'
			]);
		});

		it('should generate SASS partials', () => {
			assert.file([
				'public/stylesheets/partials/_layouts.scss',
				'public/stylesheets/partials/_material_color.scss',
				'public/stylesheets/partials/_mixins.scss',
				'public/stylesheets/partials/_theme.scss'
			]);
		});

		it('should generate SASS stylesheets for views', () => {
			assert.file([
				'public/stylesheets/404.scss',
				'public/stylesheets/bower.scss',
				'public/stylesheets/index.scss'
			]);
		});

		it('should generate front end scripts', () => {
			assert.file([
				'public/scripts/es6-support.js',
				'public/scripts/load.js',
				'public/scripts/bower.js'
			]);
		});

		it('should generate custom components', () => {
			assert.file([
				'public/custom-components/splash-screen/splash-screen.html',
				'public/custom-components/splash-screen/splash-screen.js',
				'public/custom-components/splash-screen/splash-screen.scss'
			]);

			assert.file([
				'public/custom-components/app-element/app-element.html',
				'public/custom-components/app-element/app-element.js',
				'public/custom-components/app-element/app-element.scss'
			]);
		});

		it('should generate WCT suite');
	});
});
