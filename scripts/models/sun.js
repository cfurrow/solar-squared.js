function Sun(){
  this.radius           = 696000; //km
  this.fillStyle        = "#FFFBB9"; 
  this.distanceToSunMin = 0;
  this.distanceToSunMax = 0;
  this.name             = "the sun";
  this.x                = 0;
  this.y                = 0;
  this.showLine         = false;
  this.showOrbit        = false;
  this.orbiters         = [];
  this.scale            = 1;
}

Sun.prototype.draw = function(ctx){
  circleDrawer.drawCircle(ctx,this,this.scale);
  textDrawer.drawText(ctx,this.scale,this);
  _.each(this.orbiters,function(o){
    o.draw(ctx);
  });
};

Sun.prototype.addOrbiter = function(orbiter){
  orbiter.orbits = this;
  orbiter.x = orbiter.distanceToSunMin;
  orbiter.y = 300;
  orbiter.scale = this.scale;
  this.orbiters.push(orbiter);
};

