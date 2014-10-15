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



describe('kraken:controller', function () {

    it('creates new controller', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'Foo', 'dustjs' ];
        base.prompt = { useJson: false };

        testutil.run(base, function (err) {
            helpers.assertFile([
                'controllers/Foo/index.js',
                'test/Foo/index.js',
                'models/Foo.js',
                'public/templates/Foo/index.dust',
                'locales/US/en/Foo/index.properties'
            ]);

            done(err);
        });
    });


    it('routes are case-sensitive', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'cAsEsEnSiTiVe', 'dustjs' ];

        testutil.run(base, function (err) {
            helpers.assertFile('controllers/cAsEsEnSiTiVe/index.js');

            done(err);
        });
    });


    it('supports JSON content negotiation', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'JSONTest', 'dustjs' ];
        base.prompt = { useJson: true };

        testutil.run(base, function (err) {
            helpers.assertFile([
                'controllers/JSONTest/index.js'
            ]);

            helpers.assertFileContent([
                ['controllers/JSONTest/index.js', new RegExp(/res.format/)]
            ]);

            done(err);
        });
    });


    it('creates a test for each controller', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'Testy', 'dustjs' ];

        testutil.run(base, function (err) {
            helpers.assertFile([
                'test/Testy/index.js'
            ]);

            done(err);
        });
    });


    it('creates a model for each controller', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'ModelTest' ];

        testutil.run(base, function (err) {
            helpers.assertFile([
                'models/ModelTest.js'
            ]);

            done(err);
        });
    });


    it('creates a template for each controller', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'TemplateTest', 'dustjs' ];

        testutil.run(base, function (err) {
            helpers.assertFile([
                'public/templates/TemplateTest/index.dust'
            ]);

            done(err);
        });
    });


    it('creates a content bundle for each controller', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'ContentTest', 'dustjs' ];

        testutil.run(base, function (err) {
            helpers.assertFile([
                'public/templates/ContentTest/index.dust'
            ]);

            done(err);
        });
    });


    it('should support deep linking of paths', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'a/deep/link', 'dustjs' ];

        testutil.run(base, function (err) {
            helpers.assertFile([
                'controllers/a/deep/link/index.js',
                'models/link.js',
                'test/a/deep/link/index.js',
                'public/templates/a/deep/link/index.dust',
                'locales/US/en/a/deep/link/index.properties'
            ]);

            helpers.assertFileContent([
                ['controllers/a/deep/link/index.js', new RegExp(/require\('\.\.\/\.\.\/\.\.\/\.\.\/models\/link\'\)/)],
                ['controllers/a/deep/link/index.js', new RegExp(/router.get\(\'\/\'/)],
                ['controllers/a/deep/link/index.js', new RegExp(/res.render\(\'a\/deep\/link\/index\'/)]
            ]);

            done(err);
        });
    });

    it('should create a controller with no templateModule', function(done) {
        var base = testutil.makeBase('controller');
        base.args = ['index'];

        testutil.run(base, function(err) {
            helpers.assertFile([
                'controllers/index.js',
                'models/index.js',
                'test/index.js'
            ]);

            helpers.assertNoFile([
                'public/templates/a/deep/link/index.dust',
                'locales/US/en/a/deep/link/index.properties'
            ]);
            done(err);
        });

    });

});
