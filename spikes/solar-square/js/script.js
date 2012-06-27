/* Author: Carl Furrow (me@carlfurrow.com)

*/

function init(){
  var FPS       = 1;
  var canvas    = document.getElementById('canvas');
  var ctx       = canvas.getContext('2d');

  setInterval(function(){
    resizeToFit(ctx);
    clear(ctx);
  },1000/FPS);
}

function resizeToFit(ctx){
  ctx.canvas.height = window.innerHeight;
  ctx.canvas.width  = window.innerWidth;
}
function clear(ctx) {
  ctx.fillStyle = "#000";
  ctx.clearRect(ctx.canvas.width,ctx.canvas.height);
}

