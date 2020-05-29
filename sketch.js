var ball, img, paddle, gamestate = "serve", score = 0;
function preload() {
  ballimg = loadImage('ball.png');
  paddleimg=loadImage("paddle.png")
}
function setup() {
  createCanvas(500, 400);
  ball=createSprite(30,200,20,20);
  ball.addImage (ballimg); 
  ball.shapeColor = "blue";
  
  paddle=createSprite(470,200,20,100);
  paddle.addImage(paddleimg)
}

function draw() {
  background("red");
  fill("yellow");
  
  paddle.y = World.mouseY;
  
  edges=createEdgeSprites();
  //Bounce Off the Left Edge only
  ball.bounceOff(edges[0]); 
  
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  
  ball.bounceOff(paddle);
  
  paddle.collide(edges);
  
  
  
  if((keyIsDown(ENTER))&&(gamestate === "serve")) {
    ball.velocityX=10;  
    ball.velocityY=10
    ball.x = 30;
    ball.y = 200;
    gamestate = "play"
  }
  
  if((frameCount % 10 === 0)&&(gamestate === "play" )) {
     score = score + 1;
     }
  
  
  
  //to reset game when ball is out of the canvas
  if(ball.x > 500) {
     gamestate = "end"
     }
  
  if(score === 100) {
     gamestate = "win";
     }
  
  if( gamestate === "win") {
     ball.velocityY = 0;
     ball.velocityX = 0;
     }
  
  if((keyIsDown(SHIFT))&&(gamestate === "win")) {
     reset();
     }
  
  if((keyIsDown(SHIFT))&&(gamestate === "end")) {
     reset();
     }
  
  drawSprites();
  if(gamestate === "serve") {
     text("score till hundred and press enter to play and use arrow keys to control thee paddle", 30, 50);
   }
  
    if(gamestate === "win") {
     text("You Win", 220, 150);
      text("press shift key to continue", 220, 200);
   }
  
    if(gamestate === "end") {
     text("You Lost", 220, 150);  
      text("press shift key to continue", 220, 200);
    }
      if(gamestate === "play") {
        text("score = " + score, 200, 50)
         }
}

function reset() {
  ball.y = 200;
  ball.x = 30;
  ball.velocityY = 0;
  ball.velocityX = 0;
  score = 0;
  gamestate = "serve";
}
