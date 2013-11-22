'use strict';


var path = require('path'),
    helpers = require('yeoman-generator').test;


module.exports = function generator(type, dependencies, args, prompt, done) {
    helpers.testDirectory(path.join(__dirname, '..', 'tmp'), function (err) {
        if (err) {
            return done(err);
        }

        var app = helpers.createGenerator('kraken:' + type, dependencies, args);

        helpers.mockPrompt(app, prompt);

        app.options['skip-install'] = true;
        app.run({}, done);
    });
};
