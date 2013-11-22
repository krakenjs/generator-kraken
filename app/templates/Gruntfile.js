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
            compile: {
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
            compile: {
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
            compile: {
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
                            parts = filepath.split(path.sep),
                            fullname = parts.slice(3, -1).concat(name);

                        return fullname.join(path.sep);
                    }
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
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');
    grunt.loadNpmTasks('grunt-dustjs');
    grunt.loadTasks('./node_modules/makara/tasks/');

    grunt.registerTask('i18n', ['clean', 'makara', 'dustjs', 'clean:tmp']);
    grunt.registerTask('build', ['jshint', 'less', 'requirejs', 'i18n']);
    grunt.registerTask('test', ['jshint', 'mochacli', 'clean:tmp']);

};
