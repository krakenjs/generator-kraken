'use strict';

var kraken = require('kraken'),
    app = {};


app.configure = function (nconf, next) {
    // Fired when an app configures itself
    next(null);
};


app.requestStart = function (server) {
    // Fired at the beginning of an incoming request
};


app.requestBeforeRoute = function (server) {
    // Fired before routing occurs
};


kraken.create(app).listen(function (err) {
    if (err) {
        console.error(err);
    }
});
