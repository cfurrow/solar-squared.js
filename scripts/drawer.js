var drawer = (function(){
  var pub    = {};
  pub.canvas = null;
  pub.ctx    = null;
  pub.scaleFactor = 0.00005;
  pub.start = {};
  pub.celestials = [];

  pub.drawCelestial = function(celestial){
    var x,y,radius;
    pub.ctx.fillStyle = celestial.fillStyle; 
    // x, y, radius, start angle (rads), end angle (rads), anticlockwise
    pub.ctx.beginPath();
    x = pub.start.x + celestial.distanceToSunMin * pub.scaleFactor;
    y = pub.start.y;
    radius = celestial.radius * pub.scaleFactor;
    if(radius < 1){
      radius = 1;
    }
    pub.ctx.arc(x,y,radius,0,Math.PI*2,true);
    pub.ctx.fill();
    pub.celestials.push({celestial:celestial,x:x,y:y,radius:radius});
  };

  pub.init = function(){
    pub.canvas = document.getElementById("solar-system");
    pub.ctx    = pub.canvas.getContext('2d');
    pub.start = {x:300,y:pub.canvas.height/2};
  };
 
  return pub;
})();
