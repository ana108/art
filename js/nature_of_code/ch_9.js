

let centerX;
let centerY;
let population = []; // 100
let target = 'to be or not to be';
let mutationRate;
class DNA {
    constructor() {
        this.genes = [];
        for(let i = 0; i < 18; i++) {
            this.genes[i] = String.fromCharCode(random(32,128));
        }
        this.fitness = 0.0;
    }
    fitnessFunc() {
        let score = 0;
        for(let i = 0; i < this.genes.length; i++) {
            if(this.genes[i] === target.charAt(i)){
                score++;
            }
        }
        this.fitness = score/target.length;
    }
    crossover(partner) {
        let child = new DNA();
        let midpoint = parseInt(random(this.genes.length));
        for(let i = 0; i < this.genes.length; i++) {
            if (i > midpoint) {
                child.genes[i] = this.genes[i];
            } else {
                child.genes[i] = partner.genes[i];
            }
        }
        return child;
    }
    mutate() {
        for(let i = 0; i < this.genes.length; i++) {
            if (random(1) <= mutationRate) {
                this.genes[i] = String.fromCharCode(random(32,128)); // 65 - 90, 32
            }
        }
    }
    getPhrase() {
        return this.genes.toString();
    }
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    mutationRate = 0.01;
    for(let i = 0; i < 100; i++) {
        let newDNA = new DNA();
        newDNA.fitnessFunc();
        population.push(newDNA);
    }
    generateMatingPool();
    for(let a = 0; a < population.length; a++) {
        let child = generateChild();
        population[a] = child;
    }
}
let matingPool = [];
function generateMatingPool() {
    for(let i = 0; i < population.length; i++) {
        let n = parseInt(population[i].fitness*100);
        for(let j = 0; j < n; j++) {
            matingPool.push(population[i]);
        }
    }
}
function generateChild() {
    let a = parseInt(random(matingPool.length-1));
    let b = parseInt(random(matingPool.length-1));
    let parentA = matingPool[a];
    let parentB = matingPool[b];
    let child = parentA.crossover(parentB);
    child.mutate();
    return child;
}
let y = 30;
function draw() {
    for(let i = 0; i < population.length; i++) {
        text(population[i].getPhrase(), 10, y);
        y += 10;
    }
}

function canvasPressed() {
   
}