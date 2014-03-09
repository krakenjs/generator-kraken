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


 function filter(props, key) {
     var dependencies = require('./dependencies');

     return [ props.template, props.css, props.js ].filter(function (x) {
         return x && dependencies[x] && dependencies[x][key];
     });
 }


var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    krakenutil.banner();
    krakenutil.validate(options);
    krakenutil.update();

    // Generate the index files
    this.hookFor('kraken:page', {
        args: [ 'index' ]
    });

    this.on('end', function () {
        var that = this;

        this.installDependencies({
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
        this.props = {};

        for (var key in props) {
            // FIXME: Solve for inputs with quotes
            this.props[key] = props[key];
        }

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
Generator.prototype.bower = function bower() {
    var dependencies = filter(this.props, 'bower');

    if (dependencies.length) {
        var next = this.async();
        this.bowerInstall(dependencies, { save: true }, next);
    }
};


 /**
  * Install npm components from prompts
  */
Generator.prototype.npm = function npm() {
    var dependencies = filter(this.props, 'npm');

    if (dependencies.length) {
        var next = this.async();
        this.npmInstall(dependencies, { save: true }, next);
    }
};
