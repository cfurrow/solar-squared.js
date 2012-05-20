var solar = (function(){
  var pub         = {};
  var canvas      = null;
  var ctx         = null;
  var scaleFactor = 0.000005;
  pub.celestials  = [];

  pub.rescale = function(newScale) {
    var i=0,
        len=pub.celestials.length;
    scaleFactor = newScale;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(;i<len;i++){
      pub.celestials[i].draw(ctx,scaleFactor);
    }
  };

  pub.add = function(celestial){
    celestial.y = 300;
    pub.celestials.push(celestial);
  };

  pub.go = function(){
    for(var i=0; i<pub.celestials.length; i++){
      pub.celestials[i].draw(ctx,scaleFactor);
    }
  };

  function drawHelperLine(x){
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.beginPath();
    ctx.moveTo(x,0);
    ctx.lineTo(x,canvas.height);
    ctx.stroke();
  }

  pub.init = function(){
    canvas = document.getElementById("solar-system");
    ctx    = canvas.getContext('2d');

    circleDrawer.setContext(ctx);
  };
 
  return pub;
})();
