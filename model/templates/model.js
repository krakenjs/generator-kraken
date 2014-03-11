'use strict';
<%

var modelName = _.capitalize(_.classify(name)) + 'Model';

%>

module.exports = function <%= modelName %>() {
    return {
        name: '<%= name %>'
    };
};