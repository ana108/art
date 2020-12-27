

let centerX;
let centerY;
let ps;
const G = 1;
let repeller;
function Particle(location) {
    this.acceleration = createVector(0, 0);
    this.velocity = createVector(random(-1, 1), random(-2, 0));
    this.location = location.copy();
    this.lifespan = 255.0;
    this.mass = 1;
}

Particle.prototype.run = function() {
    this.update();
    this.display();
}
Particle.prototype.update = function() {
    this.velocity.add(this.acceleration);
    this.location.add(this.velocity);
    this.acceleration.mult(0);
    this.lifespan -= 2.0;
}
Particle.prototype.display = function() {
    stroke(0, this.lifespan);
    fill(0, this.lifespan);
    ellipse(this.location.x, this.location.y, 8, 8);
}
Particle.prototype.isDead = function() {
    if (this.lifespan < 0.0) {
        return true;
    } else {
        return false;
    }
}
Particle.prototype.applyForce = function(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
}

function Confetti(location) {
    Particle.call(this, location);
}
Confetti.prototype = Object.create(Particle.prototype);
Confetti.prototype.display = function() {
    let theta = map(this.location.x,0, windowWidth, 0, TWO_PI*2);
    rectMode(CENTER);
    fill(175);
    stroke(0);
    rect(this.location.x, this.location.y, 8, 8);
    push();
    translate(this.location.x, this.location.y);
    rotate(theta);
    rect(0, 0, 8, 8);
    pop();
}
function Repeller(x, y) {
    this.location = createVector(x, y);
    this.r = 10;
}
Repeller.prototype.display = function(){
    stroke(255);
    fill(255);
    ellipse(this.location.x, this.location.y, this.r*2, this.r*2);
}
Repeller.prototype.repel = function(particle) {
    let direction = p5.Vector.sub(this.location, particle.location);
    let distance = direction.mag();
    distance = constrain(distance, 5, 100);
    direction.normalize();
    let force = -1*5/(distance*distance);
    direction.mult(force);
    return direction;
}

function ParticleSystem(location) {
    this.particles = [];
    this.origin = location.copy();
}
ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin));
    this.particles.push(new Confetti(this.origin));
}
ParticleSystem.prototype.applyRepeller = function(r) {
    this.particles.forEach(p => {
        let force = r.repel(p);
        p.applyForce(force);
    });
}
ParticleSystem.prototype.run = function() {
    for(var i = this.particles.length-1; i >= 0; i--) {
        let p = this.particles[i];
        p.run();
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    } 
}
ParticleSystem.prototype.applyForce = function(force) {
    this.particles.forEach(p => {
        p.applyForce(force);
    });
}
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    ps = new ParticleSystem(createVector(centerX, centerY));
    repeller = new Repeller(windowWidth/2-20, windowHeight/2);
}

function render() {
}

function draw() {
    background(255);
    let gravity = createVector(0, 0.075);
    ps.applyForce(gravity);
    ps.applyRepeller(repeller);
    ps.run();
    ps.addParticle();
    repeller.display();
}

function canvasPressed() {
}