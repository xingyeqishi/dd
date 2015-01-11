/* jshint node:true */
var express = require('express');
var app = express(),
    server = require('http').Server(app);

require('./server.js')(app);
server.listen(process.env.PORT || 3000);
