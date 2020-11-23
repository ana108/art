

let centerX;
let centerY;
let walker;
let mX = 9;
let mY = 0;
const randomCounts = [20];
function Walker() {
    this.x;
    this.y;
    this.tx;
    this.ty;
}

Walker.prototype.setup = function() {
    this.x = centerX;
    this.y = centerY;
    this.tx = 0;
    this.ty = 10000;

}
Walker.prototype.display = function() {
    stroke('red');
    point(this.x, this.y); // ?
}

Walker.prototype.step = function() {
    //this.x = map(noise(this.tx), 0, 1, 0, windowWidth);
    //this.y = map(noise(this.ty), 0, 1, 0, windowHeight);
    let num = map(noise(this.tx), 0, 1, 0, 20);
    console.log('X ' + this.x  + ' Y ' +this.y);
    this.tx += 0.01;
    this.ty += 0.01;
    //let num = monteCarlo();
    this.x += 2;
    
    let rand = random(1);
    if (rand < 0.5) {
        this.y += num;
    } else {
        this.y -= num;
    }
    /*if (rand < 0.25) {
        this.x += num;
    } else if (rand < 0.5) {
        this.x -= num;
    } else if (rand < 0.75) {
        this.y += num;
    } else {
        this.y -= num;
    } */
}

function change() {
    for(let x = 0; x < imageWidth; x++) {
        for(let y = 0; y < imageHeight; y++) {
            let bright = map(noise(x, y), 0, 1, 0, 255);
            img.set(x, y, color(bright));
        }
    }
}
/*function() {
    let r = random(1);
    let xstep;
    let ystep;
    if ( r < 0.1) {
        xstep = random(-100, 100);
        ystep = random(-100, 100);
    } else {
        xstep = random(-1, 1);
        ystep = random(-1, 1);
    }
    this.x += xstep;
    this.y += ystep;
}*/

function monteCarlo() {
    let i = 0;
    while(true) {
        i++;
        let r1 = random(0, 10);
        let probability = Math.pow(r1, 2);
        let r2 = random(0, 100);
        if (r2 < probability) {
            return r1;
        }
    }
}

/*Walker.prototype.step = function() {
    let rand = random(1);

    let num = randomGaussian(1, 2);

    if (rand < 0.5) {
        this.x = this.x + mX;
        this.y = this.y + mY;
    } else {
        rand = random(1);
        if (rand < 0.25) {
            this.x += num;
        } else if (rand < 0.5) {
            this.x -= num;
        } else if (rand < 0.75) {
            this.y += num;
        } else {
            this.y -= num;
        }
    }

}*/

/* function mouseMoved() {
    mX = 0;
    mY = 0;
    if(mouseX < centerX) {
        mX--;
    } else if(mouseX > centerX) {
        mX++;
    }
    if(mouseY < centerY) {
        mY--;
    } else if (mouseY > centerY) {
        mY++;
    }
  }*/

function preload() {
}
let img; 
/*let imageWidth = windowWidth;
let imageHeight = windowHeight;*/
let imageWidth;
let imageHeight;
function setup() {
    background('black');
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    createCanvas(windowWidth, windowHeight);
    imageWidth = windowWidth;
    imageHeight = windowHeight;
    //cnv.mousePressed(canvasPressed);
    //walker = new Walker();
    // background(255);
    //walker.setup();
    img = createImage(imageWidth, imageHeight);
    img.loadPixels();
    // loadPixels();
    change();
    img.updatePixels();
    image(img, 0, 0); // imageWidth, imageHeight
    /*for(var i = 0; i < 20; i++) {
        randomCounts[i] = 0;
    }*/
}
let t = 0;
function draw() {
    /*
    
    let index = parseInt(random(20));
    randomCounts[index] = randomCounts[index]+1;
    stroke(0);
    fill(175);
    let w = windowWidth/randomCounts.length;
    for(let x = 0; x < randomCounts.length; x++) {
        rect(x*w, windowHeight-randomCounts[x], w-1, randomCounts[x]);
    } */
    //strokeWeight(5);
    

    //walker.step();
    //walker.display();
    /*let num = randomGaussian();
    let sd = 60;
    let mean = 320;

    let x = sd*num + mean;
    fill(255, 10);
    ellipse(parseInt(x), 180, 16, 16); */
    //let x = random(0, windowWidth);
    /*let x = noise(t);
    x = map(x, 0,1, 0, windowWidth);
    ellipse(100+x, 180, 16, 16);
    t += 0.1; */
    img.loadPixels();
    change();
    img.updatePixels();
    image(img, 0, 0);
}

function canvasPressed() {
    change();
    img.updatePixels(); 
}