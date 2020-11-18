

let centerX;
let centerY;
const LINE_LEN = 30;
const EXCLUSIONS = [360,359, 179, 180, 181, 89, 90, 91, 0, 1, 269, 270, 271];

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