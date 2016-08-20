const path = require('path');
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
			.toPromise();
	});

	it('should generate package.json with MyNodeProject', () => {
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
