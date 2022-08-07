var imgs = [];
var avgImg;
var numOfImages = 30;
var selectedIndex = 0;

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
	selectedIndex = Math.trunc(random(0, imgs.length-1));
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
	let selectedImg = imgs[selectedIndex];
	image(selectedImg, 0, 0)

	// load pixels
	for (let i = 0; i < imgs.length; i++)
	{
		imgs[i].loadPixels();
	}
	selectedImg.loadPixels();
	avgImg.loadPixels();

	let fade = mouseX / width;
	// find avg
	for (let x = 0; x < imgs[0].width; x++)
	{
		for (let y = 0; y < imgs[0].height; y++)
		{
			let avgColor = GetAvgColor(selectedImg, imgs, x, y, fade);
			SetPixel(avgImg, x, y, avgColor);
		}
	}

	avgImg.updatePixels();
	// display image
	image(avgImg, imgs[0].width, 0)

	// we don't need to loop so save the performance
	noLoop();
}


function GetAvgColor(selectedImg, imgs, x, y, fade)
{
	let sumR = 0;
	let sumG = 0;
	let sumB = 0;

	for (let i = 0; i < imgs.length; i++)
	{
		let pixelColor = GetPixel(imgs[i], x, y);
		sumR += pixelColor[0];
		sumG += pixelColor[1];
		sumB += pixelColor[2];
	}

	sumR /= imgs.length;
	sumG /= imgs.length;
	sumB /= imgs.length;

	let pixelColor = GetPixel(selectedImg, x, y);
	let selectedR = pixelColor[0];
	let selectedG = pixelColor[1];
	let selectedB = pixelColor[2];
	sumR = lerp(selectedR, sumR, fade);
	sumG = lerp(selectedG, sumG, fade);
	sumB = lerp(selectedB, sumB, fade);

	return color(sumR, sumG, sumB, 255)
}


//faster function to get the color of pixels
function GetPixel(img, x, y)
{
	var d = pixelDensity();
	var color = [];
	for (var i = 0; i < d; ++i)
	{
		for (var j = 0; j < d; ++j)
		{
		var idx = 4 * ((y * d + j) * img.width * d + (x * d + i));
		color[0] = img.pixels[idx];
		color[1] = img.pixels[idx+1];
		color[2] = img.pixels[idx+2];
		color[3] = img.pixels[idx+3];
		}
	}
	return color;
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