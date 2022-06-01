class Spaceship
{

	constructor()
	{
		this.velocity = new createVector(0, 0);
		this.location = new createVector(width/2, height/2);
		this.acceleration = new createVector(0, 0);
		this.maxVelocity = 5;
		this.bulletSys = new BulletSystem();
		this.size = 50;
		this.thrusterSize = 20;

		this.ShipImage = loadImage("Assets/Images/ship.png");
		this.ThrusterImage = loadImage("Assets/Images/thruster.png");
	}

	run()
	{
		this.bulletSys.run();
		this.move();
		this.interaction();
		this.draw();
		this.edges();
	}

	draw()
	{
		let x = this.location.x - this.size / 2;
		let y = this.location.y - this.size / 2;
		image(this.ShipImage, x, y, this.size, this.size);

		x = this.location.x - this.thrusterSize / 2;
		y = this.location.y + this.size / 2;

		push();
		if (this.acceleration.y < 0)
		{
			image(this.ThrusterImage, x, y, this.thrusterSize, this.thrusterSize);
		}
		else if (this.acceleration.y > 0)
		{

			translate(this.location.x, this.location.y);
			rotate(PI);
			translate(-this.location.x, -this.location.y);

			image(this.ThrusterImage, x, y, this.thrusterSize, this.thrusterSize);
		}
		pop();

		push();
		if (this.acceleration.x > 0)
		{
			translate(this.location.x, this.location.y);
			rotate(1);
			translate(-this.location.x, -this.location.y);

			image(this.ThrusterImage, x, y, this.thrusterSize, this.thrusterSize);
		}
		else if (this.acceleration.x < 0)
		{
			translate(this.location.x, this.location.y);
			rotate(-1);
			translate(-this.location.x, -this.location.y);

			image(this.ThrusterImage, x, y, this.thrusterSize, this.thrusterSize);
		}
		pop();
	}

	move()
	{
		this.velocity.add(this.acceleration);
		this.velocity.limit(this.maxVelocity);
		this.location.add(this.velocity);
		this.acceleration.mult(0);
	}

	applyForce(f)
	{
		this.acceleration.add(f);
	}

	interaction()
	{
			if (keyIsDown(LEFT_ARROW))
			{
				this.applyForce(createVector(-0.1, 0));
			}

			if (keyIsDown(RIGHT_ARROW))
			{
				this.applyForce(createVector(0.1, 0));
			}

			if (keyIsDown(UP_ARROW))
			{
				this.applyForce(createVector(0, -0.1));
			}

			if (keyIsDown(DOWN_ARROW))
			{
				this.applyForce(createVector(0, 0.1));
			}
	}

	fire()
	{
		this.bulletSys.fire(this.location.x, this.location.y - this.size);
	}

	edges()
	{
		if (this.location.x<0)
			this.location.x=width;
		else if (this.location.x>width)
			this.location.x = 0;
		else if (this.location.y<0)
			this.location.y = height;
		else if (this.location.y>height)
			this.location.y = 0;
	}

	setNearEarth()
	{
		this.applyForce(createVector(0, 0.05));

		let frictionFactor = 30;
		let friction = createVector(-this.velocity.x / frictionFactor, -this.velocity.y / frictionFactor);
		this.applyForce(friction);
	}
}
