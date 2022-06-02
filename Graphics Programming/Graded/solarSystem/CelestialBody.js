class CelestialBody
{
	constructor(sprite, color, bodyRadius, name,
		rotationSpeed, orbitRadius, orbitSpeed)
	{
		this.Sprite = sprite;
		this.Color = color;
		this.BodyRadius = bodyRadius;
		this.Name = name;

		this.RotationSpeed = rotationSpeed;
		this.OrbitRadius = orbitRadius;
		this.OrbitSpeed = orbitSpeed;

		this.Satellites = [];
	}

	AddSatellite(satellite)
	{
		this.Satellites.push(satellite);
	}

	DrawBodyAndSatellites()
	{
		if (ShowOrbits)
		{
			stroke(color(255,255,255));
			noFill();
			ellipse(0, 0, this.OrbitRadius*2, this.OrbitRadius*2);
		}

		push();

		rotate(radians(Time * this.RotationSpeed));
		translate(this.OrbitRadius, 0);
		rotate(radians(Time * this.OrbitSpeed));

		this.DrawBody();


		for (let i = 0; i < this.Satellites.length; i++)
		{
			this.Satellites[i].DrawBodyAndSatellites();
		}

		pop();
	}

	DrawBody()
	{
		strokeWeight(5);
		fill(this.Color);
		stroke(0);

		if (IsSimpleView)
		{
			ellipse(0, 0, this.BodyRadius, this.BodyRadius);
		}
		else
		{
			this.Sprite.Draw(0, 0, this.BodyRadius, this.BodyRadius, true)
		}

		if (ShowLines)
		{
			line(0, 0, this.BodyRadius/2, 0);
		}

		if (ShowNames)
		{
			push();
			fill(color(255,255,255));
			noStroke(51);
			text(this.Name, this.BodyRadius/2, 0);
			pop();
		}
	}

}