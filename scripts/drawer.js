var drawer = (function(){
  var pub    = {};
  pub.canvas = null;
  pub.ctx    = null;
  pub.scaleFactor = 0.00015;
  pub.start = {};
  pub.celestials = [];

  pub.rescale = function(newScale) {
    var i=0,
        len=pub.celestials.length;
    pub.scaleFactor = newScale;
    pub.ctx.clearRect(0,0,pub.canvas.width,pub.canvas.height);
    for(;i<len;i++){
      pub.drawCelestial(pub.celestials[i].celestial,false,true);
    }
  };

  pub.addAndDraw = function(celestial,showLine,showOrbit){
    var x,y,radius;
    pub.drawCelestial(celestial,showLine,showOrbit);
    x = pub.start.x + celestial.distanceToSunMin * pub.scaleFactor;
    y = pub.start.y;
    radius = celestial.radius * pub.scaleFactor;
    pub.celestials.push({celestial:celestial,x:x,y:y,radius:radius});
  };

  pub.drawCelestial = function(celestial,showLine,showOrbit){
    var x,y,radius;
    // x, y, radius, start angle (rads), end angle (rads), anticlockwise
    x = pub.start.x + celestial.distanceToSunMin * pub.scaleFactor;
    y = pub.start.y;
    radius = celestial.radius * pub.scaleFactor;
    if(radius < 1){
      radius = 1;
    }
    if(showLine){
      drawHelperLine(x);
    }
    if(showOrbit){
      drawOrbit(x,y);
    }
    pub.ctx.font = "16pt Helvetica";
    pub.ctx.fillStyle = "rgb(255,255,255)";
    pub.ctx.fillText(celestial.name,x+radius+15,y+(radius/2));

    pub.ctx.fillStyle = celestial.fillStyle; 
    pub.ctx.beginPath();
    pub.ctx.arc(x,y,radius,0,Math.PI*2,true);
    pub.ctx.fill();
  };

  function drawHelperLine(x){
    pub.ctx.lineWidth = 1;
    pub.ctx.strokeStyle = "rgb(255,255,255)";
    pub.ctx.beginPath();
    pub.ctx.moveTo(x,0);
    pub.ctx.lineTo(x,pub.canvas.height);
    pub.ctx.stroke();
  }

  function drawOrbit(x,y){
    var radius = x - pub.start.x;
    pub.ctx.lineWidth = 1;
    pub.ctx.strokeStyle = "rgb(255,255,255)";
    pub.ctx.beginPath();
    pub.ctx.arc(pub.start.x,pub.start.y,radius,0,Math.PI*2,true);
    pub.ctx.stroke();
  }

  pub.init = function(){
    pub.canvas = document.getElementById("solar-system");
    pub.ctx    = pub.canvas.getContext('2d');
    pub.start = {x:300,y:pub.canvas.height/2};
  };
 
  return pub;
})();
