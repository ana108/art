var dots = []

var isRunning = false
var flipSwitched = true
let centerX
let centerY

function Arrow(originLine, leftLine, degree, colour) {
    this.originLine = originLine // origin
    this.leftLine = leftLine
    this.degree = degree
    this.colour = colour
}

let streak = []
let sWeight = 10
const colourPairs = [{
    start: 'yellow',
    end: 'blue'
}, {
    start: 'blue',
    end: 'yellow'
}, {
    start: 'yellow',
    end: 'red'
}, {
    start: 'white',
    end: 'black'
}, {
    start: 'red',
    end: 'blue'
}, {
    start: 'pink',
    end: 'purple'
},
{
    start: 'red',
    end: 'white'
}, {
    start: 'white',
    end: 'red'
}, {
    start: 'grey',
    end: 'red'
}, {
    start: 'red',
    end: 'black'
}, {
    start: 'pink',
    end: 'green'
}
]
function drawArrow(arrow) {
    stroke(arrow.colour)
    line(arrow.originLine.startDot.x, arrow.originLine.startDot.y, arrow.originLine.endDot.x, arrow.originLine.endDot.y)
    line(arrow.leftLine.startDot.x, arrow.leftLine.startDot.y, arrow.leftLine.endDot.x, arrow.leftLine.endDot.y)
}

function createArrow(length, degree, cx, cy, colour) { // length, degree, cx, cy
    let originDot = new Dot(cx, cy)
    let endDot = endPoint(degree, length, cx, cy)
    let secondEndDot = endPoint(degree + 90, length, cx, cy)
    let originLine = new Line(originDot, endDot)
    let derivedLine = new Line(originDot, secondEndDot)
    return new Arrow(originLine, derivedLine, degree, colour)
}
let instructionsDisplayed = false
function handleStartMessage() {
    if (instructionsDisplayed) {
        document.getElementById('startMessage').innerHTML = ""
    } else {
        document.getElementById('startMessage').innerHTML = "Click or press up or down key"
        instructionsDisplayed = true
    }
}

function setup() {
    handleStartMessage()
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40)
    centerX = windowWidth / 2
    centerY = windowHeight / 2
    cnv.mousePressed(canvasPressed)
    colorMode(HSB, 300)
    streak = arrowStreak('yellow', 'blue')
}
function arrowStreak(startingColour, endingColour) {
    let streak = []
    let length = 20
    let degree = 0
    let startX

    let bigY = 0
    let bigX = 2 * length
    let conclusionX = windowWidth
    let conclusionY = windowHeight
    let maxNumOfArrows
    let incrementColourBy
    let startColour = color(startingColour)
    let endColour = color(endingColour)
    while (bigY < conclusionY) {
        startY = bigY
        startX = 0
        // pick start and end colour
        // count number of arrows
        maxNumOfArrows = conclusionX / (length / 2)
        incrementColourBy = 1 / maxNumOfArrows
        let arrowColour = 0.00

        while (startX < conclusionX && startY < conclusionY) {
            let colourOfArrow = lerpColor(startColour, endColour, arrowColour)
            arrowColour += incrementColourBy
            let arrow = createArrow(length, degree, startX, startY, colourOfArrow)
            streak.push(arrow)
            startX += length / 2 //10;
            startY += length / 2
        }
        bigY += length + length / 2 //30;
        if (degree === 180) {
            degree = 0
        } else {
            degree = 180
        }
    }
    // sideways
    while (bigX < conclusionX) {
        startY = 0
        startX = bigX
        let arrowColour = 0.00
        while (startX < conclusionX && startY < conclusionY) {
            let colourOfArrow = lerpColor(startColour, endColour, arrowColour)
            arrowColour += incrementColourBy
            let arrow = createArrow(length, degree, startX, startY, colourOfArrow)
            streak.push(arrow)
            startX += length / 2
            startY += length / 2
        }
        bigX += length + length / 2
        if (degree === 180) {
            degree = 0
        } else {
            degree = 180
        }
    }
    return streak
}

function draw() {
    strokeWeight(sWeight)
    streak.forEach(arrow => {

        drawArrow(arrow)
    })
}

function canvasPressed() {
    handleStartMessage()
    let randomNum = getRandomInt(0, colourPairs.length - 1)
    streak = arrowStreak(colourPairs[randomNum].start, colourPairs[randomNum].end)
}

function keyPressed() {
    handleStartMessage()
    if (keyCode === UP_ARROW) {
        sWeight++
    } else if (keyCode === DOWN_ARROW) {
        if (sWeight > 0) {
            sWeight--
            clear()
        }
    }

}
