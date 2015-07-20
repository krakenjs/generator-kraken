'use strict';


module.exports = function sass(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-sass');

    // Options
    return {
        build: {
            options: {
                outputStyle: 'compressed'
            },
            cwd: 'public/css',
            src: '**/*.scss',
            dest: '.build/css/',
            expand: true,
            ext: '.css'
        }
    };
};
