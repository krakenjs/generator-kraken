'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);

    console.log(args);

    this.hookFor('webcore:controller', {
        args: args
    });

    this.hookFor('webcore:model', {
        args: args
    });

    this.hookFor('webcore:template', {
        args: args
    });
};


util.inherits(Generator, yeoman.generators.NamedBase);
