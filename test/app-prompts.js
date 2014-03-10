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

    this.timeout(100000);


    it('creates an app which uses dust', function (done) {
        var base = testutil.makeBase('app');

        base.prompt.templateModule = 'dust';

        testutil.run(base, function (err) {
            helpers.assertFile([
                'public/templates/index.dust',
                'public/templates/layouts/master.dust',
                'public/components/dustjs-linkedin/',
                'public/components/dustjs-linkedin-helpers/'
            ]);

            helpers.assertFileContent([
                ['package.json', new RegExp(/\"dustjs-linkedin\"\:/)],
                ['package.json', new RegExp(/\"dustjs-helpers\"\:/)],
                ['package.json', new RegExp(/\"adaro\"\:/)],
                ['package.json', new RegExp(/\"grunt-dustjs\"\:/)]
            ]);

            done(err);
        });
    });


    it('creates an app which uses less', function (done) {
        var base = testutil.makeBase('app');

        base.prompt.cssModule = 'less';

        testutil.run(base, function (err) {
            helpers.assertFile([
                'public/css/app.less'
            ]);

            helpers.assertFileContent([
                ['package.json', new RegExp(/\"less\"\:/)],
                ['package.json', new RegExp(/\"grunt-contrib-less\"\:/)]
            ]);

            done(err);
        });
    });


    it('creates an app which uses RequireJS', function (done) {
        var base = testutil.makeBase('app');

        base.prompt.jsModule = 'requirejs';

        testutil.run(base, function (err) {
            helpers.assertFileContent([
                ['package.json', new RegExp(/\"requirejs\"\:/)],
                ['package.json', new RegExp(/\"grunt-contrib-requirejs\"\:/)],
                ['public/templates/layouts/master.dust', new RegExp(/require\.js/)],
                ['public/js/app.js', new RegExp(/require\(/)]
            ]);

            done(err);
        });
    });

});
