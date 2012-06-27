/* Author: Carl Furrow (me@carlfurrow.com)

*/

function init(){
  var FPS       = 30;
  var canvas    = document.getElementById('canvas');
  var ctx       = canvas.getContext('2d');
  var viewport  = new ViewPort(ctx);
  var entities  = [];

  resizeToFit(ctx);
  clear(ctx);

  var sun = {
    width: 100,
    height: 100,
    fillStyle: "#fff",
    x:0,
    y:0,
    orbit:false
  };
  sun.x = canvas.width / 2 - sun.width /2;
  sun.y = canvas.height /2 - sun.height/2;

  var mercury = {
    width: 3,
    height: 3,
    fillStyle: "#ff5d40",
    x: sun.x + sun.width/2 + 60,
    y: sun.y + sun.height/2,
    orbit:true
  };

  var venus = {
    width: 5,
    height: 5,
    fillStyle: "#ffb740",
    x: mercury.x + 40,
    y: mercury.y,
    orbit:true
  };

  var earth = {
    width: 5,
    height: 5,
    fillStyle: "#4869d6",
    x: venus.x + 60,
    y: venus.y,
    orbit:true
  };

  var mars = {
    width: 3,
    height: 3,
    fillStyle: "#A60000",
    x: earth.x + 60,
    y: earth.y,
    orbit:true
  };

  var jupiter = {
    width: 20,
    height: 20,
    fillStyle: "#ffb640",
    x: mars.x + 100,
    y: mars.y,
    orbit:true
  };

  var saturn = {
    width: 7,
    height: 7,
    fillStyle: "#ffb640",
    x: jupiter.x + 250,
    y: jupiter.y,
    orbit:true,
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
    orbit:true
  };

  var neptune = {
    width: 3,
    height: 3,
    fillStyle: "#0b5fa5",
    x: uranus.x + 100,
    y: uranus.y,
    orbit:true
  };

  entities.push(sun);
  entities.push(mercury);
  entities.push(venus);
  entities.push(earth);
  entities.push(mars);
  entities.push(jupiter);
  entities.push(saturn);
  entities.push(uranus);
  entities.push(neptune);

  var i = 0; 
  var numEntities = entities.length;

  setInterval(function(){
    resizeToFit(ctx);
    clear(ctx);
    for(i=0;i<numEntities; i++)
    {
      updatePosition(entities[i],entities[0],viewport);
      draw(ctx,entities[i],viewport);
    }
  },1000/FPS);
}

function draw(ctx, obj, viewport){
  var x = viewport.getViewPortX(obj.x);
  var y = viewport.getViewPortY(obj.y);
  ctx.fillStyle = obj.fillStyle; 
  ctx.fillRect(x,y,obj.width,obj.height);

  if(obj.ring){
    var ringx = obj.x - (obj.ring.width - obj.width)/2;
    var ringy = obj.y - (obj.ring.height - obj.height)/2;
    ctx.strokeStyle = obj.ring.strokeStyle;
    ctx.strokeRect(ringx,ringy,obj.ring.width,obj.ring.height);
  }
}

function getCenterCoords(obj){
  var x = obj.x + obj.width/2;
  var y = obj.y + obj.height/2;
  return [x,y];
}

function updatePosition(obj, centerObj, viewport){
  if(!obj.orbit){ return; }
  var stepAmount = 5;
  if(!obj.orbitRadius){
    var centerObjCenter = getCenterCoords(centerObj);
    var objCenter       = getCenterCoords(obj);
    obj.orbitRadius = objCenter[0] - centerObjCenter[0];// difference between x and sun-center
    obj.maxX        = centerObjCenter[0] + obj.orbitRadius;
    obj.minX        = centerObjCenter[0] - obj.orbitRadius;
    obj.maxY        = centerObjCenter[1] + obj.orbitRadius;
    obj.minY        = centerObjCenter[1] - obj.orbitRadius;
    obj.x = obj.maxX;
    obj.y = obj.maxY;
  }
  if(obj.x >= obj.maxX && (obj.y <= obj.maxY && obj.y >= obj.minY)){
    // right side
    obj.y-=stepAmount;
    obj.x = obj.maxX;
  }
  else if(obj.y <= obj.minY && (obj.x <= obj.maxX && obj.x >= obj.minX)){
    // top
    obj.x-=stepAmount;
    obj.y=obj.minY;
  }
  else if(obj.x <= obj.minX && (obj.y <= obj.maxY && obj.y >= obj.minY)){
    // left
    obj.y+=stepAmount;
    obj.x=obj.minX;
  } 
  else if(obj.y >= obj.maxY && (obj.x <= obj.maxX && obj.x >= obj.minX)){
    // bottom
    obj.x+=stepAmount;
    obj.y=obj.maxY;
  }
}

function resizeToFit(ctx){
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width  = window.innerWidth;
}

function clear(ctx) {
  ctx.fillStyle = "#000";
  ctx.clearRect(ctx.canvas.width,ctx.canvas.height);
}

