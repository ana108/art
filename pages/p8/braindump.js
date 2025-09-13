

let centerX
let centerY

let colours = ['magenta', 'silver', 'orange', 'turquoise', 'green', 'cerise', 'blue', 'indigo', 'purple']
let colIdx = 0
function incrementColour() {
    if (colIdx === 6) {
        colIdx = 0
    } else {
        colIdx++
    }
    console.log('Col IDX ' + colIdx)
    return colIdx
}
function preload() {
}
function Node(dot, parent, child) {
    this.dot = dot
    this.parent = parent
    this.child = child
}
function Tree(root, colour) {
    this.root = root
    this.colour = colour
    this.last = this.root
    this.concluded = false
}
const TOP_RIGHT = 0
const TOP_LEFT = 1
const BOTTOM_LEFT = 2
const BOTTOM_RIGHT = 3

let directionDegreeMappings = {}
directionDegreeMappings[TOP_RIGHT] = [270, 360]
directionDegreeMappings[TOP_LEFT] = [180, 270]
directionDegreeMappings[BOTTOM_RIGHT] = [0, 90]
directionDegreeMappings[BOTTOM_LEFT] = [90, 170]

Tree.prototype.getDirection = function (node) {
    if (this.last.dot.x < node.dot.x) { // right
        if (this.last.dot.y < node.dot.y) { // down
            return BOTTOM_RIGHT
        } else {
            return TOP_RIGHT
        }
    } else {
        if (this.last.dot.y < node.dot.y) { // down
            return BOTTOM_LEFT
        } else {
            return TOP_LEFT
        }
    }
}

Tree.prototype.verify = function (dot, otherTree) {
    let currentLine = new Line(this.last.dot, dot)
    let otherTreeLines = []
    let currentNode = otherTree.root
    while (currentNode.child) {
        let line = new Line(currentNode.dot, currentNode.child.dot)
        otherTreeLines.push(line)
        currentNode = currentNode.child
    }
    let intersects = false
    otherTreeLines.forEach(otherTreeLine => {
        if (linesIntersect(currentLine, otherTreeLine)) {
            intersects = true
        }
    })
    return !intersects
}
Tree.prototype.add = function (dot) {
    let newNode = new Node(dot, this.last)
    if (!this.root.child) {
        this.root.child = newNode
        this.last = this.root.child
    } else {
        let node = this.root.child
        while (node.child) {
            node = node.child
        }
        node.child = newNode
        this.last = newNode
    }
}

let trees = []
let treePairings = {}
let instructionsDisplayed = false

function handleStartMessage() {
    if (instructionsDisplayed) {
        document.getElementById('startMessage').innerHTML = ""
    } else {
        document.getElementById('startMessage').innerHTML = "Click to add a worm"
        instructionsDisplayed = true
    }
}

function setup() {
    handleStartMessage()
    background('grey')
    frameRate(2)
    centerX = windowWidth / 2
    centerY = windowHeight / 2
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40)
    cnv.mousePressed(canvasPressed)
    let initialTree = new Tree(new Node(new Dot(centerX, centerY)), colours[incrementColour()])
    let secondTree = new Tree(new Node(new Dot(centerX - 550, centerY + 375)), colours[incrementColour()])
    trees.push(initialTree)
    trees.push(secondTree)
    treePairings[trees.length - 2] = trees.length - 1
    treePairings[trees.length - 1] = trees.length - 2
}

function draw() {
    strokeWeight(3)
    if (trees.length > 1) {
        trees.filter(tree => !tree.concluded).forEach((tree, ind) => {
            let otherTree = trees[treePairings[ind]]
            let degreeRange = directionDegreeMappings[tree.getDirection(otherTree.last)]
            let randomDegreeInRange = getRandomInt(degreeRange[0], degreeRange[1])
            let newDot = endPoint(randomDegreeInRange, 20, tree.last.dot.x, tree.last.dot.y)
            if (!tree.verify(newDot, otherTree)) {
                let newTreeColour = lerpColor(color(tree.colour), color(otherTree.colour), 0.5)
                tree.colour = newTreeColour
                otherTree.colour = newTreeColour
                tree.concluded = true
                otherTree.concluded = true
            }
            tree.add(newDot)
        })
    }

    trees.forEach(tree => {
        stroke(tree.colour)
        let node = tree.root
        while (node.child) {
            node = node.child
            line(node.parent.dot.x, node.parent.dot.y, node.dot.x, node.dot.y)
        }
    })
    // 270 - 90 to go right
    // 0 - 180 to go down
    // 90 - 270 to go left
    // 180 - 360 to go up
}

function canvasPressed() {
    handleStartMessage()
    let newTree = new Tree(new Node(new Dot(mouseX, mouseY)), colours[incrementColour()])
    trees.push(newTree)
    if (trees.length === 2) {
        // sets it so that the trees aim for each other
        treePairings[trees.length - 2] = trees.length - 1
        treePairings[trees.length - 1] = trees.length - 2
    } else {
        let closestIndex = findClosestTree()
        treePairings[trees.length - 1] = closestIndex
        treePairings[closestIndex] = trees.length - 1
    }
}

// TODO
function findClosestTree() {
    for (var i = 0; i < trees.length - 1; i++) {
        if (!treePairings[i]) {
            return i
        }
    }
    return trees.length - 2
}