'use strict';

var <%= modelName %> = require('<%= modelPath %>');


module.exports = function (router) {

    var model = new <%= modelName %>();

    router.get('/', function (req, res) {
        <% if (templateModule) { %>
        <% if (useJson) { %>
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('<%= name %>', model);
            }
        });<% } else { %>
        res.render('<%= name %>', model);
        <% } %>
        <% } else { %>
        res.send('<code><pre>' + JSON.stringify(model, null, 2) + '</pre></code>');
        <% } %>
    });

};
