'use strict';


module.exports = function (generator) {
    
    return [
        {
            message: 'Name',
            name: 'appName',
            default: generator.arguments[0],
            validate: function (str) {
                return !!str;
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
            message: 'JavaScript module library?',
            type: 'list',
            name: 'js',
            choices: [
                {
                    name: 'RequireJS',
                    value: 'requirejs'
                },
                {
                    name: 'None',
                    value: false
                }
            ]
        }

    ];
};
