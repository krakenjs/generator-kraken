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


var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    krakenutil = require('../util'),
    prompts = require('./prompts');



var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    krakenutil.update();

    // Create the corresponding model and template as well
    this.hookFor('kraken:model', {
        args: args,
        options: {
            options: options
        }
    });

    this.hookFor('kraken:template', {
        args: args,
        options: {
            options: options
        }
    });

    // Handle errors politely
    this.on('error', function (err) {
        console.error(err.message);
        console.log(this.help());
        process.exit(1);
    });
};


util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.defaults = function defaults() {
    this.argument('name', { type: String, required: true });

    this.useJson = null;

    var parts = krakenutil.parsePath(this.name);
    krakenutil.extend(this, parts);
};


Generator.prototype.askFor = function askFor() {
    var userPrompts = prompts(this),
        next = this.async();

    this.prompt(userPrompts, function (props) {
        for (var key in props) {
            this[key] = props[key];
        }

        next();
    }.bind(this));
};


Generator.prototype.files = function files() {
    this.template('controller.js', path.join('controllers', this.fullpath + '.js'));
    this.template('test.js', path.join('test', this.fullpath + '.js'));
};
