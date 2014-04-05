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
            files: [{
                expand: true,
                cwd: 'public/css',
                src: ['**/*.scss'],
                dest: '.build/css/',
                ext: '.css'
            }]
        }
	};
};
