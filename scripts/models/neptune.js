function Neptune(){
  this.radius           = 24764;
  this.fillStyle        = "#03899c";
  this.distanceToSunMin = 4500000000;
  this.distanceToSunMax = this.distanceToSunMin;
  this.x                = 0;
  this.y                = 0;
  this.showOrbit        = true;
	this.scale = 1;
	this.orbitRadius      = function(){ return this.distanceToSunMin * this.scale; };
}

Neptune.prototype.draw = function(ctx){
  circleDrawer.drawCircle(ctx,this,this.scale);
  circleDrawer.drawCircleStroked(ctx,this,this.scale);
	textDrawer.drawText(ctx,this.scale,this);
};
