/* Author: Carl Furrow (me@carlfurrow.com)

*/

var solar = (function(){
  var FPS          = 40;
  var canvas       = null; 
  var ctx          = null;
  var viewport     = null;
  var entities     = [];
  var nonViewable  = [];
  var pub          = {};

  var glowImages   = [];
  var img   = new Image();
  img.src   = "img/glow_squared_ffffff_100x100.png";
  glowImages.push(img);

  img       = new Image();
  img.src   = "img/glow_circled_ffffff_100x100.png";
  glowImages.push(img);

  img       = new Image();
  img.src   = "img/glow_squared_ffc844_100x100.png";
  glowImages.push(img);


  pub.nonViewable  = nonViewable;

  function init(){
    canvas           = document.getElementById('canvas');
    ctx              = canvas.getContext('2d');
    viewport         = new ViewPort(ctx);
    window.viewport  = viewport;
    window.startTime = new Date();
    entities     = [];
    nonViewable  = [];

    viewport.x = 0;
    viewport.y = 0;
    viewport.setScale(0.5);

    this.startY = viewport.transY( canvas.height / 2 );
    this.startX = viewport.transX( canvas.width /2 );

    createPlanets.call(this,this);

    //this.sun.x = canvas.width  / 2 - this.sun.width  / 2;
    //this.sun.y = canvas.height / 2 - this.sun.height / 2;

    entities.push(this.sun);
    entities.push(this.mercury);
    entities.push(this.venus);
    entities.push(this.earth);
    entities.push(this.mars);
    entities.push(this.jupiter);
    entities.push(this.saturn);
    entities.push(this.uranus);
    entities.push(this.neptune);

    pub.entities = entities;

    var i = 0; 
    var numEntities = entities.length;

    keyboard.init(this.sun);
    mouse.init();

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

    addGlow(ctx,obj,vp);

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

  function addGlow(ctx,obj,vp) {
    var localObj = vp.transToLocal(obj);
    if(obj.glow){
      if(typeof obj.glow !== "object"){
        obj.glow = {
          color:"ffffff",
          shape:"squared" 
        };
      }
      var endingFactor   = 2;
      var startingFactor = 1.5;
      var glowSteps      = 5;

      if(obj.glow.startingFactor){
        startingFactor = obj.glow.startingFactor;
      }
      if(obj.glow.endingFactor){
        endingFactor   = obj.glow.endingFactor;
      }
      if(obj.glow.steps){
        glowSteps = obj.glow.steps;
      }

      var glowStep = (endingFactor - startingFactor)/glowSteps;
      var glowX;
      var glowY;
      var glowW;
      var glowH;

      for(var i = startingFactor; i< endingFactor; i += glowStep){
        glowW   = localObj.width  * i;
        glowH   = localObj.height * i;
        glowX   = localObj.x - (glowW - localObj.width )/2;
        glowY   = localObj.y - (glowH - localObj.height)/2;
        if(!obj.glow.img){
          obj.glow.img = getGlowImageBasedOnCriteria(obj);
        }
        ctx.drawImage(obj.glow.img,glowX,glowY,glowW,glowH);
      }
    }
  }

  function getGlowImageBasedOnCriteria(obj){
    var img = _.filter(glowImages,function(img){
                var result = true;
                if(obj.glow.color){
                  result = result && new RegExp(obj.glow.color).test(img.src);
                }
                if(obj.glow.shape){
                  result = result && new RegExp(obj.glow.shape).test(img.src);
                }
                return result;
              });
    if(!img){
      img = glowImages[0];
    }
    else{
      img = img[0];
    }
    return img;
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
