// Example is based on examples from: http://brm.io/matter-js/, https://github.com/shiffman/p5-matter
// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;

var propeller;
var angle=0;
var angleSpeed=0;

var movingWall;
var movingWallPosY;
var movingWallSpeed = 2;

var boxes = [];
var birds = [];
var birdsImgIndex = [];
var boxImgIndex = [];
var birdImages = [];
var boxImages = [];
var ground;
var slingshotBird, slingshotConstraint;
var canvas;

var timeLeftMs = 60 * 1000;
var score = 0;
////////////////////////////////////////////////////////////
function setup() {
	canvas = createCanvas(1000, 600);

	engine = Engine.create();  // create an engine

	for (let index = 1; index <= 4; index++) {
		birdImages.push(loadImage(`assets/Birds/${index}.png`));
	}
	for (let index = 1; index <= 4; index++) {
		boxImages.push(loadImage(`assets/Crates/${index}.png`));
	}

	setupGround();

	setupPropeller();
	setupMovingWall();

	setupTower();

	setupSlingshot();

	setupMouseInteraction();
}
////////////////////////////////////////////////////////////
function draw() {

	timeLeftMs -= deltaTime;

	background(0);

	Engine.update(engine);

	drawGround();

	drawPropeller();
	drawMovingWall();

	drawTower();

	drawBirds();

	drawSlingshot();

	drawHud();

	if (boxes.length <= 0)
	{
		gameWin()
	}
	else if (timeLeftMs <= 0)
	{
		gameOver();
	}
}

function drawHud() {
	noStroke();
	fill(255);
	textSize(32);

	let timeLeftSec = timeLeftMs / 1000;
	timeLeftSec = Math.round(timeLeftSec * 10) / 10;

	textAlign(LEFT, TOP);
	text(`Time Left: ${timeLeftSec}s`, 10, 10);

	textAlign(RIGHT, TOP);
	text(`Score: ${score}`, width - 10, 10);

}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
	fill(255);
	textSize(80);
	textAlign(CENTER);
	text("GAME OVER", width/2, height/2)
	noLoop();
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameWin(){
	fill(255);
	textSize(80);
	textAlign(CENTER);
	text("Win", width/2, height/2)
	noLoop();
}

////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
	if (keyCode == LEFT_ARROW){
		angleSpeed += 0.01;
	}
	else if (keyCode == RIGHT_ARROW){
		angleSpeed -= 0.01;
	}
}
////////////////////////////////////////////////////////////
function keyTyped(){
	//if 'b' create a new bird to use with propeller
	if (key==='b'){
		setupBird();
	}

	//if 'r' reset the slingshot
	if (key==='r'){
		removeFromWorld(slingshotBird);
		removeFromWorld(slingshotConstraint);
		setupSlingshot();
	}
}

//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
	setTimeout(() => {
		slingshotConstraint.bodyB = null;
		slingshotConstraint.pointA = { x: 0, y: 0 };
	}, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
	var pos = body.position;
	return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
	World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
	beginShape();
	for (var i = 0; i < vertices.length; i++) {
		vertex(vertices[i].x, vertices[i].y);
	}
	endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
	push();
	var offsetA = constraint.pointA;
	var posA = {x:0, y:0};
	if (constraint.bodyA) {
		posA = constraint.bodyA.position;
	}
	var offsetB = constraint.pointB;
	var posB = {x:0, y:0};
	if (constraint.bodyB) {
		posB = constraint.bodyB.position;
	}
	strokeWeight(5);
	stroke(255);
	line(
		posA.x + offsetA.x,
		posA.y + offsetA.y,
		posB.x + offsetB.x,
		posB.y + offsetB.y
	);
	pop();
}
