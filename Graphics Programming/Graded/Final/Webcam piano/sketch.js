var video;
var prevImg;
var diffImg;
var currImg;
var thresholdSlider;
var grid;

function setup()
{
	createCanvas(640 * 2, 480);
	pixelDensity(1);
	video = createCapture(VIDEO);
	video.hide();

	thresholdSlider = createSlider(0, 255, 50);
	thresholdSlider.position(20, 20);
	grid = new Grid(640,480);

	background(0);
}

function draw()
{
	currImg = createImage(video.width, video.height);
	currImg.copy(video, 0, 0, video.width, video.height, 0, 0, video.width, video.height);

	if (typeof currImg === 'undefined')
	{
		return;
	}

	// Draw current image at full scale
	background(0);
	image(currImg, 0, 0);

	// reduce the resolution of the image to speed up processing
	currImg.resize(video.width / 4, video.height / 4);

	// blur the current image to reduce the affect of the noise
	currImg.filter(BLUR, 3);

	// handle prev img being undefined by setting to the same as current
	// this will only happen for the first frame
	if (typeof prevImg !== 'undefined')
	{

		let threshold = thresholdSlider.value();

		diffImg = CalculateImgDelta(currImg, prevImg, threshold);

		// resize diff image to full size to make it easier to debug
		image(diffImg, 640, 0, video.width, video.height);
		noFill();
		stroke(255);
		text(threshold, 160, 35);

		grid.run(diffImg);
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

// faster method for calculating color similarity which does not calculate root.
// Only needed if dist() runs slow
function distSquared(x1, y1, z1, x2, y2, z2)
{
	var d = (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) + (z2-z1)*(z2-z1);
	return d;
}