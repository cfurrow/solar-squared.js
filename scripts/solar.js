var solar = (function(){
  var pub         = {};
  var canvas      = null;
  var ctx         = null;
  var scaleFactor = 0.000005;
  var scaleStep   = 0.0000001;
  var KM_TO_MILE  = 0.621371192;
  var ticks       = 0;
  var FPS         = 30;
  pub.celestials  = [];

  pub.rescale = function(newScale) {
    scaleFactor = newScale;
    ctx.clearRect(0,0,canvas.width,canvas.height);
    _.each(pub.celestials,function(o){
      o.scale = newScale; 
      _.each(o.orbiters,function(o1){
        o1.scale = newScale; 
      });
    });
    viewPort.setScale(newScale);
  };

  pub.add = function(celestial){
    celestial.x = celestial.distanceToSunMin * scaleFactor;
    celestial.y = 300;
    celestial.scale = scaleFactor;
    pub.celestials.push(celestial);
  };

  pub.go = function(){
    this.rescale(scaleFactor);
    setInterval(function(){
      draw();
      drawTicks();
      drawScale();
      ticks++;
    },1000/FPS);
  };

  function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    eachCelestial(function(c){c.draw(ctx);});
  }

  function eachCelestial(callback){
    for(var i=0; i<pub.celestials.length; i++){
      callback(pub.celestials[i]);
    }
  }

  function drawTicks() {
    ctx.font      = "14pt Helvetica";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText("Ticks: " + ticks,15,15);
  }

  function drawScale(){
    ctx.font      = "14pt Helvetica";
    ctx.fillStyle = "rgb(255,255,255)";
    ctx.fillText("Current Scale: One pixel = " + scaleFactor + " km or " + (scaleFactor*KM_TO_MILE) + " miles",15,30);

  }

  function drawHelperLine(x){
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgb(255,255,255)";
    ctx.beginPath();
    ctx.moveTo(x,0);
    ctx.lineTo(x,canvas.height);
    ctx.stroke();
  }

  pub.init = function(){
    canvas        = document.getElementById("solar-system");
    ctx           = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    window.onresize = function(){
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    viewPort.init(0,0,canvas.width,canvas.height);

    circleDrawer.setContext(ctx);

    $(document).bind("keydown",function(e){
      var newscale = scaleFactor;
      if(e.which == 39){
        // Right
        if(e.shiftKey){
          viewPort.moveRight(1000000,pub.celestials);
        }
        else{
          viewPort.moveRight(100000,pub.celestials);
        }
      }
      else if(e.which == 37){
        // Left
        if(e.shiftKey){
          viewPort.moveLeft(1000000,pub.celestials);
        }
        else{
          viewPort.moveLeft(100000,pub.celestials);
        }
      }
      else if(e.which == 187 ){
        // + or =
        newscale = scaleFactor + scaleStep;
        if(e.shiftKey && !e.ctrlKey){
          newscale = scaleFactor + (scaleStep * 10);
        }
        else if(e.shiftKey && e.ctrlKey){
          newscale = scaleFactor + (scaleStep * 1000);
        }
        solar.rescale(newscale);
      }
      else if(e.which == 189){
        // - or _
        newscale = scaleFactor - scaleStep;
        if(e.shiftKey && !e.ctrlKey){
          newscale = scaleFactor - (scaleStep * 10);
        }
        else if(e.shiftKey && e.ctrlKey){
          newscale = scaleFactor - (scaleStep * 1000);
        }
        solar.rescale(newscale);
      }
      else if(e.which == 48) {
        // 0
        solar.rescale(0.000005);
      }
    });
  };
 
  return pub;
})();
