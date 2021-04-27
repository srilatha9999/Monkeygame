var PLAY=1;
var END=0;
var gameState=PLAY;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score,survivaltime=0;
var background, backgroundImage;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(800,800);

  monkey=createSprite(80,300,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,1600,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  

  score=0;
  survivaltime=0;
  
  FoodGroup= new Group();
  obstacleGroup= new Group();

 
}


function draw() {
background("white");
  
if(gameState===PLAY){
  
        if(ground.x<0){
     ground.x=ground.width/2;
   }
       
        if (keyDown("space")){
     monkey.velocityY=-12
   }
   
  
   monkey.velocityY=monkey.velocityY+0.8;

  monkey.collide(ground);
  
 stroke("white");
  textSize(20);
  fill("white");
  text("score:"+score,500,50) 
  
stroke("black");
textSize(20);
fill("black");
survivaltime=Math.ceil(frameCount/frameRate());
text("survivalTime:"+survivaltime,100,50);

 bananas(); 
 obstacles();
       
  if(FoodGroup.isTouching(monkey)){
   FoodGroup.destroyEach();
   survivaltime=survivaltime+2;
       }



 if(obstacleGroup.isTouching(monkey)){
       gameState=END;
       obstacleGroup.destroyEach();
     }
}  
  if(gameState===END){
    monkey.destroy();
    ground.destroy();
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
    fill("red");
    textSize(40);
    text("Game Over",200,200);
}

 
  
  drawSprites();

}
function bananas(){
  if(World.frameCount%80==0){
    banana=createSprite(300,220,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.1;
    banana.y=Math.round(random(120,200));
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.lifetime=150;
    FoodGroup.add(banana);

  }
}
function obstacles(){
  if(World.frameCount%60==0){
    obstacle=createSprite(400,320,20,20);
    obstacle.scale=0.1;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    obstacle.addImage(obstacleImage);
    obstacleGroup.add(obstacle);
  }
}