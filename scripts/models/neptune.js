function Neptune(){
  this.radius           = 24764;
  this.fillStyle        = "#03899c";
  this.distanceToSunMin = 4500000000;
  this.distanceToSunMax = this.distanceToSunMin;
  this.x                = 0;
  this.y                = 0;
  this.showOrbit        = true;
}

Neptune.prototype.draw = function(ctx,scale){
  circleDrawer.drawCircle(ctx,this,scale);
  circleDrawer.drawCircleStroked(ctx,{radius:this.x,x:0,y:300},scale);
	textDrawer.drawText(ctx,scale,this);
};
