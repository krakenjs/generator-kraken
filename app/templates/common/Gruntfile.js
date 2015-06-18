'use strict';


module.exports = function (grunt) {

    // Load the project's grunt tasks from a directory
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    <% if (templateModule === 'makara' && jsModule == 'browserify') { -%>
    grunt.loadNpmTasks('grunt-makara-browserify');
    <% } -%>

    <% if (templateModule === 'makara' && jsModule == 'requirejs') { -%>
    grunt.loadNpmTasks('grunt-makara-amdify');
    <% } -%>

    // Register group tasks
    grunt.registerTask('build', <%- JSON.stringify(tasks) %>);
    grunt.registerTask('test', [ 'jshint', 'mochacli' ]);

};
