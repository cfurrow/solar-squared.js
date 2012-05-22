function Uranus(){
  this.radius           = 25559;
  this.fillStyle        = "#36bbce";
  this.distanceToSunMin = 3000000000;
  this.distanceToSunMax = this.distanceToSunMin;
  this.x                = 0;
  this.y                = 0;
  this.showOrbit        = true;
}

Uranus.prototype.draw = function(ctx,scale){
  circleDrawer.drawCircle(ctx,this,scale);
  circleDrawer.drawCircleStroked(ctx,{radius:this.x,x:0,y:300},scale);
	textDrawer.drawText(ctx,this.x+(this.radius*scale),this.y+(this.radius*scale/2),this.constructor.name);
};
