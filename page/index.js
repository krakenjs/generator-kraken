'use strict';


var util = require('util'),
    yeoman = require('yeoman-generator');


var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.NamedBase.apply(this, arguments);

    this.hookFor('webcore:controller', {
        args: args,
        options: {
            options: options
        }
    });

    this.hookFor('webcore:model', {
        args: args,
        options: {
            options: options
        }
    });

    this.hookFor('webcore:template', {
        args: args,
        options: {
            options: options
        }
    });

    this.hookFor('webcore:locale', {
        args: args,
        options: {
            options: options
        }
    });
};


util.inherits(Generator, yeoman.generators.NamedBase);
