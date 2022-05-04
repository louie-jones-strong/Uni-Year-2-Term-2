////////////////////////////////////////////////////////////////
function setupGround(){
	ground = Bodies.rectangle(500, 600, 1000, 40, {
		isStatic: true, angle: 0
	});
	World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
	push();
	fill(128);
	drawVertices(ground.vertices);
	pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
	propeller = Bodies.rectangle(150, 480, 200, 15, {
		isStatic: true, angle: angle
	});
	World.add(engine.world, [propeller]);
}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
	push();

	Body.setAngle(propeller, angle);
	Body.setAngularVelocity(propeller, angleSpeed);

	angle += angleSpeed

	drawVertices(propeller.vertices);
	pop();
}
////////////////////////////////////////////////////////////////
function setupMovingWall(){
	movingWallPosY = 250;
	movingWall = Bodies.rectangle(500, movingWallPosY, 15, 300, {
		isStatic: true
	});
	World.add(engine.world, [movingWall]);
}
////////////////////////////////////////////////////////////////
//updates and draws the moving Wall
function drawMovingWall(){
	push();

	movingWallPosY += movingWallSpeed;
	if(movingWallPosY<= 200 || movingWallPosY >= 400) {
		movingWallSpeed *= -1;
	}

	Body.setPosition(movingWall, {x:500, y:movingWallPosY});
	Body.setVelocity(movingWall, {x:0, y:movingWallPosY});

	drawVertices(movingWall.vertices);
	pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
	var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
			restitution: 0.95 });
	Matter.Body.setMass(bird, bird.mass*10);
	World.add(engine.world, [bird]);
	birds.push(bird);
	birdsImgIndex.push(Math.round(Math.random() * 3));
}
////////////////////////////////////////////////////////////////
function drawBirds(){
	push();

	let index = 0;
	while (index < birds.length)
	{
		const bird = birds[index];
		if (isOffScreen(bird))
		{
			removeFromWorld(bird);
			birds.splice(index, 1);
			birdsImgIndex.splice(index, 1);
		}
		else
		{
			let birdPos = bird.position;
			image(birdImages[birdsImgIndex[index]], birdPos.x-20, birdPos.y-20, 40, 40);
			index += 1;
		}
	}
	pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){
	for (let x = 0; x < 3; x++)
	{
		for (let y = 0; y < 6; y++)
		{
			let box = Bodies.rectangle(650 + x * 80, 520 - y * 80, 80, 80);
			boxes.push(box);
			boxImgIndex.push(Math.round(Math.random() * 3));
		}
	}
	World.add(engine.world, boxes);
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
	push();

	let index = 0;
	while (index < boxes.length)
	{
		const box = boxes[index];
		if (isOffScreen(box))
		{
			removeFromWorld(box);
			boxes.splice(index, 1);
			boxImgIndex.splice(index, 1);
			score += 1;
		}
		else
		{
			push();
			let boxPos = box.position;
			translate(boxPos.x, boxPos.y);
			rotate(box.angle);
			image(boxImages[boxImgIndex[index]], -40, -40, 80, 80);
			index += 1;
			pop();
		}
	}
	pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
	slingshotBird = Bodies.circle(300, 200, 20, {friction: 0,
		restitution: 0.95 });
	Body.setMass(slingshotBird, slingshotBird.mass*10);

	slingshotConstraint = Constraint.create({
		pointA: {x:300, y:150},
		bodyB: slingshotBird,
		pointB: {x:0, y:0},
		stiffness: 0.01,
		damping: 0.0001
	});

	World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
	push();
	let birdPos = slingshotBird.position;

	drawConstraint(slingshotConstraint);
	image(birdImages[0], birdPos.x-20, birdPos.y-20, 40, 40);
	pop();
}
/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
	var mouse = Mouse.create(canvas.elt);
	var mouseParams = {
		mouse: mouse,
		constraint: { stiffness: 0.05 }
	}
	mouseConstraint = MouseConstraint.create(engine, mouseParams);
	mouseConstraint.mouse.pixelRatio = pixelDensity();
	World.add(engine.world, mouseConstraint);
}
