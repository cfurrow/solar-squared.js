var drawer = (function(){
  var pub    = {};
  pub.canvas = null;
  pub.ctx    = null;
  pub.scaleFactor = 0.000005;
  pub.start = {};
  pub.celestials = [];

  pub.rescale = function(newScale) {
    var i=0,
        len=pub.celestials.length;
    pub.scaleFactor = newScale;
    pub.ctx.clearRect(0,0,pub.canvas.width,pub.canvas.height);
    for(;i<len;i++){
      pub.celestials[i].draw(pub.ctx,pub.scaleFactor);
    }
  };

  pub.add = function(celestial){
    celestial.y = 300;
    pub.celestials.push(celestial);
  };

  pub.go = function(){
    for(var i=0; i<pub.celestials.length; i++){
      pub.celestials[i].draw(pub.ctx,pub.scaleFactor);
    }
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

    circleDrawer.setContext(pub.ctx);
  };
 
  return pub;
})();
