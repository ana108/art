

let centerX;
let centerY;
let mover;
function Mover() {
    this.location = createVector(random(windowWidth), random(windowHeight));
    this.velocity = createVector(2.5, 5);
}
Mover.prototype.update = function() {
    this.location.add(this.velocity);
}
Mover.prototype.display = function() {
    stroke(0);
    fill(175);
    fill(175);
    ellipse(this.location.x, this.location.y, 16, 16);
}
Mover.prototype.checkEdges = function() {
    if(this.location.x > windowWidth) {
        this.location.x = 0;
    } else if (this.location.x < 0) {
        this.location.x = windowWidth;
    } 
    if(this.location.y > windowHeight) {
        this.location.y = 0;
    } else if (this.location.y < 0) {
        this.location.y = windowHeight;
    }
}

function preload() {
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    mover = new Mover();
}

function draw() {
    background(255);
    strokeWeight(2);
    mover.update();
    mover.checkEdges();
    mover.display();
}

function canvasPressed() {
   
}