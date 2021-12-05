
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
var PLAY = 1, STOP = 2;
var gameState = PLAY, bg, player1, player, backgroundg, score, heart1, heart2, heart3
function preload()
{
	bg = loadImage ("images/bg3.jpg")
	player1 = loadAnimation("images/1.png","images/2.png","images/3.png","images/4.png")
	heart = loadImage("images/heart.png")
	ghost1 = loadImage("images/ghost2.png")
	player2 = loadAnimation("images/1.png")
	gameoverimg = loadImage("images/gameover.png")
}

function setup() {
	createCanvas(1600, 800);

	engine = Engine.create();
	world = engine.world;


	//Create the Bodies Here.

	

	ground = createSprite(800, 710, 1600, 40)
	score = 0
ground.visible = false

backgroundg = createSprite(800,260)
backgroundg.addImage(bg)
backgroundg.x = backgroundg.width/2
backgroundg.velocityX = -2


player = createSprite(150, 570)
player.addAnimation("walking", player1)
player.addAnimation("stop", player2)
player.scale = 0.75
player.tint = 0

gameover = createSprite(800, 400)
gameover.addImage(gameoverimg)
gameover.visible = false
ghostGroup = createGroup()
	Engine.run(engine);
  
	heart1 = createSprite(50, 50, 10, 10)
	heart1.addImage(heart)
	heart1.scale = 0.2
	heart1.visible = true

	heart2 = createSprite(120, 50, 10, 10)
	heart2.addImage(heart)
	heart2.scale = 0.2
	heart2.visible = true

	heart3 = createSprite(190, 50, 10, 10)
	heart3.addImage(heart)
	heart3.scale = 0.2
	heart3.visible = true

	lives = createSprite()
	lives.visible = false
	lives = 3
}



function draw() {
  rectMode(CENTER);
  background(0);
  
  if(gameState===PLAY)
  {
	  spawnGhost()
	  score = score + 1
	if(backgroundg.x<800)
	{
	backgroundg.x = backgroundg.width/2
	}

	if(keyDown(UP_ARROW) && player.y > 559)
	{
	player.velocityY = -24
	}
	player.velocityY = player.velocityY + 0.5
	player.collide(ground)

	if(player.isTouching(ghostGroup)&& player.tint === 0)
	{
		player.tint = 90
		console.log(player.tint)
	
if(player.tint < 0)
{
player.tint = 0
}
	lives = lives - 1
	}
	

	if(lives === 2)
	{
	heart3.visible = false
	}
	if(lives === 1)
	{
	heart2.visible = false
	}
	if(lives <0 || lives === 0)
	{
	heart1.visible = false
gameState = STOP
	}
	
	}
	if(player.tint !== 0)
	{
	player.tint = player.tint - 1
	}
	if(gameState === STOP)
	{
	player.collide(ground)
	player.velocityY = 0
	backgroundg.velocityX = 0
	ghostGroup.destroyEach()
	player.changeAnimation("stop", player2)
	gameover.visible = true
  }
console.log(gameState)
textSize(40)
fill ("black")
  drawSprites();

  text("Score:" +  score, 1300, 50)
 
}


function spawnGhost()
{
if (frameCount % 150 === 0)
{
var ghost = createSprite(1400, 630, 400, 10)
ghost.addImage(ghost1)
ghost.scale = 0.25
ghost.velocityX = -4
ghost.lifetime = 350
ghostGroup.add(ghost)
}
}

