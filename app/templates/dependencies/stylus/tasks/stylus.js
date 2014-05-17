'use strict';


module.exports = function stylus(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-contrib-stylus');

	// Options
	return {
	    build: {
	        options: {
	            compress: true
	        },
            files: [{
                expand: true,
                cwd: 'public/css',
                src: ['**/*.styl'],
                dest: '.build/css/',
                ext: '.css'
            }]
	    }
	};
};
