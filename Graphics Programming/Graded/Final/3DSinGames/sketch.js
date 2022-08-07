GridSize = 800;
BoxSize = 50;
LengthMin = 100;
LengthMax = 300;

NumberOfConfetti = 200;

ConfettiPieces = []

ShowGrid = true;
ShowConfetti = true;

CameraElapsedSecs = 0;
WaveElapsedSecs = 0;

function setup()
{
	createCanvas(900, 800, WEBGL);
	angleMode(DEGREES);

	for (let i = 0; i < NumberOfConfetti; i++)
	{
		ConfettiPieces.push(new ConfettiPiece())

	}
}

function draw()
{
	background(125);

	// lights
	ambientLight(25);
	pointLight(255, 255, 255, 0, 0, LengthMax / 2);

	directionalLight(255, 0, 0, 1, 0, 0);

	directionalLight(0, 255, 0, 0, 0, 1);

	directionalLight(0, 0, 255, -1, 0, 0);

	let deltaTimeSeconds = deltaTime / 1000;
	let cameraSpeed = document.getElementById("camSpeedSlider").value;


	let waveSpeed = document.getElementById("waveSpeedSlider").value;
	WaveElapsedSecs += deltaTimeSeconds * waveSpeed;

	BoxSize = document.getElementById("boxSizeSlider").value;


	CameraElapsedSecs += deltaTimeSeconds * cameraSpeed;
	// make the camera orbit the center of the world
	let camX = cos(CameraElapsedSecs) * 800;
	let camY = sin(CameraElapsedSecs) * 800;
	camera(camX, -600, camY, 0, 0, 0, 0, 1, 0);

	if (ShowGrid)
	{
		DrawGrid();
	}

	if (ShowConfetti)
	{
		DrawConfetti();
	}
}


function DrawGrid()
{
	// setup material for grid
	// normalMaterial();
	ambientMaterial(255);
	stroke(0);
	strokeWeight(2);


	for (let xIndex = 0; xIndex < GridSize/BoxSize; xIndex++)
	{
		for (let zIndex = 0; zIndex < GridSize/BoxSize; zIndex++)
		{
			push();

			// set box position
			let x = BoxSize * xIndex - GridSize/2;
			let z = BoxSize * zIndex - GridSize/2;
			translate(x, 0, z);

			// get the box's point in the wave
			let distance = dist(x, z, 0, 0);
			let length = map(sin(distance + WaveElapsedSecs), -1, 1, LengthMin, LengthMax);

			box(BoxSize, length, BoxSize);
			pop();

		}
	}
}

function DrawConfetti()
{
	// setup material for Confetti
	noStroke();
	normalMaterial();

	for (let i = 0; i < ConfettiPieces.length; i++)
	{
		ConfettiPieces[i].Draw();
	}
}





class ConfettiPiece
{
	constructor()
	{
		this.Reset();
	}

	Reset()
	{
		let x = random(-500, 500);
		let y = random(0, -800);
		let z = random(-500, 500);
		this.Position = createVector(x, y, z);


		this.RotationX = random(0, 360);
		this.RotationY = random(0, 360);

		this.Size = 15;
	}

	Draw()
	{
		push();

		this.Position.y += 1;
		this.RotationX += 5;
		this.RotationY += 5;

		translate(this.Position.x, this.Position.y, this.Position.z);

		rotateX(this.RotationX);
		rotateY(this.RotationY);

		plane(this.Size, this.Size)

		if (this.Position.y >= 0)
		{
			this.Reset();
		}

		pop();
	}
}

document.getElementById("toggleGrid").onclick = function(){ShowGrid = !ShowGrid;};
document.getElementById("toggleConfetti").onclick = function(){ShowConfetti = !ShowConfetti;};
