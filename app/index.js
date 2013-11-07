/***@@@ BEGIN LICENSE @@@***
Copyright (c) 2013, eBay Software Foundation All rights reserved.  Use of the accompanying software, in source and binary forms, is permitted without modification only and provided that the following conditions are met:  Use of source code must retain the above copyright notice, this list of conditions and the following disclaimer.  Use in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.  Neither the name of eBay or its subsidiaries nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.  All rights not expressly granted to the recipient in this license are reserved by the copyright holder.  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
***@@@ END LICENSE @@@***/
'use strict';


var util = require('util'),
    path = require('path'),
    crypto = require('crypto'),
    yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.hookFor('kraken:page', {
        args: ['index'].concat(args),
        options: {
            options: {
                json: false
            }
        }
    });

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
    this.secretHash = crypto.randomBytes(20).toString('hex');
};


util.inherits(Generator, yeoman.generators.Base);


Generator.prototype.askFor = function askFor() {
    var prompts = [],
        callback = this.async();

    // Config prompts
    prompts.push({
        name: 'appName',
        message: 'Application name'
    });

    prompts.push({
        name: 'appDescription',
        message: 'Description'
    });

    prompts.push({
        name: 'appAuthor',
        message: 'Author'
    });

    this.prompt(prompts, function (props) {
        this.appName = props.appName;
        this.appDescription = props.appDescription;
        this.appAuthor = props.appAuthor;

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
    this.copy('Gruntfile.js', 'Gruntfile.js');

    this.copy('public/css/app.less', 'public/css/app.less');

    this.copy('public/js/app.js', 'public/js/app.js');
    this.copy('public/js/config.js', 'public/js/config.js');
    this.copy('public/js/jshintignore', 'public/js/.jshintignore');
    this.copy('public/js/jshintrc', 'public/js/.jshintrc');
    this.copy('public/templates/layouts/master.dust', 'public/templates/layouts/master.dust');
};
