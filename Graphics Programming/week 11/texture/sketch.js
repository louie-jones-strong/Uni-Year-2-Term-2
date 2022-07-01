// rock image is free to use: https://www.pexels.com/photo/rock-texture-wall-40620/
// earth image by NASA: public domain
var img;

function preload() {
    img = loadImage('assets/rocks.jpg');
}

function setup() {
    createCanvas(900, 600, WEBGL);
    noStroke();
}

function draw() {
    background(0);
    texture(img);

    //plane with texture
    // rotateY(radians(frameCount));
    // plane(1200, 600);

    //box with texture
    rotateY(radians(frameCount / 3));
    box(300);
}
