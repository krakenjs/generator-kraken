'use strict';


module.exports = function makara(grunt) {
	// Load task
	grunt.loadTasks('./node_modules/makara/tasks/');

	// Options
	return {
	    files: ['public/templates/**/*.dust'],
	    options: {
	        contentPath: ['locales/**/*.properties']
	    }
	};
};
