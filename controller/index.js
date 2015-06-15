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
    krakenutil = require('../util'),
    prompts = require('./prompts'),
    us = require('underscore.string'),
    fs = require('fs');


module.exports = yeoman.generators.Base.extend({
    init: function () {
        var filePath = this.destinationPath('package.json');

        krakenutil.update();

        this.hasTemplates = this.options.templateModule || hasTemplates(filePath);

        // Create the corresponding model and template as well
        this.composeWith('kraken:model', { args: this.args }, { link: 'strong' });

        //if there is a templateModule selected
        if(this.hasTemplates) {
            this.composeWith('kraken:template', { args: this.args }, { link: 'strong' });
        }

        this.argument('name', { type: String, required: true });

        this.useJson = null;

        var parts = krakenutil.parsePath(this.name);
        parts.modelPath = path.join(parts.root, 'models', parts.model);
        parts.specPath = path.join(parts.root, 'lib', 'spec');
        if (path.sep === '\\') {
            parts.modelPath = parts.modelPath.replace(/\\/g, '/');
            parts.specPath = parts.specPath.replace(/\\/g, '/');
        }
        krakenutil.extend(this, parts);
    },

    prompting: {
        askFor: function () {
            var userPrompts = prompts(this),
                next = this.async();

            if (userPrompts[0].when()) {
                this.prompt(userPrompts, function(props) {
                    for (var key in props) {
                        this[key] = props[key];
                    }

                    next();
                }.bind(this));
            } else {
                next();
            }
        }
    },

    writing: {
        files: function files() {
            this.fs.copyTpl(
                this.templatePath('controller.js'),
                this.destinationPath(path.join('controllers', this.fullpath + '.js')),
                {
                    model: this.model,
                    us: us,
                    hasTemplates: this.hasTemplates,
                    useJson: this.useJson,
                    fullname: this.fullname,
                    modelPath: this.modelPath,
                    route: this.route
                }
            );
            this.fs.copyTpl(
                this.templatePath('test.js'),
                this.destinationPath(path.join('test', this.fullpath + '.js')),
                {
                    hasTemplates: this.hasTemplates,
                    fullroute: this.fullroute
                }
            );
        }
    }
});


function hasTemplates(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf-8'))['generator-kraken'].template;
    } catch (e) {
        return null;
    }
}
