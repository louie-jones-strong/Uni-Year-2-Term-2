var ParticleImg;

class Particles
{
	constructor ()
	{
		this.ParticleList = []
		ParticleImg = loadImage("assets/particalVfx.png")
	}

	Update()
	{
		let index = 0;
		while (index < this.ParticleList.length)
		{
			const particle = this.ParticleList[index];
			particle.Update();

			if (particle.IsDead)
			{
				this.ParticleList.splice(index, 1);
			}
			else
			{
				index += 1
			}
		}

		for (let i = 0; i < flow.Zones.length; i++)
		{
			const flowZone = flow.Zones[i];
			if (Math.abs(flowZone.u) < 5 && Math.abs(flowZone.v) < 5)
			{
				continue;
			}
			let  newParticle = new Particle(flowZone.x*scaleFactor, flowZone.y*scaleFactor, flowZone.u, flowZone.v)
			this.ParticleList.push(newParticle);
			newParticle.Update();
		}

	}
}

class Particle
{
	constructor (posX, posY, speedX, speedY)
	{
		let posRange = flowStep * scaleFactor;
		this.Pos = createVector(posX + random(-posRange, posRange), posY + random(-posRange, posRange));

		const speedMultiplier = random(20, 30);
		this.Speed = createVector(speedX*speedMultiplier, speedY*speedMultiplier);

		this.Size = random(20, 40);
		this.IsDead = false;
	}

	Update()
	{
		this.Pos.x += this.Speed.x * (deltaTime / 1000);
		this.Pos.y += this.Speed.y * (deltaTime / 1000);

		image(ParticleImg, this.Pos.x - (this.Size/2), this.Pos.y - (this.Size/2), this.Size, this.Size);

		this.Size -= 1;
		if (this.Size <= 0)
		{
			this.IsDead = true;
		}
	}
}