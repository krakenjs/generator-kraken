'use strict';


var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options, config) {
    var country = args[1] || 'US',
        lang = args[2] || 'en';

    yeoman.generators.NamedBase.apply(this, arguments);

    this.country = country.toUpperCase();
    this.lang = lang.toLowerCase();
};


util.inherits(Generator, yeoman.generators.NamedBase);


Generator.prototype.files = function files() {
    this.template('index.properties', path.join('locales', this.country, this.lang, this.name + '.properties'));
};
