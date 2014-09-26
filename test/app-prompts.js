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


var helpers = require('yeoman-generator').test,
    testutil = require('./util');


describe('kraken:app', function () {

    // Disable timeout since we're doing multiple installs
    this.timeout(Infinity);

    it('creates an app which uses dust', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['dependency:templateModule'] = 'dustjs';
        base.prompt['dependency:cssModule'] = 'less';
        base.prompt['i18n'] = false;
        base.prompt['dependency:jsModule'] = false;

        testutil.run(base, function (err) {
            helpers.assertFile([
                'public/templates/index.dust',
                'public/templates/layouts/master.dust',
                'public/templates/errors/404.dust',
                'public/templates/errors/500.dust',
                'public/templates/errors/503.dust',
                'public/components/dustjs-linkedin/',
                'public/components/dustjs-linkedin-helpers/',
                'tasks/dustjs.js'
            ]);

            helpers.assertFileContent([
                ['package.json', new RegExp(/\"dustjs-linkedin\"\:/)],
                ['package.json', new RegExp(/\"dustjs-helpers\"\:/)],
                ['package.json', new RegExp(/\"engine-munger\"\:/)],
                ['package.json', new RegExp(/\"grunt-dustjs\"\:/)],
                ['Gruntfile.js', new RegExp(/'dustjs'/)],
                ['public/templates/layouts/master.dust', new RegExp(/(app\.css)/) ]
            ]);

            done(err);
        });
    });


    it('creates an app which uses i18n', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['dependency:templateModule'] = false;
        base.prompt['i18n'] = true;
        base.prompt['dependency:jsModule'] = false;

        testutil.run(base, function (err) {
            helpers.assertFile([
                'locales/US/en/errors/404.properties',
                'locales/US/en/errors/500.properties',
                'locales/US/en/errors/503.properties'
            ]);

            helpers.assertFileContent([
                ['package.json', new RegExp(/\"localizr\"\:/)],
                ['Gruntfile.js', new RegExp(/'i18n'/)]
            ]);

            done(err);
        });
    });


    it('creates an app which uses less', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['dependency:templateModule'] = false;
        base.prompt['dependency:cssModule'] = 'less';
        base.prompt['dependency:jsModule'] = false;

        testutil.run(base, function (err) {
            helpers.assertFile([
                'public/css/app.less',
                'tasks/less.js'
            ]);

            helpers.assertFileContent([
                ['package.json', new RegExp(/\"less\"\:/)],
                ['package.json', new RegExp(/\"grunt-contrib-less\"\:/)]
            ]);

            done(err);
        });
    });


    it('creates an app which uses sass', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['dependency:templateModule'] = false;
        base.prompt['dependency:cssModule'] = 'sass';
        base.prompt['dependency:jsModule'] = false;

        testutil.run(base, function (err) {
            helpers.assertFile([
                'public/css/app.scss',
                'tasks/sass.js'
            ]);

            helpers.assertFileContent([
                ['package.json', new RegExp(/\"node-sass\"\:/)],
                ['package.json', new RegExp(/\"grunt-sass\"\:/)]
            ]);

            done(err);
        });
    });


    it('creates an app which uses stylus', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['dependency:templateModule'] = false;
        base.prompt['dependency:cssModule'] = 'stylus';
        base.prompt['dependency:jsModule'] = false;

        testutil.run(base, function (err) {
            helpers.assertFile([
                'public/css/app.styl',
                'tasks/stylus.js'
            ]);

            helpers.assertFileContent([
                ['package.json', new RegExp(/\"stylus\"\:/)],
                ['package.json', new RegExp(/\"grunt-contrib-stylus\"\:/)]
            ]);

            done(err);
        });
    });


    it('creates an app which uses requirejs', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['dependency:templateModule'] = false;
        base.prompt['dependency:cssModule'] = false;
        base.prompt['dependency:jsModule'] = 'requirejs';

        testutil.run(base, function (err) {
            helpers.assertFile([
                'tasks/requirejs.js'
            ]);

            helpers.assertFileContent([
                ['package.json', new RegExp(/\"requirejs\"\:/)],
                ['package.json', new RegExp(/\"grunt-contrib-requirejs\"\:/)],
                ['public/js/app.js', new RegExp(/require\(/)]
            ]);

            done(err);
        });
    });


    it('creates an app which uses browserify', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['dependency:templateModule'] = false;
        base.prompt['dependency:cssModule'] = false;
        base.prompt['dependency:jsModule'] = 'browserify';

        testutil.run(base, function (err) {
            helpers.assertFile([
                'tasks/browserify.js',
                'public/js/app.js'
            ]);

            helpers.assertFileContent([
                ['package.json', new RegExp(/\"grunt-browserify\"\:/)]
            ]);

            done(err);
        });
    });

});
