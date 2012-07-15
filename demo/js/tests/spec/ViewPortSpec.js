describe("viewport",function(){
  var viewport;

  beforeEach(function(){
    var canvas = document.getElementById("canvas");
    var ctx    = canvas.getContext('2d');
    viewport = new ViewPort(ctx);
  });

  it("can set center accurately",function(){
    viewport.setCenter(300,300);  

    expect(viewport.x).toBe(300-viewport.width/2);
    expect(viewport.y).toBe(300-viewport.height/2);
  });

  it("can translate x, y to local coordinates", function(){
    expect(viewport.transX(50)).toBe(50); 
    expect(viewport.transY(50)).toBe(50); 

    viewport.x = -10;
    viewport.y = 0;
    expect(viewport.transX(50)).toBe(60); 
    expect(viewport.transY(50)).toBe(50); 

    viewport.setScale(0.5);
    expect(viewport.transX(50)).toBe(30); 
    expect(viewport.transY(50)).toBe(25); 

  });

  it("can set scale accurately",function(){
    viewport.setScale(0.5); 

    expect(viewport.transX(50)).toBe(25);
    expect(viewport.transY(50)).toBe(25);
  });

  it("can compute its max x and y", function(){
    expect(viewport.getXMax()).toBe(960);
    expect(viewport.getYMax()).toBe(600);

    viewport.setCenter(300,300);
    expect(viewport.getXMax()).toBe(300+960/2);
    expect(viewport.getYMax()).toBe(300+600/2);

    viewport.setScale(0.5);
    // really?
    expect(viewport.getXMax()).toBe(300+960/2);
    expect(viewport.getYMax()).toBe(300+600/2);
  });
  
  it("can detect objects out of view",function(){
    var obj = {x:100,y:100,width:10,height:10};
    expect(viewport.isObjectVisible(obj)).toBe(true);

    obj = {x:-100,y:100, width:10, height:10};
    expect(viewport.isObjectVisible(obj)).toBe(false);

    viewport.setCenter(300,-100);
    expect(viewport.isObjectVisible(obj)).toBe(false);

    viewport.setScale(0.5);
    viewport.setCenter(300,-100);
    obj = {x:430,y:150,width:100,height:100};
    expect(viewport.isObjectVisible(obj)).toBe(true);

    viewport.setScale(0.5);
    viewport.x = 200;
    viewport.y = 0;
    obj = {x:102.5,y:265,width:10,height:10};
    expect(viewport.isObjectVisible(obj)).toBe(true);
  });
});
