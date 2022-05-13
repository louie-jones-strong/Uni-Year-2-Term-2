var stepSize = 20;
var speed = 0;

function setup()
{
	angleMode(DEGREES);
	createCanvas(500, 500);
}
///////////////////////////////////////////////////////////////////////
function draw()
{
	background(125);

	speed = map(mouseX, 0, 500, 0.01, 0.1);

	colorGrid();
	compassGrid();
}
///////////////////////////////////////////////////////////////////////
function colorGrid()
{
	for (let x = 0; x < 25; x++)
	{
		for (let y = 0; y < 25; y++)
		{
			let n = GetNoise(x, y);
			let c = lerpColor(color(255, 0, 0), color(0, 255, 0), n);
			noStroke();
			fill(c);


			rect(x * stepSize, y * stepSize, stepSize, stepSize);

		}
	}
}
///////////////////////////////////////////////////////////////////////
function compassGrid()
{
	stroke(2);
	fill(0);

	for (let x = 0; x < 25; x++)
	{
		for (let y = 0; y < 25; y++)
		{
			push();

			translate((x + 0.5) * stepSize, (y + 0.5) * stepSize);

			let n = GetNoise(x, y);
			let r = map(n, 0, 1, 0, 720);
			rotate(r);

			n = GetNoise(x + stepSize, y + stepSize);
			let l = map(n, 0, 1, 0.25, 1.5);

			line(0, stepSize * l, 0, 0);

			pop();
		}
	}
}


function GetNoise(x, y, size, rate)
{
	let n = noise(x/stepSize, y/stepSize, frameCount * speed);
	return n;
}