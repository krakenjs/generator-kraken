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
    grunt.registerTask('build', [<%- tasks.map(function (task) {
        return "'" + task + "'";
    }).join(', '); %>]);

    grunt.registerTask('test', [ 'eslint', 'mochacli' ]);

    <% if (postInstallTasks.length > 0) { %>
        grunt.registerTask('postinstall', [<%- postInstallTasks.map(function (task) {
                return "'" + task + "'";
            }).join(', '); %>]);
    <% } -%>

};
