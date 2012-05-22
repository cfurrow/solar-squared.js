var textDrawer = (function(){ var pub = {};

	pub.drawText = function(ctx,scale,obj){
		ctx.font      = "16pt Helvetica";
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillText(obj.constructor.name,(obj.x+(obj.radius*scale)),(obj.y));
	};

	return pub;
})();
