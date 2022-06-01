class AnimatedSprite
{

	constructor(filePath, xCount, yCount, timePerFrame, scaleFactor=1)
	{
		this.SpriteSheetImage = loadImage(filePath);
		this.XCount = xCount;
		this.YCount = yCount;
		this.TimePerFrame = timePerFrame;
		this.ScaleFactor = scaleFactor;
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

	Draw(x, y, width=-1, height=-1, drawFromCenter=false)
	{
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

		// make sure Frame isn't larger then the number of frames
		this.Frame = this.Frame % this.Sprites.length;



		let sprite = this.Sprites[this.Frame];

		// set size to sprite size if none given
		if (width < 0 || height < 0)
		{
			width = sprite.width
			height = sprite.height;
		}

		// apply scale factor
		width *= this.ScaleFactor;
		height *= this.ScaleFactor;

		// offset the image if we should draw it from the center not conner
		if (drawFromCenter)
		{
			x -= width / 2;
			y -= height / 2;
		}

		// finally draw the image to the canvas
		image(sprite, x, y, width, height)
	}
}