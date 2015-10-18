'use strict';

var app = require('http').createServer(handler)
var io = require('socket.io')(app);
var fs = require('fs');

app.listen(80);
/*
app.get('/', function (req, res) {

  var indexFilePath = __dirname + '/public/index.html';
  console.log('Received incomming request');
  console.log('Served:%s', indexFilePath);

  res.sendFile(indexFilePath);
});*/

function handler (req, res) {
 
  var filePath = __dirname + '/public/index.html';
  console.log('Received incomming request');
  console.log('Served:%s', filePath);

  fs.readFile(filePath, function (err, data) {

		if (err) {
	      res.writeHead(500);
	      return res.end('Error loading index.html');
	    }

	    res.writeHead(200);
	    res.end(data);
	});
}


io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});