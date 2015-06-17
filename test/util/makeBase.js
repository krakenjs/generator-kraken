'use strict';


/**
 * Returns a base options object
 */
module.exports = function makeBase(generator) {
    return {
        type: 'kraken:' + generator,

        args: [],

        dependencies: [
            '../app',
            '../controller',
            '../locale',
            '../model',
            '../template'
        ],

        options: {
            'skip-install': true
        },

        prompt: {
            'appName': 'Foo',
            'appDescription': 'This is an app, foo!',
            'appAuthor': 'Jeff',
            'templateModule': 'dustjs',
            'cssModule': false,
            'jsModule': false,
            'taskModule': 'grunt'
        }
    };
};
