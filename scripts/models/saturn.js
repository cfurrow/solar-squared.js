function Saturn(){
  this.radius = 12500; // km
  this.fillStyle = "#FF7100";
  this.distanceToSunMin = 1400000000;
  this.distanceToSunMax = this.distanceToSunMin; //km
	this.name="saturn";
  this.x = 0;
  this.y = 0;
  this.showLine = false;
  this.showOrbit = true;
}
Saturn.prototype.draw = function(ctx,scale){
  circleDrawer.drawCircle(ctx,this,scale);
  circleDrawer.drawCircleStroked(ctx,{radius:this.x,x:0,y:300},scale);
	textDrawer.drawText(ctx,this.x+(this.radius*scale),this.y+(this.radius*scale/2),this.name);
};
