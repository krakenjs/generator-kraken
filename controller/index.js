/*───────────────────────────────────────────────────────────────────────────*\
 │  Copyright (C) 2013 eBay, Inc.                                              │
 │                                                                             │
 │   ,'""`.                                                                    │
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
    yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);

    this.auth = options.auth;
    this.json = options.json;
};


util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.askFor = function askFor() {
    var prompts = [],
        callback = this.async();

//    if (typeof this.auth === 'undefined') {
//        prompts.push({
//            name: 'auth',
//            type: 'confirm',
//            message: 'Requires authentication?'
//        });
//    }

    if (typeof this.json === 'undefined') {
        prompts.push({
            name: 'json',
            type: 'confirm',
            message: 'Respond to JSON requests?'
        });
    }

    this.prompt(prompts, function (props) {
        for (var key in props) {
            this[key] = props[key];
        }

        callback();
    }.bind(this));
};


Generator.prototype.files = function files() {
    this.template('_controller.js', path.join('controllers', this.name + '.js'));
};
