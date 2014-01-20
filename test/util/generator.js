'use strict';


var path = require('path'),
    helpers = require('yeoman-generator').test;


module.exports = function generator(type, dependencies, args, prompt, done) {
    helpers.testDirectory(path.join(__dirname, '..', 'tmp'), function (err) {
        if (err) {
            return done(err);
        }

        var app = createGenerator('kraken:' + type, dependencies, args);

        helpers.mockPrompt(app, prompt);

        app.options['skip-install'] = true;
        app.run({}, done);
    });
};

/**
 * Mostly taken from yeoman-generator/lib/test/helpers.js
 * Used instead of the provided helpers.createGenerator so that we can have more control over the environment and better
 * simulate how `yo kraken` invokes the generators.
 */
function createGenerator(name, dependencies, args, options) {
    var env = require('yeoman-generator')();

    // alias any single namespace to `*:all` and `webapp` namespace specifically
    // to webapp:app.
    env.alias(/^([^:]+)$/, '$1:all');
    env.alias(/^([^:]+)$/, '$1:app');

    dependencies.forEach(function (d) {
        if (d instanceof Array) {
            env.registerStub(d[0], d[1]);
        } else {
            env.register(d);
        }
    });

    var generator = env.create(name, {arguments: args, options: options});

    generator.on('start', env.emit.bind(this, 'generators:start'));
    generator.on('start', env.emit.bind(this, name + ':start'));

    generator.on('method', function (method) {
        env.emit(name + ':' + method);
    });

    generator.on('end', env.emit.bind(this, name + ':end'));
    generator.on('end', env.emit.bind(this, 'generators:end'));

    return generator;
}

