'use strict';


module.exports = function (server) {

    server.get('/', function (req, res) {
        res.render('index', { name: 'world'} );
    });

};
