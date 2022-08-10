var imgs = [];
var avgImg;
var numOfImages = 30;
var SelectedImg;

//////////////////////////////////////////////////////////
function preload()
{
	for (let i = 0; i < numOfImages; i++)
	{
		imgs.push(loadImage("assets/"+i+".jpg"));
	}
}


//////////////////////////////////////////////////////////
function setup()
{
	createCanvas(imgs[0].width*2, imgs[0].height);
	pixelDensity(1);

	avgImg = createGraphics(imgs[0].width , imgs[0].height);

	SelectRandomImg();
}

function SelectRandomImg()
{
	var selectedIndex = Math.trunc(random(0, imgs.length-1));

	SelectedImg = imgs[selectedIndex];
}


function keyPressed()
{
	SelectRandomImg();
	loop();
}

function mouseMoved()
{
	loop();
}

//////////////////////////////////////////////////////////
function draw()
{

	background(125);
	image(SelectedImg, 0, 0)

	// load pixels
	for (let i = 0; i < imgs.length; i++)
	{
		imgs[i].loadPixels();
	}

	avgImg.loadPixels();
	SelectedImg.loadPixels();

	let fade = mouseX / width;
	// find avg
	for (let x = 0; x < imgs[0].width; x++)
	{
		for (let y = 0; y < imgs[0].height; y++)
		{
			let avgColor = GetAvgColor(imgs, x, y);
			let lerpedColor = LerpToSelectedImg(x, y, avgColor, fade);
			SetPixel(avgImg, x, y, lerpedColor);
		}
	}

	avgImg.updatePixels();
	// display image
	image(avgImg, imgs[0].width, 0)

	// we don't need to loop so save the performance
	noLoop();
}


function GetAvgColor(imgs, x, y)
{
	let sumR = 0;
	let sumG = 0;
	let sumB = 0;

	for (let i = 0; i < imgs.length; i++)
	{
		let pixelColor = GetPixel(imgs[i], x, y);
		sumR += pixelColor.levels[0];
		sumG += pixelColor.levels[1];
		sumB += pixelColor.levels[2];
	}

	sumR /= imgs.length;
	sumG /= imgs.length;
	sumB /= imgs.length;

	return color(sumR, sumG, sumB, 255);
}

function LerpToSelectedImg(x, y, startingColor, amount)
{
	let selectedColour = GetPixel(SelectedImg, x, y);

	let r = lerp(selectedColour.levels[0], startingColor.levels[0], amount);
	let g = lerp(selectedColour.levels[1], startingColor.levels[1], amount);
	let b = lerp(selectedColour.levels[2], startingColor.levels[2], amount);

	return color(r, g, b, 255);
}


//faster function to get the color of pixels
function GetPixel(img, x, y)
{
	var d = pixelDensity();
	var pixelColor = [];
	for (var i = 0; i < d; ++i)
	{
		for (var j = 0; j < d; ++j)
		{
		var idx = 4 * ((y * d + j) * img.width * d + (x * d + i));
		pixelColor[0] = img.pixels[idx];
		pixelColor[1] = img.pixels[idx+1];
		pixelColor[2] = img.pixels[idx+2];
		pixelColor[3] = img.pixels[idx+3];
		}
	}
	return color(pixelColor[0], pixelColor[1], pixelColor[2], pixelColor[3]);
}

//faster function to set the color of pixels
function SetPixel(img, x, y, color)
{
	var d = pixelDensity();
	for (var i = 0; i < d; ++i)
	{
		for (var j = 0; j < d; ++j)
		{
			var idx = 4 * ((y * d + j) * img.width * d + (x * d + i));
			img.pixels[idx]   = color.levels[0];
			img.pixels[idx+1] = color.levels[1];
			img.pixels[idx+2] = color.levels[2];
			img.pixels[idx+3] = color.levels[3];
		}
	}
}