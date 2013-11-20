/***@@@ BEGIN LICENSE @@@***/
/*───────────────────────────────────────────────────────────────────────────*\
│  Copyright (C) 2013 eBay Software Foundation                                │
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
/***@@@ END LICENSE @@@***/
/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('kraken generator', function () {
    var dependencies = [
        '../../app',
        '../../controller',
        '../../locale',
        '../../model',
        '../../page',
        '../../template'
    ];

    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'tmp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('kraken:app', dependencies);

            done();
        }.bind(this));
    });


    it('creates dot files', function (done) {
        var expected = [
            '.bowerrc',
            '.editorconfig',
            '.gitignore',
            '.jshintignore',
            '.jshintrc',
            '.nodemonignore'
        ];

        helpers.mockPrompt(this.app, {
            appName: 'Awesomeness',
            appDescription: 'Check out my new awesome app!',
            appAuthor: 'Me',
            requireJs: true
        });

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });


    it('creates project files', function (done) {
        var expected = [
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
            'public/js/config.js',
            'public/templates/index.dust',
            'public/templates/layouts/master.dust'
        ];

        helpers.mockPrompt(this.app, {
            appName: 'Awesomeness',
            appDescription: 'Check out my new awesome app!',
            appAuthor: 'Me',
            requireJs: true
        });

        this.app.options['skip-install'] = true;

        this.app.run({}, function () {
            helpers.assertFiles(expected);

            done();
        });
    });
});
