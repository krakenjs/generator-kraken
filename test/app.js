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


var generator = require('./util/generator'),
    helpers = require('yeoman-generator').test;


describe('App', function () {
    var dependencies = [
        '../../app',
        '../../controller',
        '../../locale',
        '../../model',
        '../../page',
        '../../template'
    ];

    var prompt = {
        appName: 'Awesomeness',
        appDescription: 'Check out my new awesome app!',
        appAuthor: 'Me',
        requireJs: true
    };


    it('creates dot files', function (done) {
        generator('app', dependencies, [], prompt, function () {
            helpers.assertFiles([
                '.bowerrc',
                '.editorconfig',
                '.gitignore',
                '.jshintignore',
                '.jshintrc',
                '.nodemonignore'
            ]);

            done();
        });
    });


    it('creates project files', function (done) {
        generator('app', dependencies, [], prompt, function () {
            helpers.assertFiles([
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
            ]);

            done();
        });
    });
});
