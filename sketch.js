var brick, brickH, brickV;
var tank, tank_f, tank_l, tank_r, tank_b;
var missile, missile_frnt, missile_back, missile_left, missile_rght;
var side=0;
var front=1;
var back=2;
var left=3;
var right=4;
var brick_num;
function preload(){
  brickH=loadImage("brick.jpg");
  brickV=loadImage("brick1.jpg");
  //tank images
  tank_f=loadImage("tank.frnt.png");
  tank_b=loadImage("tank.back.png");
  tank_l=loadImage("tank.left.png");
  tank_r=loadImage("tank.rght.png");
  // missile image
  missile_frnt=loadImage("missile.frnt.png");
  missile_back=loadImage("missile.back.png");
  missile_left=loadImage("missile.left.png");
  missile_rght=loadImage("missile.rght.png");
}
function setup() {
  createCanvas(1000,800);
  brickGroup=new Group();
  missileGroup=new Group();
  side=front;
  
  // bound. around diamond
  spawnBrick(413,640,20,60,2,1,60,brickV);
  spawnBrick(568,640,20,60,2,1, 60,brickV);
  spawnBrick(430,655,60,20,1,3, 26.95, brickH);

  //Boundries vertical
  spawnBrick(10,-10,20,60,13,1,60,brickV);
  spawnBrick(985,-10,20,60,13,1,60,brickV);
  // boundrs horizontal
  spawnBrick(30,-15,60,20,1,17,26.95,brickH);
  spawnBrick(30,760,60,20,1,17,26.95,brickH);

  //in btwn horizontal walls
  spawnBrick(53, 70, 60, 20, 1, 4, 26.95, brickH);
  spawnBrick(278, 240, 60, 20, 1, 3, 26.95, brickH);
  spawnBrick(278, 326, 60, 20, 1, 4, 26.95, brickH);
  spawnBrick(173, 156, 60, 20, 1, 2, 26.95, brickH);
  spawnBrick(530, 480, 60, 20, 1, 4, 26.95, brickH);
  spawnBrick(238, 465, 60, 20, 1, 3, 26.95, brickH);
  spawnBrick(763, 70, 60, 20, 1, 4, 26.95, brickH);
  spawnBrick(698, 180, 60, 20, 1, 4, 26.95, brickH);
  spawnBrick(823, 300, 60, 20, 1, 3, 26.95, brickH);
  spawnBrick(813, 390, 60, 20, 1, 2, 26.95, brickH);
  spawnBrick(513, 570, 60, 20, 1, 4, 26.95, brickH);
  spawnBrick(53, 680, 60, 20, 1, 3, 26.95, brickH);
  spawnBrick(667, 677, 60, 20, 1, 3, 26.95, brickH);
  spawnBrick(874, 677, 60, 20, 1, 1, 26.95, brickH);



  // in btwn vertical walls
  spawnBrick(130, 140, 20, 60, 3, 1, 60, brickV);
  spawnBrick(130, 395, 20, 60, 3, 1, 60, brickV);
  spawnBrick(500, 70, 20, 60, 3, 1, 60, brickV);
  spawnBrick(500, 310, 20, 60, 3, 1, 60, brickV);
  spawnBrick(420, 130, 20, 60, 2, 1, 60, brickV);
  spawnBrick(585, 110, 20, 60, 5, 1, 60, brickV);
  spawnBrick(681, 188, 20, 60, 3, 1, 60, brickV);
  spawnBrick(831, 508, 20, 60, 3, 1, 60, brickV);
  spawnBrick(297, 475, 20, 60, 3, 1, 60, brickV);

  // making tank
  tank=createSprite(370, 740, 50, 50);
  tank.addImage(tank_f);
  tank.scale=0.6;
  tank.debug=true


}

function draw() {
  background(55,155,125);  
  if(keyDown(UP_ARROW)){
    tank.y=tank.y-5;
    tank.addImage(tank_f);
    side=front;
  }
  if(keyDown(DOWN_ARROW)){
    tank.y=tank.y+5;
    tank.addImage(tank_b);
    side=back;
  }
  if(keyDown(LEFT_ARROW)){
    tank.x=tank.x-5;
    tank.addImage(tank_l);
    side=left;
  }
  if(keyDown(RIGHT_ARROW)){
    tank.x=tank.x+5;
    tank.addImage(tank_r);
    side=right;
  }

  if(keyWentDown("space")){
    spawnMissile();
  }
  tank.overlap(brickGroup);

  for(var i=0;i<brickGroup.length;i++){
    var touching=brickGroup[i].touching
    for(key in touching){
      console.log(touching[key])
    }
  }

 // console.log(brickGroup[0]);
  drawSprites();
}

function spawnBrick(x,y,w,h,rows,columns,a,imageT){
  var original_x=x;
  for(var i=0;i<rows;i++){
    y+=a;
    x=original_x
   for(var j=0;j<columns;j++){
     brick=createSprite(x,y,w,h);
     brick.addImage(imageT);
     brick.scale=0.535;
     x+=60;
     brick.debug=true;
    brickGroup.add(brick);
   }
  
  }
}

function spawnMissile(){
  missile=createSprite(tank.x,tank.y,4,10);
  // missile.addImage(missileImg);
  missile.scale=0.1;
  if(side===front){
    missile.velocityY=-8;
    missile.addImage(missile_frnt);
  }else if(side===back){
    missile.velocityY=8;
    missile.addImage(missile_back);
  }else if(side===left){
    missile.width=10;
    missile.height=4;
    missile.velocityX=-8;
    missile.addImage(missile_left);
  }else if(side===right){
    missile.width=10;
    missile.height=4;
    missile.velocityX=8;
    missile.addImage(missile_rght);
  }
  missile.depth=tank.depth-1;
  missileGroup.add(missile);
}