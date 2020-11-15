

let centerX;
let centerY;

function Dot(x, y) {
    this.x = x;
    this.y = y;
}

function Line(startDot, endDot) {
    this.startDot = startDot;
    this.endDot = endDot;
}

function preload() {
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
}

let lines = [];
function draw() {
    lines.forEach(l => {
        stroke('red');
        line(l.startDot.x, l.startDot.y, l.endDot.x, l.endDot.y);
    });
}

function intersects(line1, line2) {
   let a1 = line1.endDot.y-line1.startDot.y;
   let b1 = line1.startDot.x - line1.endDot.x;
   // C = Ax1+By1
   let c1 = (a1*line1.startDot.x)+(b1*line1.startDot.y);

   let a2 = line2.endDot.y-line2.startDot.y;
   let b2 = line2.startDot.x - line2.endDot.x;
   let c2 = (a2*line2.startDot.x)+(b2*line2.startDot.y);

   let determinant = a1*b2 - a2*b1
   
   if(determinant == 0){
    //Lines are parallel
    console.log('Determinant is 0');
    return false;
   } else {
    let x = (b2*c1 - b1*c2)/determinant;
    let y = (a1*c2 - a2*c1)/determinant;
    console.log('X received ' + x);
    console.log('Y received ' + y);
    return new Dot(x, y);
   }

}

function canvasPressed() {
    strokeWeight(3);
   let lineOneStartDot = new Dot(centerX, centerY);
   let endPointL1X = centerX+35;
   let endPointL1Y = centerY+10;
   let lineOneEndDot = new Dot(endPointL1X, endPointL1Y);

   let lineOne = new Line(lineOneStartDot, lineOneEndDot);

   let startPointl2X = centerX-50;
   let startPointl2Y = centerY+50;
   let lineTwoStartDot = new Dot(startPointl2X, startPointl2Y);
   stroke('red');
   let endPointL2X = centerX + 60;
   let endPointL2Y = centerY - 40;
   let lineTwoEndDot = new Dot(endPointL2X, endPointL2Y);
   let lineTwo = new Line(lineTwoStartDot, lineTwoEndDot);
   lines.push(lineOne);
   lines.push(lineTwo);


   let lineThreeStartDot = new Dot(centerX - 100, centerY - 100);
   let lineThreeEndDot = new Dot(centerX - 90, centerY - 65);
   let lineThree = new Line(lineThreeStartDot, lineThreeEndDot);
   lines.push(lineThree);
   let lineFourStartDot = new Dot(centerX - 200, centerY - 200);
   let lineFourEndDot = new Dot(centerX - 190, centerY - 165);
   let lineFour = new Line(lineFourStartDot, lineFourEndDot);
   lines.push(lineFour);

   let result = intersects(lines[0], lines[1]);
   if (result) {
       stroke('purple');
       strokeWeight(5);
       point(result.x, result.y);
       strokeWeight(3);
   } else {
       console.log('Lines do not intersect');
   }
}