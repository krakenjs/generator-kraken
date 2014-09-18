'use strict';


module.exports = function (grunt) {

    // Load the project's grunt tasks from a directory
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    // Register group tasks
    grunt.registerTask('build', [ 'jshint',<% if (cssModule) { %> '<%= cssModule %>',<% } %><% if (jsModule) { %> '<%= jsModule %>',<% } %><% if (i18n) { %> 'i18n',<% } else { if (templateModule) { %> '<%= templateModule %>',<% } } %> 'copyto' ]);
    grunt.registerTask('test', [ 'jshint', 'mochacli' ]);

};
