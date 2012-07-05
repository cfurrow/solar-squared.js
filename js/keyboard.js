var keyboard = (function(){
  var pub = {};
  var sun = null;
  function handleKeyDown(e) {
    //console.log(e);
    var directionStep = 50;
    var zoomStep      = 0.01;
    if(e.shiftKey){
      directionStep = 100;
      zoomStep      = 0.5;
    }
    if(e.keyCode == 39){ 
      // right
      viewport.x += directionStep;
      return false;
    }
    else if(e.keyCode == 37){
      //left
      viewport.x -= directionStep;
      return false;
    }
    else if(e.keyCode == 38){
      //up
      viewport.y -= directionStep;
      return false;
    }
    else if(e.keyCode == 40){
      // down
      viewport.y += directionStep;
      return false;
    }
    else if(e.keyCode == 189) {
      // -
      viewport.setScale(viewport.getScale() - zoomStep);
    }
    else if(e.keyCode == 187){
      // =
      viewport.setScale(viewport.getScale() + zoomStep);
    }
    else if(e.keyCode == 67){
      //c = center
      //viewport.x = viewport.transX(sun.x) - viewport.width/2;
      //viewport.y = viewport.transY(sun.y) - viewport.height/2;
      //console.log("Centered at " + viewport.x + ", "+ viewport.y);
    }
  }

  function init(thesun){
    window.onkeydown = handleKeyDown;
    sun = thesun;
  }

  pub.init = init;
  return pub;
})();
