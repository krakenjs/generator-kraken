/*───────────────────────────────────────────────────────────────────────────*\
│  Copyright (C) 2014 eBay eBay Software Foundation                                │
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


var runGenerator = require('./util/generator').runGenerator,
    BaseOptions = require('./util/generator').BaseOptions,
    helpers = require('yeoman-generator').test;


describe('Controller', function () {
    var options = new BaseOptions('controller');
    options.dependencies = [
        '../../controller'
    ];
    options.args = ['Foo'];
    options.prompt = {json: false};


    it('creates new controllers', function (done) {
        runGenerator(options, function (err) {
            helpers.assertFiles([
                'controllers/Foo.js'
            ]);

            done(err);
        });
    });


    it('creates new tests', function (done) {
        runGenerator(options, function (err) {
            helpers.assertFiles([
                'test/Foo.js'
            ]);

            done(err);
        });
    });


    it('creates new XHR enabled controllers', function (done) {
        options.prompt.json = true;
        runGenerator(options, function (err) {
            helpers.assertFiles([
                ['controllers/Foo.js', /res.format/]
            ]);

            done(err);
        });
    });

});
