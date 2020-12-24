

let centerX;
let centerY;

let angle = 0;
let angleVel = 0.2;
let amplitude = 100;

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    noFill();
    drawWave();
}

function drawWave() {
    stroke(0);
    strokeWeight(2);
    beginShape();
    for(var x = 0; x <= windowWidth; x += 5) {
        let y = map(Math.sin(angle), -1, 1, 0, windowHeight); // what does map do?
        vertex(x, y); // what does vertex do?
        angle += angleVel;
    }
    endShape();
}

function draw() {

}

function canvasPressed() {
   
}