'use strict';


module.exports = function (server) {

    server.get('/<% if (name !== "index") { %><%= _.slugify(name) %><% } %>', function (req, res) {
        var model = { name: '<%= _.slugify(appName) %>' };
        <% if (json) { %>
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('<%= _.slugify(name) %>', model);
            }
        });
        <% } else { %>
        res.render('<%= _.slugify(name) %>', model);
        <% } %>
    });

};
