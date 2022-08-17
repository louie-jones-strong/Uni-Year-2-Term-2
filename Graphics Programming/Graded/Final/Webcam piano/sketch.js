var Video;
var PrevImg;
var DiffImg;
var CurrImg;

var NoteGrid;
var OpticalFlow;
var Particles;

const FlowStep = 4;
const ScaleFactor = 4;
var ShouldFlipVideo = true;


function setup()
{
	createCanvas(640 * 2, 480);
	pixelDensity(1);
	Video = createCapture(VIDEO);
	Video.hide();

	NoteGrid = new Grid(640,480);
	OpticalFlow = new FlowCalculator(FlowStep);
	Particles = new ParticleManger();

	background(0);
}

function draw()
{
	CurrImg = createImage(Video.width, Video.height);
	CurrImg.copy(Video, 0, 0, Video.width, Video.height, 0, 0, Video.width, Video.height);

	if (ShouldFlipVideo)
	{
		CurrImg = FlipImage(CurrImg);
	}

	if (typeof CurrImg === 'undefined')
	{
		return;
	}

	// Draw current image at full scale
	background(0);
	image(CurrImg, 0, 0);

	// reduce the resolution of the image to speed up processing
	CurrImg.resize(Video.width / ScaleFactor, Video.height / ScaleFactor);

	// blur the current image to reduce the affect of the noise
	CurrImg.filter(BLUR, 3);

	// handle prev img being undefined
	// this will only happen for the first frame
	if (typeof PrevImg !== 'undefined')
	{
		let threshold = document.getElementById("thresholdSlider").value;
		let cellSize = document.getElementById("cellSizeSlider").value;
		NoteGrid.CreateGrid(cellSize);

		DiffImg = CalculateImgDelta(CurrImg, PrevImg, threshold);

		// resize diff image to full size to make it easier to debug
		image(DiffImg, 640, 0, Video.width, Video.height);

		NoteGrid.Run(DiffImg);

		OpticalFlow.calculate(PrevImg.pixels, CurrImg.pixels, CurrImg.width, CurrImg.height);
		Particles.Update();
		DrawFlow(Video.width);
	}

	// copy current image into prevImg
	PrevImg = createImage(CurrImg.width, CurrImg.height);
	PrevImg.copy(CurrImg, 0, 0, CurrImg.width, CurrImg.height, 0, 0, CurrImg.width, CurrImg.height);
}

function CalculateImgDelta(currImg, prevImg, threshold)
{
	// square the threshold so we can use the DistSquared,
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

			var d = DistSquared(currR, currG, currB, prevR, prevG, prevB);

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

function DrawFlow(xOffset)
{
	let threshold = 5;
	if (OpticalFlow.flow && OpticalFlow.flow.u != 0 && OpticalFlow.flow.v != 0)
	{
		for (var i=0; i<OpticalFlow.flow.zones.length; i++)
		{
			zone = OpticalFlow.flow.zones[i];

			if (abs(zone.u)>threshold || abs(zone.v)>threshold)
			{ // only if movement is significant
				stroke(map(zone.u, -FlowStep, +FlowStep, 0, 255),
					   map(zone.v, -FlowStep, +FlowStep, 0, 255), 128);

				let x = zone.x*ScaleFactor + xOffset;
				let y = zone.y*ScaleFactor;
				line(x, y, x + zone.u*ScaleFactor, y + zone.v*ScaleFactor);
			}
		}
	}
}

// faster method for calculating color similarity which does not calculate root.
// Only needed if dist() runs slow
function DistSquared(x1, y1, z1, x2, y2, z2)
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


document.getElementById("toggleFlip").onclick = function(){ShouldFlipVideo = !ShouldFlipVideo;};