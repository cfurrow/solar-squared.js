var drawer = (function(){
  var pub    = {};
  pub.canvas = null;
  pub.ctx    = null;
  pub.scaleFactor = 0.00005;
  pub.start = {};
  pub.celestials = [];

  pub.drawCelestial = function(celestial){
    var x,y,radius;
    // x, y, radius, start angle (rads), end angle (rads), anticlockwise
    x = pub.start.x + celestial.distanceToSunMin * pub.scaleFactor;
    y = pub.start.y;
    radius = celestial.radius * pub.scaleFactor;
    if(radius < 1){
      radius = 1;
    }
    drawHelperLine(x);

    pub.ctx.fillStyle = celestial.fillStyle; 
    pub.ctx.beginPath();
    pub.ctx.arc(x,y,radius,0,Math.PI*2,true);
    pub.ctx.fill();
    pub.celestials.push({celestial:celestial,x:x,y:y,radius:radius});
  };

  function drawHelperLine(x){
    pub.ctx.lineWidth = 1;
    pub.ctx.strokeStyle = "rgb(255,255,255)";
    pub.ctx.beginPath();
    pub.ctx.moveTo(x,0);
    pub.ctx.lineTo(x,pub.canvas.height);
    pub.ctx.stroke();
  }

  pub.init = function(){
    pub.canvas = document.getElementById("solar-system");
    pub.ctx    = pub.canvas.getContext('2d');
    pub.start = {x:300,y:pub.canvas.height/2};
  };
 
  return pub;
})();
