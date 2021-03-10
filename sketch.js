var brick, brickH, brickV;
var tank, tank_f, tank_l, tank_r, tank_b;
var missile, missile_frnt, missile_back, missile_left, missile_rght;
var emissile, emissile_frnt, emissile_back, emissile_left, emissile_rght;
var diamond, diamondImg;
var score=0;
var side=0;
var front=1;
var back=2;
var left=3;
var right=4;
var eside=10;
var efront=20;
var eback=30;
var eleft=40;
var eright=50;
var brick_num;
var life;
var gameState=0;
var PLAY=0;
var END=1;
var e1, e2, e3, e4, e5, e6, e7, e8;
var array1=[];
var diff;
var explosion, missileSound;
var backG,backImg
function preload(){
  brickH=loadImage("brick.jpg");
  brickV=loadImage("brick1.jpg");
  //tank images
  tank_f=loadImage("tank.frnt.png");
  tank_b=loadImage("tank.back.png");
  tank_l=loadImage("tank.left.png");
  tank_r=loadImage("tank.rght.png");
  // missile image for tank
  missile_frnt=loadImage("missile.frnt.png");
  missile_back=loadImage("missile.back.png");
  missile_left=loadImage("missile.left.png");
  missile_rght=loadImage("missile.rght.png");
  // missile image for enemies
  emissile_frnt=loadImage("missile.frnt.png");
  emissile_back=loadImage("missile.back.png");
  emissile_left=loadImage("missile.left.png");
  emissile_rght=loadImage("missile.rght.png");
  // images of diamond
  diamondImg=loadImage("diamond.png");
  // sound of missile and explosion
  explosion=loadSound("explosion.mp3");
  missileSound=loadSound("missile.mp3");
  // background image
  backImg=loadImage("background.jpg");
}
function setup() {
  createCanvas(1000,800);
  brickGroup=new Group();
  missileGroup=new Group();
  emissileGroup=new Group();
  side=front;
  life=3;
  
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
  // making diamond
  diamond=createSprite(490,735,50,50);
  diamond.addImage(diamondImg);
  diamond.scale=0.05


  // enemys
  e1=new Enemy(50,50);
  e2=new Enemy(50,650);
  e3=new Enemy(430,430);
  e4=new Enemy(855,50);
  e5= new Enemy(850,650);
  e6= new Enemy(50,400);
  e7=new Enemy(860,400)
  array1=[e1,e2,e3,e4,e5,e6,e7];

  gameState=PLAY;
  
}

