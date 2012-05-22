function Sun(){
  this.radius           = 696000; //km
  this.fillStyle        = "#FFFBB9"; 
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

