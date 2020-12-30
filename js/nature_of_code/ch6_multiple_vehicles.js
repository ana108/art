let centerX;
let centerY;
let physics;
let flock;
let flowField;
let path;
let id = 0;
class Path {
    constructor() {
        this.radius = 20;
        this.points = [];
    }
    addPoint(x, y) {
        let point = createVector(x, y);
        this.points.push(point);
    }
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
class Flock {
    constructor(){
        this.resolution = 50;
        this.cols = parseInt(windowWidth/this.resolution)+1;
        this.rows = parseInt(windowHeight/this.resolution)+1;
        this.grid = this.initGrid();
        console.log('Num Cols ' + this.cols);
        console.log('Num rows ' + this.rows);
        this.boids = [];
    }
    initGrid() {
        let array = [];
        for (let i = 0; i < this.cols; i++) {
          array[i] = [];
          for (let j = 0; j < this.rows; j++) {
              array[i].push([]);
          }
        }
        return array;
        /*
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
        */
    }
    addBoid() {
        this.boids.push(new Boid(random(windowWidth), random(windowHeight)));
    }
    registerBoid(boid) {
        let col = parseInt(boid.location.x/this.resolution);
        let row = parseInt(boid.location.y/this.resolution);
        if (!this.grid[col][row]) {
            this.grid[col][row] = [];
        }
        this.grid[col][row].push(boid);
    }
    deregisterBoid(location) {
        let col = parseInt(location.x/this.resolution);
        let row = parseInt(location.y/this.resolution);
        if(this.grid[col][row].length > 0) {
            this.grid[col][row].pop();
        }
        /*for(let i = this.grid[col][row].length-1; i >= 0; i--) {
            if(this.grid[col][row].id === boid.id) {

            }
        } */
    }
    run() {
        this.boids.forEach(boid => {
            // get boid location before
            // deregister is
            let location = boid.location.copy();
            this.registerBoid(boid);
            let col = parseInt(location.x/this.resolution);
            let row = parseInt(location.y/this.resolution);
            boid.run(this.grid[col][row]); // this.boids
            //this.deregisterBoid(location);
            // register boid at new location
        });
    }
    applyForce(force) {
        this.boids.forEach(boid => {
            boid.applyForce(force);
        });
    }
    display() {
        console.log('Not sure what this is for');
    }
}
class Boid {
    constructor(x, y) {
        this.location = createVector(x,y);
        this.velocity = createVector(0,0);
        this.acceleration = createVector(0,0);
        this.maxspeed = 4;
        this.maxforce = 0.1;
        this.r = 3.0;
        this.id = id++;

    }
    seek(target) {
        let desired = p5.Vector.sub(target, this.location);
        desired.normalize();
        desired.mult(this.maxspeed);

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        //this.applyForce(steer);
        return steer;
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
        predict.mult(50);
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

    separate(vehicles) {
        let desiredseparation = this.r*2;
        let sum = createVector();
        let count = 0;
        vehicles.forEach(vehicle => {
            let d = p5.Vector.dist(this.location, vehicle.location);
            if (d > 0 && d < desiredseparation) {
                let diff = p5.Vector.sub(this.location, vehicle.location);
                diff.normalize();
                diff.div(d);
                sum.add(diff);
                count++;
            }
        });
        if (count > 0) {
            sum.div(count);
        }
        sum.setMag(this.maxspeed);
        let steer = p5.Vector.sub(sum, this.velocity);
        steer.limit(this.maxforce);
        //this.applyForce(steer);
        return steer;
    }
    applyBehaviours(vehicles) {
        let separate = this.separate(vehicles);
        let seek = this.seek(createVector(mouseX, mouseY));
        separate.mult(1.5);
        seek.mult(0.5);
        this.applyForce(separate);
        this.applyForce(seek);
    }
    align(boids) {
        let neighbordist = 50;
        let count = 0;
        let sum = createVector(0, 0);
        boids.forEach(boid => {
            let d = p5.Vector.dist(this.location, boid.location);
            if (d > 0 && d < neighbordist) {
                sum.add(boid.velocity);
                count++;
            }
        });
        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(this.maxspeed);
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            return steer;
        } else {
            return createVector(0, 0);
        }
    }
    cohesion(boids) {
        let neighbordist = 50;
        let sum = createVector(0, 0);
        let count = 0;
        boids.forEach(other => {
            let d = p5.Vector.dist(this.location, other.location);
            if (d > 0 && d < neighbordist) {
                sum.add(other.location);
                count++;
            }
        });
        if (count > 0) {
            sum.div(count);
            return this.seek(sum);
        } else {
            return createVector(0, 0);
        }
    }
    flock(boids) {
        let sep = this.separate(boids);
        let ali = this.align(boids);
        let coh = this.cohesion(boids);

        sep.mult(1.5);
        ali.mult(1.0);
        coh.mult(1.0);

        this.applyForce(sep);
        this.applyForce(ali);
        this.applyForce(coh);
    }
    run(boids) {
        this.flock(boids);
        this.update();
        this.display();
    }
}
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    flowField = new FlowField();
    path = new Path();
    path.addPoint(20, (windowHeight-40)/2);
    path.addPoint(120, ((windowHeight-40)/2)-100);
    path.addPoint(400, ((windowHeight-40)/2)+100);
    flock = new Flock();
    for(let i = 0; i < 1000; i++) { //failed at 10000
        flock.addBoid();
        //vehicles.push(new Boid(random(windowWidth), random(windowHeight)));
    }
    start = new Date();
}
let start;
let recorded = false;
let count = 0;
function draw() {
    
    clear();
    flock.run();
    count++;
    if (!recorded && count === 10) {
        let end = new Date();
        console.log('Difference: ' + parseInt(end-start));
        recorded = true;
    }    
}

function canvasPressed() {

}
function mouseReleased(){
}