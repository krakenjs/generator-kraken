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


module.exports = function (generator) {
    
    return [
        {
            message: 'Name',
            name: 'appName',
            validate: function (str) {
                return !!str;
            },
            when: function () {
                return !generator.appName;
            }
        },

        {
            message: 'Description',
            name: 'appDescription',
            validate: function (str) {
                return !!str;
            }
        },

        {
            message: 'Author',
            name: 'appAuthor',
            validate: function (str) {
                return !!str;
            }
        },

        {
            message: 'Template library?',
            type: 'list',
            name: 'dependency:templateModule',
            choices: [
                {
                    name: 'Dust',
                    value: 'dustjs'
                },
                {
                    name: 'None',
                    value: false
                }
            ],
            when: function () {
                return !generator.options.templateModule;
            }
        },

        {
            message: 'Front end package manager ?',
            type: 'list',
            name: 'dependency:UIPackageManager',
            choices: [
                {
                    name: 'Bower',
                    value: 'bower'
                },
                {
                    name: 'No',
                    value: false
                }
            ],
            when: function () {
                return !generator.options.templateModule;
            }
        },

        {
            message: 'CSS preprocessor library?',
            type: 'list',
            name: 'dependency:cssModule',
            choices: [
                {
                    name: 'LESS',
                    value: 'less'
                },
                {
                    name: 'SASS',
                    value: 'sass'
                },
                {
                    name: 'Stylus',
                    value: 'stylus'
                },
                {
                    name: 'None',
                    value: false
                }
            ],
            when: function () {
                return !generator.options.cssModule;
            }
        },

        {
            message: 'JavaScript library?',
            type: 'list',
            name: 'dependency:jsModule',
            choices: [
                {
                    name: 'RequireJS',
                    value: 'requirejs'
                },
                {
                    name: 'Browserify',
                    value: 'browserify'
                },
                {
                    name: 'None',
                    value: false
                }
            ],
            when: function () {
                return !generator.options.jsModule;
            }
        }

    ];
};
