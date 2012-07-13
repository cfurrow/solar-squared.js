function createPlanets(context){
  var sun = {
    width: 100,
    height: 100,
    fillStyle: "#fff",
    x:context.startX,
    y:context.startY,
    orbit:false,
    name: "sun",
    glow:
        {
          startingFactor:1.1,
          endingFactor:3.0,
          steps:5,
          color:"ffffff",
          shape:"squared"
        }

  };

  var mercury = {
    width: 3,
    height: 3,
    fillStyle: "#ff5d40",
    x: sun.x + sun.width/2 + 60,
    y: sun.y + sun.height/2,
    orbit:true,
    name: "mercury"
  };

  var venus = {
    width: 5,
    height: 5,
    fillStyle: "#ffb740",
    x: mercury.x + 40,
    y: sun.y,
    orbit:true,
    name: "venus"
  };

  var earth = {
    width: 5,
    height: 5,
    fillStyle: "#4869d6",
    x: venus.x + 60,
    y: sun.y,
    orbit:true,
    name:"earth"
  };

  var mars = {
    width: 3,
    height: 3,
    fillStyle: "#A60000",
    x: earth.x + 60,
    y: sun.y,
    orbit:true,
    name:"mars"
  };

  var jupiter = {
    width: 20,
    height: 20,
    fillStyle: "#ffb640",
    x: mars.x + 100,
    y: sun.y,
    orbit:true,
    name:"jupiter"
  };

  var saturn = {
    width: 7,
    height: 7,
    fillStyle: "#ffb640",
    x: jupiter.x + 250,
    y: jupiter.y,
    orbit:true,
    name:"saturn",
    ring: {
      width: 14,
      height: 14,
      strokeStyle: "#fff"
    }
  };

  var uranus = {
    width: 3,
    height: 3,
    fillStyle: "#33cdc7",
    x: saturn.x + 200,
    y: saturn.y,
    orbit:true,
    name:"uranus"
  };

  var neptune = {
    width: 3,
    height: 3,
    fillStyle: "#0b5fa5",
    x: uranus.x + 100,
    y: uranus.y,
    orbit:true,
    name:"neptune"
  };

  context.sun     = sun;
  context.mercury = mercury;
  context.venus   = venus;
  context.earth   = earth;
  context.mars    = mars;
  context.jupiter = jupiter;
  context.saturn  = saturn;
  context.uranus  = uranus;
  context.neptune = neptune;
}
