 /*────────────────────────-──────────────────────────────────────────────────*\
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


var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    krakenutil = require('../util');



var Generator = module.exports = function Generator(args, options) {
    yeoman.generators.Base.apply(this, arguments);

    krakenutil.banner();
    krakenutil.validate(options);
    krakenutil.update();

    // Generate the index files
    this.hookFor('kraken:controller', { args: [ 'index' ] });

    // Install all dependencies when completed
    // Emit an event when installed
    this.on('end', function () {
        this.installDependencies({
            skipMessage: true,
            skipInstall: options['skip-install'],
            callback: function () {
                this.emit(this.options.namespace + ':installDependencies');
            }.bind(this)
        });
    });
};


util.inherits(Generator, yeoman.generators.Base);


/**
 * Sets up defaults before the other methods run
 */
Generator.prototype.defaults = function defaults() {
     this.argument('appName', { type: String, required: false });
};


/**
 * Prompt the user for how to setup their project
 */
Generator.prototype.askFor = function askFor() {
    var prompts = require('./prompts')(this),
        next = this.async();

    this.prompt(prompts, function (props) {
        for (var key in props) {
            this[key] = props[key];
        }

        // TODO: Move these defaults to prompts for v1.0
        this.templateModule = 'dust';
        this.cssModule = 'less';
        this.taskModule = 'grunt';

        next();
    }.bind(this));
};


/**
 * Make the root directory for the app
 */
Generator.prototype.root = function root() {
    var appRoot = this.appRoot = path.join(this.destinationRoot(), this.appName);

    this.mkdir(appRoot);
    process.chdir(appRoot);
};


/**
 * Scaffold out the files
 */
Generator.prototype.files = function app() {
    // Boom!!1!
    this.directory('.', this.appRoot, function (body) {
        return this.engine(body, this);
    }.bind(this));
};


/**
 * Install bower components from prompts
 */
Generator.prototype.installBower = function installBower() {
    if (!this.options['skip-install-bower']) {
        var dependencies = this._dependencyResolver('bower');

        if (dependencies) {
            this.bowerInstall(dependencies, { save: true }, this.async());
        }
    }
};


/**
 * Install npm modules from prompts
 */
Generator.prototype.installNpm = function installNpm() {
    if (!this.options['skip-install-npm']) {
        var dependencies = this._dependencyResolver('npm');

        if (dependencies) {
            this.npmInstall(dependencies, { save: true }, this.async());
        }
    }
};


/**
 * Install npm dev modules from prompts
 */
Generator.prototype.installNpmDev = function installNpmDev() {
    if (!this.options['skip-install-npm']) {
        var dependencies = this._dependencyResolver('npmDev');

        if (dependencies) {
            this.npmInstall(dependencies, { saveDev: true }, this.async());
        }
    }
};


/**
 * Resolves named dependencies from the prompt options
 */
Generator.prototype._dependencyResolver = function dependencyResolver(type) {
    var dependencies = require('./dependencies'),
        result = [];

    [ this.templateModule, this.cssModule, this.jsModule, this.taskModule ].forEach(function (x) {
        var value = x && dependencies[x] && dependencies[x][type];

        if (value) {
            result.push(value.join(' '));
        }
    });

    return result.length ? result.join(' ') : false;
};
