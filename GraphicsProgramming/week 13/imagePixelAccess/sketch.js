/////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
/////////////////////////////////////
// image of rockets is by NASA, therefore public domain
var img;
////////////////////////////////////////////////////
function preload() { // preload() runs once
    img = loadImage('assets/rockets.png');
}
////////////////////////////////////////////////////
function setup() { // setup() waits until preload() is done
    createCanvas(600, 500);
    pixelDensity(1);
}
///////////////////////////////////////////////////
function draw() {
    background(125);
    image(img, 0, 0);

    img.loadPixels();

    var index = (img.width * mouseY + mouseX) * 4;
    var redChannel = img.pixels[index + 0];
    var greenChannel = img.pixels[index + 1];
    var blueChannel = img.pixels[index + 2];
    var alphaChannel = img.pixels[index + 3];
    fill(color(redChannel, greenChannel, blueChannel, alphaChannel));

    //alternative way. Simpler, but really (!!!) slow on large number of pixels
    // var c = img.get(mouseX, mouseY);
    // fill(c);

    rect(25, img.height + 25, 100, 100);
}
