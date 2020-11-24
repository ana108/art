

let centerX;
let centerY;


function preload() {
}
let deg = 20;
let dots = [];
let lengthOfLine = 8;
let lines = [];
let diameter = 56;
let colourA = 'black';
let colourB = 'white';
function setup() {
    centerX = windowWidth/2;
    centerY = (windowHeight/2) - 20;
    let cnv = createCanvas(windowWidth, windowHeight);
    cnv.mousePressed(canvasPressed);
    arrowSetup();
}
function arrowSetup() {
    let a = 0;
    let difference = 0.1;
    let newColour;
    let up = true;
    diameter = 56;
    lines = [];
    deg = 20;
    while(a < 75) {
        newColour = lerpColor(color(colourA), color(colourB), difference);
        for(var i = 0; i < 36*2; i++) {
            addToCircle(newColour);
        }
        diameter += lengthOfLine*4;
        
        if(difference >= 1.0) {
            difference = 0.0;
        }
        difference += 0.1;
        /*if(difference >= 1.0 || difference <= 0.0) {
            up = !up;
        }
        if (!up) {
            console.log('decreasing..');
            difference -= 0.1;
        } else {
            difference += 0.1;
        } */
        a++;
    }
}
function draw() {
    strokeWeight(1);
    // circle(centerX, centerY, diameter);
    stroke('green');
    point(centerX, centerY);
    /*dots.forEach(dot => {
        stroke(dot.colour);
       point(dot.x, dot.y); 
    });*/
    lines.forEach(l => {
        if(l.colour) {
            // console.log('ANA ' + colour(l.colour));
            stroke(color(l.colour));
        }
        line(l.startDot.x, l.startDot.y, l.endDot.x, l.endDot.y);
    });
}

function addToCircle(colour) {
    let addDot = createDot(diameter/2, deg);
    addDot.colour = 'green';
    let secondDot = createDot((diameter/2)-lengthOfLine, deg-10);
    secondDot.colour = 'red';
    let thirdDot = createDot((diameter/2)+lengthOfLine, deg-10);
    thirdDot.colour = 'purple';
    dots.push(addDot);
    dots.push(secondDot);
    dots.push(thirdDot);
 
    let lineOne = new Line(addDot, secondDot, colour);
    let lineTwo = new Line(addDot, thirdDot, colour);
    lines.push(lineOne);
    lines.push(lineTwo);
    deg = deg + 5;
}
function canvasPressed() {
    let temp = colourA;
    colourA = colourB;
    colourB = temp;
    arrowSetup();
}