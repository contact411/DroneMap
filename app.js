var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var RollingSpider = require("rolling-spider"); 
var yourDrone = new RollingSpider("8143c477a8e94dab957032d54c15bda7");

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.get('/mapper', function(request, response) {
  response.sendFile(__dirname + '/public/mapper.html');
});

io.on('connection', function(socket){
  console.log('a user connected');
  var steps = [];


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

  socket.on('emergency', function() {
    console.log('emergency');
    yourDrone.emergency();
  });

  socket.on('forward', function() {
    console.log('forward');
    yourDrone.forward();
  });

  socket.on('backward', function() {
    console.log('backward');
    yourDrone.backward();
  });

  socket.on('slideLeft', function() {
    console.log('slideLeft');
    yourDrone.tiltLeft();
  });

  socket.on('slideRight', function() {
    console.log('slideRight');
    yourDrone.tiltRight();
  });

  socket.on('rotateLeft', function() {
    console.log('rotateLeft');
    yourDrone.turnLeft();
  });

  socket.on('rotateRight', function() {
    console.log('rotateRight');
    yourDrone.turnRight();
  });

  var respondToStep = function () {
    console.log("\n", steps, "\n");
    io.emit('steps', steps);
  }

  socket.on('frontStep', function() {
    console.log('frontStep added');
    steps.push({action: "frontflip", delay: 2000});
    respondToStep();
  });

  socket.on('upStep', function() {
    console.log('upStep added');
    steps.push({action: "up", delay: 2000});
    respondToStep();
  });

  socket.on('downStep', function() {
    console.log('downStep added');
    steps.push({action: "down", delay: 2000});
    respondToStep();
  });

  socket.on('backStep', function() {
    console.log('backStep added');
    steps.push({action: "backflip", delay: 2000});
    respondToStep();
  });

  socket.on('rightFlipStep', function() {
    console.log('rightFlipStep added');
    steps.push({action: "rightFlip", delay: 2000});
    respondToStep();
  });

  socket.on('leftFlipStep', function() {
    console.log('leftFlipStep added');
    steps.push({action: "leftFlip", delay: 2000})
    respondToStep();
  });
// ------ New - --  Test -- ---

  socket.on('forwardStep', function() {
    console.log('forwardStep added');
    steps.push({action: "forward", delay: 2000})
    respondToStep();
  });

  socket.on('backwardStep', function() {
    console.log('backwardStep added');
    steps.push({action: "backward", delay: 2000})
    respondToStep();
  });

  socket.on('slideLeftStep', function() {
    console.log('slideLeftStep added');
    steps.push({action: "tiltLeft", delay: 2000})
    respondToStep();
  });

  socket.on('slideRightStep', function() {
    console.log('slideRightStep');
    steps.push({action: "tiltRight", delay: 2000})
    respondToStep();
  });

  socket.on('rotateLeftStep', function() {
    console.log('rotateLeftStep');
    steps.push({action: "turnLeft", delay: 2000})
    respondToStep();
  });

  socket.on('rotateRightStep', function() {
    console.log('rotateRightStep');
    steps.push({action: "turnRight", delay: 2000})
    respondToStep();
  });

});


http.listen(3000, function() {
  console.log('Listening on port 3000');
});

// Code for running array of steps
// function sendToDrone(action) { console.log(action); }
// function run(step, remainingSteps) {
//   if (step) {
//     sendToDrone(step.action);
//     setTimeout(function(step, remainingSteps) {
//       run(step, remainingSteps);
//     }, step.delay, remainingSteps.pop(), remainingSteps);
//   } else {
//     sendToDrone("land");
//   }
// }

// Code for pushing instruction into an array
// steps.push({action: "backflip", delay: 2000})

// Code to kickoff array of steps
// run(steps.pop(), steps);