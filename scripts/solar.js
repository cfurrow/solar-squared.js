var solar = (function(){
  var pub         = {};
  var canvas      = null;
  var ctx         = null;
  var scaleFactor = 0.000005;
	var scaleStep   = 0.000001;
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

		$(document).bind("keydown",function(e){
			var newscale = scaleFactor;
			if(e.which == 39){
				// right
			}
			else if(e.which == 37){
				// left
			}
			else if(e.which == 187 ){
				// + or =
				newscale = scaleFactor + scaleStep;
				if(e.shiftKey){
					newscale = scaleFactor + (scaleStep * 10);
				}
				solar.rescale(newscale);
			}
			else if(e.which == 189){
				// - or _
				newscale = scaleFactor - scaleStep;
				if(e.shiftKey){
					newscale = scaleFactor - (scaleStep * 10);
				}
				solar.rescale(newscale);
			}
		});
  };
 
  return pub;
})();
