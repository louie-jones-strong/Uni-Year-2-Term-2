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
	resultImg = radialBlurFilter(resultImg);
	resultImg = borderFilter(resultImg)
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

function radialBlurFilter(img)
{
	var imgOut = createImage(img.width, img.height);
	imgOut.loadPixels();
	img.loadPixels();

	let mousePos = createVector(mouseX, mouseY);

	// read every pixel
	for (var x = 0; x < imgOut.width; x++)
	{
		for (var y = 0; y < imgOut.height; y++)
		{
			var index = (x + y * imgOut.width) * 4;

			var c = convolution(x, y, matrix, img);

			let pos = createVector(x, y);
			let distance = mousePos.dist(pos);

			let dynBlur = map(distance, 100, 300, 0, 1);
			dynBlur = constrain(dynBlur, 0, 1);


			let inputR =  img.pixels[index + 0];
			let inputG =  img.pixels[index + 1];
			let inputB =  img.pixels[index + 2];
			imgOut.pixels[index + 0] = c[0] * dynBlur + inputR*(1-dynBlur);
			imgOut.pixels[index + 1] = c[1] * dynBlur + inputG*(1-dynBlur);
			imgOut.pixels[index + 2] = c[2] * dynBlur + inputB*(1-dynBlur);

			imgOut.pixels[index + 3] = 255;
		}
	}
	imgOut.updatePixels();
	return imgOut;
}

function convolution(x, y, matrix, img)
{
	var totalRed = 0.0;
	var totalGreen = 0.0;
	var totalBlue = 0.0;
	var offset = floor(matrix.length / 2);

	// convolution matrix loop
	for (var i = 0; i < matrix.length; i++) {
		for (var j = 0; j < matrix.length; j++) {
			// Get pixel loc within convolution matrix
			var xloc = x + i - offset;
			var yloc = y + j - offset;
			var index = (xloc + img.width * yloc) * 4;
			// ensure we don't address a pixel that doesn't exist
			index = constrain(index, 0, img.pixels.length - 1);

			// multiply all values with the mask and sum up
			totalRed += img.pixels[index + 0] * matrix[i][j];
			totalGreen += img.pixels[index + 1] * matrix[i][j];
			totalBlue += img.pixels[index + 2] * matrix[i][j];
		}
	}
	// return the new color
	return [totalRed, totalGreen, totalBlue];
}

function borderFilter(img)
{
	let thickness = 15;

	buffer = createGraphics(img.width, img.height);

	buffer.image(img, 0, 0);

	buffer.stroke(255)
	buffer.strokeWeight(thickness);
	buffer.noFill();
	buffer.rect(thickness/2, thickness/2, img.width-thickness, img.height-thickness, thickness*3);
	buffer.rect(thickness/2, thickness/2, img.width-thickness, img.height-thickness);


	return buffer;
}