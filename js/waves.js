

let centerX;
let centerY;
let screenWidth;
let screenHeight;
function preload() {
  
}
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    screenWidth = windowWidth-10;
    screenHeight = windowHeight - 10;
    let cnv = createCanvas(screenWidth, screenHeight);
    
    cnv.mousePressed(canvasPressed);
    console.log('Window Width ' + screenWidth);
    console.log('Window height' + windowHeight);
}

// x key points will always be the same
function drawWave(initialY) {
    let startPointX = 0;
    point(startPointX, initialY);

    let startCurveX = parseInt(screenWidth*0.5);
    let startCurveY = -100;
    point(startCurveX, startCurveY);

    let endCurveX = parseInt(screenWidth*0.90);
    let endCurveY = -100;
    point(endCurveX, endCurveY);

    let endPointX = screenWidth;
    let endPointY = parseInt(initialY*0.65);
    point(endPointX, endPointY);

    bezier(startPointX, initialY, startCurveX, startCurveY, endCurveX, endCurveY, endPointX, endPointY);

}

function drawFlatWave(initialY, initialX) {
    let startPointX = 0; // initialX;
    //point(startPointX, initialY);

    let startCurveX = parseInt((screenWidth-initialX)*0.85);
    let startCurveY = initialX*1.25;
    //point(startCurveX, startCurveY);

    let endCurveX =  parseInt((screenWidth-initialX)*0.85);
    let endCurveY = initialX*1.25;
    //point(endCurveX, endCurveY);

    let endPointX = screenWidth;
    let endPointY = parseInt(initialY*0.25 + initialX);
    //point(endPointX, endPointY);

    bezier(startPointX, initialY, startCurveX, startCurveY, endCurveX, endCurveY, endPointX, endPointY);

}
function draw() {
    //background('rgb(174, 175, 179)');
    //stroke('#F2D16B');
    
    /*strokeWeight(20);
    point(screenWidth*0.69, screenHeight*0.85);
    point(screenWidth*0.74, screenHeight*0.76);
    point(screenWidth*0.79, screenHeight*0.85);
    point(screenWidth*0.74, screenHeight*0.94);*/
    noFill();
    drawSandWaves();
    //stroke('#F2D16B');
    //fill('#F2D16B');
    //noStroke();
    //fill('yellow');
    //curve(screenWidth*0.66, screenHeight*0.85, screenWidth*0.7325, screenHeight*0.84, screenWidth*0.74, screenHeight*0.80, screenWidth*0.74, screenHeight*0.76);
    //curve(screenWidth*0.67, screenHeight*0.85, screenWidth*0.66, screenHeight*0.85, screenWidth*0.7325, screenHeight*0.84, screenWidth*0.7325, screenHeight*0.84);
    //curve(screenWidth*0.66, screenHeight*0.85, screenWidth*0.7325, screenHeight*0.84, screenWidth*0.74, screenHeight*0.76, screenWidth*0.74, screenHeight*0.76);
    strokeWeight(10);
    stroke('red');
    //point(screenWidth*0.66, screenHeight*0.85);
    stroke('black');
    //point(screenWidth*0.7325, screenHeight*0.84);
    stroke('green');
    //point(screenWidth*0.74, screenHeight*0.80);
    stroke('orange');
    //point(screenWidth*0.74, screenHeight*0.76);
    
    //quad(screenWidth*0.69, screenHeight*0.85, screenWidth*0.74, screenHeight*0.76, screenWidth*0.79, screenHeight*0.85, screenWidth*0.74, screenHeight*0.94);
    
}

function drawSandWaves() {
    // stroke('#f6d7b0');
    //stroke('#F2D16B');
    stroke('#F2D16B');
    let initX = 0;
    for (var i = 0.70; i < 7; i=i+0.01) {
        let initialY = parseInt(screenHeight*0.70); // 0.70 
        strokeWeight(1.25);
        //drawWave(initialY);
        let initialYFlat = parseInt(screenHeight*i); // 0.70 
        drawFlatWave(initialYFlat, initX++);
    }
}

function canvasPressed() {
    
}