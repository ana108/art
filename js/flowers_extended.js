

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
    let cnv = createCanvas(windowWidth-17, windowHeight-17);
    cnv.mousePressed(canvasPressed);
    background('silver');
}
function drawGenome(halfSize, startX, startY) {
    strokeWeight(1.5);
    noFill();
    arc(startX, startY, halfSize/2, halfSize, 0, HALF_PI);
    arc(startX, startY, halfSize/2, halfSize, HALF_PI, PI);
    arc(startX, startY+halfSize, halfSize/2, halfSize, PI, PI+HALF_PI);
    arc(startX, startY+halfSize, halfSize/2, halfSize, PI+HALF_PI, TWO_PI);
}
function drawLine(genomeSize, xVal) {
    let startY = 0;
    let c = 0;
    let startColour = 'white';
    let endColour = 'blue';
    let colours = [];
    let iCol = 0.0;
    for(var i = 0; i < 10; i++) {
        iCol += 0.10;
        colours.push(lerpColor(color(startColour), color(endColour), iCol));
    }
    while(startY <= windowHeight+15) {
        stroke(colours[c%colours.length]);
        drawGenome(genomeSize, xVal+genomeSize/4, startY);
        c++;
        startY += genomeSize;
    }
}

function creativeCorner() {

}
function drawQuad(radius, xPath){
    //strokeWeight(3);
    //stroke('white');
    let centerX = xPath;
    erase();
    fill('white');
    quad(centerX-radius, centerY, centerX, centerY-radius, centerX+radius, centerY, centerX, centerY+radius);
    noErase();
}
function drawCrissCrossLine(distanceFromVertex) {
    stroke('white');
    line(distanceFromVertex, 0, 0, distanceFromVertex);
}

function draw() {
    let maxHeight = 25;
    let height=maxHeight;
    let xVal = 0;
    let decreasing = true;
    
    
    while(xVal <= windowWidth+15) {
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
        if (height < 0) {
            height = 0;
        }
    }  

    /*let k = 150;
    drawQuad(k, centerX-600);
    drawQuad(k, centerX);
    drawQuad(k, centerX+600);*/
      
}

function canvasPressed() {
   
}