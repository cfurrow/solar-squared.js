var drawer = (function(){
  var pub    = {};
  pub.canvas = null;
  pub.ctx    = null;
  pub.scaleFactor = 0.00001;
  pub.center = {};

  pub.drawCelestial = function(planet){
    var x,y,radius;
    pub.ctx.fillStyle = planet.fillStyle; 
    // x, y, radius, start angle (rads), end angle (rads), anticlockwise
    pub.ctx.beginPath();
    x = pub.center.x + planet.distanceToSunMin * pub.scaleFactor;
    y = pub.center.y;
    radius = planet.radius * pub.scaleFactor;
    pub.ctx.arc(x,y,radius,0,Math.PI*2,true);
    pub.ctx.fill();
  };

  pub.init = function(){
    pub.canvas = document.getElementById("solar-system");
    pub.ctx    = pub.canvas.getContext('2d');
    pub.center = {x:pub.canvas.width/2,y:pub.canvas.height/2};

    pub.ctx.fillStyle = "rgb(0,0,0)";
    pub.ctx.fill();
  };
 
  return pub;
})();
