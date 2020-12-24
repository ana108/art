

let centerX;
let centerY;


function preload() {
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
}

function draw() {
    
    strokeWeight(3);
    let period = 120;
    let amplitude = 100;
    let x = amplitude*Math.cos(TWO_PI*frameCount/period);
    stroke(0);
    fill(175);
    translate(windowWidth/2, windowHeight/2);
    line(0,0,x,0);
    ellipse(x, 0,20,20);

    /* The code below does the exact same thing as above, except its not limited to two pi, but uses angle directly*/
    /**
     * strokeWeight(3);
    let amplitude = 100;
    let x = amplitude*Math.cos(angle);
    angle += aVelocity;
    ellipseMode(CENTER);
    stroke(0);
    fill(175);
    translate(windowWidth/2, windowHeight/2);
    line(0,0,x,0);
    ellipse(x, 0, 20, 20);
     */
}

function canvasPressed() {
   
}