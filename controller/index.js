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
    var cwd = this.env.cwd,
        filePath = path.join(cwd, 'package.json'),
        packageTemplate = null;

    krakenutil.update();

    this.hasTemplates = (args[1]) ? true : (
        fs.existsSync(filePath) ? (
            function() {
                packageTemplate = require(filePath.replace('.json', ''))['generator-kraken'].template;
                return true;
            })() : false
    );

    if (packageTemplate) {
        args[1] = packageTemplate;
    }

    // Create the corresponding model and template as well
    this.hookFor('kraken:model', {
        args: args,
        options: {
            options: options
        }
    });

    //if there is a templateModule selected
    if(args[1]) {
        args.pop();
        this.hookFor('kraken:template', {
            args: args,
            options: {
                options: options
            }
        });
    }

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
    parts.modelPath = path.join(parts.root, 'models', parts.model);
    parts.specPath = path.join(parts.root, 'lib', 'spec');
    if (path.sep === '\\') {
        parts.modelPath = parts.modelPath.replace(/\\/g, '/');
        parts.specPath = parts.specPath.replace(/\\/g, '/');
    }
    krakenutil.extend(this, parts);
};


Generator.prototype.askFor = function askFor() {
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
};


Generator.prototype.files = function files() {
    this.template('controller.js', path.join('controllers', this.fullpath + '.js'));
    this.template('test.js', path.join('test', this.fullpath + '.js'));
};
