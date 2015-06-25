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


module.exports = {

    dustjs: {
        bower: [
            'dustjs-linkedin#~2.6.1',
            'dustjs-linkedin-helpers#~1.6.1'
        ],
        npm: [
            'dustjs-linkedin@~2.6.1',
            'dustjs-helpers@~1.6.1',
            'adaro@^0.1.5'
        ],
        npmDev: [
            'grunt-dustjs@^1.2.1'
        ]
    },

    i18n: {
        npm: [
            'localizr@^0.1.2'
        ],
        npmDev: [
            'grunt-localizr@^0.2.1'
        ]
    },

    specialization: {},

    bower: {},

    grunt: {
        npmDev: [
            'grunt@^0.4.5',
            'grunt-contrib-clean@^0.6.0',
            'grunt-contrib-jshint@^0.10.0',
            'grunt-mocha-cli@^1.5.0',
            'grunt-copy-to@^0.0.10',
            'grunt-config-dir@^0.3.2'
        ]
    },

    less: {
        npm: [
            'less@^1.6.1'
        ],
        npmDev: [
            'grunt-contrib-less@^0.9.0'
        ]
    },

    sass: {
        npm: [
            'node-sass@^2.0.0'
        ],
        npmDev: [
            'grunt-sass@^0.18.1'
        ]
    },

    stylus: {
        npm: [
            'stylus@^0.42.3'
        ],
        npmDev: [
            'grunt-contrib-stylus@^0.13.2'
        ]
    },

    requirejs: {
        bower: [
            'requirejs#^2.1.16'
        ],
        npm: [
            'requirejs@^2.1.16'
        ],
        npmDev: [
            'grunt-contrib-requirejs@^0.4.4'
        ]
    },


    browserify: {
        npmDev: [
            'grunt-browserify@^3.5.1'
        ]
    }

};
