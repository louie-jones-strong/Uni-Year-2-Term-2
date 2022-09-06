class AnimatedSprite
{

	constructor(spriteSheet, xCount, yCount, timePerFrame, loop=true)
	{
		this.SpriteSheetImage = spriteSheet;
		this.XCount = xCount;
		this.YCount = yCount;
		this.TimePerFrame = timePerFrame;
		this.Finished = false;
		this.Loop = loop;
	}

	// this function splits up the sprite sheet in to each of the sprites
	Setup()
	{
		// get single sprite size
		this.Width = this.SpriteSheetImage.width / this.XCount;
		this.Height = this.SpriteSheetImage.height / this.YCount;

		this.Sprites = [];

		for (let y = 0; y < this.YCount; y++)
		{
			for (let x = 0; x < this.XCount; x++)
			{
				let spriteImage = this.SpriteSheetImage.get(x * this.Width, y * this.Height, this.Width, this.Height)
				this.Sprites.push(spriteImage);
			}
		}

		// we don't need this large image any more
		// so setting to null to allow it to be cleared from memory
		this.SpriteSheetImage = undefined;

		// set the animation to the start
		this.TimeSinceLastFrame = 0;
		this.Frame = 0;
	}

	SetLocation(x, y, width=-1, height=-1, drawFromCenter=false)
	{
		this.X = x;
		this.Y = y;
		this.Width = width;
		this.Height = height;

		// offset the image if we should draw it from the center not conner
		if (drawFromCenter)
		{
			this.X -= this.Width / 2;
			this.Y -= this.Height / 2;
		}
	}

	Draw()
	{
		if (this.Finished)
		{
			return;
		}

		// is this the first frame we are drawing the sprite?
		// if so we need to setup the sprites
		if (this.Sprites == undefined)
		{
			this.Setup();
		}

		// get current frame of the animation to draw

		// update time since last frame (deltaTime is in milliseconds but we are using seconds)
		this.TimeSinceLastFrame += (deltaTime / 1000);
		this.Frame += int(this.TimeSinceLastFrame / this.TimePerFrame);
		// reset TimeSinceLastFrame to
		this.TimeSinceLastFrame %= this.TimePerFrame;

		if (this.Frame >= this.Sprites.length && !this.Loop)
		{
			this.Finished = true;
			this.Frame = this.Sprites.length - 1;
		}
		// make sure Frame isn't larger then the number of frames
		this.Frame = this.Frame % this.Sprites.length;

		let sprite = this.Sprites[this.Frame];

		// finally draw the image to the canvas
		image(sprite, this.X, this.Y, this.Width, this.Height)
	}
}