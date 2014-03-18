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
                 'lib/spec.js',
                 'locales/US/en/errors/404.properties',
                 'locales/US/en/errors/500.properties',
                 'locales/US/en/errors/503.properties',
                 'public/js/app.js',
                 'public/templates/errors/404.dust',
                 'public/templates/errors/500.dust',
                 'public/templates/errors/503.dust'
             ]);

             done(err);
         });
    });


    it('takes the name from the command line arguments', function (done) {
        var base = testutil.makeBase('app');

        base.args = ['MyApp'];
        base.options['skip-install-bower'] = true;
        base.options['skip-install-npm'] = true;

        delete base.prompt.appName;

        testutil.run(base, function (err) {
            helpers.assertFileContent([
                ['package.json', new RegExp(/\"name\"\: \"myapp\"/)]
            ]);

            done(err);
        });
    });

});
