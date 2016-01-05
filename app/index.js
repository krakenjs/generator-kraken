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
   us = require('underscore.string');

krakenutil.update();

var debug = require('debuglog')('generator-kraken');

module.exports = yeoman.generators.Base.extend({
    initializing: function () {
        krakenutil.banner();
        // Read app name from CLI
        this.argument('name', { type: String, required: false });
    },

    prompting: {
        askAppNameEarly: function () {
            if (this.name) {
                return;
            }

            var next = this.async();

            // Handle setting the root early, so .yo-rc.json ends up the right place.
            this.prompt([{
                message: 'Name',
                name: 'name',
                validate: function (str) {
                    return !!str;
                }
            }], function (props) {
                this.name = props.name;
                next();
            }.bind(this));
        },

        setAppName: function () {
            var oldRoot = this.destinationRoot();
            if (path.basename(oldRoot) !== this.name) {
                this.destinationRoot(path.join(oldRoot, this.name));
            }
        },

        setDefaults: function () {
            // CLI option defaults
            var options = this.options || {};

            // This cannot be done at init time because we have to set our app name and root first.
            this.config.defaults({
                templateModule: options.templateModule,
                componentPackager: options.componentPackager,
                cssModule: options.cssModule,
                jsModule: options.jsModule,
                taskModule: options.taskModule,
                lintModule: options.lintModule,
                i18n: options.i18n
            });

            this.config.set('taskModule', 'grunt'); // There is no other option yet.
            this.config.set('lintModule', 'eslint'); // There is no other option.
        },

        askFor: function askFor() {
            var next = this.async();

            this.prompt(prompts, function (props) {
                for (var key in props) {
                    if (props[key] != null) {
                        this.config.set(key, props[key]);
                    }
                }

                next();
            }.bind(this));
        },

        addDependencies: function () {
            this.dependencies = [];
            var conf = this.config.getAll();
            for (var k in conf) {
                var value = conf[k];
                debug("adding dependency %j for '%s'", conf[k], k);
                if (value && dependencies[value]) {
                    this.dependencies.push(value);
                }
            }
            this.config.save();
        }
    },

    writing: {
        subGenerators: function subGenerators() {
            this.composeWith('kraken:controller', { args: [ 'index' ] }, { local: require.resolve('../controller') } );
            if (this.config.get('templateModule')) {
                this.composeWith('kraken:layout', { args: [ 'layouts/master' ] }, { local: require.resolve('../layout') });
            } else {
                debug("not generating layout");
            }
        },

        files: function app() {
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

            if (!deps) {
                return;
            }

            var gen = this;

            deps.forEach(function (glob) {
                var parts = glob.split('/');
                var firstWildcard = parts.map(function (e) {
                    return /[*]/.test(e);
                }).indexOf(true);

                debug("copying '%s' to '%s'", path.join('dependencies', glob), parts.slice(1, firstWildcard).join('/') || '.');
                // We assume that each glob given to us includes one path
                // element to strip off.
                gen.fs.copyTpl(
                    gen.templatePath(path.join('dependencies', glob)),
                    gen.destinationPath(parts.slice(1, firstWildcard).join('/') || '.'),
                    gen._getModel()
                );
            });
        }
    },

    install: {


        installNpm: function installNpm() {
            if (this.options['skip-install-npm']) {
                return;
            }

            var dependencies = this._dependencyResolver('npm');
            if (dependencies) {
                forEachDepPrefix.call(this, dependencies, function (deps, type) {
                    this.npmInstall(deps, { save: true, savePrefix: type });
                });
            }
        },

        installNpmDev: function installNpmDev() {
            if (this.options['skip-install-npm']) {
                return;
            }

            var dependencies = this._dependencyResolver('npmDev');

            if (dependencies) {
                forEachDepPrefix.call(this, dependencies, function (deps, type) {
                    this.npmInstall(deps, { saveDev: true, savePrefix: type });
                });
            }
        },
        deps: function() {
            if (this.options['skip-install']) {
                return;
            }
            this.installDependencies({
                skipMessage: true,
                bower: (this.config.get('componentPackager') !== 'bower') ? false : true,
                callback: function (err) {
                    var errString;
                    if (err) {
                        if (err.code === 'ENOENT') {
                            errString = err.code + ': ' + err.path;
                            if (err.path === 'bower') {
                                errString += ' - cannot locate ' + err.path + '.' +
                                    ' Have you installed it (' +
                                    'npm install --global ' + err.path + ')?';
                            }
                        } else {
                            errString = err.message || err;
                        }
                        this.log.error(errString);
                    }
                }.bind(this)
            });
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

    _getTasks: function getTasks() {
        if (!this.tasks) {
            this.tasks = ['eslint'];
            var add = this._dependencyResolver('tasks');
            if (add) {
                this.tasks = this.tasks.concat(add);
            }

            this.tasks.push('copyto');
        }
        return this.tasks;
    },
    _getPostInstallTasks: function getPostInstallTasks() {
        if (!this.postInstallTasks) {
            this.postInstallTasks = [];
            var add = this._dependencyResolver('postInstallTasks');
            if (add) {
                this.postInstallTasks = this.postInstallTasks.concat(add);
            }
        }
        return this.postInstallTasks;
    },
    _getModel: function getModel() {
        var model = {
            slugName: us.slugify(this.name),
            name: this.name,
            tasks: this._getTasks(),
            postInstallTasks: this._getPostInstallTasks()
        };

        var conf = this.config.getAll();
        for (var k in conf) {
            model[k] = conf[k];
        }

        return model;
    },

    /**
     * Resolves named dependencies from the prompt options
     */
    _dependencyResolver: function dependencyResolver(type) {
        debug("resolving dependencies of type '%s'", type);
        var result = [];
        var options = this.config.getAll();

        this.dependencies.forEach(function (x) {
            var value = x && dependencies[x] && dependencies[x][type];

            if (typeof value === 'function') {
                debug("function, looking up");
                value = value(options);
            }

            debug("resolving got %j for dependency '%s'", value, x);
            if (value) {
                result = result.concat(value);
            }
        });

        debug("resolved dependencies of type '%s' to %j", type, result);

        return result.length ? result : null;
    }

});

function forEachDepPrefix(dependencies, cb) {
   var work = {};
   dependencies.forEach(function (dep) {
       var char = dep.split('@')[1][0];
       if (char !== '^' && char !== '~') {
           char = '^';
       }

       work[char] = work[char] || [];
       work[char].push(dep);
   });

   for (var type in work) {
       cb.call(this, work[type], type);
   }
}
