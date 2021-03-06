var viewport;
var FPS = 30;
function init(){
  var ctx = document.getElementById('canvas').getContext('2d');
  viewport = new ViewPort(ctx);
  viewport.setX(100);
  viewport.setY(100);
  console.log(viewport.toString());


  var model = new Model();
  model.setX(101);
  model.setY(101);
  viewport.addModel(model);

  var model1 = new Model();
  model1._radius = 100;
  model1.setX(1000);
  model1.setY(301);
  viewport.addModel(model1);

  setInterval(function(){
    clear(ctx);
    viewport.drawModels();
  },FPS/1000);


  $("body").keydown(function(e){
    if(e.keyCode == 39){ // right
      viewport.setX(viewport.getX()+10);
    }
    else if(e.keyCode == 37){ // left
      viewport.setX(viewport.getX()-10);
    }
    else if(e.keyCode == 38){ // up
      viewport.setY(viewport.getY()-10);
    }
    else if(e.keyCode == 40){ // down
      viewport.setY(viewport.getY()+10);
    }
  });
  
}
function clear(ctx){
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
}
