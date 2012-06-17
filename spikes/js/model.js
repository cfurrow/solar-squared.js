function Model(){
	this._x      = 0;
	this._y      = 0;
	this._width  = 10;
	this._height = 10;
	this._radius = null;
	this._fillStyle = "#ffffff";
}

Model.prototype.setX = function(x){
	return this._x = x;
};

Model.prototype.getX = function(){
	return this._x;
};
Model.prototype.getXMax = function(){
	if(this._radius){
	}
	else{
		return this._x + this._width;
	}
};

Model.prototype.setY = function(y){
	return this._y = y;
};
Model.prototype.getY = function(){
	return this._y;
};
Model.prototype.getYMax = function(){
	if(this._radius){
	}
	else{
		return this._y + this._height;
	}
};


Model.prototype.draw = function(ctx,x,y){
	ctx.fillStyle = this._fillStyle;
	ctx.fillRect(x,y,this._width,this._height);
};
