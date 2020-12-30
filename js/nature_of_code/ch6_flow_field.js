let centerX;
let centerY;
let physics;
let vehicle;
let flowField;
let path;
class Path {
    constructor() {
        this.radius = 20;
        this.points = [];
    }
    addPoint(x, y) {
        let point = createVector(x, y);
        this.points.push(point);
    }
    /*display() {
        strokeWeight(this.radius*2);
        stroke(0, 100);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
        strokeWeight(1);
        stroke(0);
        line(this.start.x, this.start.y, this.end.x, this.end.y);
    }*/
    display() {
        stroke(0);
        noFill();
        beginShape();
        this.points.forEach(point => {
            vertex(point.x, point.y);
        });
        endShape();
    }
}

class FlowField {
    constructor(){
        this.resolution = 10;
        this.cols = windowWidth/this.resolution;
        this.rows = windowHeight/this.resolution;
        this.field = this.make2Darray(this.cols);
        this.initPerlin();
    }
    make2Darray(n) {
        let array = [];
        for (let i = 0; i < n; i++) {
          array[i] = [];
        }
        return array;
    }
    initToRight() {
        for(let i = 0; i < this.cols; i++) {
            for(let j = 0; j < this.rows; j++) {
                this.field[i][j] = createVector(1, 0);
            }
        }
    }
    initRandom() {
        for(let i = 0; i < this.cols; i++) {
            for(let j = 0; j < this.rows; j++) {
                this.field[i][j] = p5.Vector.random2D();
            }
        }
    }
    initPerlin() {
        let xoff = 0;
        for(let i = 0; i < this.cols; i++) {
            let yoff = 0;
            for(let j = 0; j < this.rows; j++) {
                let theta = map(noise(xoff, yoff), 0, 1, 0, TWO_PI);
                this.field[i][j] = createVector(cos(theta), sin(theta));
                yoff += 0.1;
            }
            xoff += 0.1;
        }
    }
    // TODO
    initFlowCenter() {

    }
    lookup(lookup) {
        let column = parseInt(constrain(lookup.x/this.resolution, 0, this.cols-1));
        let row = parseInt(constrain(lookup.y/this.resolution, 0, this.rows-1));
        return this.field[column][row].copy();
    }
}
function getNormalPoint(p, a, b) {
    let ap = p5.Vector.sub(p, a);
    let ab = p5.Vector.sub(b, a);
    ab.normalize();
    ab.mult(ap.dot(ab));
    let normalPoint = p5.Vector.add(a, ab);
    return normalPoint;
}

class Vehicle {
    constructor(x, y) {
        this.location = createVector(x,y);;
        this.velocity = createVector(0,0);;
        this.acceleration = createVector(0,0);
        this.maxspeed = 4;
        this.maxforce = 0.1;
        this.r = 3.0;

    }
    seek(target) {
        let desired = p5.Vector.sub(target, this.location);
        desired.normalize();
        desired.mult(this.maxspeed);

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }
    arrive(target) {
        let desired = p5.Vector.sub(target, this.location);
        let d = desired.mag();
        desired.normalize();
        if (d < 100) {
            let m = map(d, 0, 100, 0, this.maxspeed);
            desired.mult(m);
        } else {
            desired.mult(this.maxspeed);
        }
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }
    
    applyForce(force) {
        let f = force.copy();
        //f.div(this.mass);
        this.acceleration.add(f);
    }
    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.location.add(this.velocity);
        this.acceleration.mult(0);
    }
    follow(flow) {
        let desired = flow.lookup(this.location);
        desired.mult(this.maxspeed);
        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
    }

    followPath(path) {
        let predict = this.velocity.copy();
        predict.normalize();
        predict.mult(25);
        let predictLoc = p5.Vector.add(this.location, predict);

        let worldRecord = 1000000;
        let target;
        let normalPoint;
        for(let i = 0; i < path.points.length-1; i++) {
            let a = path.points[i];
            let b = path.points[i+1];
            normalPoint = getNormalPoint(predictLoc, a, b);
            if(normalPoint.x < a.x || normalPoint.x > b.x) {
                normalPoint = b.copy();
            }
            let distance = p5.Vector.dist(predictLoc, normalPoint);
            if (distance < worldRecord) {
                worldRecord = distance;
                target = normalPoint.copy();
            }
        }

        let distance = p5.Vector.dist(normalPoint, predictLoc);
        if (distance > path.radius) {
            this.seek(target);
        }
    }
    display() {
        let theta = this.velocity.heading() + PI/2;
        fill(175);
        stroke(0);
        push();
        translate(this.location.x, this.location.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r*2);
        vertex(-this.r, this.r*2);
        vertex(this.r, this.r*2);
        endShape(CLOSE);
        pop();
    }
}
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    vehicle = new Vehicle(centerX, centerY);
    flowField = new FlowField();
    path = new Path();
            //this.start = createVector(20, (windowHeight-40)/2);
        //this.end = createVector(windowWidth-60, 2*(windowHeight-40)/3);
    path.addPoint(20, (windowHeight-40)/2);
    path.addPoint(120, ((windowHeight-40)/2)-100);
    path.addPoint(400, ((windowHeight-40)/2)+100);
}

function draw() {
    clear();
    path.display();
    vehicle.followPath(path);
    vehicle.update();
    vehicle.display();

}

function canvasPressed() {
    let target = createVector(mouseX, mouseY);
    vehicle.seek(target);
}
function mouseReleased(){
}