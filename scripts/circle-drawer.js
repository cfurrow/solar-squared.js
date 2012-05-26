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
		radiusScaled = info.radius * scale;
		if(radiusScaled <= 1){
			radiusScaled = 1;
		}

		ctx.fillStyle = info.fillStyle; 
		ctx.beginPath();
		ctx.arc(info.x*scale,info.y,radiusScaled,0,Math.PI*2,true);
		ctx.fill();
	};

	pub.drawCircleStroked = function(ctx,info,scale){
		var radiusScaled;
		// var x = info.x - info.distanceToSunMin * scale;
		// var y = 300;

    pub.ctx.lineWidth = 1;
    pub.ctx.strokeStyle = "rgb(255,255,255)";
    pub.ctx.beginPath();
		// x, y, radius, start, end, counterclockwise
    pub.ctx.arc(info.orbits.x*scale, info.orbits.y, info.orbitRadius(), 0,Math.PI*2,true);
    pub.ctx.stroke();
	};

	return pub;
})();
