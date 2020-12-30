

let centerX;
let centerY;
let ca;

function preload() {
}
class Cell {
    constructor() {
        this.cells = [];
        this.w = 10;
        this.numCells = parseInt(windowWidth/this.w);
        this.ruleset = [0,1,0,1,1,0,1,0];
        for(let i = 0; i < this.numCells; i++) {
            this.cells[i] = 0;
        }
        this.cells[parseInt(this.numCells/2)] = 1;
        this.generatation = 0;
    }
    generate() {
        let nextgen = [];
        nextgen[0] = 0;
        nextgen[this.cells.length-1] = 0;
        for(let i = 1; i < this.cells.length-1; i++) {
            let left = this.cells[i-1];
            let me = this.cells[i];
            let right = this.cells[i+1];
            nextgen[i] = this.rules(left, me, right);
        }
        this.cells = nextgen;
        this.generatation++;
    }
    rules(a, b, c) {
        let s = "" + a + b + c; // watch out that these dont get added
        let index = parseInt(s, 2);
        return this.ruleset[index];
    }
    display(){
        for(let i = 0; i < this.cells.length; i++) {
            if (this.cells[i] === 0) {
                fill(255);
            } else {
                fill(0);
            }
            rect(i*this.w, this.generatation*this.w, this.w, this.w);
        }
    }
}
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    ca = new Cell();
    max = windowHeight/ca.w;
}
let max;
let i = 0;
function draw() {
    if (i < max) {
        ca.generate();
        ca.display();
        i++;
    }
}

function canvasPressed() {
   
}