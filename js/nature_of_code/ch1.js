

let centerX;
let centerY;


function preload() {
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
}

function draw() {
    
    strokeWeight(3);
}

function canvasPressed() {
   
}