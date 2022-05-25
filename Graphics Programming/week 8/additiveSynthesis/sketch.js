/////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
/////////////////////////////////////
function setup() {
    createCanvas(720,360);
    background(0);
    angleMode(DEGREES);
}
//////////////////////////////////////////////////////////
function draw() {
    background(0);
    stroke(255);

    translate(0,height/2);

    noFill();
    beginShape();
    for (var x=0; x<=width; x+=1){
      var wave1 = sin(x+frameCount/5) * height/4;
      var wave2 = sin(x*10+frameCount/5) * height/20;
      var wave3 = noise(x/10 + frameCount/100.) * 100;
      vertex(x, wave1 + wave2 + wave3);
    }
    endShape();
}
