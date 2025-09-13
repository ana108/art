var dots = []
var col = {
    r: 255,
    g: 255,
    b: 255
}
var circ = {
    x: 100,
    y: 50,
    r: 1
}

var isRunning = false
var flipSwitched = true
function Sqr(x, y, size, colour) {
    this.x = x
    this.y = y
    this.size = size
    this.colour = colour
}
let squares = []
let maxHits = 0
//centerX = (windowWidth-40)/2;
//centerY = (windowHeight - 40)/2;
let xValues = new Set()
let yValues = new Set()

let colours = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6',
    '#bfef45', '#fabed4', '#469990', '#dcbeff', '#9A6324',
    '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#a9a9a9', '#ffffff', '#000000']
let differentSizes = [50]

function handleStartMessage() {
    if (flipSwitched) {
        document.getElementById('startMessage').innerHTML = ""
    } else {
        document.getElementById('startMessage').innerHTML = "Click to stop or start"
    }
}

function setup() {
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40)
    cnv.mousePressed(canvasPressed)
    colorMode(HSB, 300)
    for (var i = differentSizes[0]; i <= 400; i++) {
        differentSizes.push(i)
    }
}

function addSquare() {
    let randomIdx = getRandomInt(0, differentSizes.length - 1)
    let leftCornerX = getRandomInt(0, windowWidth - 2 * differentSizes[randomIdx])
    let leftCornerY = getRandomInt(0, windowHeight - 2 * differentSizes[randomIdx])
    let a = 0
    while ((xValues.has(leftCornerX) || xValues.has(leftCornerX + differentSizes[randomIdx])) && a < 1000) {
        leftCornerX = getRandomInt(0, windowWidth - 2 * differentSizes[randomIdx])
        randomIdx = getRandomInt(0, differentSizes.length - 1)
        a++
    }
    a = 0
    while ((yValues.has(leftCornerY) || yValues.has(leftCornerY + differentSizes[randomIdx])) && a < 1000) {
        leftCornerY = getRandomInt(0, windowHeight - 2 * differentSizes[randomIdx])
        randomIdx = getRandomInt(0, differentSizes.length - 1)
        a++
    }
    if (maxHits === 200) {
        isRunning = !isRunning
    }
    if (a === 1000) {
        maxHits++
        console.log('Hit max')
        return
    }
    xValues.add(leftCornerX)
    xValues.add(leftCornerX + differentSizes[randomIdx])

    yValues.add(leftCornerY)
    yValues.add(leftCornerY + differentSizes[randomIdx])

    for (var i = 1; i <= 3; i++) {
        xValues.add(leftCornerX - i)
        xValues.add(leftCornerX + i)

        xValues.add(leftCornerX + differentSizes[randomIdx] - i)
        xValues.add(leftCornerX + differentSizes[randomIdx] + i)

        yValues.add(leftCornerY - i)
        yValues.add(leftCornerY + i)

        yValues.add(leftCornerY + differentSizes[randomIdx] - i)
        yValues.add(leftCornerY + differentSizes[randomIdx] + i)
    }

    const randomColourIdx = getRandomInt(0, colours.length - 1)
    const s = new Sqr(leftCornerX, leftCornerY, differentSizes[randomIdx], colours[randomColourIdx])
    squares.push(s)
    //addSquare(leftCornerX, leftCornerY, differentSizes[randomIdx]);
    /*let rightCornerX = leftCornerX;
    let rightCornerY = leftCornerY + differentSizes[randomIdx];

    let bottomLeftCornerX = leftCornerX+differentSizes[randomIdx];
    let bottomLeftCornerY = leftCornerY;

    let bottomRightCornerX = leftCornerX + differentSizes[randomIdx];
    let bottomRightCornerY = leftCornerX + differentSizes[randomIdx];*/
    // three different sizes of squares
    // to do random location
    // random size in RANGE
    // random colour -- do this last
}
function flipSwitch() {
    flipSwitched = true
    addSquare()
}

function draw() {

    strokeWeight(3)
    squares.forEach(sqr => {
        noFill()
        stroke(sqr.colour)
        square(sqr.x, sqr.y, sqr.size)
    })
    if (isRunning && flipSwitched) {
        flipSwitched = false
        setTimeout(flipSwitch, 500)
    }
}

function canvasPressed() {
    isRunning = !isRunning
}