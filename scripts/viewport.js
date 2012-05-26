var viewPort = (function(){
  var pub = {};

  var x      = 0;
  pub.x      = x;
  var y      = 0;
  pub.y      = y;

  var width  = 0;
  pub.width  = width;
  var height = 0;
  pub.height = height;

  var minX   = function(){return this.x;};
  pub.minX   = minX;
  var minY   = function(){return this.y;};
  pub.minY   = minY;

  var maxX   = function(){return this.x+this.width;};
  pub.maxX   = maxX;
  var maxY   = function(){return this.y+this.height;};
  pub.maxY   = maxY;
  
  var scale  = 1;
  pub.setScale = function(newScale){scale = newScale;};

  pub.init = function(x,y,width,height){
    this.x      = x;
    this.y      = y;
    this.width  = width;
    this.height = height;
  };

  pub.moveRight = function(amount,objects){
    this.x -= amount;
    _.each(objects,function(o){
      o.x -= amount;
      _.each(o.orbiters,function(o1){
        o1.x -= amount; 
      });
    });
  };

  pub.moveLeft = function(amount,objects){
    this.x += amount;
    _.each(objects,function(o){
      o.x += amount;
      _.each(o.orbiters,function(o1){
        o1.x += amount; 
      });
    });
  };

  return pub;
})();
