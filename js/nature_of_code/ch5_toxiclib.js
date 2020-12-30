let centerX;
let centerY;
let physics;
let cluster;
let particles = [];
let p1;
let p2;
let attractor;
class Attractor extends VerletParticle2D {
    constructor(loc) {
        super(loc);
        this.r = 24;
        physics.addBehavior(new AttractionBehavior(this, windowWidth, 0.1));
    }
    display() {
        fill(0);
        ellipse(this.x, this.y, this.r*2, this.r*2);   
    }
}

class Node extends VerletParticle2D {
    constructor(pos) {
        super(pos);
    }
    display() {
        fill(0, 150);
        stroke(0);
        ellipse(this.x, this.y, 16, 16);
    }
}
class Cluster {
    constructor(n, d, center) {
        this.nodes = [];
        this.diameter = d;
        for(let i = 0; i < n; i++) {
            this.nodes.push(new Node(center.add(Vec2D.randomVector())));
        }

        for(let i = 0; i < this.nodes.length; i++) {
            let ni = this.nodes[i];
            for(let j = i+1; j < this.nodes.length; j++) {
                let nj = this.nodes[j];
                physics.addSpring(new VerletSpring2D(ni, nj, this.diameter, 0.01));
            }
        }
    }

    display() {
        // Show all the nodes
        for (let i = 0; i < this.nodes.length; i++) {
          this.nodes[i].display();
        }
        this.showConnections();
      }

      showConnections() {
        stroke(255, 150);
        strokeWeight(2);
        for (let i = 0; i < this.nodes.length - 1; i++) {
          for (let j = i + 1; j < this.nodes.length; j++) {
            line(this.nodes[i].x, this.nodes[i].y, this.nodes[j].x, this.nodes[j].y);
          }
        }
      }
}
class Particle extends VerletParticle2D {

    constructor(position) {
      super(position);
      this.r = 4;
      physics.addBehavior(new AttractionBehavior(this, this.r*4, -1));
    }
  
    // Override the display method
    display() {
      fill(255);
      stroke(0);
      ellipse(this.x, this.y, this.r*2, this.r*2);
    }
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    physics = new VerletPhysics2D();
    physics.setWorldBounds(new Rect(0, 0, windowWidth-40, windowHeight-40));
    //physics.addBehavior(new GravityBehavior(new Vec2D(0, 0.5)));
    //p1 = new Particle(new Vec2D(100, 20));
    //p2 = new Particle(new Vec2D(100, 100));
    //p1.lock();
    //physics.addParticle(p1);
    //physics.addParticle(p2);
    attractor = new Attractor(new Vec2D(centerX, centerY));
    attractor.lock();
    physics.addParticle(attractor);
    let stringLength = 10;
    for(let i = 0; i < 10; i++) {
        let particle = new Particle(i*stringLength+150, 10);
        physics.addParticle(particle);
        particles.push(particle);
    }
    //cluster = new Cluster(8, 100, new Vec2D(windowWidth/2, windowHeight/2));
    /*let strength = 0.01;

    let stringLength = 10;
    let numParticles = 20;
    for(var i = 0; i < numParticles; i++) {
        let particle = new Particle(i*stringLength+150, 10);
        physics.addParticle(particle);
        particles.push(particle);
        if(i !== 0) {
            let previous = particles[i-1];
            let spring = new VerletSpring2D(particle, previous, stringLength, strength);
            physics.addSpring(spring);
        }
    }
    particles[0].lock(); */
}

function draw() {
    clear();
    physics.update();
    background(255);
    particles.forEach(p => {
        p.display();
    });
    attractor.display();

    /*cluster.display();
    beginShape();
    particles.forEach(particle => {
        vertex(particle.x, particle.y);
    });
    endShape();
    particles[particles.length-1].display();*/
}

function canvasPressed() {
   /*p2.lock();
   p2.x = mouseX;
   p2.y = mouseY;*/
   particles[particles.length-1].lock();
   particles[particles.length-1].x = mouseX;
   particles[particles.length-1].y = mouseY;
}
function mouseReleased(){
    particles[particles.length-1].x = mouseX;
    particles[particles.length-1].y = mouseY;
    particles[particles.length-1].unlock();
}