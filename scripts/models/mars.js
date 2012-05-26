function Mars() {
	this.radius = 3396.2; //km
  this.fillStyle = "rgb(200,0,0)";
  this.distanceToSunMin = 206669000; //km
  this.distanceToSunMax = 249209300; //km
	this.name = "mars";
	this.x = 0;
	this.y =0;
	this.showLine = false;
	this.showOrbit = true;
	this.scale = 1;
	this.orbitRadius      = function(){ return this.distanceToSunMin * this.scale; };
}

Mars.prototype.draw = function(ctx){
  circleDrawer.drawCircle(ctx,this,this.scale);
  circleDrawer.drawCircleStroked(ctx,this,this.scale);
	textDrawer.drawText(ctx,this.scale,this);
};
