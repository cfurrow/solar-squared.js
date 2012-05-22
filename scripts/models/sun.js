function Sun(){
  this.radius           = 696000; //km
  this.fillStyle        = "rgb(192,191,173)"; //http://forums.cgarchitect.com/8108-rgb-colour-sun.html
  this.distanceToSunMin = 0;
  this.distanceToSunMax = 0;
  this.name             = "the sun";
  this.x                = 0;
  this.y                = 0;
  this.showLine         = false;
  this.showOrbit        = false;
}

Sun.prototype.draw = function(ctx,scale){
  circleDrawer.drawCircle(ctx,this,scale);
	textDrawer.drawText(ctx,scale,this);
};

