function preload() {
}

let centerX;
let centerY;
let diameter;
let lines = [];
let colours = ['red', 'orange', 'yellow', 'blue', 'green', 'pink', 'purple'];
let continueAdding = false;
let flipSwitched = true;

function setup() {
    centerX = (windowWidth-40)/2;
    centerY = (windowHeight - 40)/2;
    diameter = centerY*1.75;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    colorMode(HSB, 300);
    let startX = centerX - diameter/2;
    let startY = centerY;
    let endX = centerX + diameter/2;
    let endY = centerY;
    addLine(startX, startY, endX, endY);
}


function addLine() {
    let randomColour = getRandomInt(0, colours.length-1);
    strokeWeight(10);
    let startDot = createDot(diameter/2);
    let endDot = createDot(diameter/2);
    let myLine = new Line(startDot, endDot, randomColour);

    lines.push(myLine);
}

function flipSwitch() {
    flipSwitched = true;
    addLine();
}
function draw() {
    stroke('black');
    strokeWeight(2);
    circle(centerX, centerY, diameter);

    lines.forEach(myline => {
        stroke(myline.colour);
        line(myline.startX, myline.startY, myline.endX, myline.endY);
    });
    if (continueAdding && flipSwitched) {
        flipSwitched = false;
        setTimeout(flipSwitch, 500);
    }
}

function canvasPressed() {
    // addLine(0, 0, 0, 0);
    continueAdding = !continueAdding;
}