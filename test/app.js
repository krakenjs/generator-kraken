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


var assert = require('yeoman-generator').assert;
var testutil = require('./util');


describe('kraken:app', function () {
    this.timeout(Infinity);

    it('scaffolds dot files', function (done) {
        var base = testutil.makeBase('app');

        base.options['skip-install-bower'] = true;
        base.options['skip-install-npm'] = true;
        base.prompt['componentPackager'] = 'bower';

        testutil.run(base, function (err) {
            assert.file([
                '.bowerrc',
                '.editorconfig',
                '.gitignore',
                '.eslintrc',
                '.nodemonignore'
            ]);

            done(err);
        });
    });

    it('scaffolds dot files with jshint', function (done) {
        var base = testutil.makeBase('app');

        base.options['skip-install-bower'] = true;
        base.options['skip-install-npm'] = true;
        base.prompt['componentPackager'] = 'bower';
        base.prompt.lintModule = 'jshint';

        testutil.run(base, function (err) {
            assert.file([
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
             assert.file([
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

        delete base.prompt.name;

        testutil.run(base, function (err) {
            assert.fileContent([
                ['package.json', new RegExp(/\"name\"\: \"myapp\"/)]
            ]);

            done(err);
        });
    });

    it('should have an app.css file if cssModule is not false', function (done) {
        var base = testutil.makeBase('app');

        base.options['skip-install-bower'] = true;
        base.options['skip-install-npm'] = true;

        base.prompt['cssModule'] = 'less';

        testutil.run(base, function (err) {
            assert.fileContent('public/templates/layouts/master.dust', /href\="\/css\/app\.css"/);
            done(err);
        });

    });

});
