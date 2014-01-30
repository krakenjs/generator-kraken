'use strict';


module.exports = function (grunt) {

    grunt.initConfig({
        jshint: {
            files: ['controllers/**/*.js', 'lib/**/*.js', 'models/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },
        requirejs: {
            build: {
                options: {
                    baseUrl: 'public/js',
                    mainConfigFile: 'public/js/config.js',
                    dir: '.build/js',
                    optimize: 'uglify',
                    modules: [{name: 'app'}]
                }
            }
        },
        less: {
            build: {
                options: {
                    yuicompress: true,
                    paths: ['public/css']
                },
                files: {
                    '.build/css/app.css': 'public/css/app.less'
                }
            }
        },
        makara: {
            files: ['public/templates/**/*.dust'],
            options: {
                contentPath: ['locales/**/*.properties']
            }
        },
        dustjs: {
            build: {
                files: [
                    {
                        expand: true,
                        cwd: 'tmp/',
                        src: '**/*.dust',
                        dest: '.build/templates',
                        ext: '.js'
                    }
                ],
                options: {
                    fullname: function (filepath) {
                        var path = require('path'),
                            name = path.basename(filepath, '.dust'),
                            //Hardcoded to forwards slash on purpose. This is due to the way that grunt handles globbing.
                            //Patterns like **/*.dust are always expanded using '/' with no consideration to the host OS
                            //separator. This caused issues when trying to build on win_32
                            parts = filepath.split('/'),
                            fullname = parts.slice(3, -1).concat(name);

                        //Hardcoded to forwards slash on purpose. Keeps compatibility on win_32
                        return fullname.join('/');
                    }
                }
            }
        },
        copyto: {
            build: {
                files: [
                    { cwd: 'public', src: ['**/*'], dest: '.build/' }
                ],
                options: {
                    ignore: [
                        'public/css/**/*',
                        'public/js/**/*',
                        'public/templates/**/*'
                    ]
                }
            }
        },
        clean: {
            'tmp': 'tmp',
            'build': '.build/templates'
        },
        mochacli: {
            src: ['test/*.js'],
            options: {
                globals: ['chai'],
                timeout: 6000,
                ignoreLeaks: false,
                ui: 'bdd',
                reporter: 'spec'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    <% if (requireJs) { %>grunt.loadNpmTasks('grunt-contrib-requirejs'); <% } %>
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-dustjs');
    grunt.loadNpmTasks('grunt-copy-to');
    grunt.loadTasks('./node_modules/makara/tasks/');

    grunt.registerTask('i18n', ['clean', 'makara', 'dustjs', 'clean:tmp']);
    grunt.registerTask('build', ['jshint', 'less', <% if (requireJs) { %>'requirejs', <% } %> 'copyto', 'i18n']);
    grunt.registerTask('test', ['jshint', 'mochacli']);

};
