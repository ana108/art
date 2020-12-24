

let centerX;
let centerY;

let angle = 0;
let aVelocity = 0.05;
let oscillitator;
function Oscillitator() {
    this.angle = createVector(0, 0);
    this.velocity = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amplitude = createVector(random(windowWidth/2), random(windowHeight/2));
}

Oscillitator.prototype.oscillate = function() {
    this.angle.add(this.velocity);
}
Oscillitator.prototype.display = function() {
    let x = Math.sin(this.angle.x)*this.amplitude.x;
    let y = Math.sin(this.angle.y)*this.amplitude.y;
    push();
    translate(windowWidth/2, windowHeight/2);
    stroke(0);
    fill(175);
    line(0,0,x,y);
    ellipse(x,y,16,16);
    pop();
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    oscillitator = new Oscillitator();
}

function draw() {
    oscillitator.oscillate();
    oscillitator.display();
}

function canvasPressed() {
   
}