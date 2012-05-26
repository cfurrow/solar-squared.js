function Jupiter(){
  this.radius = 71492; // km
  this.fillStyle = "#FF7100";
  this.distanceToSunMin = 778000000;
  this.distanceToSunMax = this.distanceToSunMin; //km
	this.name="jupiter";
  this.x =0;
  this.y = 0;
  this.showLine = false;
  this.showOrbit = true;
	this.scale = 1;
	this.orbitRadius      = function(){ return this.distanceToSunMin * this.scale; };
}

Jupiter.prototype.draw = function(ctx){
  circleDrawer.drawCircle(ctx,this,this.scale);
  circleDrawer.drawCircleStroked(ctx,this,this.scale);
	textDrawer.drawText(ctx,this.scale,this);
};
