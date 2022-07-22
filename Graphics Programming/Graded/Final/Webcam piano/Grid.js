class Grid
{
	/////////////////////////////////
	constructor(_w, _h)
	{
		this.gridWidth = _w;
		this.gridHeight = _h;
		this.cellSize = 40;
		this.notes = []

		// initalise grid structure and state
		for (var x=0; x<_w; x+=this.cellSize)
		{
			var notesColumn = [];
			for (var y=0; y<_h; y+=this.cellSize)
			{
				let pos = createVector(x, y);
				notesColumn.push(new Note(this.cellSize, pos));
			}
			this.notes.push(notesColumn);
		}
	}

	/////////////////////////////////
	run(img)
	{
		img.loadPixels();
		this.findActiveNotes(img);
		this.drawActiveNotes(img);
	}

	/////////////////////////////////
	drawActiveNotes(img)
	{
		// draw active notes
		fill(255);
		noStroke();
		for (var i=0;i<this.notes.length;i++)
		{
			for (var j=0; j<this.notes[i].length; j++)
			{
				this.notes[i][j].draw(img);
			}
		}
	}

	/////////////////////////////////
	findActiveNotes(img)
	{
		for (var x = 0; x < img.width; x += 1)
		{
			for (var y = 0; y < img.height; y += 1)
			{
				var index = (x + (y * img.width)) * 4;
				var state = img.pixels[index + 0];
				if (state != 0)
				{ // if pixel is not black (ie there is movement)
					// find which note to activate
					var screenX = map(x, 0, img.width, 0, this.gridWidth);
					var screenY = map(y, 0, img.height, 0, this.gridHeight);
					var i = int(screenX/this.cellSize);
					var j = int(screenY/this.cellSize);
					this.notes[i][j].setTriggered(state);
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
			var alpha = this.noteState * 200;
			var c1 = color(255, 0, 0, alpha);
			var c2 = color(0, 255, 0, alpha);
			var mix = lerpColor(c1, c2, map(this.pos.y, 0, height, 0, 1));
			fill(mix);
			var s = this.noteState;
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