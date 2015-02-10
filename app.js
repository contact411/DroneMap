var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var RollingSpider = require("rolling-spider"); 
var yourDrone = new RollingSpider("e06acd5b0c15412bbb41d078a33b8b1f");


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  var message = "hi";
  io.emit('ping', message);
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

http.listen(3000, function() {
  console.log('Listening on port 3000');
});