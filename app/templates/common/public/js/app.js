'use strict';

<% if (jsModule === 'requirejs') { %>

requirejs.config({
    paths: {}
});


require([/* Dependencies */], function (config) {

    var app = {
        initialize: function () {
            // Your code here
        }
    };

    app.initialize();

});

<% } %>