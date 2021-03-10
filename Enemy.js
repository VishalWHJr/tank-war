class Enemy{
    constructor(x, y){
        this.body=createSprite(x, y, 50,50);
        this.image_frnt=loadImage("enemy.frnt.png");
        this.image_back=loadImage("enemy.back.png");
        this.image_rght=loadImage("enemy.rght.png");
        this.image_left=loadImage("enemy.left.png");
        this.body.scale=0.25;
    }
    display(){
        if(frameCount%20 === 0){
        this.body.velocityY=Math.round(random(-5,5));
        this.body.velocityX=Math.round(random(-5,5));
        }
        if(this.body.velocityY>0){
            this.body.addImage(this.image_back);
            eside=eback;
        }
        if(this.body.velocityY<0){
            this.body.addImage(this.image_frnt);
            eside=efront;
        }
        if(this.body.velocityX>0){
            this.body.addImage(this.image_rght);
            eside=eright;
        }
        if(this.body.velocityX<0){
            this.body.addImage(this.image_left);
            eside=eleft;
        }
        this.body.collide(brickGroup);
        this.body.depth=tank.depth;
    }
      
}