let centerX, centerY;
function setup() {
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    cnv.mousePressed(canvasPressed);
    colorMode(HSB, 300);
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
    colorMode(RGB);
    stroke(255);
    strokeWeight(0);
    // background(51);
    let from = color(218, 165, 32);
    let to = color(72, 61, 139);
    colorMode(RGB); // Try changing to HSB.
    let interA = lerpColor(from, to, 0.33);
    let interB = lerpColor(from, to, 0.66);
    let arrColours = [];
    let startPt = 10;
    //fill(from);
    for (var i = 0.00; i < 0.999; i=i+0.01) {
        arrColours.push(lerpColor(from, to, i));
        fill(lerpColor(from, to, i));
        rect(startPt, 20, 10, 60);
        startPt += 10;
    }
    

    
    /*fill(interA);
    startPt += 20;
    rect(startPt, 20, 20, 60);
    fill(interB);
    startPt += 20;
    rect(startPt, 20, 20, 60);
    fill(to);
    startPt += 20;
    rect(startPt, 20, 20, 60); */
}

function canvasPressed() {
    
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}