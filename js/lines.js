

let centerX;
let centerY;
const LINE_LEN = 30;
const EXCLUSIONS = [360,359, 179, 180, 181, 89, 90, 91, 0, 1, 269, 270, 271];
function Dot(x, y) {
    this.x = x;
    this.y = y;
}

function Line(startDot, endDot) {
    this.startDot = startDot;
    this.endDot = endDot;
}
function intersects(line1, line2) {
    let a1 = line1.endDot.y-line1.startDot.y;
    let b1 = line1.startDot.x - line1.endDot.x;
    let c1 = (a1*line1.startDot.x)+(b1*line1.startDot.y);
 
    let a2 = line2.endDot.y-line2.startDot.y;
    let b2 = line2.startDot.x - line2.endDot.x;
    let c2 = (a2*line2.startDot.x)+(b2*line2.startDot.y);
 
    let determinant = a1*b2 - a2*b1
    
    if(determinant == 0){
     //Lines are parallel
     return false;
    } else {
     let x = (b2*c1 - b1*c2)/determinant;
     let y = (a1*c2 - a2*c1)/determinant;
     return new Dot(x, y);


    }
 
 }
function isDotOnLine(line, dot) {
    let firstX = line.startDot.x;
    let secondX = line.endDot.x;
    // is done between these 2 xs? excluding end points

    let firstY = line.startDot.y;
    let secondY = line.endDot.y;

    let isOnX = false;
    let isOnY = false;
    if (firstX < dot.x && dot.x < secondX) {
        // yes, its between those xs
        isOnX = true;
    } else if (secondX < dot.x && dot.x < firstX) {
        // yes, its between xs
        isOnX = true;
    }

    if (firstY < dot.y && dot.y < secondY) {
        isOnY = true;
    } else if (secondY < dot.y && dot.y < firstY) {
        isOnY = true;
    }

    if (isOnX && isOnY) {
        return true;
    } else {
        return false;
    }
}

function dotLandsOnAnotherLine(dot) {
    let isBad = false;
    lines.forEach(testLine => {
        let tmp = isDotOnLine(testLine, dot);
        if(tmp) {
            isBad = true;
        }
    });
    return isBad;
}
function isIntersectionPointOnBothLines(line1, line2, intersectionDot) {
    let isOnBothLines = 0;
    if (isDotOnLine(line1, intersectionDot)) {
        isOnBothLines++;
    }    
    if (isDotOnLine(line2, intersectionDot)) {
        isOnBothLines++;
    }

    if (isOnBothLines === 2) {
        return true;
    } else {
        return false;
    }
}
function intersectsAnyOtherLine(line) {
    let crossLines = false;
    let intersectingPoints = [];
    lines.forEach(eachLine => {
        let intersectingPoint = intersects(eachLine, line);
        if(intersectingPoint && isIntersectionPointOnBothLines(eachLine, line, intersectingPoint)) {
            intersectingPoints.push(intersectingPoint);
            crossLines = true;
        }
    });
    return crossLines;
}
function preload() {
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    addTwoLines();
}
let lines = [];
function addTwoLines(){
    let lineOne = new Line(new Dot(centerX+5, centerY-25), new Dot(centerX+25, centerY+35));
    let lineTwo = new Line(new Dot(centerX, centerY-15), new Dot(centerX+25, centerY-5));
    lines.push(lineOne);
}
function draw() {
    lines.forEach(l => {
        line(l.startDot.x, l.startDot.y, l.endDot.x, l.endDot.y);
    })
    strokeWeight(3);
}

function isInForbidden(dot) {
    if(dot.x < 20 || dot.x > windowWidth-40 || dot.y < 20 || dot.y > windowHeight-40) {
        return true;
    } else {
        return false;
    }
}
function canvasPressed() {
   let degree = getRandomInt(0, 360, EXCLUSIONS);
   console.log('Degree ' + degree);
   let newEndPoint = endPoint(degree, LINE_LEN, lines[lines.length-1].endDot.x, lines[lines.length-1].endDot.y);
   let newLine = new Line(lines[lines.length-1].endDot, newEndPoint);
   let i = 0;
   stroke('black');
   while(i < 10 && (isInForbidden(newEndPoint) || intersectsAnyOtherLine(newLine))) {
        degree = getRandomInt(0, 360, EXCLUSIONS);
        newEndPoint = endPoint(degree, LINE_LEN, lines[lines.length-1].endDot.x, lines[lines.length-1].endDot.y);
        newLine = new Line(lines[lines.length-1].endDot, newEndPoint);
        i++;
   }

   if (i===10) {
    console.log('I is 10');
   }
   lines.push(newLine);
}

/* function getRandomInt(min, max) {
    // if previous degree is passed in, exclude previous degree and +- 60
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomlyChosenInt = parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
    while(exclusions.includes(randomlyChosenInt)) {
        randomlyChosenInt = parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return randomlyChosenInt;
} */

function getRadian(deg) {
    let radian = (deg*Math.PI)/180;
    return radian;
}

function endPoint(degree, radius, cx, cy) {
    let radian = getRadian(degree);
    let x = parseInt(cx + (radius*Math.cos(radian)));
    let y = parseInt(cy + (radius*Math.sin(radian)));
    return new Dot(x, y);
}