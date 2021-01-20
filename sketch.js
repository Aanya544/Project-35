var balloon;
var database;
var bgImage,balloonImage;

function preload(){
bgImage=loadImage("pro-C35 images/Hot Air Ballon-01.png");
balloonImage=loadImage("pro-C35 images/Hot Air Ballon-02.png")
}

function setup() {
  createCanvas(800,400);
  database=firebase.database();

  balloon = createSprite(250,250,10,10);
  balloon.addImage("balloonImage",balloonImage);
  balloon.scale=0.7;
  balloon.shapeColor = "red";
  var balloonPosition=database.ref('balloon/position')
  balloonPosition.on("value",readPosition,showError);
  
}

function draw() {
  background(bgImage);

  textSize(20);
  fill("black");
  strokeWeight(2);
  stroke("black");
  text("Use The Arrow Keys To Move The Hot Air Balloon",50,20)



  if(keyDown(LEFT_ARROW)){
    updateHeight(-1,0);
}
else if(keyDown(RIGHT_ARROW)){
  updateHeight(1,0);
}
else if(keyDown(UP_ARROW)){
  updateHeight(0,-1);
}
else if(keyDown(DOWN_ARROW)){
  updateHeight(0,1);
}  
  drawSprites();
}

function updateHeight(x,y){
database.ref('balloon/position').set({
  'x': height.x+x,
  'y': height.y+y
})
}

function readPosition(data){
  height=data.val();
  balloon.x=height.x;
  balloon.y=height.y;
  }
  function showError(){
  console.log("getting error while reading values from database");
  
  }