let mySound;
var dots = [];
var col = {
    r: 255,
    g: 255,
    b: 255
};
var circ = {
    x: 100,
    y: 50,
    r: 1
};

var isRunning = false;
var flipSwitched = true;

function preload() {
    getAudioContext().suspend();
    mySound = loadSound('../assets/GhostsAndStuff.m4a', () => {
        console.log('Loaded Ghosts and Stuff');
    });
    mySound.playMode('untilDone');
}

function setup() {
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    colorMode(HSB, 300);
    mySound.play();
}

function flipSwitch() {
    flipSwitched = true;
}

function draw() {
    if (isRunning && flipSwitched) {
        paintSplash();
        flipSwitched = false;
        setTimeout(flipSwitch, 750);
    }
}

function canvasPressed() {
    getAudioContext().resume();
    isRunning = !isRunning;
    if (isRunning) {
        getAudioContext().resume();
    } else {
        getAudioContext().suspend();
    }
}

function splash() {
    circ.x = random(0, width);
    circ.y = random(0, height);


    col.r = random(250);
    col.g = random(250);
    col.b = random(250);

    fill(col.r, col.g, col.b);
    noStroke();

    ellipse(circ.x, circ.y, 100, 50)
}

function gaussianSplash() {
    let xloc = randomGaussian();
    let yloc = randomGaussian();
    let hue = randomGaussian();

    const sd = 90;
    const mean = width / 2;
    const sdC = 25;
    let meanC = map(mouseX, 0, 400, 0, 100);

    xloc = (xloc * sd) + mean;
    yloc = (yloc * sd) + mean;
    hue = (hue * sdC) + meanC;

    console.log(meanC);
    noStroke();
    fill(hue, 100, 100, 50);
    ellipse(xloc, yloc, 16, 16)
}

function paintSplash() {
    let thisX = random(0, width);
    let thisY = random(0, height);
    dots.push(new Dot(thisX, thisY, 40));
    for (var i = 0; i < 30; i++) {
        let xBool = getRandomInt(0, 1);
        let yBool = getRandomInt(0, 1);
        let xEquation;
        let yEquation;
        if (xBool === 0) {
            xEquation = thisX + 2 + i;
        } else {
            xEquation = thisX - (2 + i);
        }

        if (yBool === 0) {
            yEquation = thisY + 2 + i;
        } else {
            yEquation = thisY - (2 + i);
        }
        dots.push(new Dot(thisX + 2 + i, thisY + 2 + i, getRandomInt(7, 20)));
    }
    dots.forEach(function (dot) {
        dot.display()
    });
}

function Dot(x, y, size) {
    this.size = size;
    this.x = x + 5 * randomGaussian(10, 10);
    this.y = y + 5 * randomGaussian(10, 10);
    this.color = color(floor(randomGaussian(200, 50)), 300, 300);
}

Dot.prototype.display = function () {
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}