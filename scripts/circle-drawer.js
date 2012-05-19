var circleDrawer = (function(){
	var pub = {};
	var ctx = null;

	pub.setContext = function(ctx) {
		this.ctx = ctx;
	};

	pub.drawCircle = function(ctx,info,scale){
		var radiusScaled = 0;
		if(!scale){
			scale = 1;
		}
		info.x       = info.distanceToSunMin * scale;
		radiusScaled = info.radius * scale;
		if(radiusScaled <= 1){
			radiusScaled = 1;
		}

		ctx.fillStyle = info.fillStyle; 
		ctx.beginPath();
		ctx.arc(info.x,info.y,radiusScaled,0,Math.PI*2,true);
		ctx.fill();
	};

	pub.drawCircleStroked = function(ctx,info,scale){
    pub.ctx.lineWidth = 1;
    pub.ctx.strokeStyle = "rgb(255,255,255)";
    pub.ctx.beginPath();
    pub.ctx.arc(info.x,info.y,info.radius,0,Math.PI*2,true);
    pub.ctx.stroke();
	};

	return pub;
})();
