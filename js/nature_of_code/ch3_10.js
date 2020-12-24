

let centerX;
let centerY;

let pendulum;


function Pendulum(x, y, r) {
    this.origin = createVector(x, y);
    this.location = createVector(0, 0, 0); // if this fails, try 0,0
    this.r = r;
    this.angle = PI/4;
    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    this.damping = 0.995; // change this to 1 to make it go on forever
}

Pendulum.prototype.update = function() {
    let gravity = 0.4;
    this.aAcceleration = (-1*gravity/this.r)*sin(this.angle);
    
    this.aVelocity += this.aAcceleration;
    this.aVelocity *= this.damping;
    this.angle += this.aVelocity;
}

Pendulum.prototype.display = function() {
    this.location.set(this.r*sin(this.angle), this.r*cos(this.angle), 0); // sin vs cos converts to x, y coordinates
    this.location.add(this.origin);
    stroke(0);
    line(this.origin.x, this.origin.y, this.location.x, this.location.y);
    ellipseMode(CENTER);
    fill(175);
    ellipse(this.location.x, this.location.y, 16, 16);
}

Pendulum.prototype.go = function () {
    this.update();
    this.display();
}


function setup() {
    createCanvas(windowWidth, windowHeight);
    pendulum = new Pendulum(windowWidth/2, 0, 125);
    
}

function draw() {
    clear();
    pendulum.update();
    pendulum.display();
}