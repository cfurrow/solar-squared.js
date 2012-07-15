var keyboard = (function(){
  var pub = {};
  var centerObj = null;
  var minStep = 5;
  var maxStep = 70;
  // We want to go from 1, to 50 in 2 seconds (~60 frames)
  // How much do we have to increase per frame?
  var increasePerFrame = (80/maxStep);
  var currentStep = minStep;
  function getCurrentStepAmount(){
    if(currentStep<maxStep){
      currentStep += increasePerFrame;
    }
    else{
      currentStep = maxStep;
    }
    return currentStep;
  }
  function handleKeyDown(e) {
    var directionStep = getCurrentStepAmount();
    var zoomStep      = 0.01;
    if(e.shiftKey){
      directionStep = getCurrentStepAmount() * 2;
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
      //viewport.x = viewport.transX(centerObj.x) - viewport.width/2;
      //viewport.y = viewport.transY(centerObj.y) - viewport.height/2;
      //console.log("Centered at " + viewport.x + ", "+ viewport.y);
    }
  }
  function handleKeyUp() {
    currentStep = minStep;
  }

  function init(obj){
    window.onkeydown = handleKeyDown;
    window.onkeyup   = handleKeyUp;
    centerObj = obj;
  }

  pub.init = init;
  return pub;
})();
