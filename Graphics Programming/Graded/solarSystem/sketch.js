var speed;

function setup() {
	createCanvas(900, 700);
}

function draw() {
	background(0);
	speed = frameCount;

	push();
	translate(width/2, height/2);
	rotate(radians(speed/3));
	celestialObj(color(255,150,0), 200, "Sun"); // Sun

	push();
	rotate(radians(speed));
	translate(300, 0);
	rotate(radians(speed));
	celestialObj(color(0,0,255), 80, "Earth"); // Earth

	push();
	rotate(radians(-speed*2));
	translate(100, 0);
	celestialObj(color(255,255,255), 30, "Moon"); // Moon

	pop();
	rotate(radians(-speed*2.5));
	translate(70, 0);
	celestialObj(color(255,255,255), 20, "Moon 2"); // Moon 2

	pop();

	push();
	rotate(radians(speed*1.25+180))
	translate(200, 0);
	rotate(radians(speed));
	celestialObj(color(255,0,0), 60, "Mars"); // Mar



}

function celestialObj(c, size, name){
	strokeWeight(5);
	fill(c);
	stroke(0);
	ellipse(0, 0, size, size);
	line(0, 0, size/2, 0);

	push();
	fill(color(255,255,255));
	noStroke(51);
	text(name, size/2, 0);
	pop();
}
