

let centerX;
let centerY;
let movers = [];
let attractor;
const G = 1.1;
function Attractor(x, y) {
    this.mass = 20;
    //this.location = createVector(windowWidth/2, windowHeight/2);
    this.location = createVector(x, y);
}
Attractor.prototype.display = function() {
    stroke(0);
    fill(175, 200);
    ellipse(this.location.x, this.location.y, this.mass*2, this.mass*2);
}
Attractor.prototype.attract = function(mover) {
    let force = p5.Vector.sub(this.location, mover.location);
    let distance = force.mag();
    distance = constrain(distance, 5.0, 25.0);
    force.normalize();
    let strength = (G*this.mass*mover.mass)/(distance*distance);
    force.mult(strength);
    return force;
}

function Mover(mass, x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = mass;
}
Mover.prototype.applyForce = function(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
}

Mover.prototype.display = function() {
    stroke(0);
    noFill();
    ellipse(this.location.x, this.location.y, this.mass*16, this.mass*16);
}
Mover.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
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

Mover.prototype.isInside = function(liq) {
    if (this.location.x > liq.x && this.location.x < (liq.x+liq.w) && this.location.y > liq.y && this.location.y < (liq.y+liq.h)) {
        return true;
    } 
    return false;
}

Mover.prototype.drag = function(liq) {
    let speed = this.velocity.mag();
    if(this.velocity.y < 0) {
        this.velocity.y = 0;
        speed = this.velocity.mag();
    }
    let dragMagnitude = liq.c*speed*speed;
    let drag = this.velocity.copy();
    drag.mult(-1);
    drag.normalize();
    drag.mult(dragMagnitude);
    this.applyForce(drag);
}

Mover.prototype.attract = function(mover) {
    let force = p5.Vector.sub(this.location, mover.location);
    let distance = force.mag();
    distance = constrain(distance, 5.0, 25.0);
    force.normalize();
    let strength = (G*this.mass*mover.mass)/(distance*distance);
    force.mult(strength);
    return force;
}

function setup() {
    background(255);
    noFill();
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    for(let i = 0; i < 100; i++) {
        movers[i] = new Mover(random(0.1, 2), random(windowWidth), random(windowHeight));
    }
    attractor = new Attractor();
}

function draw() {
    clear();
    attractor = new Attractor(mouseX, mouseY);
    attractor.display();
    movers.forEach(mover => {
        for(let i = 0; i < 100; i++) {
            if(!movers[i].location.equals(mover.location)) {
                let force = movers[i].attract(mover);
                force.mult(-1);
                mover.applyForce(force);
            }
        }
        let force = attractor.attract(mover);
        force.mult(2);
        mover.applyForce(force);
        mover.update();
        mover.display();
        mover.checkEdges();
    });
}
function canvasPressed() {
}