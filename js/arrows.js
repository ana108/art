var dots = [];

var isRunning = false;
var flipSwitched = true;
let centerX;
let centerY;
function Dot(x, y) {
    this.x = x;
    this.y = y;
}

/*
0 starts on the right, and goes clockwise
*/
function drawLine(length, degree, cx, cy) {
    let endDot = endPoint(degree, length, cx, cy);
    let secondEndDot = endPoint(degree+90, length, cx, cy);
    line(cx, cy, endDot.x, endDot.y);
    line(cx, cy, secondEndDot.x, secondEndDot.y);
}

function getRadian(deg) {
    let radian = (deg*Math.PI)/180;
    return radian;
}
function endPoint(degree, radius, cx, cy) {
    let radian = getRadian(degree);
    let x = cx + (radius*Math.cos(radian));
    let y = cy + (radius*Math.sin(radian));
    return new Dot(x, y);
}

function setup() {
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    cnv.mousePressed(canvasPressed);
    colorMode(HSB, 300);
}

function drawOne(centerX, centerY) {
    strokeWeight(10);
    stroke('red');
    point(centerX, centerY);
    let length = 110;
    strokeWeight(2);
    let startPointArr = [];
    let endPointArr = [];
    let otherEndPointArr = [];    
    for (var i = 0; i < 36; i++) {
        let d = endPoint((360/36)*i, length, centerX, centerY);
        let d2 = endPoint(((360/36)*i)+90, length, centerX, centerY);
        startPointArr.push(d);
        otherEndPointArr.push(d2);
        stroke('black');
    }
    for (var i = 0; i < 36; i++) {
        let d = endPoint((360/36)*i, length-20, centerX, centerY);
        endPointArr.push(d);
        stroke('green');
    }
    for (var i = 1; i < startPointArr.length; i++) {
        line(startPointArr[i].x, startPointArr[i].y, endPointArr[i-1].x, endPointArr[i-1].y);
        line(startPointArr[i].x, startPointArr[i].y, otherEndPointArr[i].x, otherEndPointArr[i].y);
    }
    line(startPointArr[0].x, startPointArr[0].y, endPointArr[endPointArr.length-1].x, endPointArr[endPointArr.length-1].y)
    line(startPointArr[0].x, startPointArr[0].y, otherEndPointArr[0].x, otherEndPointArr[0].y);
}
function drawTwo(centerX, centerY) {
    strokeWeight(10);
    stroke('purple');
    point(centerX, centerY);
    let length = 110;
    strokeWeight(2);
    let startPointArr = [];
    let endPointArr = [];
    let otherEndPointArr = [];    
    for (var i = 0; i < 36; i++) {
        let d = endPoint((360/36)*i, length, centerX, centerY);
        let d2 = endPoint(((360/36)*i)+90, length, centerX, centerY);
        startPointArr.push(d);
        otherEndPointArr.push(d2);
        stroke('black');
    }
    for (var i = 0; i < 36; i++) {
        let d = endPoint((360/36)*i, length, centerX, centerY);
        endPointArr.push(d);
        stroke('green');
    }
    for (var i = 1; i < startPointArr.length; i++) {
        line(startPointArr[i].x, startPointArr[i].y, endPointArr[i-1].x, endPointArr[i-1].y);
        line(startPointArr[i].x, startPointArr[i].y, otherEndPointArr[i].x, otherEndPointArr[i].y);
    }
    line(startPointArr[0].x, startPointArr[0].y, endPointArr[endPointArr.length-1].x, endPointArr[endPointArr.length-1].y)
    line(startPointArr[0].x, startPointArr[0].y, otherEndPointArr[0].x, otherEndPointArr[0].y);
}
function drawThree(centerX, centerY) {
    strokeWeight(10);
    stroke('blue');
    point(centerX, centerY);
    let length = 210;
    strokeWeight(2);
    let startPointArr = [];
    let endPointArr = [];
    let otherEndPointArr = [];    
    for (var i = 0; i < 36; i++) {
        let d = endPoint((360/36)*i, length, centerX, centerY);
        let d2 = endPoint(((360/36)*i)+90, length-20, centerX, centerY);
        startPointArr.push(d);
        otherEndPointArr.push(d2);
        stroke('black');
    }
    for (var i = 0; i < 36; i++) {
        let d = endPoint((360/36)*i, length-20, centerX, centerY);
        endPointArr.push(d);
        stroke('green');
    }
    for (var i = 1; i < startPointArr.length; i++) {
        line(startPointArr[i].x, startPointArr[i].y, endPointArr[i-1].x, endPointArr[i-1].y);
        line(startPointArr[i].x, startPointArr[i].y, otherEndPointArr[i].x, otherEndPointArr[i].y);
    }
    line(startPointArr[0].x, startPointArr[0].y, endPointArr[endPointArr.length-1].x, endPointArr[endPointArr.length-1].y)
    line(startPointArr[0].x, startPointArr[0].y, otherEndPointArr[0].x, otherEndPointArr[0].y);
}
function draw() {
    drawOne(centerX-(centerX/2), centerY - (centerY/2));
    drawTwo(centerX, centerY-(centerY/2));
    drawThree(centerX+(centerX/2), centerY);
}

function canvasPressed() {
    isRunning = !isRunning;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}