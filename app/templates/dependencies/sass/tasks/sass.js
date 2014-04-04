'use strict';


module.exports = function less(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-sass');

	// Options
	return {
	    build: {
	        options: {
	            style: 'compressed'
	        },
	        files: {
	            '.build/css/app.css': 'public/css/app.scss'
	        }
	    }
	};
};
