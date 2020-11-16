function preload() {
}

let centerX;
let centerY;
let diameter;
let lines = [];
let colours = ['red', 'orange', 'yellow', 'blue', 'green', 'pink', 'purple'];
let continueAdding = false;
let flipSwitched = true;
function Line(startX, startY, endX, endY, colour) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.colour = colours[colour];
  }
function Dot(startX, startY) {
    this.x = startX;
    this.y = startY;
}

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

function getRadian(deg) {
    let radian = (deg*Math.PI)/180;
    return radian;
}
function createDot() {
    let randomDegree = getRandomInt(0, 360);
    // formula is:
    let radian = getRadian(randomDegree);
    let x = centerX + ((diameter/2)*Math.cos(radian));
    let y = centerY + ((diameter/2)*Math.sin(radian));
    return new Dot(x, y);
}

function addLine() {
    let randomColour = getRandomInt(0, colours.length-1);
    strokeWeight(10);
    let startDot = createDot();
    let endDot = createDot();
    let myLine = new Line(startDot.x, startDot.y, endDot.x, endDot.y, randomColour);

    lines.push(myLine);
}
/*function randomPoint(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}*/

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