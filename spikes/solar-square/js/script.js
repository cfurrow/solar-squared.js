/* Author: Carl Furrow (me@carlfurrow.com)

*/

function init(){
  var FPS       = 5;
  var canvas    = document.getElementById('canvas');
  var ctx       = canvas.getContext('2d');
  var viewport  = new ViewPort(ctx);

  resizeToFit(ctx);
  clear(ctx);

  var sun = {
    width: 100,
    height: 100,
    fillStyle: "#fff",
    x:0,
    y:0
  };
  sun.x = 100;
  sun.y = canvas.height /2 - sun.height/2;

  var mercury = {
    width: 1,
    height: 1,
    fillStyle: "#ff5d40",
    x: sun.x + sun.width/2 + 60,
    y: sun.y + sun.height/2
  };

  var venus = {
    width: 2,
    height: 2,
    fillStyle: "#ffb740",
    x: mercury.x + 40,
    y: mercury.y
  };

  var earth = {
    width: 2,
    height: 2,
    fillStyle: "#4869d6",
    x: venus.x + 60,
    y: venus.y
  };

  var mars = {
    width: 1,
    height: 1,
    fillStyle: "#A60000",
    x: earth.x + 60,
    y: earth.y
  };

  var jupiter = {
    width: 15,
    height: 15,
    fillStyle: "#ffb640",
    x: mars.x + 100,
    y: mars.y
  };

  var saturn = {
    width: 3,
    height: 3,
    fillStyle: "#ffb640",
    x: jupiter.x + 250,
    y: jupiter.y,
    ring: {
      width: 7,
      height: 7,
      strokeStyle: "#fff"
    }
  };

  var uranus = {
    width: 1,
    height: 1,
    fillStyle: "#33cdc7",
    x: saturn.x + 200,
    y: saturn.y
  };

  var neptune = {
    width: 1,
    height: 1,
    fillStyle: "#0b5fa5",
    x: uranus.x + 100,
    y: uranus.y
  };
  

  setInterval(function(){
    resizeToFit(ctx);
    clear(ctx);
    draw(ctx,sun,viewport);
    draw(ctx,mercury,viewport);
    draw(ctx,venus,viewport);
    draw(ctx,earth,viewport);
    draw(ctx,mars,viewport);
    draw(ctx,jupiter,viewport);
    draw(ctx,saturn,viewport);
    draw(ctx,uranus,viewport);
    draw(ctx,neptune,viewport);
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

function resizeToFit(ctx){
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width  = window.innerWidth;
}

function clear(ctx) {
  ctx.fillStyle = "#000";
  ctx.clearRect(ctx.canvas.width,ctx.canvas.height);
}

