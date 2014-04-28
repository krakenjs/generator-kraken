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

        base.args = [ 'Foo' ];
        base.prompt = { useJson: false };

        testutil.run(base, function (err) {
            helpers.assertFile([
                'controllers/Foo.js',
                'test/Foo.js',
                'models/Foo.js',
                'public/templates/Foo.dust',
                'locales/US/en/Foo.properties'
            ]);

            done(err);
        });
    });


    it('routes are case-sensitive', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'cAsEsEnSiTiVe' ];

        testutil.run(base, function (err) {
            helpers.assertFileContent([
                ['controllers/cAsEsEnSiTiVe.js', new RegExp(/router.get\('\/cAsEsEnSiTiVe'/)]
            ]);

            done(err);
        });
    });


    it('supports JSON content negotiation', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'JSONTest' ];
        base.prompt = { useJson: true };

        testutil.run(base, function (err) {
            helpers.assertFile([
                'controllers/JSONTest.js'
            ]);

            helpers.assertFileContent([
                ['controllers/JSONTest.js', new RegExp(/res.format/)]
            ]);

            done(err);
        });
    });


    it('creates a test for each controller', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'Testy' ];

        testutil.run(base, function (err) {
            helpers.assertFile([
                'test/Testy.js'
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

        base.args = [ 'TemplateTest' ];

        testutil.run(base, function (err) {
            helpers.assertFile([
                'public/templates/TemplateTest.dust'
            ]);

            done(err);
        });
    });


    it('creates a content bundle for each controller', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'ContentTest' ];

        testutil.run(base, function (err) {
            helpers.assertFile([
                'public/templates/ContentTest.dust'
            ]);

            done(err);
        });
    });


    it('should support deep linking of paths', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'a/deep/link' ];

        testutil.run(base, function (err) {
            helpers.assertFile([
                'controllers/a/deep/link.js',
                'models/a/deep/link.js',
                'test/a/deep/link.js',
                'public/templates/a/deep/link.dust',
                'locales/US/en/a/deep/link.properties'
            ]);

            helpers.assertFileContent([
                ['controllers/a/deep/link.js', new RegExp(/require\('\.\.\/\.\.\/\.\.\/models\/a\/deep\/link\'\)/)],
                ['controllers/a/deep/link.js', new RegExp(/router.get\(\'\/a\/deep\/link\'/)],
                ['controllers/a/deep/link.js', new RegExp(/res.render\(\'a\/deep\/link\'/)]
            ]);

            done(err);
        });
    });

});
