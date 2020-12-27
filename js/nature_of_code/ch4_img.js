

let centerX;
let centerY;

let img;
function preload() {
    img = loadImage('../assets/sunset.JPG');
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    ps = new ParticleSystem(createVector(centerX, centerY));
}

Particle.prototype.render = function() {
    imageMode(CENTER);
    tint(255, this.lifespan); // applies transparency without changing colour
    image(img, this.location.x, this.location.y);
}

function draw() {
    ps.run();
    ps.addParticle();
}

let ps;
const G = 1;
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
    this.render();
    //ellipse(this.location.x, this.location.y, 8, 8);
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

function ParticleSystem(location) {
    this.particles = [];
    this.origin = location.copy();
}
ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin));
    this.particles.push(new Confetti(this.origin));
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
