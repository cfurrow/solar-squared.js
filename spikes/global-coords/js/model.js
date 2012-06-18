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
	if(this._radius){
		return this._x - this._radius;
	}
	return this._x;
};
Model.prototype.getXMax = function(){
	if(this._radius){
		return this._x + this._radius;
	}
	return this._x + this._width;
};

Model.prototype.setY = function(y){
	return this._y = y;
};
Model.prototype.getY = function(){
	if(this._radius){
		return this._y-this._radius;
	}
	return this._y;
};
Model.prototype.getYMax = function(){
	if(this._radius){
		return this._y+this._radius;	
	}
	return this._y + this._height;
};

Model.prototype.setWidth = function(width){
	this._width = width;
};

Model.prototype.setHeight = function(height){
	this._height = height;
};


Model.prototype.draw = function(ctx,x,y){
	ctx.fillStyle = this._fillStyle;
	if(this._radius){
		ctx.beginPath();
		ctx.arc(x,y,this._radius,0,2*Math.PI,false);
		ctx.fill();
	}
	else{
		ctx.fillRect(x,y,this._width,this._height);
	}
};
