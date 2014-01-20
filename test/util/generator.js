'use strict';


var path = require('path'),
    helpers = require('yeoman-generator').test;

/**
 * Initializes and runs a given kraken: generator with the provided options.
 * @param options.type The name of the subGenerator to invoke. (Eg: controller -> kraken:controller)
 * @param options.dependencies Array of all subGenerators that may need to be invoked. (Eg: ['../../app', '../../controller', etc])
 * @param options.args Array, Any arguments that we want to pass via CLI like `yo kraken MyApp`. (Eg: ['MyApp'])
 * @param options.skipInstall Boolean, Should dependencies be installed after the generator is run.
 * @param options.prompt Object, Answers to the questions that the generator may ask. (eg: {appName:"MyApp", requireJS:true});
 * @param options.callback Function to invoke after the generator has run.
 */
module.exports.runGenerator = function runGenerator(options, done) {

    helpers.testDirectory(path.join(__dirname, '..', 'tmp'), function (err) {

        if (err) {
            return done(err);
        }

        //Try/catch block so that we can test against certain generator errors (eg: bad sub-generator names).
        try {
            var app = createGenerator('kraken:' + options.generator, options.dependencies, options.args);

            helpers.mockPrompt(app, options.prompt);

            app.options['skip-install'] = options.skipInstall;
            app.run({}, done);

        } catch (err2) {
            done(err2);
        }
    });
};

/**
 * Creates a set of options that can be used to initialize and run a generator.
 * @param generator The name of the generator.
 */
module.exports.BaseOptions = function BaseOptions(generator) {
    this.generator = generator;

    this.dependencies = [
        '../../app',
        '../../controller',
        '../../locale',
        '../../model',
        '../../page',
        '../../template'
    ];

    this.args = [];

    this.skipInstall = true;

    this.prompt = {
        appName: 'Awesomeness',
        appDescription: 'Check out my new awesome app!',
        appAuthor: 'Me',
        requireJs: false
    };
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

