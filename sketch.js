var tower, towerImg;
var door, doorImg;
var climber, climberImg;
var ghost,ghostImg;
var climbersGroup,gameState,doorsGroup;
var PLAY=1;
var END=0;
var gameState=PLAY,gameOver,gameOverImg,spookySound;

function preload() {
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png")
  climberImg = loadImage("climber.png")
  ghostImg = loadImage("ghost-standing.png")
  gameOverImg = loadImage("20201022_144153_0000.png")
  spookySound = loadSound("spooky.wav")
}

function setup() {
  spookySound.loop();

  createCanvas(600, 600)

  tower = createSprite(300, 300);
  tower.addImage(towerImg);
  tower.velocityY = 2;
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage(ghostImg);
  ghost.scale=0.3;
  
  gameOver = createSprite(300,300);
  gameOver.addImage(gameOverImg);
  gameOver.visible=false;
  gameOver.scale=0.5;
  
  climbersGroup = new Group();
  doorsGroup = new Group();
}

function draw() {
  background("black");

  if (gameState===PLAY) {   
    if (tower.y > 400) {
    tower.y = 300;
  }
  
  if (keyDown(LEFT_ARROW)) {
   ghost.x=ghost.x-3; 
}
  
  if (keyDown(RIGHT_ARROW)) {
   ghost.x=ghost.x+3; 
}
  
  if (keyDown("space")) {
  ghost.velocityY=-5; 
}
 //add gravity
  ghost.velocityY=ghost.velocityY+0.5;

  spawnDoors();
  
  if(ghost.isTouching(climbersGroup)) {
  gameState=END;
    
  }
  }
  else if (gameState===END) {
  gameOver.visible=true;
    
  tower.velocityY=0;
  ghost.velocityY=0;
    
  climbersGroup.visible=false;
  doorsGroup.visible=false;
  }
  
  drawSprites();
}

function spawnDoors() {
  if (frameCount % 240 === 0) {
    door = createSprite(200, -50);
    door.velocityY=2;
    
    climber = createSprite(200, 10);
    climber.velocityY=2;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.x= Math.round(random(120, 360))
        
    //add lifetime
    door.lifetime = 800;
    climber.lifetime = 800;
    
   climber.x=door.x;
    ghost.depth=door.depth;
    ghost.depth=ghost.depth=1;
    
    climbersGroup.add(climber);
    doorsGroup.add(door);
  }
}