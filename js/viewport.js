function ViewPort(ctx){
  this.ctx    = ctx;
  this.width  = this.ctx.canvas.width;
  this.height = this.ctx.canvas.height;
  this.x      = 0;
  this.y      = 0;
  this._scale  = 1.0;
}

ViewPort.prototype.getXMax = function(){
  return this.x + this.width;
};

ViewPort.prototype.getYMax = function(){
  return this.y + this.height;
};

ViewPort.prototype.transX = function(objx){
  return (objx - this.x) * this.getScale();
};

ViewPort.prototype.transY = function(objy){
  return (objy - this.y) * this.getScale();
};

ViewPort.prototype.transToLocal = function(obj){
  return {
    x:      this.transX(obj.x),
    y:      this.transY(obj.y),
    width:  this.getScale() * obj.width,
    height: this.getScale() * obj.height,
    fillStyle: obj.fillStyle
  };
};

ViewPort.prototype.setScale = function(newscale){
  if(newscale !== this._scale){
    this._scale = newscale;
    var oldcenter = this.getCenter();
    this.setCenter(oldcenter[0],oldcenter[1]);
  }
};

ViewPort.prototype.getScale = function(){
  return this._scale;
};

ViewPort.prototype._isObjectHorizontallyVisible = function(obj){
  return (obj.x >= 0 && obj.x <= this.width) || (obj.x+obj.width >= 0 && obj.x+obj.width <= this.width);
};

ViewPort.prototype._isObjectVerticallyVisible = function(obj){
  return (obj.y >= 0 && obj.y <= this.height) || (obj.y+obj.height >= 0 && obj.y+obj.height <= this.height);
};

ViewPort.prototype.isObjectVisible = function(obj){
  return this._isObjectHorizontallyVisible(obj) && this._isObjectVerticallyVisible(obj);
};

ViewPort.prototype.setCenter = function(x1,y1){
  this.x = ( x1 - this.width/2 ); 
  this.y = ( y1 - this.height/2 );
};

ViewPort.prototype.getCenter = function(){
  var centerx = this.x+this.width/2;
  var centery = this.y+this.height/2;
  return [centerx,centery];
};

