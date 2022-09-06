var Ship;
var AsteroidsSystem;
var AtmosphereLoc;
var AtmosphereSize;
var EarthLoc;
var EarthSize;
var StarLocs = [];
var TimeAliveMs;
var DifficultyLevel;
var AsteroidsDestroyedCount;

var AsteroidImage;
var AsteroidDestroySfx;

var GameOverSfx;

function preload()
{
	// load images
	planetImage = loadImage("Assets/Images/Planet.png");
	AsteroidImage = loadImage("Assets/Images/meteor.png");
	ExplosionSpriteSheetImage = loadImage("Assets/Images/explosion.png");

	// load sounds
	soundFormats("ogg", "wav");
	GameOverSfx = loadSound("Assets/Audio/lose");
	AsteroidDestroySfx = loadSound("Assets/Audio/explosion.wav");
}

//////////////////////////////////////////////////
function setup()
{
	createCanvas(1200,800);
	Ship = new Spaceship();
	AsteroidsSystem = new AsteroidSystem();

	TimeAliveMs = 0;
	AsteroidsDestroyedCount = 0;



	//location and size of earth and its atmosphere
	AtmosphereLoc = new createVector(width/2, height*2.9);
	AtmosphereSize = new createVector(width*3, width*3);
	EarthLoc = new createVector(width/2, height*3.1);
	EarthSize = new createVector(width*3, width*3);
}

//////////////////////////////////////////////////
function draw()
{
	TimeAliveMs += deltaTime;

	// every 5 seconds the level increases
	DifficultyLevel = 1 + int(TimeAliveMs / 5000);

	background(0);
	sky();

	Ship.run();
	AsteroidsSystem.Run();

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
	ellipse(AtmosphereLoc.x, AtmosphereLoc.y, AtmosphereSize.x,  AtmosphereSize.y);
	//draw earth
	fill(100,255);

	push();
	translate(EarthLoc.x, EarthLoc.y);
	rotate(radians(-frameCount / 100));
	image(planetImage, -EarthSize.x / 2, -EarthSize.y / 2, EarthSize.x, EarthSize.y)
	pop();
}

// draws the heads up display
function drawHud()
{
	noStroke();
	fill(255);
	textSize(32);

	let timeAliveSec = TimeAliveMs / 1000;
	timeAliveSec = Math.round(timeAliveSec * 10) / 10;

	textAlign(LEFT, TOP);
	text(`Time: ${timeAliveSec}s`, 10, 10);

	textAlign(LEFT, TOP);
	text(`Level: ${DifficultyLevel}`, width / 2 - 75, 10);

	textAlign(RIGHT, TOP);
	text(`Asteroids Destroyed: ${AsteroidsDestroyedCount}`, width - 10, 10);

}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions()
{
	for (let asteroidIndex = 0; asteroidIndex < AsteroidsSystem.Asteroids.length; asteroidIndex++)
	{
		let asteroid = AsteroidsSystem.Asteroids[asteroidIndex];
		let asteroidLocation = asteroid.Location;
		let asteroidSize = asteroid.Size;

		//spaceship-2-asteroid collisions
		if (isInside(asteroidLocation, asteroidSize, Ship.location, Ship.size))
		{
			gameOver();
		}

		//asteroid-2-earth collisions
		if (isInside(asteroidLocation, asteroidSize, EarthLoc, EarthSize.x))
		{
			gameOver();
		}

		//bullet collisions
		let bullets = Ship.bulletSys.bullets
		for (let bulletIndex = 0; bulletIndex < bullets.length; bulletIndex++)
		{
			if (isInside(asteroidLocation, asteroidSize, bullets[bulletIndex], Ship.bulletSys.diam))
			{
				AsteroidsSystem.Destroy(asteroidIndex);
				Ship.bulletSys.removeBullet(bulletIndex)
				AsteroidsDestroyedCount += 1;
			}

		}
	}

	//spaceship-2-earth
	if (isInside(Ship.location, Ship.size, EarthLoc, EarthSize.x))
	{
		gameOver();
	}

	//spaceship-2-atmosphere
	if (isInside(Ship.location, Ship.size, AtmosphereLoc, AtmosphereSize.x))
	{
		Ship.setNearEarth();
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
		Ship.fire();
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
	GameOverSfx.play();
	noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky()
{
	push();
	while (StarLocs.length<300)
	{
		StarLocs.push(new createVector(random(width), random(height)));
	}
	fill(255);
	for (var i=0; i<StarLocs.length; i++)
	{
		rect(StarLocs[i].x, StarLocs[i].y,2,2);
	}

	if (random(1)<0.3) StarLocs.splice(int(random(StarLocs.length)),1);
	pop();
}
