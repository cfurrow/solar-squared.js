function ViewPort(ctx){
  this._ctx    = ctx;
  this._width  = this._ctx.canvas.width;
  this._height = this._ctx.canvas.height;
  this._x      = 0;
  this._y      = 0;
  this._models = [];
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
  return objx - this._x;
};

ViewPort.prototype.getViewPortY = function(objy){
  return objy - this._y;
};

ViewPort.prototype.isObjectVisible = function(obj){
  if(obj.getX && obj.getY && obj.getXMax && obj.getYMax){
    var x = this.getViewPortX(obj.getX());
    var y = this.getViewPortY(obj.getY());
    var maxx = this.getViewPortX(obj.getXMax());
    var maxy = this.getViewPortY(obj.getYMax());
    if(maxx >= this.getViewPortX(this.getX()) && x <= this.getViewPortX(this.getXMax())){
      if(maxy>=this.getViewPortY(this.getY()) && y <= this.getViewPortY(this.getYMax())){
        return true;
      }
    }
  }
  return false;
};

ViewPort.prototype.addModel = function(model){
  this._models.push(model);
};

ViewPort.prototype.drawModels = function(){
  var i=0;
  var len = this._models.length;
  var model = null;
  for(;i<len;i++){
    model = this._models[i];
    if(this.isObjectVisible(model)){
      model.draw(this._ctx,this.getViewPortX(model._x),this.getViewPortY(model._y));
    }
  }
};

ViewPort.prototype.toString = function(){
  var string = [];
	string.push("viewport.x: " + viewport.getX() + "\n");
	string.push("viewport.y: " + viewport.getY() + "\n");
	string.push("viewport.width: " + viewport.getWidth() + "\n");
	string.push("viewport.height: " + viewport.getHeight() + "\n");
  return string.join("");
};
