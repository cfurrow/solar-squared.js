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
}

Mars.prototype.draw = function(ctx,scale){
  circleDrawer.drawCircle(ctx,this,scale);
  circleDrawer.drawCircleStroked(ctx,{radius:this.x,x:0,y:300},scale);
	textDrawer.drawText(ctx,scale,this);
};
