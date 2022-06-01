var Speed;

var Background;
var Sun;
var Mercury;
var Earth;
var Moon1;
var Moon2;

function preload()
{
	// credit for background image from https://deep-fold.itch.io/space-background-generator
	Background = loadImage("Assets/Background.png");

	// credit for planet images from https://deep-fold.itch.io/pixel-planet-generator
	let xSpriteCount = 10;
	let ySpriteCount = 20;
	let timePerFrame = 1 / 30;
	Sun = new AnimatedSprite("Assets/Sun.png", xSpriteCount, ySpriteCount, timePerFrame, 2);
	Mercury = new AnimatedSprite("Assets/Mercury.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	Earth = new AnimatedSprite("Assets/Earth.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	Moon1 = new AnimatedSprite("Assets/Moon1.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	Moon2 = new AnimatedSprite("Assets/Moon2.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
}

function setup()
{
	createCanvas(900, 700);

}

function draw()
{
	background(0);
	image(Background, 0, 0)
	Speed = frameCount;

	push();
	translate(width/2, height/2);
	rotate(radians(Speed/3));
	celestialObj(color(255,150,0), 200, Sun, "Sun"); // Sun

	push();
	rotate(radians(Speed));
	translate(300, 0);
	rotate(radians(Speed));
	celestialObj(color(0,0,255), 80, Earth, "Earth"); // Earth

	push();
	rotate(radians(-Speed*2));
	translate(100, 0);
	celestialObj(color(255,255,255), 30, Moon1, "Moon"); // Moon

	pop();
	rotate(radians(-Speed*2.5));
	translate(70, 0);
	celestialObj(color(255,255,255), 20, Moon2, "Moon 2"); // Moon 2

	pop();

	push();
	rotate(radians(Speed*1.25+180))
	translate(200, 0);
	rotate(radians(Speed));
	celestialObj(color(255,0,0), 60, Mercury, "Mercury"); // Mercury
}

function celestialObj(c, size, sprite, name)
{
	strokeWeight(5);
	fill(c);
	stroke(0);

	ellipse(0, 0, size, size);

	sprite.Draw(0, 0, size, size, true)
	line(0, 0, size/2, 0);

	push();
	fill(color(255,255,255));
	noStroke(51);
	text(name, size/2, 0);
	pop();
}
