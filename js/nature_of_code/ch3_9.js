

let centerX;
let centerY;

let startAngle = 0;
let angleVel = 0.1;

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    noFill();
}

function draw() {
    beginShape();
    let angle = startAngle;
    for(let x = 0; x <= windowWidth; x += 24) {
        //let y = map(Math.sin(angle), -1, 1, 0, windowHeight);
        let y = map(noise(angle), -1, 1, 0, windowHeight);
        stroke(0);
        fill(0, 50);
        ellipse(x, y, 48, 48);
        angle += angleVel;
    }
    endShape();

}

function canvasPressed() {
   
}