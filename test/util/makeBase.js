'use strict';


/**
 * Returns a base options object
 */
module.exports = function makeBase(generator) {
    return Object.create({
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
            'dependency:templateModule': 'dustjs',
            'dependency:cssModule': false,
            'dependency:jsModule': false,
            'dependency:taskModule': 'grunt'
        }
    });
};
