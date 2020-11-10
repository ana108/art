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
  // img = loadImage('assets/red_roses.JPG');
  loadImage('assets/orange_tree.jpg', (tmpImg => {
      img = tmpImg;
      img.resize(250, 250);
      pixelDensity(1);
      img.loadPixels();
      console.log('The pixel density is ' + pixelDensity());
      console.log('Finished loading ' + img.pixels.length);
      console.log('Image Width ' + img.width);
      console.log('Image Height ' + img.height);
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
    // colorMode(RGB);
    
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
    console.log('Get Top');
    // 0 - 99*4, every fourth one gets ignored
    let colours = [];
    console.log('Size of pixels ' + theImg.pixels.length);
    for(var i = 0; i < 250; i++) {
        colours.push(theImg.get(i, 0));
    }
    
    return colours;
}
let lines = [];
function draw() {
    image(img, centerX, centerY, 250, 250);
    strokeWeight(5);
    // stroke(color(img.pixels[39996],img.pixels[39997],img.pixels[39998]));
     // chosenColor
    //point(lineStartX, centerY-10);
    colorMode(RGB);
    lines.forEach(myLine => {
        stroke(myLine.colour);
        line(myLine.startDot.x, myLine.startDot.y, myLine.endDot.x, myLine.endDot.y);
    })
    /* stroke(255);
    strokeWeight(0);
    let from = color(218, 165, 32);
    let to = color(72, 61, 139);
    let arrColours = [];
    let startPt = 10;
    for (var i = 0.00; i < 0.999; i=i+0.01) {
        arrColours.push(lerpColor(from, to, i));
        fill(lerpColor(from, to, i));
        rect(startPt, 20, 10, 60);
        startPt += 10;
    } */
    

    // background(51);
}

function canvasPressed() {
    clear();
    background('grey');
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
        let tLine = lines[lines.length-1];
        let newLineStart = tLine.endDot;
        let pickADegree = getRandomInt(190, 350);
        let newLineEndPoint = endPoint(pickADegree, 25, newLineStart.x, newLineStart.y);
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