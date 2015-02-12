var express = require('express');
var path = require('path');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));

var RollingSpider = require("rolling-spider"); 
var yourDrone = new RollingSpider("a8f8b8868cc447bd907e7164079268e5");

// Jack's drone
// var yourDrone = new RollingSpider("8143c477a8e94dab957032d54c15bda7");

yourDrone.connect(function() {
  yourDrone.setup(function() {
    yourDrone.startPing();


  });
});

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.get('/manual', function(request, response) {
  response.sendFile(__dirname + '/public/manual.html');
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

  socket.on('flipFront', function() {
    console.log('Front Flip');
    yourDrone.frontFlip();
  });

  socket.on('up', function() {
    console.log('up');
    yourDrone.up({speed: 50, steps: 50});
  });

  socket.on('down', function() {
    console.log('down');
    yourDrone.down({speed: 50, steps: 50});
  });

  socket.on('flipBack', function() {
    console.log('Back Flip');
    yourDrone.backFlip();
  });

  socket.on('flipRight', function() {
    console.log('Right Flip');
    yourDrone.rightFlip();
  });

  socket.on('flipLeft', function() {
    console.log('Left Flip');
    yourDrone.leftFlip();
  });

  socket.on('emergency', function() {
    console.log('emergency');
    yourDrone.emergency();
  });

  socket.on('forward', function() {
    console.log('forward');
    yourDrone.forward({speed: 50, steps: 50});
  });

  socket.on('backward', function() {
    console.log('backward');
    yourDrone.backward({speed: 50, steps: 50});
  });

  socket.on('slideLeft', function() {
    console.log('slideLeft');
    yourDrone.tiltLeft({speed: 50, steps: 50});
  });

  socket.on('slideRight', function() {
    console.log('slideRight');
    yourDrone.tiltRight({speed: 50, steps: 50});
  });

  socket.on('rotateLeft', function() {
    console.log('rotateLeft');
    yourDrone.turnLeft({speed: 50, steps: 50});
  });

  socket.on('rotateRight', function() {
    console.log('rotateRight');
    yourDrone.turnRight({speed: 50, steps: 50});
  });

  var respondToStep = function () {
    console.log("\n", steps, "\n");
    io.emit('steps', steps);
  }

  socket.on('frontFlipStep', function() {
    console.log('frontFlipStep added');
    steps.push({action: "frontFlip", name: "Front Flip",  delay: 2000});
    respondToStep();
  });

  socket.on('backFlipStep', function() {
    console.log('backStep added');
    steps.push({action: "backFlip", name: "Back Flip",  delay: 2000});
    respondToStep();
  });

  socket.on('upStep', function() {
    console.log('upStep added');
    steps.push({action: "up", name: "Up",  delay: 2000});
    respondToStep();
  });

  socket.on('downStep', function() {
    console.log('downStep added');
    steps.push({action: "down", name: "Down",  delay: 2000});
    respondToStep();
  });

  socket.on('backStep', function() {
    console.log('backStep added');
    steps.push({action: "backFlip", name: "Back Flip",  delay: 2000});
    respondToStep();
  });

  socket.on('flipRightStep', function() {
    console.log('flipRightStep added');
    steps.push({action: "rightFlip", name: "Right Flip",  delay: 2000});
    respondToStep();
  });

  socket.on('flipLeftStep', function() {
    console.log('leftFlipStep added');
    steps.push({action: "leftFlip", name: "Left Flip",  delay: 2000})
    respondToStep();
  });

  socket.on('forwardStep', function() {
    console.log('forwardStep added');
    steps.push({action: "forward", name: "Forward",  delay: 2000})
    respondToStep();
  });

  socket.on('backwardStep', function() {
    console.log('backwardStep added');
    steps.push({action: "backward", name: "Backward",  delay: 2000})
    respondToStep();
  });

  socket.on('slideLeftStep', function() {
    console.log('slideLeftStep added');
    steps.push({action: "tiltLeft", name: "Tilt Left",  delay: 2000})
    respondToStep();
  });

  socket.on('slideRightStep', function() {
    console.log('slideRightStep');
    steps.push({action: "tiltRight", name: "Tilt Right",  delay: 2000})
    respondToStep();
  });

  socket.on('rotateLeftStep', function() {
    console.log('rotateLeftStep');
    steps.push({action: "turnLeft", name: "Turn Left",  delay: 2000})
    respondToStep();
  });

  socket.on('rotateRightStep', function() {
    console.log('rotateRightStep');
    steps.push({action: "turnRight", name: "Turn Right",  delay: 2000})
    respondToStep();
  });

  socket.on('runSteps', function() {
    console.log('Running steps');
    yourDrone.flatTrim();
    yourDrone.takeOff();
    setTimeout(function() {
      steps.reverse();
      run(steps.pop(), steps, socket);
    }, 3000);
    //steps = [];    
  });


});


http.listen(3000, function() {
  console.log('Listening on port 3000');
});

// Code for running array of steps
function run(step, remainingSteps, socket) {
  if (step) {
    yourDrone[step.action]();
    setTimeout(function(step, remainingSteps, socket) {
      run(step, remainingSteps, socket);
    }, step.delay, remainingSteps.pop(), remainingSteps, socket);
  } else {
    yourDrone['land']();
  }
}


// Code to kickoff array of steps
// run(steps.pop(), steps);