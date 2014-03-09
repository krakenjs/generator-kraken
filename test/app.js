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


var assert = require('assert'),
    helpers = require('yeoman-generator').test,
    testutil = require('./util');


describe('kraken:app', function () {

    this.timeout(60000);

    it('scaffolds dot files', function (done) {
         var base = testutil.makeBase('app');

         base.options['skip-install-bower'] = true;
         base.options['skip-install-npm'] = true;

         testutil.run(base, function (err) {
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


    it('scaffolds base project files', function (done) {
         var base = testutil.makeBase('app');

         base.options['skip-install-bower'] = true;
         base.options['skip-install-npm'] = true;

         testutil.run(base, function (err) {
             helpers.assertFile([
                 'Gruntfile.js',
                 'README.md',
                 'index.js',
                 'package.json',
                 'config/app.json',
                 'config/middleware.json',
                 'locales/US/en/errors/404.properties',
                 'locales/US/en/errors/500.properties',
                 'locales/US/en/errors/503.properties',
                 'public/css/app.less',
                 'public/js/app.js',
                 'public/templates/errors/404.dust',
                 'public/templates/errors/500.dust',
                 'public/templates/errors/503.dust',
                 'public/templates/layouts/master.dust'
             ]);

             done(err);
         });
    });


    it('creates an app bootstrapped with RequireJS', function (done) {
         var base = testutil.makeBase('app');

         base.prompt.js = 'requirejs';

         testutil.run(base, function (err) {
             helpers.assertFileContent([
                 ['package.json', new RegExp(/\"requirejs\"\:/)],
                 ['package.json', new RegExp(/\"grunt-contrib-requirejs\"\:/)],
                 ['public/templates/layouts/master.dust', new RegExp(/require\.js/)],
                 ['public/js/app.js', new RegExp(/require\(/)]
             ]);

             done(err);
         });
    });


    // FIXME: The prompt default from the arg isn't being used...
    it.skip('takes the name from the command line arguments', function (done) {
        var base = testutil.makeBase('app');

        base.args = [ 'MyApp' ];
        base.options['skip-install-bower'] = true;
        base.options['skip-install-npm'] = true;
        base.prompt.appName = '';

        testutil.run(base, function (err) {
            helpers.assertFileContent([
                ['package.json', new RegExp(/\"name\"\: \"myapp\"/)]
            ]);

            done(err);
        });
    });


    it('checks that a generated application builds', function (done) {
         var base = testutil.makeBase('app');

         base.options['skip-install'] = false;

         testutil.run(base, function (err) {
             var build = require('child_process').spawn('grunt', ['test', 'build']);

             build.on('close', function (code) {
                 assert.strictEqual(code, 0);
                 done(err);
             });
         });
    });
});
