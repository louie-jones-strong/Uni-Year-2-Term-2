class AsteroidSystem
{

	//creates arrays to store each asteroid's data
	constructor()
	{
		this.Asteroids = [];
	}

	run()
	{
		this.spawn();

		for (var i=0; i<this.Asteroids.length; i++)
		{
			const asteroid = this.Asteroids[i];
			asteroid.Move();
			asteroid.Draw();
		}
	}

	// spawns asteroid at random intervals
	spawn()
	{

		var spawnChance = 0.01;

		spawnChance += 0.001 * difficultyLevel;


		if (random(1) < spawnChance)
		{
			this.addAsteroid(new Asteroid());
		}
	}

	addAsteroid(asteroid)
	{
		this.Asteroids.push(asteroid);
	}

	//destroys all data associated with each asteroid
	destroy(index)
	{
		this.Asteroids[index].Destroy();
		this.Asteroids.splice(index,1);
	}
}




class Asteroid
{
	constructor(location, size, velocity)
	{
		this.Size = size;
		if (this.Size == undefined)
		{
			this.Size = random(30,100);
		}

		this.Location = location;
		if (this.Location == undefined)
		{
			this.Location = new createVector(random(this.Size, width- this.Size), 0);
		}

		// clamp to the width of the canvas if the Asteroid was created by the split function
		this.Location.x = Math.max(this.Location.x, 0);
		this.Location.x = Math.min(this.Location.x, width);

		this.Velocity = velocity;
		if (this.Velocity == undefined)
		{
			this.Velocity = new createVector(0, 0);
		}

		this.Acceleration = new createVector(0,random(0.1,1));
		this.Rotation = random(0,360);
	}

	Move()
	{
		this.Velocity.add(this.Acceleration);
		this.Location.add(this.Velocity);
		this.Acceleration.mult(0);
	}

	Draw()
	{
		let x = this.Location.x;
		let y = this.Location.y;

		push();
		translate(x, y);
		rotate(radians(this.Rotation));


		image(AsteroidImage, - this.Size / 2, - this.Size / 2, this.Size, this.Size);
		pop();
	}

	Destroy()
	{
		AsteroidDestroySfx.play();
		if (this.Size > 80)
		{
			this.Split();
		}
	}

	// splits the asteroid in to two smaller asteroids
	Split()
	{
		let subAsteroidPos = new createVector(this.Location.x - this.Size / 4, this.Location.y);
		let subAsteroidVelocity = new createVector(-0.1, 0);

		let subAsteroid = new Asteroid(subAsteroidPos, this.Size / 2, subAsteroidVelocity);
		asteroidSystem.addAsteroid(subAsteroid);



		subAsteroidPos = new createVector(this.Location.x + this.Size / 4, this.Location.y);
		subAsteroidVelocity = new createVector(0.1, 0);

		subAsteroid = new Asteroid(subAsteroidPos, this.Size / 2, subAsteroidVelocity);
		asteroidSystem.addAsteroid(subAsteroid);
	}
}