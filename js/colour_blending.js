let centerX, centerY;
function Dot(x, y) {
    this.x = x;
    this.y = y;
}

function Line(startDot, endDot, colour) {
    this.startDot = startDot;
    this.endDot = endDot;
    this.colour = colour;
}

let img;
function preload() {
  loadImage('../assets/orange_tree.jpg', (tmpImg => {
      img = tmpImg;
      img.resize(250, 250);
      pixelDensity(1);
      img.loadPixels();
  }));
}
let lineStartX;
let chosenColor;
let randomlyChosenIdx = 0;
let allTopColours;
function setup() {
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    cnv.mousePressed(canvasPressed);    
    allTopColours = getTop(img);
    randomlyChosenIdx = getRandomInt(0, allTopColours.length-1);
    chosenColor = allTopColours[randomlyChosenIdx];
    lineStartX = centerX + randomlyChosenIdx;
    stroke(chosenColor);
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
function eraseTest() {
    /*background(150, 250, 150);
    fill(100, 100, 250);
    rect(20, 20, 60, 60);
    strokeWeight(5);
    erase(150, 255);
    triangle(50, 10, 70, 50, 90, 10);
    noErase();*/
    fill('red');
    square(centerX, centerY, 50);
    fill('blue');
    square(centerX+10, centerY+10, 30);
    erase(10);
    square(centerX+15, centerY+15, 20);
    noErase();
}
function getTop(theImg) {
    let colours = [];
    for(var i = 0; i < 250; i++) {
        colours.push(theImg.get(i, 0));
    }
    
    return colours;
}
let lines = [];
function draw() {
    image(img, centerX, centerY, 250, 250);
    strokeWeight(5);
    point(centerX, centerY);
    point(centerX+250, centerY);
    point(centerX, centerY+250);
    point(centerX+250, centerY+250);
    colorMode(RGB);
    lines.forEach(myLine => {
        stroke(myLine.colour);
        line(myLine.startDot.x, myLine.startDot.y, myLine.endDot.x, myLine.endDot.y);
    })
}

function canvasPressed() {
    clear();
    randomlyChosenIdx = getRandomInt(0, allTopColours.length-1);
    chosenColor = allTopColours[randomlyChosenIdx];
    lineStartX = centerX + randomlyChosenIdx + 1;

    if (lines.length === 0) {
        let startPoint = new Dot(lineStartX, centerY);
        let pickADegree = getRandomInt(190, 350);
        let newPoint = endPoint(pickADegree, 25, lineStartX, centerY);
        let lineFromSource = new Line(startPoint, newPoint, chosenColor);
        lines.push(lineFromSource);
    } else {
        // add based on previous
        // get the forbidden list
        /**
         *     point(centerX, centerY);
                point(centerX+250, centerY);
                point(centerX, centerY+250);
                point(centerX+250, centerY+250);
         */
        let tLine = lines[lines.length-1];
        let newLineStart = tLine.endDot;
        let pickADegree = getRandomInt(0, 360); // getRandomInt(190, 350);
        let newLineEndPoint = endPoint(pickADegree, 25, newLineStart.x, newLineStart.y);
        while(newLineEndPoint.x > centerX && newLineEndPoint.x < (centerX+250) && (newLineEndPoint.y > centerY && newLineEndPoint.y < centerY+250)){
            console.log('Retrying...');
            pickADegree = getRandomInt(0, 360);
            newLineEndPoint = endPoint(pickADegree, 25, newLineStart.x, newLineStart.y);
        }
        let extendLine = new Line(newLineStart, newLineEndPoint, tLine.colour);
        lines.push(extendLine);
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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