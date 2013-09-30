'use strict';


var util = require('util'),
    path = require('path'),
    crypto = require('crypto'),
    yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.hookFor('webcore:page', {
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
