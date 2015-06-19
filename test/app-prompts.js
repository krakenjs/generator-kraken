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


var assert = require('yeoman-generator').assert,
    testutil = require('./util');


describe('kraken:app', function () {

    // Disable timeout since we're doing multiple installs
    this.timeout(Infinity);

    it('creates an app which uses dust', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['templateModule'] = 'dustjs';
        base.prompt['componentPackager'] = 'bower';
        base.prompt['cssModule'] = 'less';
        base.prompt['i18n'] = false;
        base.prompt['jsModule'] = false;

        testutil.run(base, function (err) {
            assert.file([
                'public/templates/index.dust',
                'public/templates/layouts/master.dust',
                'public/templates/errors/404.dust',
                'public/templates/errors/500.dust',
                'public/templates/errors/503.dust',
                'public/components/dustjs-linkedin/',
                'public/components/dustjs-linkedin-helpers/',
                'tasks/dustjs.js'
            ]);

            assert.fileContent([
                ['package.json', new RegExp(/\"dustjs-linkedin\"\:/)],
                ['package.json', new RegExp(/\"dustjs-helpers\"\:/)],
                ['package.json', new RegExp(/\"engine-munger\"\:/)],
                ['package.json', new RegExp(/\"grunt-dustjs\"\:/)],
                ['Gruntfile.js', new RegExp(/registerTask.*build.*dustjs/)],
                ['public/templates/layouts/master.dust', new RegExp(/(app\.css)/) ]
            ]);

            done(err);
        });
    });

    it('creates an app which does not have any view engine', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['templateModule'] = false;
        base.prompt['cssModule'] = false;
        base.prompt['i18n'] = false;
        base.prompt['jsModule'] = false;

        testutil.run(base, function (err) {

            assert.file([
                'config/config.json',
                'controllers/index.js'
            ]);
            assert.noFile([
                '.bowerrc'
            ]);
            assert.fileContent([
                ['config/config.json', new RegExp(/^((?!fileNotFound)[\s\S])*$/)],
                ['config/config.json', new RegExp(/^((?!serverError)[\s\S])*$/)],
                ['controllers/index.js', new RegExp(/res.send/)],
                ['controllers/index.js', new RegExp(/^((?!res.render)[\s\S])*$/)]
            ]);

            done(err);
        });
    });



    it('creates an app which uses split packages for i18n', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['templateModule'] = false;
        base.prompt['i18n'] = 'i18n';
        base.prompt['jsModule'] = false;

        testutil.run(base, function (err) {
            assert.file([
                'locales/US/en/errors/404.properties',
                'locales/US/en/errors/500.properties',
                'locales/US/en/errors/503.properties'
            ]);

            done(err);
        });
    });


    it('creates an app which uses makara 2 for i18n', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['templateModule'] = 'makara';
        base.prompt['i18n'] = 'i18n';
        base.prompt['jsModule'] = 'browserify';

        testutil.run(base, function (err) {
            assert.file([
                'locales/US/en/errors/404.properties',
                'locales/US/en/errors/500.properties',
                'locales/US/en/errors/503.properties',
                'public/templates/layouts/master.dust',
                'public/templates/index.dust'
            ]);

            assert.fileContent([
                ['package.json', new RegExp(/\"makara\"\:/)],
                ['Gruntfile.js', new RegExp(/registerTask.*build.*dustjs/)]
            ]);

            done(err);
        });
    });

    it('creates an app which uses less', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['templateModule'] = false;
        base.prompt['cssModule'] = 'less';
        base.prompt['jsModule'] = false;

        testutil.run(base, function (err) {
            assert.file([
                'public/css/app.less',
                'tasks/less.js'
            ]);

            assert.fileContent([
                ['package.json', new RegExp(/\"less\"\:/)],
                ['package.json', new RegExp(/\"grunt-contrib-less\"\:/)]
            ]);

            done(err);
        });
    });


    it('creates an app which uses sass', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['templateModule'] = false;
        base.prompt['cssModule'] = 'sass';
        base.prompt['jsModule'] = false;

        testutil.run(base, function (err) {
            assert.file([
                'public/css/app.scss',
                'tasks/sass.js'
            ]);

            assert.fileContent([
                ['package.json', new RegExp(/\"node-sass\"\:/)],
                ['package.json', new RegExp(/\"grunt-sass\"\:/)]
            ]);

            done(err);
        });
    });


    it('creates an app which uses stylus', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['templateModule'] = false;
        base.prompt['cssModule'] = 'stylus';
        base.prompt['jsModule'] = false;

        testutil.run(base, function (err) {
            assert.file([
                'public/css/app.styl',
                'tasks/stylus.js'
            ]);

            assert.fileContent([
                ['package.json', new RegExp(/\"stylus\"\:/)],
                ['package.json', new RegExp(/\"grunt-contrib-stylus\"\:/)]
            ]);

            done(err);
        });
    });


    it('creates an app which uses requirejs', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['templateModule'] = false;
        base.prompt['cssModule'] = false;
        base.prompt['jsModule'] = 'requirejs';

        testutil.run(base, function (err) {
            assert.file([
                'tasks/requirejs.js'
            ]);

            assert.fileContent([
                ['package.json', new RegExp(/\"requirejs\"\:/)],
                ['package.json', new RegExp(/\"grunt-contrib-requirejs\"\:/)],
                ['public/js/app.js', new RegExp(/require\(/)]
            ]);

            done(err);
        });
    });


    it('creates an app which uses browserify', function (done) {
        var base = testutil.makeBase('app');

        base.prompt['templateModule'] = false;
        base.prompt['cssModule'] = false;
        base.prompt['jsModule'] = 'browserify';

        testutil.run(base, function (err) {
            assert.file([
                'tasks/browserify.js',
                'public/js/app.js'
            ]);

            assert.fileContent([
                ['package.json', new RegExp(/\"grunt-browserify\"\:/)]
            ]);

            done(err);
        });
    });

});
