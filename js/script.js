/* Author: Carl Furrow (me@carlfurrow.com)

*/

function init(){
  var FPS       = 30;
  var canvas    = document.getElementById('canvas');
  var ctx       = canvas.getContext('2d');
  var viewport  = new ViewPort(ctx);
  window.viewport = viewport;
  viewport.setScale(0.5);
  var entities  = [];

  var sun = {
    width: 100,
    height: 100,
    fillStyle: "#fff",
    x:0,
    y:0,
    orbit:false
  };
  sun.x = canvas.width  / 2 - sun.width  / 2;
  sun.y = canvas.height / 2 - sun.height / 2;
  viewport.setCenter( viewport.getViewPortX(sun.x), viewport.getViewPortY(sun.y) );

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
    clear(ctx);
    drawAxis(ctx);

    for(i=0;i<numEntities; i++)
    {
      updatePosition(entities[i],entities[0],viewport);
      draw(ctx,entities[i],viewport);
    }
  },1000/FPS);
}

function draw(ctx, obj, viewport){
  if(!viewport.isObjectVisible(obj)){
    ctx.strokeStyle = "#fff0f0";
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(viewport.getViewPortX(obj.x)-10,viewport.getViewPortY(obj.y));
    ctx.lineTo(viewport.getViewPortX(obj.x)+10,viewport.getViewPortY(obj.y));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(viewport.getViewPortX(obj.x),viewport.getViewPortY(obj.y)-10);
    ctx.lineTo(viewport.getViewPortX(obj.x),viewport.getViewPortY(obj.y)+10);
    ctx.stroke();

    return;
  }
  var x = viewport.getViewPortX(obj.x);
  var y = viewport.getViewPortY(obj.y);
  var scaledwidth = obj.width * viewport.getScale();
  var scaledheight = obj.height * viewport.getScale();
  ctx.fillStyle = obj.fillStyle; 
  ctx.fillRect(x,y,scaledwidth,scaledheight);

  if(obj.ring){
    var scaledringwidth = obj.ring.width * viewport.getScale();
    var scaledringheight = obj.ring.height * viewport.getScale();
    var ringx = x - (scaledringwidth - scaledwidth)/2;
    var ringy = y - (scaledringheight - scaledheight)/2;
    ctx.strokeStyle = obj.ring.strokeStyle;
    ctx.lineWidth = 1;
    ctx.strokeRect(ringx,ringy,scaledringwidth,scaledringheight);
  }
}

function getCenterCoords(obj){
  var x = obj.x + obj.width/2;
  var y = obj.y + obj.height/2;
  return [x,y];
}

function drawAxis(ctx){
  ctx.strokeStyle="#fff";
  ctx.lineWidth=1;
  var axisLength = 10000;

  ctx.beginPath();
  ctx.moveTo(viewport.getViewPortX(0),viewport.getViewPortY(0));
  ctx.lineTo(viewport.getViewPortX(0),viewport.getViewPortY(axisLength));
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(viewport.getViewPortX(0),viewport.getViewPortY(0));
  ctx.lineTo(viewport.getViewPortX(0),viewport.getViewPortY(-axisLength));
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(viewport.getViewPortX(0),viewport.getViewPortY(0));
  ctx.lineTo(viewport.getViewPortX(-axisLength),viewport.getViewPortY(0));
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(viewport.getViewPortX(0),viewport.getViewPortY(0));
  ctx.lineTo(viewport.getViewPortX(axisLength),viewport.getViewPortY(0));
  ctx.stroke();
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
  else{
    obj.x = obj.maxX;
    obj.y = obj.maxY;
  }
}

function clear(ctx) {
  ctx.fillStyle = "#000";
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}

