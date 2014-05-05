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

var path = require('path');
var assert = require('assert');
var parsePath = require('../util/parse-path');


describe('parsePath', function () {

  it('should parse "index" correctly', function () {
    var expectation = {
      base: 'index',
      dir: '.',
      root: '..',
      route: '/',
      fullroute: '/',
      model: 'index',
      fullname: 'index',
      fullpath: 'index'
    };
    assertPath('index', expectation);
    assertPath('index.js', expectation);
    assertPath('./index', expectation);
    assertPath('./index.js', expectation);
  });

  it('should parse "new" correctly', function () {
    var expectation = {
      base: 'index',
      dir: 'new',
      root: path.join('..', '..'),
      route: '/',
      fullroute: '/new',
      model: 'new',
      fullname: 'new/index',
      fullpath: path.join('new', 'index')
    };
    assertPath('new', expectation);
    assertPath('new/', expectation);
    assertPath('new/index', expectation);
    assertPath('new/index.js', expectation);
  });

  it('should parse "new/sub" correctly', function () {
    var expectation = {
      base: 'index',
      dir: path.join('new', 'sub'),
      root: path.join('..', '..', '..'),
      route: '/',
      model: 'sub',
      fullroute: '/new/sub',
      fullname: 'new/sub/index',
      fullpath: path.join('new', 'sub', 'index')
    };
    assertPath('new/sub', expectation);
    assertPath('new/sub/', expectation);
    assertPath('new/sub/index', expectation);
    assertPath('new/sub/index.js', expectation);
  });
});

function assertPath(name, expectedParts) {
  var parts = parsePath(name);
  assert(compareObjects(parts, expectedParts), name + ' doesn\'t equal the expected parts');
}

function compareObjects(actual, expected) {
  return Object.keys(expected).every(function (key) {
    try {
      assert.deepEqual(expected[key], actual[key]);
    } catch (e) {
      return false;
    }
    return true;
  });
}
