let centerX;
let centerY;
let kochLine;
class Kochline {
    constructor(a, b) {
        this.start = a.copy();
        this.end = b.copy();
        this.lines = [];
    }

    display() {
        this.lines.forEach(l => {
            line(l.start.x, l.start.y, l.end.x, l.end.y);
        });
    }
    addLine() {
        this.lines.push(new Kochline(this.start, this.end));
    }
    generate() {
        let next = [];
        this.lines.forEach(l => {
            let a = l.kochA();
            let b = l.kochB();
            let c = l.kochC();
            let d = l.kochD();
            let e = l.kochE();

            next.push(new Kochline(a, b));
            next.push(new Kochline(b, c));
            next.push(new Kochline(c, d));
            next.push(new Kochline(d, e));
        });
        this.lines = next;
    }
    kochA() {
        return this.start.copy();
    }
    kochB() {
        let v = p5.Vector.sub(this.end, this.start);
        v.div(3);
        v.add(this.start);
        return v;
    }
    kochC() {
        let a = this.start.copy();
        let v = p5.Vector.sub(this.end, this.start);
        v.div(3);
        a.add(v);
        v.rotate(-radians(60));
        a.add(v);
        return a;
    }
    kochD() {
        let v = p5.Vector.sub(this.end, this.start);
        v.mult(2/3.0);
        v.add(this.start);
        return v;
    }
    kochE() {
        return this.end.copy();
    }
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    initLength = windowWidth-50;

    let start = createVector(0, 500);
    let end = createVector(windowWidth-40, 500);
    kochLine = new Kochline(start, end);
    kochLine.addLine();
    for(let i = 0; i < 5; i++) {
        kochLine.generate();
    }
}
let initLength;
function draw() {
    //drawCircle(centerX, centerY, 500);
    //cantor(25, 50, initLength);
    background(255);
    kochLine.display();
}

function canvasPressed() {
   
}
function drawCircle(x, y, radius) {
    stroke(0);
    noFill();
    ellipse(x, y, radius, radius);
    if (radius > 8) {
        drawCircle(x+radius/2, y, radius/2);
        drawCircle(x-radius/2, y, radius/2);
        drawCircle(x , y + radius/2, radius/2);
        drawCircle(x, y - radius/2, radius/2);
    }
}

function cantor(x, y, len) {
    if (len >= 1) {
        line(x, y, x+len, y);
        y += 20;
        cantor(x, y, len/3),
        cantor(x+len*2/3, y, len/3);
    }
}