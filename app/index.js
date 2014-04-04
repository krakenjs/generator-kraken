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


var fs = require('fs'),
    util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    prompts = require('./prompts'),
    dependencies = require('./dependencies'),
    krakenutil = require('../util'),
    proto;


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
proto = Generator.prototype;


/**
 * Sets up defaults before the other methods run
 */
proto.defaults = function defaults() {
    this.argument('appName', { type: String, required: false });

    this.dependencies = [];

    // TODO: Move these defaults to prompts for v1.0
    this.templateModule = 'dustjs';
    this.cssModule = 'less';
    this.taskModule = 'grunt';
    this.i18n = true;
    this.specialization = true;

    this.dependencies.push(this.templateModule, this.cssModule, this.taskModule);
};


/**
 * Prompt the user for how to setup their project
 */
proto.askFor = function askFor() {
    var userPrompts = prompts(this),
        next = this.async();

    this.prompt(userPrompts, function (props) {
        var dependency, prop;

        for (var key in props) {
            prop = props[key];
            dependency = key.split('dependency:')[1];

            if (dependency) {
                this.dependencies.push(prop);
                this[dependency] = prop;
            } else {
                this[key] = prop;
            }
        }

        next();
    }.bind(this));
};


/**
 * Make the root directory for the app
 */
proto.root = function root() {
    var appRoot = this.appRoot = path.join(this.destinationRoot(), this.appName);

    this.mkdir(appRoot);
    process.chdir(appRoot);
};


/**
 * Scaffold out the files
 */
proto.files = function app() {
    // Boom!!1! Copy over common files
    this.directory('./common', this.appRoot, function (body) {
        return this.engine(body, this);
    }.bind(this));

    // Copy over dependency tasks
    this.dependencies.forEach(function (dependency) {
        this._dependencyCopier(dependency);
    }.bind(this));

    // Copy over misc
    if (this.i18n) {
        this._dependencyCopier('i18n');
        this._dependencyCopier('localizr');
    }
};


/**
 * Add meta information
 */
proto.meta = function meta() {

};


/**
 * Install bower components from prompts
 */
proto.installBower = function installBower() {
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
proto.installNpm = function installNpm() {
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
proto.installNpmDev = function installNpmDev() {
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
proto._dependencyResolver = function dependencyResolver(type) {
    var result = [];

    this.dependencies.forEach(function (x) {
        var value = x && dependencies[x] && dependencies[x][type];

        if (value) {
            result.push(value.join(' '));
        }
    });

    return result.length ? result.join(' ') : false;
};


/**
 * Copies a task over for a give dependency
 */
proto._dependencyCopier = function dependencyCopier(name) {
    var file = path.join(__dirname, 'templates', 'tasks', name + '.js');
    
    if (fs.existsSync(file)) {
        this.template(file, path.join(this.appRoot, 'tasks', name + '.js'));
    }
};
