/////////////////////////////////////
// COURSERA GRAPHICS PROGRAMMING
/////////////////////////////////////
// Sierpinski carpet with 6 iterations
// Adopted from: https://www.openprocessing.org/sketch/141019

// PLEASE NOTE: In the video I used an older version of P5.js that did not contain a square() function.
// Here I use a later version which already has a square function included in p5.js so I had to rename my
// function mySquare(). If hadn't done that, the example would not have worked.

var startSize;
var noOfCalls=0;  //used to count the number of calls to the recursive function

function setup()
{
  createCanvas(900, 900)
  fill(0);
  noStroke();
  rectMode(CENTER);

  startSize = pow(3, 6); // = 729 bec length first mySquare's side should be a power of 3 to get pixel accuracy
}

function draw()
{
  background(255);
  translate(width/2, height/2);  //move the origin of next drawing to the center of the window
  mySquare(startSize); //calling the recursive function
  console.log(noOfCalls);
  noLoop();
}

function mySquare(side)
{
  side=side/3;  //at each iteration the mySquares are 3 times smaller
  noOfCalls++;

  if (side>=1)
  {
    rect(0,0,side,side);

    push();
    translate(-side,0);
    mySquare(side);
    pop();

    push();
    translate(-side,-side);
    mySquare(side);
    pop();

    push();
    translate(0,-side);
    mySquare(side);
    pop();

    push();
    translate(side,-side);
    mySquare(side);
    pop();

    push();
    translate(side,0);
    mySquare(side);
    pop();

    push();
    translate(side,side);
    mySquare(side);
    pop();

    push();
    translate(0,side);
    mySquare(side);
    pop();

    push();
    translate(-side,side);
    mySquare(side);
    pop();
  }
}
