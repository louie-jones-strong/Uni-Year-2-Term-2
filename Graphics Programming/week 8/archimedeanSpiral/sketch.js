/////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
/////////////////////////////////////
function setup() {
    createCanvas(500,500);
    background(0);
}
/////////////////////////////////////////////////////
function draw() {
    stroke(255);
    fill(255);

    translate(width/2,height/2);

    var x = cos(radians(frameCount)) * frameCount / 10;
    var y = sin(radians(frameCount)) * frameCount / 10;

    ellipse(x,y,10,10);

}
