/* eslint-disable */

var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/static/:folder/:filename', function(req, res) {
  res.sendFile(__dirname + '/static/' + req.params.folder + '/' + req.params.filename);
});

app.listen(2300);