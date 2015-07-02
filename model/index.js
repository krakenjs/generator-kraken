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
    us = require('underscore.string'),
    krakenutil = require('../util');


module.exports = yeoman.generators.Base.extend({
    init: function () {
        krakenutil.update();
    },
    defaults: function defaults() {
        this.argument('name', { type: String, required: true });
    },
    files: function files() {
        this.fs.copyTpl(
            this.templatePath('model.js'),
            this.destinationPath(path.join('models', this.name + '.js')),
            {
                us: us,
                model: this.name,
                modelName: us.capitalize(us.classify(this.name)) + 'Model'
            }
        );
    }
});
