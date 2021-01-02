let centerX;
let centerY;
let ptron;
let training;
let count;

class Perceptron {
    constructor(n){
        this.weights = [];
        this.c = 0.01;
        for(let i = 0; i < n; i++) {
            this.weights.push(random(-1, 1));
        }
    }
    feedForward(inputs) {
        let sum = 0;
        for(let i = 0; i < this.weights.length; i++) {
            sum += inputs[i]*this.weights[i];
        }
        return this.activate(sum);
    }
    activate(sum) {
        if (sum > 0) {
            return 1;
        } else {
            return -1;
        }
    }
    train(inputs, desired) {
        let guess = this.feedForward(inputs);
        let error = desired - guess;
        for(let i = 0; i < this.weights.length; i++) {
            this.weights[i] +=  this.c * error *inputs[i];
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