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

var path    = require('path');
var helpers = require('yeoman-generator').test;
var kraken;


function testGenerator(type, dependencies, args, prompt, done) {
    helpers.testDirectory(path.join(__dirname, 'tmp'), function (err) {
        if (err) {
            return done(err);
        }

        kraken = helpers.createGenerator('kraken:' + type, dependencies, args);

        helpers.mockPrompt(kraken, prompt);

        kraken.options['skip-install'] = true;
        kraken.run({}, done);
    });
}



describe('Locale', function () {

    var dependencies = [
        '../../locale'
    ];


    it('creates new locales', function (done) {
        testGenerator('locale', dependencies, ['Foo', 'DE', 'de'], {}, function () {
            helpers.assertFiles([
                'locales/DE/de/Foo.properties'
            ]);

            done();
        });
    });


    it('creates default locales as en_US', function (done) {
        testGenerator('locale', dependencies, ['Bar'], {}, function () {
            helpers.assertFiles([
                'locales/US/en/Bar.properties'
            ]);

            done();
        });
    });

});
