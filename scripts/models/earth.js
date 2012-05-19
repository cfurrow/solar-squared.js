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
  circleDrawer.drawCircleStroked(ctx,{radius:this.x,x:0,y:300},scale);
	textDrawer.drawText(ctx,this.x+(this.radius*scale),this.y+(this.radius*scale/2),this.name);
};
