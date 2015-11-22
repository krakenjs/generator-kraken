'use strict';

module.exports = function eslint(grunt) {
    // Load task
    grunt.loadNpmTasks('gruntify-eslint');

    // Options
    return {
        options: {
            config: '.eslintrc',
            rulesdir: ['node_modules/eslint/lib/rules']
        },
        src: ['index.js',
            'server.js',
            'controllers/**/*.js',
            'lib/**/*.js',
            'models/**/*.js'
        ]
    };
};
