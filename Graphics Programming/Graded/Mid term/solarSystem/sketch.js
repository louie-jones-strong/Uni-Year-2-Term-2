var Time = 0;
var TargetFps = 60;

var Background;
var SystemCenterBody;
var ShowNames = true;
var ShowLines = true;
var IsSimpleView = false;
var ShowOrbits = true;

function preload()
{
	// credit for background image from https://deep-fold.itch.io/space-background-generator
	Background = loadImage("Assets/Background.png");

	// credit for planet images from https://deep-fold.itch.io/pixel-planet-generator
	let xSpriteCount = 10;
	let ySpriteCount = 20;
	let timePerFrame = 1 / 30;


	// setup each Celestial Body in the system
	let sunSprite = new AnimatedSprite("Assets/Sun.png", xSpriteCount, ySpriteCount, timePerFrame, 2);
	SystemCenterBody = new CelestialBody(sunSprite, color(255,150,0), 200, "Sun",
		1/3, 0, 0);

	let mercurySprite = new AnimatedSprite("Assets/Mercury.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	let mercury = new CelestialBody(mercurySprite, color(255,0,0), 20, "Mercury",
		1.5, 150, 1);
	SystemCenterBody.AddSatellite(mercury);

	let venusSprite = new AnimatedSprite("Assets/Venus.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	let venus = new CelestialBody(venusSprite, color(255,50,50), 40, "Venus",
		1.25, 200, 1);
	SystemCenterBody.AddSatellite(venus);

	let earthSprite = new AnimatedSprite("Assets/Earth.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	let earth = new CelestialBody(earthSprite, color(0,100,255), 80, "Earth",
		1, 300, 1);
	SystemCenterBody.AddSatellite(earth);

	let moon1Sprite = new AnimatedSprite("Assets/Moon1.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	let moon1 = new CelestialBody(moon1Sprite, color(255,255,255), 30, "Moon",
		-2, 100, 0);
	earth.AddSatellite(moon1);

	let moon2Sprite = new AnimatedSprite("Assets/Moon2.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	let moon2 = new CelestialBody(moon2Sprite, color(200,200,200), 20, "Moon 2",
		-2.5, 70, 0);
	earth.AddSatellite(moon2);

	let astroidSprite = new AnimatedSprite("Assets/Astroid.png", 1, 1, timePerFrame, 1);
	let astroid = new CelestialBody(astroidSprite, color(100,100,100), 20, "Astroid",
		1, 30, 1);
	moon1.AddSatellite(astroid);

	let marsSprite = new AnimatedSprite("Assets/Mars.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	let mars = new CelestialBody(marsSprite, color(255,0,0), 60, "Mars",
		0.85, 500, 1);
	SystemCenterBody.AddSatellite(mars);

	let jupiterSprite = new AnimatedSprite("Assets/Jupiter.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	let jupiter = new CelestialBody(jupiterSprite, color(255,100,0), 100, "Jupiter",
		0.7, 650, 1);
	SystemCenterBody.AddSatellite(jupiter);

	let saturnSprite = new AnimatedSprite("Assets/Saturn.png", xSpriteCount, ySpriteCount, timePerFrame, 2);
	let saturn = new CelestialBody(saturnSprite, color(255,255,0), 100, "Saturn",
		0.6, 800, 1);
	SystemCenterBody.AddSatellite(saturn);

	let uranusSprite = new AnimatedSprite("Assets/Uranus.png", xSpriteCount, ySpriteCount, timePerFrame, 2);
	let uranus = new CelestialBody(uranusSprite, color(50,50,255), 70, "Uranus",
		0.4, 950, 1);
	SystemCenterBody.AddSatellite(uranus);

	let neptuneSprite = new AnimatedSprite("Assets/Neptune.png", xSpriteCount, ySpriteCount, timePerFrame, 1);
	let neptune = new CelestialBody(neptuneSprite, color(200,200,255), 50, "Neptune",
		0.3, 1050, 1);
	SystemCenterBody.AddSatellite(neptune);

}

function setup()
{
	let canvas = createCanvas(900, 700);
	canvas.id('canvas');
	canvas.parent("content");

}

function draw()
{
	if (IsSimpleView)
	{
		background(0);
	}
	else
	{
		image(Background, 0, 0)
	}

	deltaTimeSeconds = deltaTime / 1000;
	Time += deltaTimeSeconds * TargetFps * document.getElementById("speedSlider").value;


	// center system in middle of the canvas
	translate(width/2, height/2);

	let zoom = document.getElementById("zoomSlider").value;
	scale(zoom);

	SystemCenterBody.DrawBodyAndSatellites();
}


document.getElementById("toggleNames").onclick = function(){ShowNames = !ShowNames;};
document.getElementById("toggleLines").onclick = function(){ShowLines = !ShowLines;};
document.getElementById("toggleSimpleView").onclick = function(){IsSimpleView = !IsSimpleView;};
document.getElementById("toggleShowOrbits").onclick = function(){ShowOrbits = !ShowOrbits;};

