function initTimeGrunt(grunt) {
	const timeGrunt = require('time-grunt');

	timeGrunt(grunt);
}

function initLoadGruntConfig(grunt) {
	const loadGruntConfig = require('load-grunt-config');
	const options = {
		jitGrunt: {
			staticMappings: {
				mochaTest: 'grunt-mocha-test',
				sasslint: 'grunt-sass-lint'
			}
		}
	};

	loadGruntConfig(grunt, options);
}

module.exports = function (grunt) {
	initTimeGrunt(grunt);
	initLoadGruntConfig(grunt);
};
