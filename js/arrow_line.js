var dots = [];

var isRunning = false;
var flipSwitched = true;
let centerX;
let centerY;
function Dot(x, y) {
    this.x = x;
    this.y = y;
}
function Line(startDot, endDot) {
    this.startDot = startDot;
    this.endDot = endDot;
}
function Arrow(originLine, leftLine, degree) {
    this.originLine = originLine; // origin
    this.leftLine = leftLine;
    this.degree = degree;
}

let arrows = [];
let streak = [];
/*
0 starts on the right, and goes clockwise
*/
/*function drawArrow(length, degree, cx, cy) { // length, degree, cx, cy
    let endDot = endPoint(degree, length, cx, cy);
    let secondEndDot = endPoint(degree+90, length, cx, cy);
    line(cx, cy, endDot.x, endDot.y);
    line(cx, cy, secondEndDot.x, secondEndDot.y);
} */
function drawArrow(arrow) {
    line(arrow.originLine.startDot.x, arrow.originLine.startDot.y, arrow.originLine.endDot.x, arrow.originLine.endDot.y);
    line(arrow.leftLine.startDot.x, arrow.leftLine.startDot.y, arrow.leftLine.endDot.x, arrow.leftLine.endDot.y);
}

function createArrow(length, degree, cx, cy) { // length, degree, cx, cy
    let originDot = new Dot(cx, cy);
    let endDot = endPoint(degree, length, cx, cy);
    let secondEndDot = endPoint(degree+90, length, cx, cy);
    let originLine = new Line(originDot, endDot);
    let derivedLine = new Line(originDot, secondEndDot);
    return new Arrow(originLine, derivedLine, degree);
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
    let length = 25;
    let deg = 180-(90/2);
    let xP = centerX/2;
    let yP = centerY;
    for(var i = 1; i < 26; i++) {
        xP = xP + 10;
        arrows.push(createArrow(length, deg, xP, yP));
    }
    let gradIncrease = 0;
    let degree = 90;
    for(var i = 0; i <= 9; i++) {
        gradIncrease += 10;
        degree = 90;
        arrows[i] = createArrow(length, degree, arrows[i].originLine.startDot.x, arrows[i].originLine.startDot.y-gradIncrease);
        arrows.push(createArrow(length, degree*2+180, arrows[i].originLine.startDot.x, arrows[i].originLine.startDot.y+2*gradIncrease));
    }
    for(var i = 10; i <= 14; i++) {
        arrows[i] = createArrow(length, arrows[i].degree, arrows[i].originLine.startDot.x, arrows[i].originLine.startDot.y-gradIncrease);
        arrows.push(createArrow(length, arrows[i].degree+180, arrows[i].originLine.startDot.x, arrows[i].originLine.startDot.y+2*gradIncrease));
    }
    for(var i = 15; i <= 24; i++) {
        gradIncrease -= 10;
        degree = 180;
        arrows[i] = createArrow(length, degree, arrows[i].originLine.startDot.x, arrows[i].originLine.startDot.y-gradIncrease);
        arrows.push(createArrow(length, degree/2+180, arrows[i].originLine.startDot.x, arrows[i].originLine.startDot.y+2*gradIncrease));
    }
    streak = arrowStreak();
}
function arrowStreak() {
    let streak = [];
    let length = 20;
    let degree = 0;
    let startX;
    
    let bigY = 0;
    let bigX = 2*length;
    let conclusionX = windowWidth;
    let conclusionY = windowHeight;
    while (bigY < conclusionY) {
        startY = bigY;
        startX = 0;
        while(startX < conclusionX && startY < conclusionY) {
            let arrow = createArrow(length, degree, startX, startY);
            streak.push(arrow);
            startX += length/2; //10;
            startY += length/2;
        }
        bigY += length + length/2; //30;
        if (degree === 180) {
            degree = 0;
        } else {
            degree = 180;
        }
    }
    // sideways
    while (bigX < conclusionX) {
        startY = 0;
        startX = bigX;
        while(startX < conclusionX && startY < conclusionY) {
            let arrow = createArrow(length, degree, startX, startY);
            streak.push(arrow);
            startX += length/2;
            startY += length/2;
        }
        bigX += length + length/2;
        if (degree === 180) {
            degree = 0;
        } else {
            degree = 180;
        }
    }
    return streak;
}
function sampleBezier() {
    let tempX = centerX - 3*centerX/4;
    let tempY = centerY - centerY/2;
    stroke('red');
    strokeWeight(7);
    point(tempX, centerY);
    stroke('blue');
    point((centerX+tempX)/2, tempY);
    stroke('purple');
    point((centerX+tempX)/2+100, tempY);
    stroke('green');
    point(centerX, centerY);
    tempY = tempY-80;
    bezier(tempX, centerY, (centerX+tempX)/2, tempY, (centerX+tempX)/2+100, tempY, centerX, centerY);
}
function draw() {
    /*stroke('black');
    arrows.forEach(arrow => {
        drawArrow(arrow);
    }); */
        
    streak.forEach(arrow => {
        // strokeWeight(10);
        drawArrow(arrow);
    })
}

function canvasPressed() {
    isRunning = !isRunning;
}

/*function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}*/