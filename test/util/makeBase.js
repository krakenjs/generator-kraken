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
            'name': 'Foo',
            'description': 'This is an app, foo!',
            'author': 'Jeff',
            'templateModule': 'dustjs',
            'componentPackager': 'bower',
            'cssModule': false,
            'jsModule': false,
            'lintModule': 'eslint',
            'taskModule': 'grunt'
        }
    };
};
