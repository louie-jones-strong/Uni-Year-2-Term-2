var ParticleImg;

class ParticleManger
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

		for (let i = 0; i < OpticalFlow.Zones.length; i++)
		{
			const flowZone = OpticalFlow.Zones[i];
			if (Math.abs(flowZone.u) < 5 && Math.abs(flowZone.v) < 5)
			{
				continue;
			}
			let  newParticle = new Particle(flowZone.x*ScaleFactor, flowZone.y*ScaleFactor, flowZone.u, flowZone.v);
			this.ParticleList.push(newParticle);
			newParticle.Update();
		}

	}
}

class Particle
{
	constructor (posX, posY, speedX, speedY)
	{
		let posRange = FlowStep * ScaleFactor;
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