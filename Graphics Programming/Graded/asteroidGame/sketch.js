var spaceship;
var asteroidSystem;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var starLocs = [];
var timeAliveMs;
var difficultyLevel;
var asteroidsDestroyedCount;

var AsteroidImage;
var AsteroidDestroySfx;

var gameOverSfx;

function preload()
{
	// load images
	planetImage = loadImage("Assets/Images/Planet.png");
	AsteroidImage = loadImage("Assets/Images/meteor.png");
	ExplosionSpriteSheetImage = loadImage("Assets/Images/explosion.png");

	// load sounds
	soundFormats("ogg", "wav");
	gameOverSfx = loadSound("Assets/Audio/lose");
	AsteroidDestroySfx = loadSound("Assets/Audio/explosion.wav");
}

//////////////////////////////////////////////////
function setup()
{
	createCanvas(1200,800);
	spaceship = new Spaceship();
	asteroidSystem = new AsteroidSystem();

	timeAliveMs = 0;
	asteroidsDestroyedCount = 0;



	//location and size of earth and its atmosphere
	atmosphereLoc = new createVector(width/2, height*2.9);
	atmosphereSize = new createVector(width*3, width*3);
	earthLoc = new createVector(width/2, height*3.1);
	earthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw()
{
	timeAliveMs += deltaTime;

	// every 5 seconds the level increases
	difficultyLevel = 1 + int(timeAliveMs / 5000);

	background(0);
	sky();

	spaceship.run();
	asteroidSystem.Run();

	drawEarth();

	drawHud();

	checkCollisions(); // function that checks collision between various elements
}

//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth()
{
	noStroke();
	//draw atmosphere
	fill(0,0,255, 50);
	ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
	//draw earth
	fill(100,255);

	push();
	translate(earthLoc.x, earthLoc.y);
	rotate(radians(-frameCount / 100));
	image(planetImage, -earthSize.x / 2, -earthSize.y / 2, earthSize.x, earthSize.y)
	pop();
}

// draws the heads up display
function drawHud()
{
	noStroke();
	fill(255);
	textSize(32);

	let timeAliveSec = timeAliveMs / 1000;
	timeAliveSec = Math.round(timeAliveSec * 10) / 10;

	textAlign(LEFT, TOP);
	text(`Time: ${timeAliveSec}s`, 10, 10);

	textAlign(LEFT, TOP);
	text(`Level: ${difficultyLevel}`, width / 2 - 75, 10);

	textAlign(RIGHT, TOP);
	text(`Asteroids Destroyed: ${asteroidsDestroyedCount}`, width - 10, 10);

}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions()
{
	for (let asteroidIndex = 0; asteroidIndex < asteroidSystem.Asteroids.length; asteroidIndex++)
	{
		let asteroid = asteroidSystem.Asteroids[asteroidIndex];
		let asteroidLocation = asteroid.Location;
		let asteroidSize = asteroid.Size;

		//spaceship-2-asteroid collisions
		if (isInside(asteroidLocation, asteroidSize, spaceship.location, spaceship.size))
		{
			gameOver();
		}

		//asteroid-2-earth collisions
		if (isInside(asteroidLocation, asteroidSize, earthLoc, earthSize.x))
		{
			gameOver();
		}

		//bullet collisions
		let bullets = spaceship.bulletSys.bullets
		for (let bulletIndex = 0; bulletIndex < bullets.length; bulletIndex++)
		{
			if (isInside(asteroidLocation, asteroidSize, bullets[bulletIndex], spaceship.bulletSys.diam))
			{
				asteroidSystem.Destroy(asteroidIndex);
				spaceship.bulletSys.removeBullet(bulletIndex)
				asteroidsDestroyedCount += 1;
			}

		}
	}

	//spaceship-2-earth
	if (isInside(spaceship.location, spaceship.size, earthLoc, earthSize.x))
	{
		gameOver();
	}

	//spaceship-2-atmosphere
	if (isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.x))
	{
		spaceship.setNearEarth();
	}
}

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB)
{
	let distance = locA.dist(locB);
	return distance <= sizeA/2 + sizeB/2;
}

//////////////////////////////////////////////////
function keyPressed()
{
	if (keyIsPressed && keyCode === 32)
	{ // if spacebar is pressed, fire!
		spaceship.fire();
	}
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver()
{
	fill(255);
	textSize(80);
	textAlign(CENTER);
	text("GAME OVER", width/2, height/2)
	gameOverSfx.play();
	noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky()
{
	push();
	while (starLocs.length<300)
	{
		starLocs.push(new createVector(random(width), random(height)));
	}
	fill(255);
	for (var i=0; i<starLocs.length; i++)
	{
		rect(starLocs[i].x, starLocs[i].y,2,2);
	}

	if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
	pop();
}
