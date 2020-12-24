

let centerX;
let centerY;

let angle = 0;
let aVelocity = 0;
let aAcceleration = 0.001;
let mover;
let g = 1;
function Mover(mass, x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(1, 1);
    this.acceleration = createVector(0, 0);
    this.mass = mass;

    this.angle = 0;
    this.aVelocity = 0;
    this.aAcceleration = this.acceleration.x;
}
Mover.prototype.applyForce = function(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
}

Mover.prototype.display = function() {
    let angle = this.velocity.heading(); //atan2(this.velocity.y/this.velocity.x);
    stroke(0);
    fill(175, 200);
    rectMode(CENTER);
    push();
    translate(this.location.x, this.location.y);
    rotate(angle);
    //rotate(this.angle);
    rect(0, 0,this.mass*16, this.mass*16);
    //ellipse(0, 0, this.mass*16, this.mass*16);
    pop();
    //ellipse(0, 0, this.mass*16, this.mass*16);
}
Mover.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.aAcceleration = this.acceleration.x/10;
    this.aVelocity += this.aAcceleration;
    this.aVelocity = constrain(this.aVelocity, -0.1,0.1);
    this.angle += this.aVelocity;
    this.acceleration.mult(0);
}
Mover.prototype.attract = function() {
    let force = p5.Vector.sub(this.location, createVector(windowWidth/2, windowHeight));
    let distance = force.mag();
    distance = constrain(distance, 5.0, 25.0);
    force.normalize();
    let strength = (g*this.mass*this.mass)/(distance*distance);
    force.mult(strength);
    return force;
}

Mover.prototype.drag = function(c) { // 0.1
    let speed = this.velocity.mag();
    if(this.velocity.y < 0) {
        this.velocity.y = 0;
        speed = this.velocity.mag();
    }
    let dragMagnitude = c*speed*speed;
    let drag = this.velocity.copy();
    drag.mult(-1);
    drag.normalize();
    drag.mult(dragMagnitude);
    this.applyForce(drag);
}

Mover.prototype.checkEdges = function() {
    if(this.location.x > windowWidth) {
        this.location.x = windowWidth;
        this.velocity.x *= -1;
    } else if (this.location.x < 0) {
        this.velocity.x *= -1;
        this.location.x = 0;
    } 
    if(this.location.y > windowHeight-50) {
        this.velocity.y *= -1;
        this.location.y = windowHeight-50;
    } else if (this.location.y < 0) {
        this.velocity.y *= -1;
        this.location.y = 0;
    }
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    baseVect = createVector(0.001, 0.001);
    currentVel = createVector(0, 0);
    mover = new Mover(5, 50, 50);
}
let baseVect;
let currentVel;
let decr = 1;

function draw() {
    background(255);
    fill(175);
    stroke(0);
    mover.update();
    mover.display();
    mover.checkEdges();
}

function canvasPressed() {
   
}