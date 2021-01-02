

let centerX;
let centerY;
let population;
let lifetime;
let target;
let lifecycle;
let obstacles;
let recordTime;

class Rocket {
    constructor(l, dna_, totalRockets) {
      this.acceleration = createVector();
      this.velocity = createVector();
      this.position = l.copy();
      this.r = 4;
      this.dna = dna_;
      this.finishTime = 0;
      this.recordDist = 10000;
      this.hitObstacle = false;
      this.hitTarget = false;
      this.geneCounter = 0;
    }
    
    fitnessFunc() {
      if (this.recordDist < 1) this.recordDist = 1;
  
      this.fitness = (1/(this.finishTime*this.recordDist));
  
      this.fitness = Math.pow(this.fitness, 4);
  
      if (this.hitObstacle) this.fitness *= 0.1;
      if (this.hitTarget) this.fitness *= 2;
    }
  
    run(os) {
      if (!this.hitObstacle && !this.hitTarget) {
        this.applyForce(this.dna.genes[this.geneCounter]);
        this.geneCounter = (this.geneCounter + 1) % this.dna.genes.length;
        this.update();
       this. obstacles(os);
      }
      // Draw me!
      if (!this.hitObstacle) {
        this.display();
      }
    }
  
    checkTarget() {
      let d = p5.Vector.dist(createVector(this.position.x, this.position.y), createVector(target.position.x, target.position.y));
      if (d < this.recordDist) this.recordDist = d;
  
      if (target.contains(this.position) && !this.hitTarget) {
        this.hitTarget = true;
      } 
      else if (!this.hitTarget) {
        this.finishTime++;
      }
    }
  
    obstacles(os) {
      os.forEach(obs => {
        if (obs.contains(this.position)) {
            this.hitObstacle = true;
          }
      });
    }
    
    applyForce(f) {
      this.acceleration.add(f);
    }
  
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    display() {
      let theta = this.velocity.heading() + PI/2;
      fill(200, 100);
      stroke(0);
      strokeWeight(1);
      push();
      translate(this.position.x, this.position.y);
      rotate(theta);
  
      // Thrusters
      rectMode(CENTER);
      fill(0);
      rect(-this.r/2, this.r*2, this.r/2, this.r);
      rect(this.r/2, this.r*2, this.r/2, this.r);
  
      // Rocket body
      fill(175);
      beginShape(TRIANGLES);
      vertex(0, -this.r*2);
      vertex(-this.r, this.r*2);
      vertex(this.r, this.r*2);
      endShape();
  
      pop();
    }
  
    getFitness() {
      return this.fitness;
    }
  
    getDNA() {
      return this.dna;
    }
  
    stopped() {
      return this.hitObstacle;
    }
  }
  
class Population {
     constructor(m, num) {
      this.mutationRate = m;
      this.population =[];
      this.matingPool = [];
      this.generations = 0;
      //make a new set of creatures
      for (let i = 0; i < num; i++) {
        let position = createVector(windowWidth/2,windowHeight+20);
        this.population.push(new Rocket(position, new DNA(), this.population.length));
        //this.population[i] = new Rocket(position, new DNA(), this.population.length);
      }
    }
  
    live (os) {
      // For every creature
      for (let i = 0; i < this.population.length; i++) {
        // If it finishes, mark it down as done!
        this.population[i].checkTarget();
        this.population[i].run(os);
      }
    }
  
    targetReached() {
      for (let i = 0; i < this.population.length; i++) {
        if (this.population[i].hitTarget) return true;
      }
      return false;
    }
  
    fitness() {
      for (let i = 0; i < this.population.length; i++) {
        this.population[i].fitnessFunc();
      }
    }
  
    selection() {
      this.matingPool = [];
  
      let maxFitness = this.getMaxFitness();
  
      for (let i = 0; i < this.population.length; i++) {
        let fitnessNormal = map(this.population[i].getFitness(),0,maxFitness,0,1);
        let n = parseInt(fitnessNormal * 100);
        for (let j = 0; j < n; j++) {
          this.matingPool.push(this.population[i]);
        }
      }
    }
  
