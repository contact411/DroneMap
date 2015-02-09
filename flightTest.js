var RollingSpider = require("rolling-spider");
 
var yourDrone = new RollingSpider("e06acd5b0c15412bbb41d078a33b8b1f");

yourDrone.connect(function() {
  yourDrone.setup(function() {
    yourDrone.startPing();

    runDroneSequence(yourDrone);

  });
});

function runDroneSequence(drone) {
  drone.flatTrim();
  drone.takeOff();
  setTimeout(function() {
    drone.forward();
    setTimeout(function() { 
      drone.backFlip();
      setTimeout(function() {
        drone.frontFlip();
        setTimeout(function() {
          drone.rightFlip();
          setTimeout(function() {
            drone.leftFlip();
            setTimeout(function() {
              drone.land();
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  }, 3000);
}