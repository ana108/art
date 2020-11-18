let centerX, centerY;

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
    centerX = parseInt(windowWidth/2);
    centerY = parseInt(windowHeight/2);
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
    strokeWeight(1);
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

let xTaken = [];
let yTaken = [];
// merge rangeContains and addLinePoints
function checkTwoLines(lineOne, lineTwo) {
    /*
        A1 = (Y1-Y2)/(X1-X2)  # Pay attention to not dividing by zero
        A2 = (Y3-Y4)/(X3-X4)  # Pay attention to not dividing by zero
    */
   //this.startDot = startDot;
   //this.endDot = endDot;
   let y1 = lineOne.startDot.y;
   let y2 = lineOne.endDot.y;

   let y3 = lineTwo.startDot.y;
   let y4 = lineTwo.endDot.y;

   let x1 = lineOne.startDot.x;
   let x2 = lineOne.endDot.x;

   let x3 = lineTwo.startDot.x;
   let x4 = lineTwo.endDot.x;

   if (x1-x2 === 0 || x3-x4 === 0) {
       return true;
   }
   let aCalcOne = ((y1-y2)/(x1-x2));
   let bCalcOne = ((y3-y4)/(x3-x4));
   console.log('A: ' + aCalcOne + ' B ' + bCalcOne);
   if (aCalcOne === bCalcOne) {
       return false;
   }
   return true;
   
}

function checkAllLines(newLine) {
    let found = false;
    lines.forEach(line => {
        if (checkTwoLines(line, newLine)) {
            found = true;
        }
    });
    return found;
}

function rangeContainsOld(sDot, eDot) {
    let startX = sDot.x;
    let endX = eDot.x;
    let startY = sDot.y;
    let endY = eDot.y;
    let xFound;
    if (startX < endX) {
        for (var i = startX; i <= endX; i++) {
            if(xTaken[i]) {
                xFound = xTaken[i];
                let l = lines[xFound];
                startY = l.startDot.y;
                endY = l.endDot.y;
                if (startY < endY) {
                    for (var a = startY; a <= endY; a++) {
                        if(yTaken[a]) {
                            return true;
                        }
                    }
                } else {
                    for (var b = endY; b <= startY; b++) {
                        if(yTaken[b]) {
                            return true;
                        }
                    }
                }
            }
        }
        
    } else {
        for (var i = endX; i <= startX; i++) {
            if(xTaken[i]) {
                xFound = xTaken[i];
                let l = lines[xFound];
                startY = l.startDot.y;
                endY = l.endDot.y;
                if (startY < endY) {
                    for (var a = startY; a <= endY; a++) {
                        if(yTaken[a]) {
                            return true;
                        }
                    }
                } else {
                    for (var b = endY; b <= startY; b++) {
                        if(yTaken[b]) {
                            return true;
                        }
                    }
                }
            }
        }
    }

    /*if (xFound) {
        console.log('X Found ');
        let l = lines[xFound];
        startY = l.startDot.y;
        endY = l.endDot.y;
        if (startY < endY) {
            for (var i = startY; i <= endY; i++) {
                if(yTaken[i]) {
                    return true;
                }
            }
        } else {
            for (var i = endY; i <= startY; i++) {
                if(yTaken[i]) {
                    return true;
                }
            }
        }
    } */
    /* let startY = sDot.y;
    let endY = eDot.y;
    if (startY < endY) {
        for (var i = startY; i <= endY; i++) {
            if(yTaken[i]===1) {
                return true;
            }
        }
    } else {
        for (var i = endY; i <= startY; i++) {
            if(yTaken[i]===1) {
                return true;
            }
        }
    } */
    return false;
}
function addLinePoints(theLine, lineIdx) {
    let oneX = theLine.startDot.x;
    let twoX = theLine.endDot.x;
    if (oneX < twoX) {
        for(var i = oneX; i <= twoX; i++) {
            xTaken[i] = lineIdx;
        }
    } else {
        for(var i = twoX; i <= oneX; i++) {
            xTaken[i] = lineIdx;
        }
    }
    let oneY = theLine.startDot.y;
    let twoY = theLine.endDot.y;
    if (oneY < twoY) {
        for(var i = oneY; i <= twoY; i++) {
            yTaken[i] = lineIdx;
        }
    } else {
        for(var i = twoY; i <= oneY; i++) {
            yTaken[i] = lineIdx;
        }
    }
}
function canvasPressed() {
    clear();
    randomlyChosenIdx = getRandomInt(0, allTopColours.length-1);
    chosenColor = allTopColours[randomlyChosenIdx];
    lineStartX = parseInt(centerX + randomlyChosenIdx + 1);

    if (lines.length === 0) {
        let startPoint = new Dot(lineStartX, centerY);
        let pickADegree = getRandomInt(190, 350);
        let newPoint = endPoint(pickADegree, 25, lineStartX, centerY);
        let lineFromSource = new Line(startPoint, newPoint, chosenColor);
        console.log('Start x ' + lineFromSource.startDot.x + " End X " + lineFromSource.endDot.x + ' Start y ' + lineFromSource.startDot.y + ' End y ' + 
        lineFromSource.endDot.y);
        addLinePoints(lineFromSource, 0);
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
        let extendLine = new Line(newLineStart, newLineEndPoint, tLine.colour);
        let result;
        if (lines.length <= 1) {
            result = false;
        } else{
            result = checkAllLines(extendLine);
        }
        
        let numTries = 0;
        //         while(numTries < 10 && ((newLineEndPoint.x > centerX && newLineEndPoint.x < (centerX+250) && (newLineEndPoint.y > centerY && newLineEndPoint.y < centerY+250)) || result)){

        while(numTries < 10 && result){
            console.log('Retrying...');
            result = false;
            pickADegree = getRandomInt(0, 360);
            console.log('Degree found ' + pickADegree);
            newLineEndPoint = endPoint(pickADegree, 25, newLineStart.x, newLineStart.y);
            extendLine = new Line(newLineStart, newLineEndPoint, tLine.colour);
            result = checkAllLines(extendLine);
            //rangeContains(newLineStart, newLineEndPoint);
            numTries++;
        }
        if (numTries < 9) {
            addLinePoints(extendLine, lines.length);
            console.log('Start x ' + extendLine.startDot.x + " End X " + extendLine.endDot.x + ' Start y ' + extendLine.startDot.y + ' End y ' + extendLine.endDot.y);
            lines.push(extendLine);
        }
    }
}

function endPoint(degree, radius, cx, cy) {
    let radian = getRadian(degree);
    let x = parseInt(cx + (radius*Math.cos(radian)));
    let y = parseInt(cy + (radius*Math.sin(radian)));
    return new Dot(x, y);
}