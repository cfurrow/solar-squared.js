var solar = (function(){
  var pub         = {};
  var canvas      = null;
  var ctx         = null;
  var scaleFactor = 0.000005;
	var ticks       = 0;
	var FPS         = 30;
  pub.celestials  = [];

  pub.rescale = function(newScale) {
    scaleFactor = newScale;
    ctx.clearRect(0,0,canvas.width,canvas.height);
  };

  pub.add = function(celestial){
    celestial.y = 300;
    pub.celestials.push(celestial);
  };

  pub.go = function(){
		setInterval(function(){
			draw();
			drawTicks();
			drawScale();
			ticks++;
		},1000/FPS);
  };

	function draw(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var i=0; i<pub.celestials.length; i++){
      pub.celestials[i].draw(ctx,scaleFactor);
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
		ctx.fillText("Current Scale: " + scaleFactor,15,30);
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
    canvas = document.getElementById("solar-system");
    ctx    = canvas.getContext('2d');

    circleDrawer.setContext(ctx);
  };
 
  return pub;
})();
