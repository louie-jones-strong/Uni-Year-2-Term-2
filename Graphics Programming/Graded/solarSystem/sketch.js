var Time;

var Background;
var SystemCenterBody;

function preload()
{
	// credit for background image from https://deep-fold.itch.io/space-background-generator
	Background = loadImage("Assets/Background.png");

	// credit for planet images from https://deep-fold.itch.io/pixel-planet-generator
	let xSpriteCount = 10;
	let ySpriteCount = 20;
	let timePerFrame = 1 / 30;

	// load CelestialBody assets
	let sunSprite = new AnimatedSprite("Assets/Sun.png", xSpriteCount, ySpriteCount, timePerFrame, 2);
	let mercurySprite = new AnimatedSprite("Assets/Mercury.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	let earthSprite = new AnimatedSprite("Assets/Earth.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	let moon1Sprite = new AnimatedSprite("Assets/Moon1.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	let moon2Sprite = new AnimatedSprite("Assets/Moon2.png", xSpriteCount, ySpriteCount, timePerFrame, 1);

	// setup each Celestial Body in the system
	SystemCenterBody = new CelestialBody(sunSprite, color(255,150,0), 200, "Sun",
		1/3, 0, 0);

	let mercury = new CelestialBody(mercurySprite, color(255,0,0), 60, "Mercury",
		1.25, 200, 1);
	SystemCenterBody.AddSatellite(mercury);

	let earth = new CelestialBody(earthSprite, color(0,0,255), 80, "Earth",
		1, 300, 1);
	SystemCenterBody.AddSatellite(earth);

	let moon1 = new CelestialBody(moon1Sprite, color(255,255,255), 30, "Moon",
		-2, 100, 0);
	earth.AddSatellite(moon1);
	let moon2 = new CelestialBody(moon2Sprite, color(200,200,200), 20, "Moon 2",
		-2.5, 70, 0);
	earth.AddSatellite(moon2);

}

function setup()
{
	createCanvas(900, 700);

}

function draw()
{
	background(0);
	image(Background, 0, 0)
	Time = frameCount;

	// center system in middle of the canvas
	translate(width/2, height/2);

	SystemCenterBody.DrawBodyAndSatellites();
}