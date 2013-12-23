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
/*global describe, beforeEach, it*/

'use strict';


var generator = require('./util/generator'),
    helpers = require('yeoman-generator').test;


describe('Controller', function () {
    var dependencies = [
        '../../controller'
    ];


    it('creates new controllers', function (done) {
        generator('controller', dependencies, ['Foo'], { json: false }, function () {
            helpers.assertFiles([
                'controllers/Foo.js'
            ]);

            done();
        });
    });


    it('creates new tests', function (done) {
        generator('controller', dependencies, ['Foo'], { json: false }, function () {
            helpers.assertFiles([
                'test/Foo.js'
            ]);

            done();
        });
    });


    it('creates new XHR enabled controllers', function (done) {
        generator('controller', dependencies, ['Bar'], { json: true }, function () {
            helpers.assertFiles([
                ['controllers/Bar.js', /res.format/]
            ]);

            done();
        });
    });

});
