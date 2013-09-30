'use strict';


var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);
};


util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.files = function files() {
    this.template('_model.js', path.join('models', this.name + '.js'));
};
