

let centerX;
let centerY;
let mover;
let mover2;
let baseVector;
function Mover(m, x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, -2);
    this.acceleration = createVector(0, 0);
    this.topspeed = 10;
    this.mass = m;
}
Mover.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);   
    if(this.velocity.y !== 2 && this.velocity.y !== -2) {
        this.velocity.add(createVector(0, -1));
    }
    this.acceleration.mult(0);
}
let noiser = 0;
Mover.prototype.applyFroce = function(force) {
    let f = p5.Vector.div(force,  this.mass);
    noiser = noiser + 1;
    let n = noise(noiser);
    this.acceleration.add(createVector(0, parseInt(((1000*n)/100))))
}

Mover.prototype.display = function() {
    stroke(0);
    fill(175);
    ellipse(this.location.x, this.location.y, this.mass*16, this.mass*16);
}
Mover.prototype.checkEdges = function() {
    if (this.location.y < 8) {
        this.velocity.y *= -1;
        baseVector.mult(-1);
        this.location.y = 8;
        let wind = createVector(0, 8);
        this.applyFroce(wind);
    } else if (this.location.y >= 100) {
        this.velocity.y *= -1;
        this.location.y = 100;
        baseVector.mult(-1);
    }
}

function preload() {
}
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    mover = new Mover(1, centerX, centerY);
    mover2 = new Mover(1, centerX+25, centerY);
    baseVector = createVector(0, -1);
}

function draw() {
    background(255);
    strokeWeight(2);
    mover.update();
    mover.checkEdges();
    mover.display();

    mover2.update();
    mover2.checkEdges();
    mover2.display();
}

function canvasPressed() {
    let wind = createVector(0, 5);
    mover.applyFroce(wind);
}