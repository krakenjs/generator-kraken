'use strict';
<%
    var modelName = _.capitalize(_.classify(model)) + 'Model';
%>

var <%= modelName %> = require('<%= modelPath %>');


module.exports = function (router) {

    var model = new <%= modelName %>();


    router.get('<%= route %>', function (req, res) {
        <% if (useJson) { %>
        res.format({
            json: function () {
                res.json(model);
            },
            html: function () {
                res.render('<%= fullname %>', model);
            }
        });<% } else { %>
        res.render('<%= fullname %>', model);
        <% } %>
    });

};
