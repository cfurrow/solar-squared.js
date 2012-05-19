var textDrawer = (function(){
	var pub = {};

	pub.drawText = function(ctx,x,y,text){
		ctx.font      = "16pt Helvetica";
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.fillText(text,x,y);
	};

	return pub;
})();
