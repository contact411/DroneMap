var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var RollingSpider = require("rolling-spider"); 
var yourDrone = new RollingSpider("8143c477a8e94dab957032d54c15bda7");


app.get('/', function(request, response) {
  response.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('power on', function() {
    console.log('Power On');
    yourDrone.connect(function() {
      yourDrone.setup(function() {
        yourDrone.startPing();
      });
    });
  });

  socket.on('takeoff', function() {
    console.log('Takeoff');
    yourDrone.flatTrim();
    yourDrone.takeOff();
  });

  socket.on('land', function() {
    console.log('Land');
    yourDrone.land();
  });

  socket.on('flipfront', function() {
    console.log('Front Flip');
    yourDrone.frontFlip();
  });

  socket.on('up', function() {
    console.log('up');
    yourDrone.up();
  });

  socket.on('down', function() {
    console.log('down');
    yourDrone.down();
  });

  socket.on('flipback', function() {
    console.log('flipback');
    yourDrone.backFlip();
  });

  socket.on('flipright', function() {
    console.log('Right Flip');
    yourDrone.rightFlip();
  });

  socket.on('flipleft', function() {
    console.log('Left Flip');
    yourDrone.leftFlip();
  });
});

http.listen(3000, function() {
  console.log('Listening on port 3000');
});