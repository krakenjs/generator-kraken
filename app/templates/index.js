'use strict';

var webcore = require('webcore'),
    app = {};


app.configure = function (nconf, next) {
    // Your code
    next();
};

app.requestStart = function (server) {
    // Your code
};


app.requestBeforeRoute = function (server) {
    // Your code
};


webcore.create(app).listen(function (err) {
    if (err) {
        console.error(err);
    }
});
