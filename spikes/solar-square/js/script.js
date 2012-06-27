/* Author: Carl Furrow (me@carlfurrow.com)

*/

function init(){
  var FPS       = 5;
  var canvas    = document.getElementById('canvas');
  var ctx       = canvas.getContext('2d');
  var viewport  = new ViewPort(ctx);

  resizeToFit(ctx);
  clear(ctx);

  var sun = {
    width: 100,
    height: 100,
    fillStyle: "#fff",
    x:0,
    y:0
  };
  sun.x = canvas.width / 2 - sun.width/2;
  sun.y = canvas.height /2 - sun.height/2;

  setInterval(function(){
    resizeToFit(ctx);
    clear(ctx);
    draw(ctx,sun,viewport);
  },1000/FPS);
}

function draw(ctx, obj, viewport){
  var x = viewport.getViewPortX(obj.x);
  var y = viewport.getViewPortY(obj.y);
  ctx.fillStyle = obj.fillStyle; 
  ctx.fillRect(x,y,obj.width,obj.height);
}

function resizeToFit(ctx){
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width  = window.innerWidth;
}

function clear(ctx) {
  ctx.fillStyle = "#000";
  ctx.clearRect(ctx.canvas.width,ctx.canvas.height);
}

