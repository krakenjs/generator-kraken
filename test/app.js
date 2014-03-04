/*───────────────────────────────────────────────────────────────────────────*\
 │  Copyright (C) 2014 eBay Software Foundation                                │
 │                                                                             │
 │hh ,'""`.                                                                    │
 │  / _  _ \  Licensed under the Apache License, Version 2.0 (the "License");  │
 │  |(@)(@)|  you may not use this file except in compliance with the License. │
 │  )  __  (  You may obtain a copy of the License at                          │
 │ /,'))((`.\                                                                  │
 │(( ((  )) ))    http://www.apache.org/licenses/LICENSE-2.0                   │
 │ `\ `)(' /'                                                                  │
 │                                                                             │
 │   Unless required by applicable law or agreed to in writing, software       │
 │   distributed under the License is distributed on an "AS IS" BASIS,         │
 │   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  │
 │   See the License for the specific language governing permissions and       │
 │   limitations under the License.                                            │
 \*───────────────────────────────────────────────────────────────────────────*/
/*global describe, it*/

'use strict';


var runGenerator = require('./util/generator').runGenerator,
    BaseOptions = require('./util/generator').BaseOptions,
    fs = require('fs'),
    path = require('path'),
    assert = require('assert'),
    helpers = require('yeoman-generator').test,
    FULL_INSTALL_TIMEOUT = 120000;


describe('App', function () {

    it('creates dot files', function (done) {
        var options = new BaseOptions('app');
        runGenerator(options, function (err) {
            helpers.assertFile([
                '.bowerrc',
                '.editorconfig',
                '.gitignore',
                '.jshintignore',
                '.jshintrc',
                '.nodemonignore'
            ]);

            done(err);
        });

    });


    it('creates project files', function (done) {
        var options = new BaseOptions('app');
        runGenerator(options, function (err) {
            helpers.assertFile([
                'Gruntfile.js',
                'README.md',
                'bower.json',
                'index.js',
                'package.json',
                'config/app.json',
                'config/middleware.json',
                'controllers/index.js',
                'locales/US/en/index.properties',
                'models/index.js',
                'public/css/app.less',
                'public/js/app.js',
                'public/templates/index.dust',
                'public/templates/errors/404.dust',
                'public/templates/errors/500.dust',
                'public/templates/errors/503.dust',
                'public/templates/layouts/master.dust'
            ]);

            done(err);
        });
    });


    it('creates an app bootstrapped with RequireJS', function (done) {
        var options = new BaseOptions('app');
        options.prompt.requireJs = true;

        runGenerator(options, function (err) {
            helpers.assertFileContent([
                ['public/templates/layouts/master.dust', new RegExp(/require\.js/)],
                ['public/js/app.js', new RegExp(/require\(/)]
            ]);

            helpers.assertFile([
                'public/js/config.js'
            ]);

            done(err);
        });
    });


    it.skip('creates an application taking the name from the command line arguments', function (done) {

        var options = new BaseOptions('app'),
            customName = 'appNameFromCLI';

        options.args = [customName];
        options.prompt.appName = ''; //Simulates the user typing enter on an empty prompt.
        runGenerator(options, function (err) {

            //Make sure that the parameter does not pollute the other generators that take an argument
            //In this case, check that a locale `customName` was not created
            assert(!fs.existsSync(path.join(process.cwd(), 'locales', customName)), 'The arguments are polluting downstream generators');

            //Make sure that the CWD matches the newly created app.
            assert.strictEqual(customName, process.cwd().split(path.sep).slice(-1)[0], 'The application directory does not match the supplied argument');
            done(err);
        });

    });

    it('checks that a generated application passes all tests', function (done) {
        this.timeout(FULL_INSTALL_TIMEOUT);
        var options = new BaseOptions('app');
        options.skipInstall = false;
        options.prompt.requireJs = true;

        runGenerator(options, function (err) {

            if (err) {
                done(err);
            }
            //Launch `grunt build`
            var build = require('child_process').spawn('grunt', ['test']);
            build.on('close', function (code) {
                assert.strictEqual(code, 0, 'The generated project failed to `grunt test`');
                done();
            });
        });
    });

    it('checks that a generated application builds', function (done) {
        this.timeout(FULL_INSTALL_TIMEOUT);
        var options = new BaseOptions('app');
        options.skipInstall = false;
        options.prompt.requireJs = true;
        runGenerator(options, function (err) {

            if (err) {
                return done(err);
            }

            //Launch `grunt build`
            var build = require('child_process').spawn('grunt', ['build']);
            build.on('close', function (code) {
                assert.strictEqual(code, 0, 'The generated project failed to `grunt build`');
                done();
            });
        });
    });
});
