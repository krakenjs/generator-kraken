'use strict';


module.exports = function (server) {

    server.get('/<%= _.slugify(name) %>', function (req, res) {
        res.render('<%= _.slugify(name) %>', { name: 'world' });
    });

};
