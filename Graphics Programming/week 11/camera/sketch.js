function setup() {
    createCanvas(900, 600, WEBGL);
    angleMode(DEGREES);
}

function draw() {
    background(125);

//    does nothing
    var zLoc = height;
    camera(0, 0, zLoc, 0, 0, 0, 0, 1, 0);
    
//     zLoc goes from 200 to 800
//     var zLoc = (sin(frameCount)+1)/2 * height + 200;
//     camera(0, 0, zLoc, 0, 0, 0, 0, 1, 0);

//     camera moves with noise in 3D space, but always points to the center
//     var xLoc = map(noise(frameCount/200 + 100), 0, 1, -500, 500);
//     var yLoc = map(noise(frameCount/200 + 200), 0, 1, -500, 500);
//     var zLoc = map(noise(frameCount/200), 0, 1, 300, 800);
//     camera(xLoc, yLoc, zLoc, 0, 0, 0, 0, 1, 0);

    // rotate around object in a wavey motion
//     var xLoc = cos(frameCount) * height;
//     var yLoc = sin(frameCount) * 300;
//     var zLoc = sin(frameCount) * height;
//     camera(xLoc, yLoc, zLoc, 0, 0, 0, 0, 1, 0);

    // point of interest moves
//     var xAim = sin(frameCount) * height; // xAim range from -600 to 600
//     camera(0, 0, height, xAim, 0, 0, 0, 1, 0);

    // camera orientation
    // camera(0, 0, height, 0, 0, 0, 0, 1, 0); //points up
    // camera(0, 0, height, 0, 0, 0, 1, 0, 0); //points sideways
    // camera(0, 0, height, 0, 0, 0, 1, 1, 0); //is tilted 45 degrees


    //default objects in scene
    normalMaterial();
    torus(200, 50, 50, 50);
    translate(0, 100, 0);
    rotateX(90);
    fill(200);
    plane(500, 500);
}
