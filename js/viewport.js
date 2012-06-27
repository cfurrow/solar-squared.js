function ViewPort(ctx){
  this._ctx    = ctx;
  this._width  = this._ctx.canvas.width;
  this._height = this._ctx.canvas.height;
  this._x      = 0;
  this._y      = 0;
  this._scale  = 1.0;
}

ViewPort.prototype.setX = function(x){
  this._x = x;
};

ViewPort.prototype.getX = function(){
  return this._x;
};

ViewPort.prototype.getXMax = function(){
  return this._x + this._width;
};

ViewPort.prototype.setY = function(y){
  this._y = y;
};

ViewPort.prototype.getY = function(){
  return this._y;
};

ViewPort.prototype.getYMax = function(){
  return this._y + this._height;
};

ViewPort.prototype.getWidth = function(){
  return this._width;
};

ViewPort.prototype.getHeight = function(){
  return this._height;
};

ViewPort.prototype.getViewPortX = function(objx){
  return (objx - this._x) * this.getScale();
};

ViewPort.prototype.getViewPortY = function(objy){
  return (objy - this._y) * this.getScale();
};

ViewPort.prototype.setScale = function(newscale){
  this._scale = newscale;
};

ViewPort.prototype.getScale = function(){
  return this._scale;
};

ViewPort.prototype.isObjectVisible = function(obj){
  var scalex = this.getViewPortX(obj.x);
  var scaley = this.getViewPortY(obj.y);
  var scalew = this.getScale() * obj.width;
  var scaleh = this.getScale() * obj.height;
  var maxx = (scalex + scalew);
  var maxy = (scaley + scaleh);

  if( (scalex <= this.getXMax() || scalex >= this.getX()) || (maxx <= this.getXMax() || maxx >= this.getX()) )
  {
    if( (scaley <= this.getYMax() || scaley >= this.getY()) || (maxy <= this.getYMax() || maxy >= this.getY()) ){
      return true;
    }
  }

  return false;
};

ViewPort.prototype.setCenter = function(x,y){
  // viewport.x = x-viewport.width
  this.setX( x - this.getWidth()/2 ); 
  this.setY( y - this.getHeight()/2 );
};

ViewPort.prototype.getCenter = function(){
  var centerx = this.getX()+this.getWidth()/2;
  var centery = this.getY()+this.getHeight()/2;
  return [centerx,centery];
};

