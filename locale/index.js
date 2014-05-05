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
    yeoman.generators.Base.apply(this, arguments);

    krakenutil.update();

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
    this.argument('country', { type: String, required: false, defaults: 'US' });
    this.argument('language', { type: String, required: false, defaults: 'en' });

    var parts = krakenutil.parsePath(this.name);
    krakenutil.extend(this, parts);
};


Generator.prototype.files = function files() {
    var filepath = path.join('locales', this.country.toUpperCase(), this.language.toLowerCase(), this.fullpath + '.properties');

    this.template('index.properties', filepath);
};
