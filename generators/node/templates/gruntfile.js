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
				express: 'grunt-express-server'
			}
		}
	};

	loadGruntConfig(grunt, options);
}

function quietGruntNewer(grunt) {
	const originalHeader = grunt.log.header;

	grunt.log.header = (message) => {
		// Only if the header does not start with newer or newer-postrun.
		if (!/newer(-postrun)?:/.test(message)) {
			originalHeader.apply(this, arguments);
		}
	}
}

module.exports = function (grunt) {
	initTimeGrunt(grunt);
	initLoadGruntConfig(grunt);
	quietGruntNewer(grunt);
};
