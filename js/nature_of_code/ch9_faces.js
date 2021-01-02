

let centerX;
let centerY;
let population;
let button;

  
class Population {
     constructor(m, num) {
      this.mutationRate = m;
      this.population = [];
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
  
    /*selection() {
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
    }*/
    selection() {

    }
    reproduction() {
      
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
    display() {

    }
    rollover(x, y) {

    }
  }
  class Button {
    constructor() {

    }
    display() {

    }
    clicked(x, y) {

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
  
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);

    let mutationRate = 0.03;
    population = new Population(mutationRate, 10);
    button = new Button(15, 150,160, 20, "evolve new generation");
}

function draw() {
    background(255);
    population.display();
    population.rollover(mouseX, mouseY);
    button.display();
}

function canvasPressed() {
   if(button.clicked(mouseX, mouseY)) {
     population.selection();
     population.reproduction();
   }
}