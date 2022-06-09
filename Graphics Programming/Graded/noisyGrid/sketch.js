var stepSize = 20;
var speed = 0;
var showLines = true;

var colour1;
var colour2;

function setup()
{
	angleMode(DEGREES);
	createCanvas(500, 500);

	let colorPicker = document.getElementById("colour1").value = "#ff0000";
	colorPicker = document.getElementById("colour2").value = "#00ff00";

}
///////////////////////////////////////////////////////////////////////
function draw()
{
	speed = document.getElementById("speedSlider").value;

	let colorPicker = document.getElementById("colour1");
	colour1 = color(colorPicker.value);

	colorPicker = document.getElementById("colour2");
	colour2 = color(colorPicker.value);


	background(125);


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
			let noise = GetNoise(x, y);
			let colour = lerpColor(colour1, colour2, noise);
			noStroke();
			fill(colour);


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

			if (showLines)
			{
				n = GetNoise(x + stepSize, y + stepSize);
				let l = map(n, 0, 1, 0.25, 1.5);

				line(0, stepSize * l, 0, 0);

			}

			pop();
		}
	}
}


function GetNoise(x, y, size, rate)
{
	let n = noise(x/stepSize, y/stepSize, frameCount * speed);
	return n;
}

document.getElementById("toggleLines").onclick = function(){showLines = !showLines;};