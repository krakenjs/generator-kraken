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
    us = require('underscore.string');

krakenutil.update();

module.exports = yeoman.generators.NamedBase.extend({
    defaults: function () {
        this.config.defaults({
            templateModule: this.options.templateModule || null,
            i18n: this.options.i18n || null,
            useJson: this.options.useJson || null
        });
    },

    init: function () {
        this.modelName = path.basename(this.name);
        this.controllerPath = path.join('controllers', this.name + '.js');
        this.testPath = path.join('test', this.name + '.js');

        // Create the corresponding model and template as well
        this.composeWith('kraken:model', { args: [ this.modelName ] }, { local: require.resolve('../model') } );

        if (this.config.get('templateModule')) {
            this.composeWith('kraken:template', { args: this.args }, { local: require.resolve('../template') } );
        }
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
            var model = this._getModel();
            this.fs.copyTpl(
                this.templatePath('controller.js'),
                this.destinationPath(this.controllerPath),
                model
            );
            this.fs.copyTpl(
                this.templatePath('test.js'),
                this.destinationPath(this.testPath),
                model
            );
        }
    },

    _getModel: function () {
        var model = {
            name: this.name,
            route: routify(this.name),
            model: this.modelName.replace(/\\/g, '/'),
            modelName: us.capitalize(us.classify(this.modelName)) + 'Model',
            modelPath: path.relative(path.dirname(this.controllerPath), path.join('models', this.modelName)).replace(/\\/g, '/')
        };

        var conf = this.config.getAll();
        for (var k in conf) {
            model[k] = conf[k];
        }

        return model;
    }
});

function routify(name) {
    name = '/' + name;
    if (path.basename(name) === 'index') {
        return path.dirname(name);
    } else {
        return name;
    }
}
