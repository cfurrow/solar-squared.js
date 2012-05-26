function Mercury(){
  this.radius           = 2439.7; //km
  this.fillStyle        = "rgb(200,0,0)";
  this.distanceToSunMin = 46000000; //km
  this.distanceToSunMax = 70000000; //km
  this.name             = "mercury";
  this.x                = 0;
  this.y                = 0;
  this.showLine         = false;
  this.showOrbit        = true;
  this.scale            = 1;
  this.orbitRadius      = function(){ 
    return this.distanceToSunMin * this.scale; 
  };
}

Mercury.prototype.draw = function(ctx){
  circleDrawer.drawCircle(ctx,this,this.scale);
  circleDrawer.drawCircleStroked(ctx,this,this.scale);
  textDrawer.drawText(ctx,this.scale,this);
};
