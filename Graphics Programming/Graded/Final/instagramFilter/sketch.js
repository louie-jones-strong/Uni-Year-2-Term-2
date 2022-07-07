// Image of Husky Creative commons from Wikipedia:
// https://en.wikipedia.org/wiki/Dog#/media/File:Siberian_Husky_pho.jpg
var imgIn;
var matrix = [
	[1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
	[1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
	[1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
	[1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
	[1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
	[1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
	[1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64],
	[1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64, 1/64]
];
/////////////////////////////////////////////////////////////////
function preload()
{
	imgIn = loadImage("assets/husky.jpg");
}
/////////////////////////////////////////////////////////////////
function setup()
{
	createCanvas((imgIn.width * 2), imgIn.height);
}
/////////////////////////////////////////////////////////////////
function draw()
{
	background(125);
	image(imgIn, 0, 0);
	image(earlyBirdFilter(imgIn), imgIn.width, 0);
	noLoop();
}
/////////////////////////////////////////////////////////////////
function mousePressed()
{
	loop();
}
/////////////////////////////////////////////////////////////////
function earlyBirdFilter(img)
{
	var resultImg = createImage(imgIn.width, imgIn.height);
	resultImg = sepiaFilter(imgIn);
	resultImg = darkCorners(resultImg);
	// resultImg = radialBlurFilter(resultImg);
	// resultImg = borderFilter(resultImg)
	return resultImg;
}

function sepiaFilter(img)
{
	imgOut = createImage(img.width, img.height);

	imgOut.loadPixels();
	img.loadPixels();

	for (var x = 0; x < imgOut.width; x++)
	{
		for (var y = 0; y < imgOut.height; y++)
		{

			var index = (x + y * imgOut.width) * 4;

			let oldRed = img.pixels[index + 0];
			let oldGreen = img.pixels[index + 1];
			let oldBlue = img.pixels[index + 2];

			let newRed = (oldRed * 0.393) + (oldGreen * 0.769) + (oldBlue * 0.189)
			let newGreen = (oldRed * 0.349) + (oldGreen * 0.686) + (oldBlue * 0.168)
			let newBlue = (oldRed * 0.272) + (oldGreen * 0.534) + (oldBlue * 0.131)

			imgOut.pixels[index + 0] = newRed;
			imgOut.pixels[index + 1] = newGreen;
			imgOut.pixels[index + 2] = newBlue;
			imgOut.pixels[index + 3] = 255;
	}
	}
	imgOut.updatePixels();
	return imgOut;
}


function darkCorners(img)
{
	imgOut = createImage(img.width, img.height);

	imgOut.loadPixels();
	img.loadPixels();

	let center = createVector(img.width / 2, img.height / 2);
	let maxDistance = createVector(0, 0).dist(center);

	for (var x = 0; x < imgOut.width; x++)
	{
		for (var y = 0; y < imgOut.height; y++)
		{
			var index = (x + y * imgOut.width) * 4;

			let pos = createVector(x, y);
			let distance = center.dist(pos);

			let dynLum = map(distance, 300, 450, 1, 0.4);
			if (distance > 450)
			{
				dynLum  = map(distance, 450, maxDistance, 0.4, 0)
			}
			dynLum = constrain(dynLum, 0, 1);


			imgOut.pixels[index + 0] = dynLum * img.pixels[index + 0];
			imgOut.pixels[index + 1] = dynLum * img.pixels[index + 1];
			imgOut.pixels[index + 2] = dynLum * img.pixels[index + 2];
			imgOut.pixels[index + 3] = 255;
		}
	}
	imgOut.updatePixels();
	return imgOut;
}
