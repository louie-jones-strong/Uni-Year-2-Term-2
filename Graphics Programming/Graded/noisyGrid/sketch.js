var canvasSize = 500;

var stepSize = 20;

var lineSize = 1;
var showLines = true;
var showBackground = true;


var backgroundColourPicker1;
var backgroundColourPicker2;
var backgroundColour1;
var backgroundColour2;

var lineColourPicker1;
var lineColourPicker2;
var lineColour1;
var lineColour2;

var xNoiseScroll = 0;
var yNoiseScroll = 0;
var zNoiseScroll = 0;



function setup()
{
	angleMode(DEGREES);

	let canvas = createCanvas(canvasSize, canvasSize);
	canvas.id('canvas');
	canvas.parent("content");

	backgroundColourPicker1 = document.getElementById("backgroundColour1");
	backgroundColourPicker1.value = "#ff0000";
	backgroundColourPicker2 = document.getElementById("backgroundColour2");
	backgroundColourPicker2.value = "#00ff00";

	lineColourPicker1 = document.getElementById("lineColour1");
	lineColourPicker1.value = "#ff0000";
	lineColourPicker2 = document.getElementById("lineColour2");
	lineColourPicker2.value = "#000000";

}
///////////////////////////////////////////////////////////////////////
function draw()
{
	// getting settings from the html
	lineSize = document.getElementById("lineSize").value;

	backgroundColour1 = color(backgroundColourPicker1.value);
	backgroundColour2 = color(backgroundColourPicker2.value);

	lineColour1 = color(lineColourPicker1.value);
	lineColour2 = color(lineColourPicker2.value);

	xNoiseScroll += (deltaTime / 1000) * document.getElementById("xNoiseScroll").value;
	yNoiseScroll += (deltaTime / 1000) * document.getElementById("yNoiseScroll").value;
	zNoiseScroll += (deltaTime / 1000) * document.getElementById("zNoiseScroll").value;

	background(backgroundColour1);

	if (showBackground)
	{
		colorGrid();
	}

	if (showLines)
	{
		compassGrid();
	}
}
///////////////////////////////////////////////////////////////////////
function colorGrid()
{
	let steps = int(canvasSize/stepSize);

	for (let y = 0; y < steps; y++)
	{
		for (let x = 0; x < steps; x++)
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

	let steps = int(canvasSize/stepSize);

	for (let y = 0; y < steps; y++)
	{
		for (let x = 0; x < steps; x++)
		{
			push();

			translate((x + 0.5) * stepSize, (y + 0.5) * stepSize);

			let noise = GetNoise(x, y);
			let rotation = map(noise, 0, 1, 0, 360);
			let colour = lerpColor(lineColour1, lineColour2, noise);
			rotate(rotation);


			noise = GetNoise(x, y, 1000);
			let lineSizeMultiplier = map(noise, 0, 1, 0.1, 1);

			stroke(colour);

			strokeWeight(lineSize * lineSizeMultiplier * 4)
			line(0, stepSize * lineSize * lineSizeMultiplier, 0, 0);


			pop();
		}
	}
}


function GetNoise(x, y, z=0)
{
	x /= stepSize;
	y /= stepSize;

	x += xNoiseScroll;
	y += yNoiseScroll;
	z += zNoiseScroll;

	let n = noise(x, y, z);
	// using map here to make the range more consistent as over 10,000 calls this rarely leaves the range of 0.25 to 0.75
	return map(n, 0.25, 0.75, 0, 1);;
}

document.getElementById("toggleLines").onclick = function(){showLines = !showLines;};
document.getElementById("toggleBackground").onclick = function(){showBackground = !showBackground;};