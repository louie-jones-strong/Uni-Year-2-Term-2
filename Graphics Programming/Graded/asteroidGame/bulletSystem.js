class BulletSystem
{

	constructor()
	{
		this.bullets = [];
		this.velocity = new createVector(0, -5);
		this.diam = 10;
		this.Image = loadImage("Assets/Images/bullet.png");

		this.ShotSounds = [];
		this.ShotSounds.push(loadSound("Assets/Audio/laser1.ogg"));
		this.ShotSounds.push(loadSound("Assets/Audio/laser2.ogg"));
	}

	run()
	{
			this.move();
			this.draw();
			this.edges();
	}

	fire(x, y)
	{
		this.bullets.push(createVector(x,y));

		let shotIndex = int(Math.random() * this.ShotSounds.length);
		this.ShotSounds[shotIndex].play();
	}

	//draws all bullets
	draw()
	{
		fill(255);
		for (var i=0; i<this.bullets.length; i++)
		{

			let x = this.bullets[i].x - this.diam / 2;
			let y = this.bullets[i].y - this.diam / 2;
			image(this.Image, x, y, this.size, this.size);
		}
	}

	//updates the location of all bullets
	move()
	{
		for (var i=0; i<this.bullets.length; i++)
		{
			this.bullets[i].y += this.velocity.y;
		}
	}

	//check if bullets leave the screen and remove them from the array
	edges()
	{
		for (var i=0; i<this.bullets.length; i++)
		{
			if (this.bullets[i].y >= height)
			{
				removeBullet()
			}
		}
	}

	removeBullet(i)
	{
		this.bullets.splice(i, 1)
	}
}
