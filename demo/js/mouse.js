var mouse = (function(){
  var pub = {};

  var mouseDown = false;
  var startX;
  var startY;
  var endX;
  var endY;
  function handleMouseDown(e){
    mouseDown = true;
    startX = e.clientX;
    startY = e.clientY;
    //console.log("MouseDown: " + e.clientX + "," + e.clientY);
  }

  function handleMouseUp(e){
    mouseDown = false;
    endX = e.clientX;
    endY = e.clientY;

    viewport.x -= endX-startX;
    viewport.y -= endY-startY;
    //console.log("MouseUp: " + e.clientX + "," + e.clientY);
  }

  function handleMouseMove(e){
    if(e.which == 1 && e.button === 0 && !mouseDown){
      mouseDown=true;
      startX = e.clientX;
      startY = e.clientY;
    }
    else if(e.which === 1 && e.button === 0 && mouseDown){
      viewport.x -= e.clientX-startX;
      viewport.y -= e.clientY-startY;
      startX = e.clientX;
      startY = e.clientY;
    }
  }

  function init(){
    //window.onmousedown = handleMouseDown;
    window.onmouseup   = handleMouseUp;
    window.onmousemove = handleMouseMove;
  }

  pub.init = init;

  return pub;
})();
