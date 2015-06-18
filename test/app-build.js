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


var assert = require('assert'),
    testutil = require('./util'),
    resolve = require('resolve'),
    path = require('path');


describe('kraken:app', function () {
    // Disable timeout since we're doing a full install
    this.timeout(Infinity);

    it('scaffolded application can run the build task', function (done) {
        var base = testutil.makeBase('app');

        base.options['skip-install'] = false;
        base.prompt.i18n = 'i18n';

        testutil.run(base, function (err) {
            if (err) { return done(err); }
            var build = require('child_process').spawn('grunt', ['build', 'test'], { stdio: 'inherit' });

            build.on('close', function (code) {
                assert.strictEqual(code, 0);
                done(err);
            });
        });
    });

    it('scaffolded application with makara 2 can run the build task', function (done) {
        var base = testutil.makeBase('app');

        base.options['skip-install'] = false;
        base.prompt.templateModule = 'makara';
        base.prompt.i18n = 'i18n';

        testutil.run(base, function (err) {
            if (err) { return done(err); }
            var build = require('child_process').spawn('grunt', ['build', 'test'], { stdio: 'inherit' });

            build.on('close', function (code) {
                assert.strictEqual(code, 0);
                done(err);
            });
        });
    });
    it('scaffolded application does not suffer from dll hell with dust-helpers', function (done) {
        var base = testutil.makeBase('app');

        base.options['skip-install'] = false;
        base.prompt.templateModule = 'dustjs';

        testutil.run(base, function (err) {

            var basedir = process.cwd();
            var dustPath = resolve.sync('dustjs-linkedin', {basedir: basedir});
            var helpersPath = resolve.sync('dustjs-helpers', {basedir: basedir});
            var helpersDir = path.dirname(helpersPath);
            var helpersDustPath = resolve.sync('dustjs-linkedin', {basedir: helpersDir});

            assert(dustPath === helpersDustPath);
            done(err);
        });
    });

});
