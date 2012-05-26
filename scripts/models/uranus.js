function Uranus(){
  this.radius           = 25559;
  this.fillStyle        = "#36bbce";
  this.distanceToSunMin = 3000000000;
  this.distanceToSunMax = this.distanceToSunMin;
  this.x                = 0;
  this.y                = 0;
  this.showOrbit        = true;
	this.scale = 1;
	this.orbitRadius      = function(){ return this.distanceToSunMin * this.scale; };
}

Uranus.prototype.draw = function(ctx){
  circleDrawer.drawCircle(ctx,this,this.scale);
  circleDrawer.drawCircleStroked(ctx,this,this.scale);
	textDrawer.drawText(ctx,this.scale,this);
};
