/////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
/////////////////////////////////////
function setup() {
    createCanvas(900,600);
    background(0);
    fill(255);
    angleMode(DEGREES);
}
//////////////////////////////////////////////////////////
function draw() {
    background(0);
    translate(width/2, height/2);

    var period = 60;
    var amplitude = 250;
    var frequency = 1.0;
    var phase = 0;

    // var locX = sin(360 * frameCount/period + phase) * amplitude;
    var locX = sin(frameCount * 6 * frequency + phase) * amplitude;
    ellipse(locX, 0, 30, 30);
}
