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


var runGenerator = require('./util/generator').runGenerator,
    BaseOptions = require('./util/generator').BaseOptions,
    helpers = require('yeoman-generator').test;


describe('Template', function () {

    var options = new BaseOptions('template');
    options.dependencies = [
        '../../template'
    ];
    options.prompt = {};
    options.args = ['Foo'];


    it('creates new templates', function (done) {
        runGenerator(options, function (err) {
            helpers.assertFiles([
                'public/templates/Foo.dust'
            ]);

            done(err);
        });
    });

});
