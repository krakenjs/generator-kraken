 /*───────────────────────────────────────────────────────────────────────────*\
 │  Copyright (C) 2014 eBay Software Foundation                                │
 │                                                                             │
 │hh ,'""`.                                                                    │
 │  / _  _ \  Licensed under the Apache License, Version 2.0 (the "License");  │
 │  |(@)(@)|  you may not use this file except in compliance with the License. │
 │  )  __  (  You may obtain a copy of the License at                          │
 │ /,'))((`.\                                                                  │
 │(( ((  )) ))    http://www.apache.org/licenses/LICENSE-2.0                   │
 │ `\ `)(' /'                                                                  │
 │                                                                             │
 │   Unless required by applicable law or agreed to in writing, software       │
 │   distributed under the License is distributed on an "AS IS" BASIS,         │
 │   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
 │   See the License for the specific language governing permissions and       │
 │   limitations under the License.                                            │
 \*───────────────────────────────────────────────────────────────────────────*/
'use strict';


var path = require('path'),
    yeoman = require('yeoman-generator'),
    prompts = require('./prompts'),
    dependencies = require('./dependencies'),
    krakenutil = require('../util'),
    pkg = require('../package.json'),
    us = require('underscore.string');

var debug = require('debuglog')('generator-kraken');

module.exports = yeoman.generators.Base.extend({
    init: function () {
        krakenutil.banner();
        krakenutil.update();

        this.dependencies = [];
        this.pkg = pkg;

        // CLI option defaults
        var options = this.options || {};

        this._addDependency('templateModule', options.templateModule);
        this._addDependency('componentPackager', options.componentPackager);
        this._addDependency('cssModule', options.cssModule);
        this._addDependency('jsModule', options.jsModule);
        this._addDependency('taskModule', options.taskModule || 'grunt');
        this._addDependency('i18n', options.i18n);

        // CLI args
        this.argument('appName', { type: String, required: false });
    },

    prompting: {
        askFor: function askFor() {
            var userPrompts = prompts(this);
            var next = this.async();

            this.prompt(userPrompts, function (props) {

                for (var key in props) {
                    this._addDependency(key, props[key]);
                }

                next();

            }.bind(this));
        }
    },

    writing: {
        setRoot: function () {
            var oldRoot = this.destinationRoot();
            if (path.basename(oldRoot) !== this.appName) {
                this.destinationRoot(path.join(oldRoot, this.appName));
            }
        },

        subGenerators: function subGenerators() {
            this.composeWith('kraken:controller', { args: [ 'index' ], options: { templateModule: this.templateModule } }, { link: 'strong' });
        },

        /**
         * Scaffold out the files
         */
        files: function app() {
            // Boom!!1! Copy over common files
            this.fs.copyTpl(
                this.templatePath('common/**'),
                this.destinationPath(),
                this._getModel()
            );

            this.fs.copyTpl(
                this.templatePath('common/.*'),
                this.destinationPath(),
                this._getModel()
            );

            var deps = this._dependencyResolver('templates');

            var gen = this;

            deps.forEach(function (name) {
                gen.fs.copyTpl(
                    gen.templatePath(path.join('dependencies', name, '**')),
                    gen.destinationPath(),
                    gen._getModel()
                );
                gen.fs.copyTpl(
                    gen.templatePath(path.join('dependencies', name, '.*')),
                    gen.destinationPath()
                );
            });

        }
    },

    install: {
        deps: function() {
            if (this.options['skip-install']) {
                return;
            }
            this.installDependencies({
                skipMessage: true
            });
        },

        installNpm: function installNpm() {
            if (this.options['skip-install-npm']) {
                return;
            }

            var dependencies = this._dependencyResolver('npm');
            if (dependencies) {
                this.npmInstall(dependencies, { save: true });
            }
        },

        installNpmDev: function installNpmDev() {
            if (this.options['skip-install-npm']) {
                return;
            }

            var dependencies = this._dependencyResolver('npmDev');

            if (dependencies) {
                this.npmInstall(dependencies, { saveDev: true });
            }
        },

        installBower: function installBower() {
            if (this.options['skip-install-bower']) {
                return;
            }

            var dependencies = this._dependencyResolver('bower');

            if (dependencies) {
                this.bowerInstall(dependencies, { save: true });
            }
        }
    },

    _getModel: function getModel() {
        var tasks = ['jshint'];
        if (this.cssModule) {
            tasks.push(this.cssModule);
        }
        if (this.jsModule) {
            tasks.push(this.jsModule);
        }
        if (this.i18n) {
            tasks.push('i18n');
        } else if (this.templateModule) {
            tasks.push(this.templateModule);
        }
        tasks.push('copyto');

        return {
            us: us,
            i18n: this.i18n,
            appName: this.appName,
            appDescription: this.appDescription,
            templateModule: this.templateModule,
            appAuthor: this.appAuthor,
            pkg: this.pkg,
            jsModule: this.jsModule,
            cssModule: this.cssModule,
            taskModule: this.taskModule,
            tasks: tasks
        };
    },

    /**
     * Adds a dependency
     */
    _addDependency: function addDependency(key, value) {

        debug("setting '%s' to %j", key, value);

        this[key] = value;

        if (value && dependencies[value]) {
            this.dependencies.push(value);
        }
    },


    /**
     * Resolves named dependencies from the prompt options
     */
    _dependencyResolver: function dependencyResolver(type) {
        debug("resolving dependencies of type '%s'", type);
        var result = [];

        this.dependencies.forEach(function (x) {
            var value = x && dependencies[x] && dependencies[x][type];

            if (value) {
                debug("resolving got %j for dependency '%s'", value, x);
                result = result.concat(value);
            }
        });

        return result.length ? result : false;
    }

});





