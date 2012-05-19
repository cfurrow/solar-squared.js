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
}

Jupiter.prototype.draw = function(ctx,scale){
  circleDrawer.drawCircle(ctx,this,scale);
	textDrawer.drawText(ctx,this.x+(this.radius*scale),this.y+(this.radius*scale/2),this.name);
};
