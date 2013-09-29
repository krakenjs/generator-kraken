'use strict';


module.exports = function (server) {

    server.get('/<% if (name !== "index") { %><%= _.slugify(name) %><% } %>', function (req, res) {
        res.render('<%= _.slugify(name) %>', { name: 'world' });
    });

};
