

let centerX;
let centerY;
let movers = [];
let liquid;
function Liquid(x, y, w, h, c) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.c = c;
}
Liquid.prototype.display = function() {
    noStroke();
    fill(175);
    rect(this.x, this.y, this.w, this.h);
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
    if(this.location.y > windowHeight-100) {
        this.velocity.y *= -1;
        this.location.y = height;
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
    console.log(' mag x is ' + this.velocity.x + ' y '+ this.velocity.y);
    if(this.velocity.y < 0) {
        this.velocity.y = 0;
        speed = this.velocity.mag();
    }
    let dragMagnitude = liq.c*speed*speed;
    console.log('Drag Mag ' + dragMagnitude);
    let drag = this.velocity.copy();
    drag.mult(-1);
    drag.normalize();
    drag.mult(dragMagnitude);
    this.applyForce(drag);
}

function setup() {
    background(255);
    noFill();
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    for(let i = 0; i < 100; i++) {
        movers[i] = new Mover(random(0.1, 5), 30, 30);
    }
    liquid = new Liquid(0, windowHeight/2, windowWidth, windowHeight/2, 0.1);
}

function draw() {
    clear();
    
    liquid.display();
    movers.forEach(mover => {
        mover.checkEdges();
        if(mover.isInside(liquid)) {
            console.log('is inside');
            mover.drag(liquid);
        }
        let m = 0.1*mover.mass;
        let gravity = createVector(0, m);
        mover.applyForce(gravity); 
        mover.update();
        mover.display();
    });
}
function canvasPressed() {
}