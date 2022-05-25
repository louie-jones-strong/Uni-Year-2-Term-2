/////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
/////////////////////////////////////
function setup() {
    createCanvas(500,500);
    background(0);
    angleMode(DEGREES);
}
/////////////////////////////////////////////////////
function draw() {
    background(0);
    stroke(255);
    fill(255);

    translate(width/2,height/2);

    var radius = 200;

    // **** many circles around center ****
    for (var theta=0; theta<360; theta+=5){
      var x = cos(theta) * radius;
      var y = sin(theta) * radius;
      ellipse(x,y,5,5);
    }

    // **** one rotating circle around center ****
    // var x = cos(frameCount) * radius;
    // var y = sin(frameCount) * radius;
    // ellipse(x,y,20,20);

    // **** Archimedean spiral
    // NOTE: turn off the background updating in draw() for this to work
    // var x = cos(frameCount) * frameCount / 10;
    // var y = sin(frameCount) * frameCount / 10;
    // ellipse(x,y,10,10);
}
