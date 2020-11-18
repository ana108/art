// types
function Dot(x, y, colour) {
    this.x = x;
    this.y = y;
    this.colour = colour;
}

function Line(startDot, endDot, colour) {
    this.startDot = startDot;
    this.endDot = endDot;
    this.colour = colour;
}

function getRandomInt(min, max, exclusions) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomlyChosenInt = parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
    if (exclusions) {
        while(exclusions.includes(randomlyChosenInt)) {
            randomlyChosenInt = parseInt(Math.floor(Math.random() * (max - min + 1)) + min);
        }
    }
    return randomlyChosenInt;
}

function getRadian(deg) {
    let radian = (deg*Math.PI)/180;
    return radian;
}

function endPoint(degree, radius, cx, cy) {
    let radian = getRadian(degree);
    let x = cx + (radius*Math.cos(radian));
    let y = cy + (radius*Math.sin(radian));
    return new Dot(x, y);
}

function intersects(line1, line2) {
    let a1 = line1.endDot.y-line1.startDot.y;
    let b1 = line1.startDot.x - line1.endDot.x;
    let c1 = (a1*line1.startDot.x)+(b1*line1.startDot.y);
 
    let a2 = line2.endDot.y-line2.startDot.y;
    let b2 = line2.startDot.x - line2.endDot.x;
    let c2 = (a2*line2.startDot.x)+(b2*line2.startDot.y);
 
    let determinant = a1*b2 - a2*b1
    if(determinant == 0){
     //Lines are parallel
     return false;
    } else {
     let x = (b2*c1 - b1*c2)/determinant;
     let y = (a1*c2 - a2*c1)/determinant;
     return new Dot(x, y);
    }
 }

 function isDotOnLine(line, dot) {
    let firstX = line.startDot.x;
    let secondX = line.endDot.x;
    // is done between these 2 xs? excluding end points

    let firstY = line.startDot.y;
    let secondY = line.endDot.y;

    let isOnX = false;
    let isOnY = false;
    if (firstX < dot.x && dot.x < secondX) {
        // yes, its between those xs
        isOnX = true;
    } else if (secondX < dot.x && dot.x < firstX) {
        // yes, its between xs
        isOnX = true;
    }

    if (firstY < dot.y && dot.y < secondY) {
        isOnY = true;
    } else if (secondY < dot.y && dot.y < firstY) {
        isOnY = true;
    }

    if (isOnX && isOnY) {
        return true;
    } else {
        return false;
    }
}

function isIntersectionPointOnBothLines(line1, line2, intersectionDot) {
    let isOnBothLines = 0;
    if (isDotOnLine(line1, intersectionDot)) {
        isOnBothLines++;
    }    
    if (isDotOnLine(line2, intersectionDot)) {
        isOnBothLines++;
    }

    if (isOnBothLines === 2) {
        return true;
    } else {
        return false;
    }
}