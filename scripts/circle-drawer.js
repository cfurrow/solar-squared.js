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

	return pub;
})();
