let centerX;
let centerY;
let ptron;
let training;
let count;
class Vehicle {
    constructor(n, x, y) {
        this.location = createVector(x,y);;
        this.velocity = createVector(0,0);;
        this.acceleration = createVector(0,0);
        this.maxspeed = 4;
        this.maxforce = 0.1;
        this.r = 3.0;
        this.brain = new Perceptron(n, 0.001);

    }
    seekSingle(target) {
        let desired = p5.Vector.sub(target, this.location);
        desired.normalize();
        desired.mult(this.maxspeed);

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        //this.applyForce(steer);
        return steer;
    }
    seek(targets) {
        let forces = [];
        targets.forEach(target => {
            let force = this.seekSingle(target);
            forces.push(force);
        });
        let output = this.brain.process(forces);
        this.applyForce(output);
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
class Perceptron {
    constructor(n, c){
        this.weights = [];
        this.c = c;
        for(let i = 0; i < n; i++) {
            this.weights.push(random(-1, 1));
        }
    }
    feedForward(forces) {
        let sum = createVector();
        for(let i = 0; i < this.weights.length; i++) {
            //sum += inputs[i]*this.weights[i];
            forces[i].mult(this.weights[i]);
            sum.add(forces[i]);
        }
        return sum;
    }
    activate(sum) {
        if (sum > 0) {
            return 1;
        } else {
            return -1;
        }
    }
    train(forces, error) {
        for(let i = 0; i < this.weights.length; i++) {
            this.weights[i] +=  this.c * error.x *forces[i].x;
            this.weights[i] +=  this.c * error.y *forces[i].y;
        }
    }
}
class Trainer {
    constructor(x, y, a) {
        this.inputs = [];
        this.inputs[0] = x;
        this.inputs[1] = y;
        this.inputs[2] = 1;
        this.answer = a;
    }
}
function f(x) {
    return (2*x)+1;
}
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    ptron = new Perceptron(3);
    count = 0;
    training = [];
    for(let i = 0; i < 2000; i++) {
        let x = random(-windowWidth/2, windowWidth/2);
        let y = random(-windowHeight/2, windowHeight/2);
        let answer = 1;
        if (y < f(x)) answer = -1;
        training[i] = new Trainer(x, y, answer);
    }
}

function draw() {
    translate(windowWidth/2, windowHeight/2);
    ptron.train(training[count].inputs, training[count].answer);
    count = (count + 1)%training.length;
    for(let i = 0; i < count; i++) {
        stroke(0);
        let guess = ptron.feedForward(training[i].inputs);
        if (guess > 0) noFill();
        else if (guess == 1) fill('red');
        else fill(0);
        ellipse(training[i].inputs[0], training[i].inputs[1], 8, 8);
    }
}

function canvasPressed() {
   
}