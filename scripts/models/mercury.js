function Mercury(){
  this.radius           = 2439.7; //km
  this.fillStyle        = "rgb(200,0,0)";
  this.distanceToSunMin = 46000000; //km
  this.distanceToSunMax = 70000000; //km
  this.name             = "mercury";
  this.x                = 0;
  this.y                = 0;
  this.showLine         = false;
  this.showOrbit        = true;
}

Mercury.prototype.draw = function(ctx,scale){
  circleDrawer.drawCircle(ctx,this,scale);
	textDrawer.drawText(ctx,this.x+(this.radius*scale),this.y+(this.radius*scale/2),this.name);
};
