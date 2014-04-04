'use strict';


module.exports = function less(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-contrib-stylus');

	// Options
	return {
	    build: {
	        options: {
	            compress: true
	        },
	        files: {
	            '.build/css/app.css': 'public/css/app.styl'
	        }
	    }
	};
};
