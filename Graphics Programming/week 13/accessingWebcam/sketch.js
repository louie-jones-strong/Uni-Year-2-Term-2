/////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
/////////////////////////////////////
var video;

function setup() {
    createCanvas(640, 480);
    pixelDensity(1);
    video = createCapture(VIDEO);
    video.hide();
}
////////////////////////////////////
function draw() {
    background(125);

    // code to flip image over so it look like a proper mirror
    // imageMode(CENTER);
    // translate(width/2, height/2);
    // scale(-1,1,1);

    image(video, 0, 0);
}
