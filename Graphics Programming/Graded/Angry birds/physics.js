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
function setupBird(){
	var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
			restitution: 0.95 });
	Matter.Body.setMass(bird, bird.mass*10);
	World.add(engine.world, [bird]);
	birds.push(bird);
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
		}
		else
		{
			drawVertices(bird.vertices);
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
			colors.push([0, 30 + Math.random() * 225, 0]);
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
		fill(colors[index]);

		const box = boxes[index];
		if (isOffScreen(box))
		{
			removeFromWorld(box);
			boxes.splice(index, 1);
			colors.splice(index, 1);
		}
		else
		{
			drawVertices(box.vertices);
			index += 1;
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
	drawVertices(slingshotBird.vertices);
	drawConstraint(slingshotConstraint);
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
