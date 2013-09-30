'use strict';


var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);

    this.auth = options.auth;
    this.json = options.json;
};


util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.askFor = function askFor() {
    var prompts = [],
        callback = this.async();

//    if (typeof this.auth === 'undefined') {
//        prompts.push({
//            name: 'auth',
//            type: 'confirm',
//            message: 'Requires authentication?'
//        });
//    }

    if (typeof this.json === 'undefined') {
        prompts.push({
            name: 'json',
            type: 'confirm',
            message: 'Respond to JSON requests?'
        });
    }

    this.prompt(prompts, function (props) {
        for (var key in props) {
            this[key] = props[key];
        }

        callback();
    }.bind(this));
};


Generator.prototype.files = function files() {
    this.template('_controller.js', path.join('controllers', this.name + '.js'));
};
