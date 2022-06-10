var stepSize = 20;
var speed = 0;
var lineSize = 1;
var showLines = true;

var backgroundColour1;
var backgroundColour2;

var lineColour1;
var lineColour2;

function setup()
{
	angleMode(DEGREES);
	createCanvas(500, 500);

	let colorPicker = document.getElementById("backgroundColour1").value = "#ff0000";
	colorPicker = document.getElementById("backgroundColour2").value = "#00ff00";

}
///////////////////////////////////////////////////////////////////////
function draw()
{
	speed = document.getElementById("speedSlider").value;
	lineSize = document.getElementById("lineSize").value;

	let colorPicker = document.getElementById("backgroundColour1");
	backgroundColour1 = color(colorPicker.value);

	colorPicker = document.getElementById("backgroundColour2");
	backgroundColour2 = color(colorPicker.value);

	colorPicker = document.getElementById("lineColour1");
	lineColour1 = color(colorPicker.value);

	colorPicker = document.getElementById("lineColour2");
	lineColour2 = color(colorPicker.value);


	background(125);


	colorGrid();
	if (showLines)
	{
		compassGrid();
	}
}
///////////////////////////////////////////////////////////////////////
function colorGrid()
{
	for (let x = 0; x < 25; x++)
	{
		for (let y = 0; y < 25; y++)
		{
			let noise = GetNoise(x, y);
			let colour = lerpColor(backgroundColour1, backgroundColour2, noise);
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

			let noise = GetNoise(x, y);
			let rotation = map(noise, 0, 1, 0, 720);
			let colour = lerpColor(lineColour1, lineColour2, noise);
			rotate(rotation);


			noise = GetNoise(x + stepSize + 10000, y + stepSize);
			let lineSizeMultiplier = map(noise, 0, 1, 0.25, 1);

			stroke(colour);

			strokeWeight(lineSize * lineSizeMultiplier * 4)
			line(0, stepSize * lineSize * lineSizeMultiplier, 0, 0);


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