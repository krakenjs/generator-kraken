'use strict';


var path = require('path'),
    helpers = require('yeoman-generator').test;


/**
 * Runs a generator
 */
module.exports = function run(config, done) {
    var dir = path.join(__dirname, '..', '..', 'tmp');

    helpers.testDirectory(dir, function (err) {
        var app;

        if (err) {
            return done(err);
        }

        app = helpers.createGenerator(config.type, config.dependencies, config.args, config.options);
        helpers.mockPrompt(app, config.prompt);

        app.run({}, function (err) {
            if (app.options['skip-install']) {
                done(err, app);
            } else {
                app.once('npmInstall:end', function () {
                    done(err, app);
                });
            }
        });
    });
};
