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
'use strict';

var path = require('path');

function parsePath(name) {

  var DEFAULT_IDX = 'index';

  var parts = {
    ext: path.extname(name),
    dir: path.dirname(name),
    model: 'index',
    route: '/'
  };

  parts.base = path.basename(name, parts.ext) || DEFAULT_IDX;

  if (parts.base.toLowerCase() !== DEFAULT_IDX) {
    parts.model = parts.base;
    parts.dir = path.join(parts.dir, parts.base);
    parts.base = DEFAULT_IDX;
  } else {
    var newBase = path.basename(parts.dir);
    if (newBase !== '.') {
      parts.model = newBase;
    }
  }

  parts.fullroute = '/' + (parts.dir !== '.' ? parts.dir : '' );
  parts.fullname = path.join(parts.dir, parts.base);
  parts.root = path.relative(parts.fullname, './');

  return parts;
}

module.exports = parsePath;
