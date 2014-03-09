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
    krakenutil = require('../util');


var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);

    krakenutil.update();

    // Automatically create a module and template for a controller
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

    // Defaults
    this.props = {
        json: false
    };
};


util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.askFor = function askFor() {
    var prompts = [],
        callback = this.async();

    // Don't prompt for the index page
    if (this.name !== 'index') {
        prompts.push({
            name: 'json',
            type: 'confirm',
            message: 'Respond to JSON requests?'
        });
    }

    this.prompt(prompts, function (props) {
        this.props = props;
        callback();
    }.bind(this));
};


Generator.prototype.files = function files() {
    this.template('controller.js', path.join('controllers', this.name + '.js'));
    this.template('test.js', path.join('test', this.name + '.js'));
};
