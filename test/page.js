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


var generator = require('./util/generator'),
    helpers = require('yeoman-generator').test;


describe('Page', function () {

    var dependencies = [
        '../../page',
        '../../controller',
        '../../locale',
        '../../model',
        '../../template'
    ];


    it.skip('creates all the necessities', function (done) {
        generator('page', dependencies, ['Foo'], { json: false }, function () {
            helpers.assertFiles([
                'controllers/Foo.js',
                'locales/US/en/Foo.properties',
                'models/Foo.js',
                'public/templates/Foo.dust'
            ]);

            done();
        });
    });

});
