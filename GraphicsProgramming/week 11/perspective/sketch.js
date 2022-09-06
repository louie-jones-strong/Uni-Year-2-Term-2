function setup() {
    createCanvas(900, 600, WEBGL);
}

function draw() {
    background(125);

    //lift camera a little bit for better view of scene
    camera(0, -200, height, 0, 0, 0, 0, 1, 0);

    //default FOV
    // perspective(radians(60)); // can't fit all boxes into scene

    //wide angle FOV
    // perspective(radians(120)); // fits all boxes into scene

    //default aspect ratio
    // perspective(radians(60), width/height); // no distortion of rods

    //square aspect ratio
    // perspective(radians(60), 4/4); // rods get distorted as ratio is squared

    //near and far planes controlled by mouse
    // perspective(radians(60), width/height, mouseY, mouseX); //mouseX & mouseY controls clipping planes

    //default objects in scene
    normalMaterial();
    for (var i = -600; i <= 600; i += 150) {
        push();
        translate(i, 0, 0);
        box(80, 80, 500);
        pop();
    }
}
