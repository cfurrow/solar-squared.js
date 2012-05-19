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
}

Venus.prototype.draw = function(ctx,scale){
  circleDrawer.drawCircle(ctx,this,scale);
  circleDrawer.drawCircleStroked(ctx,{radius:this.x,x:0,y:300},scale);
	textDrawer.drawText(ctx,this.x+(this.radius*scale),this.y+(this.radius*scale/2),this.name);
};
