/* Author: Carl Furrow (me@carlfurrow.com)

*/

function init(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  drawRect(ctx,300,400,100,100,"#ffde40",true);
  drawRect(ctx,300,200,100,100,"#ffde40",true);
}

function drawRect(ctx,x,y,w,h,fill,glow){
  if(glow){
    var glowsize = 1.3;
    var glowx = x+w/2; 
    var glowy = y+h/2;
    var glowrectw = w*2.1;
    var glowrecth = h*2.1;
    var glowrectx = glowx-glowrectw/2;
    var glowrecty = glowy-glowrecth/2;
    var radgrad = ctx.createRadialGradient(glowx,glowy,0,glowx,glowy,w*glowsize);
    radgrad.addColorStop(0,fill);
    radgrad.addColorStop(1,"rgba(0,0,0,0)");

    ctx.fillStyle = radgrad;
    ctx.strokeStyle = "#fff";
    ctx.fillRect(glowrectx,glowrecty,glowrectw,glowrecth);
    //ctx.strokeRect(glowrectx,glowrecty,glowrectw,glowrecth);
  }


  ctx.fillStyle = fill;
  ctx.fillRect(x,y,w,h);
}

