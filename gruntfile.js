﻿const path = require('path');

function initTimeGrunt(grunt) {
	const timeGrunt = require('time-grunt');
	timeGrunt(grunt);
}

function initLoadGruntConfig(grunt) {
	const loadGruntConfig = require('load-grunt-config');
	const options = {
		configPath: path.join(__dirname, 'configs/grunt'),
		jitGrunt: true
	};

	loadGruntConfig(grunt, options);
}

module.exports = function (grunt) {
	initTimeGrunt(grunt);
	initLoadGruntConfig(grunt);
}
