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
}

Earth.prototype.draw = function(ctx,scale){
  circleDrawer.drawCircle(ctx,this,scale);
  circleDrawer.drawCircleStroked(ctx,this,scale);
	textDrawer.drawText(ctx,scale,this);
};
