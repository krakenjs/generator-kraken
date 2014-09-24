'use strict';


module.exports = function clean(grunt) {
    // Load task
    grunt.registerTask('i18n', [ 'clean', 'localizr', <% if (templateModule) { %>'<%= templateModule %>', <% } %>'clean:tmp' ]);

    // Options
    return {};
};