    reproduction() {
      for (let i = 0; i < this.population.length; i++) {
        let m = parseInt(random(this.matingPool.length));
        let d = parseInt(random(this.matingPool.length));
        let mom = this.matingPool[m];
        let dad = this.matingPool[d];
        let momgenes = mom.getDNA();
        let dadgenes = dad.getDNA();
        
        let child = momgenes.crossover(dadgenes);
        child.mutate(this.mutationRate);
        let position = createVector(windowWidth/2,windowHeight+20);
        this.population[i] = new Rocket(position, child, this.population.length);
      }
      this.generations++;
    }
  
    getGenerations() {
      return this.generations;
    }
  
    getMaxFitness() {
      let record = 0;
      for (let i = 0; i < this.population.length; i++) {
         if(this.population[i].getFitness() > record) {
           record = this.population[i].getFitness();
         }
      }
      return record;
    }
  
  }

  class DNA {
  
    constructor(newgenes) {
      this.maxforce = 0.1;
      if(newgenes) {
        this.genes = newgenes;
      } else {
        this.genes = [];
        for (let i = 0; i < lifetime; i++) {
          let angle = random(TWO_PI);
          let newVec = createVector(cos(angle), sin(angle));
          newVec.mult(random(0, this.maxforce));
          this.genes.push(newVec);
        }
        this.genes[0].normalize();
      }
    }
  
    crossover(partner) {
      let child = [];
      let crossover = parseInt(random(this.genes.length));
      for (let i = 0; i < this.genes.length; i++) {
        if (i > crossover) child[i] = this.genes[i];
        else               child[i] = partner.genes[i];
      }    
      let newgenes = new DNA(child);
      return newgenes;
    }
  
    mutate(m) {
      for (let i = 0; i < this.genes.length; i++) {
        if (random(1) < m) {
          let angle = random(TWO_PI);
          let newGene = createVector(cos(angle), sin(angle));
          newGene.mult(random(0, this.maxforce));
          this.genes.push(newGene);
          if (i == 0) this.genes[i].normalize();
        }
      }
    }
  }
  class Obstacle {

    constructor(x, y, w_, h_) {
      this.position = createVector(x,y);
      this.w = w_;
      this.h = h_;
    }
  
    display() {
      stroke(0);
      fill(175);
      strokeWeight(2);
      rectMode(CORNER);
      rect(this.position.x, this.position.y,this.w,this.h);
    }
  
    contains(spot) {
      if (spot.x > this.position.x && spot.x < this.position.x + this.w && spot.y > this.position.y && spot.y < this.position.y + this.h) {
        return true;
      } else {
        return false;
      }
    }
  
  }
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    lifetime = 500;

    // Initialize variables
    lifecycle = 0;
    recordtime = lifetime;
    
    target = new Obstacle(windowWidth - windowWidth/3, 24, 24, 24);
  
    // Create a population with a mutation rate, and population max
    let mutationRate = 0.03;
    population = new Population(mutationRate, 100);
  
    // Create the obstacle course  
    obstacles = []
    obstacles.push(new Obstacle(windowWidth/2-100, windowHeight/2, 200, 10));
}

function draw() {
    background(255);
    target.display();
    if (lifecycle < lifetime) {
        population.live(obstacles);
        if ((population.targetReached()) && (lifecycle < recordtime)) {
        recordtime = lifecycle;
        }
        lifecycle++;
        // Otherwise a new generation
    } else {
        lifecycle = 0;
        population.fitness();
        population.selection();
        population.reproduction();
    }

    obstacles.forEach(obs => {
        obs.display();
    });
    fill(0);
    text("Generation #: " + population.getGenerations(), 10, 18);
    text("Cycles left: " + (lifetime-lifecycle), 10, 36);
    text("Record cycles: " + recordtime, 10, 54);
}

function canvasPressed() {
   
}