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


var path = require('path');
var yeoman = require('yeoman-generator');
var krakenutil = require('../util');
var debug = require('debuglog')('generator-kraken');

module.exports = yeoman.generators.Base.extend({
    init: function () {

        krakenutil.update();

        // Create the corresponding locale as well
        this.composeWith('kraken:locale', { args: this.args }, { link: 'strong' });
    },

    defaults: function defaults() {
        this.argument('name', { type: String, required: true });
    },


    files: function files() {
        debug("creating template '%s'", this.name);
        this.fs.copyTpl(
            this.templatePath(this.options.type === 'layout' ? 'layout.dust' : 'template.dust'),
            this.destinationPath(path.join('public', 'templates', this.name + '.dust'))
        );
    }
});
