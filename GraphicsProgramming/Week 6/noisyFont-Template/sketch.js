var points;
var font;
var amt = 500;
var time = 0;

function preload()
{
	font = loadFont('assets/Calistoga-Regular.ttf');
}

function setup()
{
	createCanvas(900, 400);
	background(0);

	points = font.textToPoints('c o d e', 50, 300, 300, {
		sampleFactor: 2,
		simplifyThreshold: 0
	});

}

function draw()
{
	amt = mouseX
	amt = (amt / 900) * 250

	noStroke();
	fill(0,5);
	rect(0,0,width,height);

	fill(255, 0, 0);
	for (let i = 0; i < points.length; i++)
	{
		const pos = points[i];

		let nx = noise(time + pos.x);
		nx = (nx * amt * 2) - amt;

		let ny = noise(time + pos.y);
		ny = (ny * amt * 2) - amt;

		let x = pos.x;
		x += nx
		let y = pos.y;
		y += ny


		ellipse(x, y, 1, 1)
	}

	time += deltaTime / 100;
}
