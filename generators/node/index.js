const generators = require('yeoman-generator');

const generator = generators.Base.extend({
	initializing() {
		this.composeWith('kk578:app');
	}
});

module.exports = generator;
