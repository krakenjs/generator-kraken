'use strict';


module.exports = function <%= _.capitalize(_.classify(name)) %>Model() {
    return {
        name: '<%= _.slugify(appname) %>'
    };
};