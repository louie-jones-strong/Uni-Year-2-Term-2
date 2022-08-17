var NoteImg;
var MonoSynth;


class Grid
{
	/////////////////////////////////
	constructor(width, height)
	{
		this.GridWidth = width;
		this.GridHeight = height;
		this.CreateGrid(40);

		NoteImg = loadImage("assets/gridVfx.png")
		MonoSynth = new p5.MonoSynth();
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
				this.Notes[i][j].Draw(img);
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
					this.Notes[i][j].SetTriggered(state);
				}
			}
		}
	}
}

class Note
{
	constructor(cellSize, pos)
	{
		this.MaxSize = cellSize * 2;
		this.Pos = pos;
		this.NoteState = 0;
	}

	Draw(img)
	{
		if (this.NoteState > 0)
		{
			let alpha = this.NoteState * 50;
			let c1 = color(0, 255, 0, alpha);
			let c2 = color(255, 0, 0, alpha);
			let mix = lerpColor(c1, c2, map(this.Pos.y, 0, height, 0, 1));
			fill(mix);

			// let size = this.MaxSize * this.NoteState;
			let size = map(this.NoteState, 0, 1, this.MaxSize, 1);
			ellipse(this.Pos.x, this.Pos.y, size, size);
			image(NoteImg, this.Pos.x - (size/2), this.Pos.y - (size/2), size, size);
		}
		this.NoteState -= 0.05;
		this.NoteState = constrain(this.NoteState, 0, 1);
	}

	SetTriggered(state)
	{
		if (this.NoteState < 0.5)
		{
			this.PlayNote();
		}

		this.NoteState = 1;
	}

	PlayNote()
	{
		let normX = this.Pos.x / NoteGrid.GridWidth;
		let normY = this.Pos.y / NoteGrid.GridHeight;
		// let octave = Math.round(12 * normY).toString();
		// let note = random(['A', 'B', 'C', 'D', 'E', 'F', 'G'])
		// let key = note + octave;
		let hertz = lerp(20, 2000, normX);

		// note velocity (volume, from 0 to 1)
		let velocity = 1 - normY;
		// time from now (in seconds)
		let time = 0;
		// note duration (in seconds)
		let dur = 1/6;

		MonoSynth.play(hertz, velocity, time, dur);
	}
}