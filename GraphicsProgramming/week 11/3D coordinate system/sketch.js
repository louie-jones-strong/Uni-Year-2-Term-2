function setup() {
    createCanvas(500, 500, WEBGL);
}

function draw() {
    background(125);

    //rotating plain
    rectMode(CENTER);
    rotateX(radians(frameCount));
    plane(200, 200, 200, 200);

//     rotating box
//     rotateX(radians(frameCount)*2);
//     box(100);

//     rotating sphere
//     rotateY(radians(frameCount));
//     translate(200,0,0);
//     sphere(100, 20, 20);
}
