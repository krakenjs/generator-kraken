'use strict';
<%
    var modelName = _.capitalize(_.classify(name)) + 'Model';
    var modelPath = rootPath + '/models/' + name;
%>

var <%= modelName %> = require('<%= modelPath %>');


module.exports = function (router) {

    var model = new <%= modelName %>();


    router.get('<%= urlPath %>', function (req, res) {
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
    });

};
