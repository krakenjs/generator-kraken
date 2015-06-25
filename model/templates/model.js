'use strict';
<%

var modelName = us.capitalize(us.classify(model)) + 'Model';

%>

module.exports = function <%= modelName %>() {
    return {
        name: '<%= model %>'
    };
};
