

let centerX;
let centerY;


function preload() {
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    frameRate(10);
    background('black');
    noFill();
}

function draw() {
    drawCircle();
}
function drawCircle() {
    let thickness = getRandomInt(0, 5);
    strokeWeight(thickness);
    let allWidths = [23, 40, 55, 60,  70, 80, 90,100, 105, 110, 200, 250];
    let sizeIdx = getRandomInt(0, allWidths.length-1);
    let colorChosen = getRandomInt(0, 1);
    let xStart = getRandomInt(0, windowWidth-allWidths[sizeIdx]/2);
    let yStart = getRandomInt(0, windowHeight-allWidths[sizeIdx]/2);
    if (colorChosen === 0) {
        stroke('white');
    } else {
        stroke('blue');
    }
    ellipse(xStart, yStart, allWidths[sizeIdx]);
}
function canvasPressed() {
  
}