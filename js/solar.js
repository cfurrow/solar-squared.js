/* Author: Carl Furrow (me@carlfurrow.com)

*/

var solar = (function(){
  var FPS          = 30;
  var canvas       = null; 
  var ctx          = null;
  var viewport     = null;
  var entities     = [];
  var nonViewable  = [];
  var pub          = {};

  pub.nonViewable  = nonViewable;

  function init(){
    canvas           = document.getElementById('canvas');
    ctx              = canvas.getContext('2d');
    viewport         = new ViewPort(ctx);
    window.viewport  = viewport;
    window.startTime = new Date();
    entities     = [];
    nonViewable  = [];

    var startY = viewport.transY( canvas.height / 2 );

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
    viewport.x = 200;
    viewport.y = 0;
    //viewport.setCenter(10,-100);
    viewport.setScale(0.5);

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
      y: startY,
      orbit:true
    };

    var earth = {
      width: 5,
      height: 5,
      fillStyle: "#4869d6",
      x: venus.x + 60,
      y: startY,
      orbit:true
    };

    var mars = {
      width: 3,
      height: 3,
      fillStyle: "#A60000",
      x: earth.x + 60,
      y: startY,
      orbit:true
    };

    var jupiter = {
      width: 20,
      height: 20,
      fillStyle: "#ffb640",
      x: mars.x + 100,
      y: startY,
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

    pub.entities = entities;

    var i = 0; 
    var numEntities = entities.length;

    keyboard.init(sun);

    setInterval(function(){
      clear(ctx);
      //drawAxis(ctx);
      for(i=0;i<numEntities; i++)
      {
        updatePosition(entities[i],entities[0],viewport);
        draw(ctx,entities[i],viewport);
      }
    },1000/FPS);
  }
  pub.init = init;

  function drawCrossAt(ctx,obj,vp,style){
    if(style){
      ctx.strokeStyle = style;
    }
    else{
      ctx.strokeStyle = "#fff0f0";
    }
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(obj.x-10,obj.y);
    ctx.lineTo(obj.x+10,obj.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(obj.x,obj.y-10);
    ctx.lineTo(obj.x,obj.y+10);
    ctx.stroke();
  }

  function draw(ctx, obj, vp){
    ctx.moveTo(0,0);
    var localObj = vp.transToLocal(obj);
    if(!vp.isObjectVisible(localObj)){
      drawCrossAt(ctx,localObj,vp,obj.fillStyle);
      return;
    }
    ctx.fillStyle    = obj.fillStyle;
    ctx.fillRect(localObj.x,localObj.y,localObj.width,localObj.height);

    if(obj.ring){
      var scaledringwidth = obj.ring.width * vp.getScale();
      var scaledringheight = obj.ring.height * vp.getScale();
      var ringx = localObj.x - (scaledringwidth - localObj.width)/2;
      var ringy = localObj.y - (scaledringheight - localObj.height)/2;
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
    ctx.moveTo(viewport.transX(0),viewport.transY(0));
    ctx.lineTo(viewport.transX(0),viewport.transY(axisLength));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(viewport.transX(0),viewport.transY(0));
    ctx.lineTo(viewport.transX(0),viewport.transY(-axisLength));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(viewport.transX(0),viewport.transY(0));
    ctx.lineTo(viewport.transX(-axisLength),viewport.transY(0));
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(viewport.transX(0),viewport.transY(0));
    ctx.lineTo(viewport.transX(axisLength),viewport.transY(0));
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

  return pub;
})();
