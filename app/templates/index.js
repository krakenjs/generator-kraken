'use strict';


var kraken = require('kraken.next'),
    express = require('express'),
    app = express(),
    port = process.env.PORT || 8000;


app.use(kraken());


app.listen(port, function () {
    console.log('Listening on http://127.0.0.1:8000/');
});