

let centerX;
let centerY;
let ca;

class Cell {
    constructor(x, y, state) {
        this.x = x;
        this.y = y;
        this.w = 10;
        this.state = state;
        this.previous = 0;
    }
    display() {
        if (this.previous === 0 && this.state === 1) {
            fill(0,0, 255);
        } else if (this.previous === 1 && this.state === 0) {
            fill(255, 0, 0);
        } else {
            fill(255);
        }
        rect(this.x, this.y, this.w, this.w);
    }
    newState(newState) {
        this.previous = this.state;
        this.state = newState;
    }
}
class CA {
    constructor() {
        this.cells = [];
        this.w = 10;
        this.numCells = parseInt(windowWidth/this.w);
        this.ruleset = [0,1,0,1,1,0,1,0];
        for(let i = 0; i < this.numCells; i++) {
            this.cells[i] = [];
            for(let j = 0; j < this.numCells; j++) {
                this.cells[i][j] = new Cell(i, j, parseInt(random(2)));
            }
        }
        this.generation = 0;
    }
    generate() {
        for(let i = 1; i < this.numCells-1; i++) {
            for(let j = 1; j < this.numCells-1; j++) {
                let neighbours = 0;
                for(let x = -1; x <= 1; x++) {
                    for(let y = -1; y <= 1; y++) {
                        neighbours += this.cells[i+x][j+y].previous;
                    }
                }
                neighbours -= this.cells[i][j].previous;

                if (this.cells[i][j].state == 1 && neighbours < 2) {
                    this.cells[i][j].newState(0);
                } else if(this.cells[i][j].state == 1 && neighbours > 3) {
                    this.cells[i][j].newState(0);
                } else if (this.cells[i][j].state == 0 && neighbours == 3) {
                    this.cells[i][j].newState(1);
                }
            }
        }
        this.generation++;
    }
    display(){
        for(let i = 0; i < this.cells.length; i++) {
            for(let j = 0; j < this.cells.length; j++) {
                if (this.cells[i][j].state == 1) {
                    fill(0);
                } else {
                    fill(255);
                }
                stroke(0);
                rect(i*this.w, j*this.w, this.w, this.w);
            }
        }
    }
}
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    ca = new CA();
    max = 5;
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