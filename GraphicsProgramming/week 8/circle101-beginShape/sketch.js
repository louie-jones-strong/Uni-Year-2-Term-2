/////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
/////////////////////////////////////
function setup() {
    createCanvas(500,500);
    background(0);
}
//////////////////////////////////////////////
function draw() {
    stroke(255);
    noFill();

    translate(width/2,height/2);

    var radius = 200;

    beginShape();
    for (var theta=0; theta<360; theta+=5){
      var x = cos(radians(theta)) * radius;
      var y = sin(radians(theta)) * radius;
      vertex(x,y);
    }
    endShape(CLOSE);
}
