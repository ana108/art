let centerX;
let centerY;

let decorations = [];
function Mover(m, x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, -2);
    this.acceleration = createVector(0, 0);
    this.topspeed = 10;
    this.mass = m;
    this.colour = color(random(255), random(255), random(255));
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
    stroke(255);
    fill(this.colour);
    rect(this.location.x, this.location.y, 8, 65);
}
Mover.prototype.checkEdges = function() {
    if (this.location.y < 0) {
        this.velocity.y *= -1;
        this.location.y = 0;
        let wind = createVector(0, 0);
        this.applyFroce(wind);
    } else if (this.location.y >= 70) {
        this.velocity.y *= -1;
        this.location.y = 70;
    }
}

function preload() {
}
function setup() {
    let cnv = createCanvas(windowWidth - 30, windowHeight - 30);
    centerX = windowWidth-44/2;
    centerY = windowHeight/2;
    cnv.mousePressed(canvasPressed);
    let start = 4;
    let total = Math.round(windowWidth/25);
    for(let i = 0; i < total; i++) {
        decorations.push(new Mover(1, start, i%5));
        start = start+25;
    }
}

function draw() {
    background(255);
    strokeWeight(2);
    decorations.forEach(mover => {
        mover.display();
        mover.update();
        mover.checkEdges();
    });
   
}

function canvasPressed() {
    let wind = createVector(0, 5);
    mover.applyFroce(wind);
}