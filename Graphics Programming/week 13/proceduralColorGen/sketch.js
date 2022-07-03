/////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
/////////////////////////////////////
function setup() {
    createCanvas(720, 400);
    colorMode(HSB);
    noStroke();

    var brickWidth = 72;
    var brickHeight = 40;

    var hueRoot = 30;
    var variation = 15;

    for (var x = 0; x <= width; x += brickWidth) {
        for (var y = 0; y <= height; y += brickHeight) {

            // procedural gen with color harmony
            var randVar = random(-variation, variation);
            fill(hueRoot + randVar, random(80, 100), random(50, 100));

            // random gen - no harmony
            // fill(random(360), 100, 100);
            rect(x, y, brickWidth, brickHeight);
        }
    }
}
/////////////////////////////////////////////////////////
function draw() {
    //do nothing
}
