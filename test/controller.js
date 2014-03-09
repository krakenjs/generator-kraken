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



describe('kraken:controller', function () {

    it('creates new controller and associated files', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'Foo' ];
        base.prompt = { useJson: false };

        testutil.run(base, function (err) {
            helpers.assertFile([
                'controllers/Foo.js',
                'test/Foo.js',
                'models/Foo.js',
                'public/templates/Foo.dust',
                'locales/US/en/Foo.properties'
            ]);

            done(err);
        });
    });


    it('creates new XHR enabled controllers', function (done) {
        var base = testutil.makeBase('controller');

        base.args = [ 'Bar' ];
        base.prompt = { useJson: true };

        testutil.run(base, function (err) {
            helpers.assertFile([
                'controllers/Bar.js',
                'test/Bar.js',
                'models/Bar.js',
                'public/templates/Bar.dust',
                'locales/US/en/Bar.properties'
            ]);

            helpers.assertFileContent([
                ['controllers/Bar.js', new RegExp(/res.format/)]
            ]);

            done(err);
        });
    });

});
