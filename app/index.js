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


var Generator = module.exports = function Generator(args, options, config) {
    var namespace;

    yeoman.generators.Base.apply(this, arguments);

    // Abort on invalid sub-generators rather than running default
    namespace = options.namespace.split(':');

    if (namespace.length > 1 && namespace[1] !== 'app') {
        options.namespace = namespace[0];

        console.log('Error: Invalid sub-generator', namespace[1]);
        console.log(this.help());

        process.exit(1);
    }

    // Take the first argument as the application name
    this.argument('appName', {
        type: String,
        required: false,
        optional: true,
        desc: 'Name for your application',
        banner: 'This optional parameter gives a name to your application. It will be created under a directory by the same name'
    });

    // Don't pollute downstream generators
    if (this.appName) {
        args.shift();
    }

    kraken.banner();
    update.check();

    this.hookFor('kraken:page', {
        args: ['index'].concat(args),
        options: {
            options: {
                json: false
            }
        }
    });

    this.on('end', function () {
        var that = this;

        this.installDependencies({
            skipInstall: options['skip-install'],
            callback: function () {

                async.parallel([
                    function (next) {
                        that.bowerInstall(that.bowerDependencies, { save: true }, next);
                    },
                    function (next) {
                        that.npmInstall(that.npmDependencies, { saveDev: true}, next);
                    }
                ],
                    function () {
                        that.emit('dependencies-installed');
                    });
            }
        });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    this.bowerDependencies = [];
    this.npmDependencies = [];
    this.secretHash = crypto.randomBytes(20).toString('hex');
};


util.inherits(Generator, yeoman.generators.Base);


Generator.prototype.askFor = function askFor() {
    var prompts = [],
        callback = this.async();

    // Config prompts
    prompts.push({
        name: 'appName',
        message: 'Application name',
        default: this.appName || ''
    });

    prompts.push({
        name: 'appDescription',
        message: 'Description'
    });

    prompts.push({
        name: 'appAuthor',
        message: 'Author'
    });

    prompts.push({
        type: 'confirm',
        name: 'requireJs',
        message: 'Use RequireJS?',
        default: true
    });

    this.prompt(prompts, function (props) {
        this.appName = props.appName || this.appName;
        this.appDescription = JSON.stringify(props.appDescription);
        this.appAuthor = JSON.stringify(props.appAuthor);

        if ((this.requireJs = props.requireJs)) {
            this.bowerDependencies.push('requirejs');
            this.npmDependencies.push('grunt-contrib-requirejs');
        }

        callback();
    }.bind(this));
};

Generator.prototype.app = function app() {
    var appName = this.appName;

    this.mkdir(appName);
    process.chdir(appName);

    // Base directory structure
    this.mkdir('config');
    this.mkdir('controllers');
    this.mkdir('lib');
    this.mkdir('models');
    this.mkdir('public/css');
    this.mkdir('public/js');
    this.mkdir('public/templates');

    // Template files
    this.template('_README.md', 'README.md');
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('config/_app.json', 'config/app.json');
    this.template('config/_middleware.json', 'config/middleware.json');

};

Generator.prototype.projectfiles = function projectfiles() {
    this.copy('index.js', 'index.js');
    this.copy('gitignore', '.gitignore');
    this.copy('nodemonignore', '.nodemonignore');
    this.copy('jshintignore', '.jshintignore');
    this.copy('jshintrc', '.jshintrc');
    this.copy('editorconfig', '.editorconfig');
    this.copy('bowerrc', '.bowerrc');
    this.copy('Gruntfile.js', 'Gruntfile.js');

    this.copy('public/css/app.less', 'public/css/app.less');
    this.template('public/js/_app.js', 'public/js/app.js');

    if (this.requireJs) {
        this.copy('public/js/config.js', 'public/js/config.js');
    }

    this.copy('public/js/jshintignore', 'public/js/.jshintignore');
    this.copy('public/js/jshintrc', 'public/js/.jshintrc');

    this.template('public/templates/layouts/_master.dust', 'public/templates/layouts/master.dust');
    this.template('public/templates/errors/_404.dust', 'public/templates/errors/404.dust');
    this.template('public/templates/errors/_500.dust', 'public/templates/errors/500.dust');
    this.template('public/templates/errors/_503.dust', 'public/templates/errors/503.dust');
    this.copy('content/404.properties', 'locales/US/en/errors/404.properties');
    this.copy('content/500.properties', 'locales/US/en/errors/500.properties');
    this.copy('content/503.properties', 'locales/US/en/errors/503.properties');
};
