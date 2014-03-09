'use strict';


module.exports = function copyto(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-copy-to');

	// Options
	return {
	    build: {
	        files: [
	            { cwd: 'public', src: ['**/*'], dest: '.build/' }
	        ],
	        options: {
	            ignore: [
	                <% if (props.css != '') { %>'public/css/**/*',<% } %>
                    <% if (props.js != '') { %>'public/js/**/*',<% } %>
	                'public/templates/**/*'
	            ]
	        }
	    }
	};
};
