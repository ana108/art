

let centerX;
let centerY;

let r = 20;
let theta = 0;
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
    let x = r*Math.cos(theta);
    let y = r*Math.sin(theta);
    noStroke();
    fill(0);
    ellipse(x+windowWidth/2, y+windowHeight/2, 16, 16);
    theta += 0.01;
    r += 0.1; //theta/180;
}

function canvasPressed() {
   
}