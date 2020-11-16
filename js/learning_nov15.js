let centerX;
let centerY;


function preload() {
}

function canvasPressed() {
    console.log('canvas pressed');
    let newNum = getRandomInt(0, 10);
    console.log('New Number generated is ' + newNum);
}
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
}

function draw() {
    //fourInwardCurves();
    //strokeWeight(3);
}



function fourInwardCurves() {
    strokeWeight(5);
    /* point(centerX, centerY);
    point(centerX + 25, centerY-5);
    point(centerX + 35, centerY-25);
    point(centerX + 35, centerY-45); */
    strokeWeight(1);

    //noFill();
    beginShape();
    curveVertex(centerX, centerY);
    curveVertex(centerX, centerY);
    curveVertex(centerX + 25, centerY-5);
    curveVertex(centerX + 35, centerY-25);
    curveVertex(centerX + 35, centerY-45);
    curveVertex(centerX + 35, centerY-45);
    endShape();
}