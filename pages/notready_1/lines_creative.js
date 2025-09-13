

let centerX
let centerY


function preload() {
}

function setup() {
    centerX = windowWidth / 2
    centerY = windowHeight / 2
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40)
    cnv.mousePressed(canvasPressed)
}
let lines = []
function drawLine() {
    // let length = 15
    // let startDotOne = new Dot(centerX - length - 5, centerY)
    // let endDotOne = new Dot(centerX - 5, centerY)
    // lines.push(new Line(startDotOne, endDotOne))
    // let startDotOneOpp = new Dot(centerX + 5, centerY)
    // let endDotOneOpp = new Dot(centerX + 5 + length, centerY)
    // lines.push(new Line(startDotOneOpp, endDotOneOpp))
    // let startDotTop = new Dot(centerX, centerY - 5 - length)
    // let endDotTop = new Dot(centerX, centerY - 5)
    // lines.push(new Line(startDotTop, endDotTop))
    // let bottomDotStart = new Dot(centerX, centerY + 5 + length)
    // let bottomDotEnd = new Dot(centerX, centerY + 5)
    // lines.push(new Line(bottomDotStart, bottomDotEnd))
}

function addLine() {
    let bottomDotStart = new Dot(centerX, centerY + 5 + length)
    let bottomDotEnd = new Dot(centerX, centerY + 5)
    lines.push(new Line(bottomDotStart, bottomDotEnd))
}

function draw() {
    strokeWeight(2)
    drawLine()
    console.log('Draw function called ', lines.length)
    lines.forEach(l => {
        line(l.startDot.x, l.startDot.y, l.endDot.x, l.endDot.y)
    })
}

function canvasPressed() {
    console.log('Canvas pressed')
}