function draw() {
    background(backImg)
  if(gameState===PLAY){
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
      missileSound.play();
      spawnMissile();
    }  
    //trying to make the brick go away when bullet hits it
    for(var i=0;i<brickGroup.length;i++){
      var touching=brickGroup[i].touching
      for(key in touching){

      }
    }

    // collide for all tanks
    collideTank();

    // display for all enemyTanks
    e1.display();
    e2.display();
    e3.display();
    e4.display();
    e5.display();
    e6.display();
    e7.display();

    for(enemy in array1){
      if(array1[enemy].body.isTouching(missileGroup)){ 
        array1[enemy].body.remove();
        // add score 
        score+=1;

        //add sounds
        explosion.play();
        var filtered = array1.filter(function(value,index,arr){
          return value===array1[enemy];
        })
        diff=array1.filter((x)=>!filtered.includes(x)) ;
        array1=diff;
        console.log(enemy)
        console.log(array1)
        break;  
      }
    }

    if(frameCount % 80===0 && array1.includes(e1)){
      spawn_eMissile(e1.body.position.x,e1.body.position.y);
    }
    if(frameCount % 80===0 && array1.includes(e2)){
      spawn_eMissile(e2.body.position.x,e2.body.position.y);
    }
    if(frameCount % 60===0 && array1.includes(e3)){
      spawn_eMissile(e3.body.position.x,e3.body.position.y)
    }
    if(frameCount % 60===0 && array1.includes(e4)){
      spawn_eMissile(e4.body.position.x,e4.body.position.y)
    }
    if(frameCount % 60===0 && array1.includes(e5)){
      spawn_eMissile(e5.body.position.x,e5.body.position.y)
    }

    if(emissileGroup.isTouching(tank)){
      tank.x=370;
      tank.y=740;
      life-=1;
      explosion.play();
    }
    
    if(score===7 || life===0 || emissileGroup.isTouching(diamond)){
      gameState=END;
    }
  }  
  drawSprites();
  if(gameState===END){
      if(score===7){
        textSize(36);
        textFont("Serif");
        stroke("green")
        strokeWeight(1.5);
        fill("green");
        text("You saved the diamond",350,375);
      }else if(life===0){
        textSize(36);
        stroke("green")
        strokeWeight(1.5);
        textFont("Serif");
        fill("green")
        text("enemies killed your tank",310,375);
       
        emissileGroup.destroyEach();
      }else if(emissileGroup.isTouching(diamond)){
        textSize(36);
        stroke("green")
        strokeWeight(1.5)
        textFont("Serif");
        fill("green");
        text("the diamond got stolen",310,375);
        emissileGroup.setVelocityYEach(0);
        emissileGroup.setVelocityXEach(0);
        emissileGroup.setLifetimeEach(-1);

      }
      tank.visible=false;
      e1.body.velocityY=0;
      e2.body.velocityY=0;
      e3.body.velocityY=0;
      e4.body.velocityY=0;
      e5.body.velocityY=0;
      e6.body.velocityY=0;
      e7.body.velocityY=0;

      e1.body.velocityX=0;
      e2.body.velocityX=0;
      e3.body.velocityX=0;
      e4.body.velocityX=0;
      e5.body.velocityX=0;
      e6.body.velocityX=0;
      e7.body.velocityX=0;
    }
  //display for score
  textSize(28);
  fill("skyblue");
  text("score:"+score,900,25);
}

function spawnBrick(x,y,w,h,rows,columns,a,imageT){
  var original_x=x;
  for(var i=0;i<rows;i++){
    y+=a;2
    x=original_x
    for(var j=0;j<columns;j++){
      brick=createSprite(x,y,w,h);
      brick.addImage(imageT);
      brick.scale=0.535;
      x+=60;
      brickGroup.add(brick);
    }
  
  }
}

function spawnMissile(){
  missile=createSprite(tank.x,tank.y,4,10);
  missile.lifetime=140;
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

function spawn_eMissile(x,y){
  emissile=createSprite(x,y,4,10);
  emissile.lifetime=140;
  emissile.scale=0.1;
  if(eside===efront){
    emissile.velocityY=-8;
    emissile.addImage(emissile_frnt);
  }else if(eside===eback){
    emissile.velocityY=8;
    emissile.addImage(emissile_back);
  }else if(eside===eleft){
    emissile.width=10;
    emissile.height=4;
    emissile.velocityX=-8;
    emissile.addImage(emissile_left);
  }else if(eside===eright){
    emissile.width=10;
    emissile.height=4;
    emissile.velocityX=8;
    emissile.addImage(emissile_rght);
  } 
   emissile.depth=tank.depth-1;
   emissileGroup.add(emissile);
}

function collideTank(){
  tank.collide(brickGroup);
  e1.body.collide(e2.body);
  e1.body.collide(e2.body);
  e1.body.collide(e3.body);
  e1.body.collide(e4.body);
  e1.body.collide(e5.body);
  e1.body.collide(e6.body);
  e1.body.collide(e7.body);
  e2.body.collide(e3.body);
  e2.body.collide(e4.body);
  e2.body.collide(e5.body);
  e2.body.collide(e6.body);
  e2.body.collide(e7.body);
  e3.body.collide(e4.body);
  e3.body.collide(e5.body);
  e3.body.collide(e6.body);
  e3.body.collide(e7.body);
  e4.body.collide(e5.body);
  e4.body.collide(e6.body);
  e4.body.collide(e7.body);
  e5.body.collide(e6.body);
  e5.body.collide(e7.body);
  e6.body.collide(e7.body);
}