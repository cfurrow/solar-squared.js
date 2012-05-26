function Venus(){
  this.radius           = 2439.7; //km
  this.fillStyle        = "rgb(255,246,115)";
  this.distanceToSunMin = 107000000; //km
  this.distanceToSunMax = 109000000; //km
  this.name             = "venus";
  this.x                = 0;
  this.y                = 0;
  this.showLine         = false;
  this.showOrbit        = true;
	this.scale = 1;
	this.orbitRadius      = function(){ 
		return this.distanceToSunMin * this.scale; 
	};
}

Venus.prototype.draw = function(ctx){
  circleDrawer.drawCircle(ctx,this,this.scale);
  circleDrawer.drawCircleStroked(ctx,this,this.scale);
	textDrawer.drawText(ctx,this.scale,this);
};
