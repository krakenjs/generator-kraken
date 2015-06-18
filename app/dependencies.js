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
        ],
        tasks: function (gen) {
            if (!gen.i18n) {
                return "dustjs";
            }
        },
        templates: "dustjs/**"
    },

    i18n: {
        npm: function (gen) {
            if (gen.templateModule === 'dustjs') {
                return 'localizr@^0.1.2';
            } else if (gen.templateModule === 'makara') {
                return 'dust-makara-helpers@^4.0.0-8';
            }
        },
        npmDev: function (gen) {
            if (gen.templateModule === 'dustjs') {
                return 'grunt-localizr@^0.2.1';
            } else if (gen.templateModule === 'makara') {
                if (gen.jsModule === 'browserify') {
                    return 'grunt-makara-browserify@^1.0.1';
                } else if (gen.jsModule === 'requirejs') {
                    return 'grunt-makara-amdify@^1.0.1';
                }
            }
        },
        tasks: function (gen) {
            if (gen.templateModule === 'dustjs') {
                return 'i18n';
            } else if (gen.templateModule === 'makara') {
                if (gen.jsModule === 'browserify') {
                    return 'makara-browserify';
                } else if (gen.jsModule === 'requirejs') {
                    return 'makara-amdify';
                }
            }
        },
        templates: function (gen) {
            var globs = ["i18n/locales/**"];
            if (gen.templateModule === 'dustjs') {
                globs.push("i18n/tasks/**");
            }
            return globs;
        }
    },

    specialization: {},

    bower: {
        templates: ["bower/**", "bower/.*"]
    },

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
        ],
        tasks: "less",
        templates: "less/**"
    },

    sass: {
        npm: [
            'node-sass@^2.0.0'
        ],
        npmDev: [
            'grunt-sass@^0.18.1'
        ],
        tasks: "sass",
        templates: "sass/**"
    },

    stylus: {
        npm: [
            'stylus@^0.42.3'
        ],
        npmDev: [
            'grunt-contrib-stylus@^0.13.2'
        ],
        tasks: "stylus",
        templates: "stylus/**"
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
        ],
        tasks: "requirejs",
        templates: "requirejs/**"
    },


    browserify: {
        npmDev: [
            'grunt-browserify@^3.5.1'
        ],
        tasks: "browserify",
        templates: "browserify/**"
    }

};
