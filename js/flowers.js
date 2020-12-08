

let centerX;
let centerY;

/**
 * Rules: It has to look different each time; 
 * It has to have boundaries.
*/
function preload() {
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
}
function drawGenome(halfSize, startX, startY) {
    strokeWeight(1);
    stroke('green');
    noFill();
    arc(startX, startY, halfSize/2, halfSize, 0, HALF_PI);
    arc(startX, startY, halfSize/2, halfSize, HALF_PI, PI);
    arc(startX, startY+halfSize, halfSize/2, halfSize, PI, PI+HALF_PI);
    arc(startX, startY+halfSize, halfSize/2, halfSize, PI+HALF_PI, TWO_PI);
}
function drawLine(genomeSize, xVal) {
    let startY = 0;
    while(startY < windowHeight) {
        drawGenome(genomeSize, xVal+genomeSize/4, startY);
        startY += genomeSize;
    }
}
function draw() {
    let maxHeight = 250;
    let height=maxHeight;
    let xVal = 0;
    let decreasing = true;
    while(xVal < windowWidth) {
        drawLine(height, xVal);
        xVal += height/2;
        if (height < 10) {
            decreasing = false;
        }
        if (height >= maxHeight) {
            decreasing = true;
        }
        if (decreasing) {
            height = height - height*0.13;
        } else {
            height = height*1.13;
        }
        /*if (height > 10) {
            height = height - height*0.13;
        }*/
    }    
}

function canvasPressed() {
   
}