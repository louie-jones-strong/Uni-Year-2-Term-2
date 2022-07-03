var imgs = [];
var avgImg;
var numOfImages = 30;

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
	createCanvas(imgs[0].width*2, imgs[0].height*2);
	pixelDensity(1);

	avgImg = createGraphics(imgs[0].width , imgs[0].height);
}


//////////////////////////////////////////////////////////
function draw()
{
	background(125);
	image(imgs[0], 0, 0)

	// load pixels
	for (let i = 0; i < imgs.length; i++)
	{
		imgs[i].loadPixels();
	}
	avgImg.loadPixels();

	// find avg
	for (let x = 0; x < imgs[0].width; x++)
	{
		for (let y = 0; y < imgs[0].height; y++)
		{
			let avgColor = GetAvgColor(imgs, x, y);
			SetPixel(avgImg, x, y, avgColor);
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
		sumR += pixelColor[0];
		sumG += pixelColor[1];
		sumB += pixelColor[2];
	}

	sumR /= imgs.length;
	sumG /= imgs.length;
	sumB /= imgs.length;

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