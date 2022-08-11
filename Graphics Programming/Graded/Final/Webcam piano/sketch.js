var video;
var prevImg;
var diffImg;
var currImg;
var grid;
var flip = true;

var flow;
var flowStep = 4;
var scaleFactor = 4;

function setup()
{
	createCanvas(640 * 2, 480);
	pixelDensity(1);
	video = createCapture(VIDEO);
	video.hide();

	grid = new Grid(640,480);
	flow = new FlowCalculator(flowStep);

	background(0);
}

function draw()
{
	currImg = createImage(video.width, video.height);
	currImg.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);

	if (flip)
	{
		currImg = FlipImage(currImg);
	}

	if (typeof currImg === 'undefined')
	{
		return;
	}

	// Draw current image at full scale
	background(0);
	image(currImg, 0, 0);

	// reduce the resolution of the image to speed up processing
	currImg.resize(video.width / scaleFactor, video.height / scaleFactor);

	// blur the current image to reduce the affect of the noise
	currImg.filter(BLUR, 3);

	// handle prev img being undefined
	// this will only happen for the first frame
	if (typeof prevImg !== 'undefined')
	{
		let threshold = document.getElementById("thresholdSlider").value;
		let cellSize = document.getElementById("cellSizeSlider").value;
		grid.CreateGrid(cellSize);

		diffImg = CalculateImgDelta(currImg, prevImg, threshold);

		// resize diff image to full size to make it easier to debug
		image(diffImg, 640, 0, video.width, video.height);

		grid.Run(diffImg);

		flow.calculate(prevImg.pixels, currImg.pixels, currImg.width, currImg.height);
		DrawFlow(scaleFactor, video.width)
	}

	// copy current image into prevImg
	prevImg = createImage(currImg.width, currImg.height);
	prevImg.copy(currImg, 0, 0, currImg.width, currImg.height, 0, 0, currImg.width, currImg.height);
}

function CalculateImgDelta(currImg, prevImg, threshold)
{
	// square the threshold so we can use the distSquared,
	// this means the code can run faster
	let thresholdSquared = threshold * threshold;

	let deltaImg = createImage(currImg.width, currImg.height);
	deltaImg.loadPixels();

	prevImg.loadPixels();
	currImg.loadPixels();
	for (var x = 0; x < currImg.width; x += 1)
	{
		for (var y = 0; y < currImg.height; y += 1)
		{
			var index = (x + (y * currImg.width)) * 4;
			var currR = currImg.pixels[index + 0];
			var currG = currImg.pixels[index + 1];
			var currB = currImg.pixels[index + 2];

			var prevR = prevImg.pixels[index + 0];
			var prevG = prevImg.pixels[index + 1];
			var prevB = prevImg.pixels[index + 2];

			var d = distSquared(currR, currG, currB, prevR, prevG, prevB);

			if (d < thresholdSquared)
			{
				deltaImg.pixels[index + 0] = 0;
				deltaImg.pixels[index + 1] = 0;
				deltaImg.pixels[index + 2] = 0;
				deltaImg.pixels[index + 3] = 255;
			}
			else
			{
				deltaImg.pixels[index + 0] = 255;
				deltaImg.pixels[index + 1] = 255;
				deltaImg.pixels[index + 2] = 255;
				deltaImg.pixels[index + 3] = 255;
			}
		}
	}
	deltaImg.updatePixels();
	return deltaImg;
}

function DrawFlow(scale, xOffset)
{
	let threshold = 5;
	if (flow.flow && flow.flow.u != 0 && flow.flow.v != 0) {
		for (var i=0; i<flow.flow.zones.length; i++){
			zone = flow.flow.zones[i];

			if (abs(zone.u)>threshold || abs(zone.v)>threshold){ // only if movement is significant
				stroke(map(zone.u, -flowStep, +flowStep, 0, 255),
					   map(zone.v, -flowStep, +flowStep, 0, 255), 128);

				let x = zone.x*scale + xOffset;
				let y = zone.y*scale;
				line(x, y, x + zone.u*scale, y + zone.v*scale);
			}
		}

		strokeWeight(2);
		stroke(255);
		translate(width/2, height/2);
	}
}

// faster method for calculating color similarity which does not calculate root.
// Only needed if dist() runs slow
function distSquared(x1, y1, z1, x2, y2, z2)
{
	var d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) + (z2-z1)*(z2-z1);
	return d;
}

function FlipImage(img)
{
	let flippedImg = createImage(img.width, img.height);
	flippedImg.loadPixels();

	img.loadPixels();

	for (var x = 0; x < img.width; x += 1)
	{
		for (var y = 0; y < img.height; y += 1)
		{
			var index = (x + (y * img.width)) * 4;
			var flippedIndex = ((img.width-x) + (y * img.width)) * 4;
			flippedImg.pixels[flippedIndex + 0] = img.pixels[index + 0];
			flippedImg.pixels[flippedIndex + 1] = img.pixels[index + 1];
			flippedImg.pixels[flippedIndex + 2] = img.pixels[index + 2];
			flippedImg.pixels[flippedIndex + 3] = img.pixels[index + 3];
		}
	}
	flippedImg.updatePixels();
	return flippedImg;
}


document.getElementById("toggleFlip").onclick = function(){flip = !flip;};