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



var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    krakenutil.banner();
    krakenutil.validate(options);
    krakenutil.update();

    // Generate the index files
    this.hookFor('kraken:controller', { args: [ 'index' ] });

    // Install all dependencies when completed
    this.on('end', function () {
        var that = this;

        this.installDependencies({
            skipMessage: true,
            skipInstall: options['skip-install'],
            callback: function () {
                that.emit('dependencies:installed');
            }
        });
    });
};


util.inherits(Generator, yeoman.generators.Base);


 /**
  * Prompt the user for how to setup their project
  */
Generator.prototype.askFor = function askFor() {
    var prompts = require('./prompts'),
        next = this.async();

    this.prompt(prompts, function (props) {
        this.props = props;

        // TODO: Move defaults to prompts
        this.props.template = 'dust';
        this.props.css = 'less';
        this.props.task = 'grunt';

        next();
    }.bind(this));
};


 /**
  * Make the root directory for the app
  */
Generator.prototype.appRoot = function appRoot() {
    var appRoot = this.appRoot = path.join(this.destinationRoot(), this.props.appName);

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
    var dependencies = this._dependencyResolver('bower');

    if (dependencies) {
        this.bowerInstall(dependencies, { save: true }, this.async());
    }
};


 /**
  * Install npm modules from prompts
  */
Generator.prototype.installNpm = function installNpm() {
    var dependencies = this._dependencyResolver('npm');

    if (dependencies) {
        this.npmInstall(dependencies, { save: true }, this.async());
    }
};


 /**
  * Install npm dev modules from prompts
  */
Generator.prototype.installNpmDev = function installNpmDev() {
    var dependencies = this._dependencyResolver('npmDev');

    if (dependencies) {
        this.npmInstall(dependencies, { saveDev: true }, this.async());
    }
};


 /**
  * Resolves named dependencies from the prompt options
  */
Generator.prototype._dependencyResolver = function dependencyResolver(type) {
    var dependencies = require('./dependencies'),
        props = this.props,
        result = [];

    [ props.template, props.css, props.js, props.task ].forEach(function (x) {
        var value = x && dependencies[x] && dependencies[x][type];

        if (value) {
            result.push(value.join(' '));
        }
    });

    return result.length ? result.join(' ') : false;
}