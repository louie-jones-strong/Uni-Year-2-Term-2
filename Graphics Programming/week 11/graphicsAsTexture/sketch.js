var graphics;

function setup() {
    createCanvas(900, 600, WEBGL);
    noStroke();
    graphics = createGraphics(300, 300);
    graphics.background(255);
}

function draw() {
    background(125);
    stroke(0);
    strokeWeight(3);
    graphics.fill(255, 0, 255);
    graphics.noStroke();
    graphics.ellipse(random(graphics.width), random(graphics.width), 10, 10);

    texture(graphics);

    //box with custom texture
    rotateX(radians(frameCount / 3));
    rotateY(radians(frameCount / 3));
    rotateZ(radians(frameCount / 3));
    box(200);

    //plane with custom texture
    // rotateY(radians(frameCount));
    // plane(200, 200);

    //sphere with custom texture
    // rotateY(radians(frameCount/3));
    // sphere(200, 50, 50);
}
