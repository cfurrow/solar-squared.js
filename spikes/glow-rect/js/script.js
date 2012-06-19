/* Author: Carl Furrow (me@carlfurrow.com)

*/

function init(){
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  var x1,x2,y1,y2;
  x1 = 350;
  x2 = 350;
  y1 = 100;
  y2 = 300;

  var circleX, circleY;
  circleX = 350;
  circleY = 200;

  var radius = 200;

  var deg1, deg2;
  deg1 = 90 * (180/Math.PI);
  deg2 = 180 * (180/Math.PI);


  setInterval(function(){
    ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
    drawRect(ctx,x1,y1,100,100,"#ffde40",true);
    drawRect(ctx,x2,y2,100,100,"#ffdeff",true);
    if(deg1 > Math.Pi * 2){
      deg1 = 0;
    }
    else{
      deg1 += 0.0005 * (180/Math.PI);
    }
    if(deg2 > Math.Pi * 2){
      deg2 = 0;
    }
    else{
      deg2 += 0.0005 * (180/Math.PI);
    }

    x1 = radius * (Math.cos(deg1)) + circleX;
    x2 = radius * (Math.cos(deg2)) + circleX;
    y1 = radius * (Math.sin(deg1)) + circleY;
    y2 = radius * (Math.sin(deg2)) + circleY;
  
  },60/1000);
}

function drawRect(ctx,x,y,w,h,fill,glow){
  if(glow){
    var glowsize = 1.3;
    var glowx = x+w/2; 
    var glowy = y+h/2;
    var glowrectw = w*2;
    var glowrecth = h*2;
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

