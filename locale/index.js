'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);

    this.country = args[1].toUpperCase() || 'US';
    this.lang = args[2].toLowerCase() || 'en';
};


util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.files = function files() {
    this.template('index.properties', path.join('locales', this.country, this.lang, this.name + '.properties'));
};
