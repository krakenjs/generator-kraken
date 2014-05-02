'use strict';
<%

var modelName = _.capitalize(_.classify(model)) + 'Model';

%>

module.exports = function <%= modelName %>() {
    return {
        name: '<%= model %>'
    };
};
