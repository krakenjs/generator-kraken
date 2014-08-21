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


var path = require('path'),
    assert = require('yeoman-generator').assert,
    helpers = require('yeoman-generator').test,
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
                 'config/config.json',
                 'config/development.json',
                 'public/js/app.js'
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


    it('writes meta data to package.json', function (done) {
        var base = testutil.makeBase('app');

        base.options['skip-install-bower'] = true;
        base.options['skip-install-npm'] = true;

        base.prompt['appName'] = 'MetaTest';
        base.prompt['templateModule'] = 'a';
        base.prompt['cssModule'] = 'b';
        base.prompt['jsModule'] = false;
        base.prompt['taskModule'] = 'd';

        testutil.run(base, function (err) {
            var pkg = require('../package'),
                appRoot = path.join(__dirname, '..', 'tmp', base.prompt['appName']),
                appPkg = require(path.join(appRoot, 'package')),
                meta = appPkg[pkg.name];

            assert(meta.version === pkg.version);
            assert(meta.template === base.prompt['templateModule']);
            assert(meta.css === base.prompt['cssModule']);
            assert(meta.js === base.prompt['jsModule']);
            assert(meta.task === base.prompt['taskModule']);

            done(err);
        });

    });

    it('should have an app.css file if cssModule is not false', function (done) {
        var base = testutil.makeBase('app');

        base.options['skip-install-bower'] = true;
        base.options['skip-install-npm'] = true;

        base.prompt['cssModule'] = 'b';

        testutil.run(base, function (err) {
            assert.fileContent('public/templates/layouts/master.dust', /href\="\/css\/app\.css"/);
            done(err);
        });

    });

});
