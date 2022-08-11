class Grid
{
	/////////////////////////////////
	constructor(width, height)
	{
		this.GridWidth = width;
		this.GridHeight = height;
		this.CreateGrid(40)
	}

	CreateGrid(cellSize)
	{
		cellSize = int(cellSize);
		if (cellSize == this.CellSize)
		{
			return;
		}
		this.CellSize = cellSize;
		this.Notes = []

		// initalise grid structure and state
		for (let x=0; x<this.GridWidth; x+=this.CellSize)
		{
			let notesColumn = [];
			for (let y=0; y<this.GridHeight; y+=this.CellSize)
			{
				let pos = createVector(x, y);
				notesColumn.push(new Note(this.CellSize, pos));
			}
			this.Notes.push(notesColumn);
		}
	}

	/////////////////////////////////
	Run(img)
	{
		img.loadPixels();
		this.FindActiveNotes(img);
		this.DrawActiveNotes(img);
	}

	/////////////////////////////////
	DrawActiveNotes(img)
	{
		// draw active notes
		fill(255);
		noStroke();
		for (let i=0;i<this.Notes.length;i++)
		{
			for (let j=0; j<this.Notes[i].length; j++)
			{
				this.Notes[i][j].draw(img);
			}
		}
	}

	/////////////////////////////////
	FindActiveNotes(img)
	{
		for (let x = 0; x < img.width; x += 1)
		{
			for (let y = 0; y < img.height; y += 1)
			{
				let index = (x + (y * img.width)) * 4;
				let state = img.pixels[index + 0];
				if (state != 0)
				{ // if pixel is not black (ie there is movement)
					// find which note to activate
					let screenX = map(x, 0, img.width, 0, this.GridWidth);
					let screenY = map(y, 0, img.height, 0, this.GridHeight);
					let i = int(screenX / this.CellSize);
					let j = int(screenY / this.CellSize);
					this.Notes[i][j].setTriggered(state);
				}
			}
		}
	}
}

class Note
{
	constructor(cellSize, pos)
	{
		this.maxSize = cellSize;
		this.pos = pos;
		this.noteState = 0;
	}

	draw(img)
	{
		if (this.noteState > 0)
		{
			let alpha = this.noteState * 200;
			let c1 = color(255, 0, 0, alpha);
			let c2 = color(0, 255, 0, alpha);
			let mix = lerpColor(c1, c2, map(this.pos.y, 0, height, 0, 1));
			fill(mix);
			let s = this.noteState;
			ellipse(this.pos.x, this.pos.y, this.maxSize * s, this.maxSize * s);
		}
		this.noteState -= 0.05;
		this.noteState = constrain(this.noteState, 0, 1);
	}

	setTriggered(state)
	{
		this.noteState = 1;
	}
}