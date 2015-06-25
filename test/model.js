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


var assert = require('yeoman-generator').assert,
    testutil = require('./util');


describe('kraken:model', function () {


    it('creates new models', function (done) {
        var base = testutil.makeBase('model');

        base.args = ['Foo'];

        testutil.run(base, function (err) {
            assert.fileContent([
                ['models/Foo.js', new RegExp(/FooModel\(\)/)]
            ]);

            done(err);
        });
    });


    it('properly deals with slugged names', function (done) {
        var base = testutil.makeBase('model');

        base.args = ['foo-bar'];

        testutil.run(base, function (err) {
            assert.fileContent([
                ['models/foo-bar.js', new RegExp(/FooBarModel\(\)/)]
            ]);

            done(err);
        });
    });

});
