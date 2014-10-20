/*global describe:false, it:false, beforeEach:false, afterEach:false*/

'use strict';


var kraken = require('kraken-js'),
    express = require('express'),
    request = require('supertest');


describe('<%= fullroute %>', function () {

    var app, mock;


    beforeEach(function (done) {
        app = express();
        app.on('start', done);
        app.use(kraken({
            basedir: process.cwd()
        }));

        mock = app.listen(1337);

    });


    afterEach(function (done) {
        mock.close(done);
    });


    it('should say "hello"', function (done) {
        request(mock)
            .get('<%= fullroute %>')
            .expect(200)
            .expect('Content-Type', /html/)
            <% if (hasTemplates) { %>
                .expect(/Hello, /)
            <% } else { %>
                .expect(/"name": "index"/)
            <% } %>
            .end(function (err, res) {
                done(err);
            });
    });

});
