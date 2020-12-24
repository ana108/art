

let centerX;
let centerY;
let bob;
let spring;
function Bob(x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = 1;
}
let noiser = 0;
Bob.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
}

Bob.prototype.applyForce = function(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);

}

Bob.prototype.display = function() {
    stroke(0);
    fill(175);
    ellipse(this.location.x, this.location.y, this.mass*16, this.mass*16);
}
function Spring(x, y, len) {
    this.anchor = createVector(x, y);
    this.len = len;
    this.k = 0.01;
}

Spring.prototype.connect = function(b) {
    let force = p5.Vector.sub(b.location, this.anchor);
    let d = force.mag();
    let stretch = d - this.len;

    force.normalize();
    force.mult(-1*this.k*stretch);
    b.applyForce(force);
}

Spring.prototype.display = function() {
    fill(100);
    rectMode(CENTER);
    rect(this.anchor.x, this.anchor.y, 10, 10);
}

Spring.prototype.displayLine = function(b) {
    stroke(0);
    line(b.location.x, b.location.y, this.anchor.x, this.anchor.y);
}

Spring.prototype.constrainLength = function(b, minLen, maxLen) {
    let dir = p5.Vector.sub(b.location, this.anchor);
    let d = dir.mag();
    if (d < minLen) {
        dir.normalize();
        dir.mult(minLen);
        b.location = p5.Vector.add(this.anchor, dir);
        b.velocity.mult(0);
    } else if (d > maxLen) {
        dir.normalize();
        dir.mult(maxLen);
        b.location = p5.Vector.add(this.anchor, dir);
        b.velocity.mult(0);
    }
}

Bob.prototype.checkEdges = function() {
    if(this.location.x > windowWidth) {
        this.location.x = windowWidth;
        this.velocity.x *= -1;
    } else if (this.location.x < 0) {
        this.velocity.x *= -1;
        this.location.x = 0;
    } 
    if(this.location.y > windowHeight) {
        this.velocity.y *= -1;
        this.location.y = height;
    } else if (this.location.y < 0) {
        this.velocity.y *= -1;
        this.location.y = 0;
    }
}

function preload() {
}
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    bob = new Bob(130, 30);
    spring = new Spring(130, 0, 260);
}

function draw() {
    background(255);
    strokeWeight(2);
    let gravity = createVector(0, 1);
    bob.applyForce(gravity);
    
    spring.connect(bob);
    bob.update();
    bob.display();
    spring.display();
    spring.constrainLength(bob, 20, 400);
    spring.displayLine(bob);
   
}

function canvasPressed() {
}