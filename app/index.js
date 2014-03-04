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
    crypto = require('crypto'),
    yeoman = require('yeoman-generator'),
    kraken = require('../lib/kraken'),
    update = require('../lib/update'),
    async = require('async');


function validate(options) {
    var options = options || {},
        ns = options.namespace && options.namespace.split(':');

    // Ensure `yo kraken` was called with a valid subgenerator
    if (ns.length > 1 && ns[1] !== 'app') {
        options.namespace = ns[0];

        console.error('Error: Invalid sub-generator', ns[1]);
        console.error(this.help());

        process.exit(1);
    }
}


var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    validate(options);

    kraken.banner();
    update.check();

    // Generate the index files
    this.hookFor('kraken:page', {
        args: [ 'index' ]
    });

    this.on('end', function () {
        this.installDependencies({
            skipInstall: options['skip-install'],
            callback: function () {}
        });
    });
};


util.inherits(Generator, yeoman.generators.Base);


Generator.prototype.askFor = function askFor() {
    var prompts = require('./prompts'),
        next = this.async();

    this.bowerDependencies = [];
    this.npmDependencies = [];

    // Prompt user
    this.prompt(prompts, function (props) {
        this.props = {};

        for (var key in props) {
            // Stringify'ing the inputs for quotes
            this.props[key] = JSON.stringify(props[key]);
        }
        next();
    }.bind(this));
};


Generator.prototype.files = function app() {
    // Create the base directory
    var appRoot = path.join(this.destinationRoot(), JSON.parse(this.props.appName));

    this.mkdir(appRoot);
    process.chdir(appRoot);

    // Boom!
    this.directory('.', appRoot, function (body) {
        return this.engine(body, this);
    }.bind(this));
};

