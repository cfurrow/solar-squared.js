function Earth(){
  this.radius = 6371; //km
  this.fillStyle = "rgb(0,0,200)";
  this.distanceToSunMin = 147100000; //km
  this.distanceToSunMax = 152100000; //km
	this.name="earth";
  this.x = 0;
  this.y = 0;
  this.showLine = false;
  this.showOrbit = true;
	this.scale            = 1;
	this.orbitRadius      = function(){ return this.distanceToSunMin * this.scale; };
}

Earth.prototype.draw = function(ctx){
  circleDrawer.drawCircle(ctx,this,this.scale);
  circleDrawer.drawCircleStroked(ctx,this,this.scale);
	textDrawer.drawText(ctx,this.scale,this);
};
