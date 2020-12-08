

let centerX;
let centerY;
let mover;
function Mover(m, x, y) {
    this.location = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.topspeed = 10;
    this.mass = m;
}
Mover.prototype.update = function() {
    /*let mouseVector = createVector(mouseX, mouseY);
    let direction = p5.Vector.sub(mouseVector, mover.location);
    let magDirection = direction.mag();
    direction.normalize();
    direction.mult(magDirection/1000);
    this.acceleration = direction;
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.topspeed);
    this.location.add(this.velocity);*/
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
}

Mover.prototype.applyFroce = function(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acceleration.add(f);
}

Mover.prototype.display = function() {
    stroke(0);
    fill(175);
    fill(175);
    ellipse(this.location.x, this.location.y, this.mass*16, this.mass*16);
}
Mover.prototype.checkEdges = function() {
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
movers = [];
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    // mover = new Mover();
    for(var i = 0; i < 100; i++) {
        movers[i] = new Mover(random(0.1, 5), 0, 0);
    }
}

function draw() {
    background(255);
    strokeWeight(2);

    movers.forEach(element => {
        let wind = createVector(0.001, 0);
        let m = element.mass; 
        let gravity = createVector(0, 0.1*m);
        element.applyFroce(wind);
        element.applyFroce(gravity);
        element.update();
        element.checkEdges();
        element.display();
    });
}

function canvasPressed() {
    let wind = createVector(0.5, 0);
    //mover.applyFroce(wind);
}