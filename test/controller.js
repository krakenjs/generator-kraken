/*───────────────────────────────────────────────────────────────────────────*\
│  Copyright (C) 2016 PayPal                                                  │
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


var assert = require('yeoman-assert'),
    testutil = require('./util');



describe('kraken:controller', function () {

    it('creates new controller', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'Foo' ];
        base.options.templateModule = 'dustjs';
        base.options.i18n = 'i18n';
        base.prompt = { useJson: false };

        testutil.run(base, function (err) {
            assert.file([
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
        base.options.templateModule = 'dustjs';

        testutil.run(base, function (err) {
            assert.file('controllers/cAsEsEnSiTiVe.js');

            done(err);
        });
    });


    it('supports JSON content negotiation', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'JSONTest' ];
        base.options.templateModule = 'dustjs';
        base.options.useJson = true;

        testutil.run(base, function (err) {
            assert.fileContent([
                ['controllers/JSONTest.js', new RegExp(/res.format/)]
            ]);

            done(err);
        });
    });


    it('creates a test for each controller', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'Testy' ];
        base.options.templateModule = 'dustjs';

        testutil.run(base, function (err) {
            assert.file([
                'test/Testy.js'
            ]);

            done(err);
        });
    });


    it('creates a model for each controller', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'ModelTest' ];

        testutil.run(base, function (err) {
            assert.file([
                'models/ModelTest.js'
            ]);

            done(err);
        });
    });


    it('creates a template for each controller', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'TemplateTest' ];
        base.options.templateModule = 'dustjs';

        testutil.run(base, function (err) {
            assert.file([
                'public/templates/TemplateTest.dust'
            ]);

            done(err);
        });
    });


    it('creates a content bundle for each controller', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'ContentTest' ];
        base.options.templateModule = 'dustjs';

        testutil.run(base, function (err) {
            assert.file([
                'public/templates/ContentTest.dust'
            ]);

            done(err);
        });
    });


    it('should support deep linking of paths', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'a/deep/link' ];
        base.options.templateModule = 'dustjs';
        base.options.i18n = 'i18n';

        testutil.run(base, function (err) {
            assert.file([
                'controllers/a/deep/link.js',
                'models/link.js',
                'test/a/deep/link.js',
                'public/templates/a/deep/link.dust',
                'locales/US/en/a/deep/link.properties'
            ]);

            assert.fileContent([
                ['controllers/a/deep/link.js', new RegExp(/require\('\.\.\/\.\.\/\.\.\/models\/link\'\)/)],
                ['controllers/a/deep/link.js', new RegExp(/router.get\(\'\/\'/)],
                ['controllers/a/deep/link.js', new RegExp(/res.render\(\'a\/deep\/link\'/)]
            ]);

            done(err);
        });
    });

    it('should create a controller with no templateModule', function(done) {
        var base = testutil.makeBase('controller');
        base.args = ['index'];

        testutil.run(base, function(err) {
            assert.file([
                'controllers/index.js',
                'models/index.js',
                'test/index.js'
            ]);

            assert.noFile([
                'public/templates/a/deep/link/index.dust',
                'locales/US/en/a/deep/link/index.properties'
            ]);
            done(err);
        });

    });

});
