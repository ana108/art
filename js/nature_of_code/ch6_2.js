let centerX;
let centerY;
let physics;
let vehicle;
let angle = 0;
class Vehicle {
    constructor(x, y) {
        this.location = createVector(x,y);;
        this.velocity = createVector(0,0);;
        this.acceleration = createVector(0,0);
        this.maxspeed = 4;
        this.maxforce = 0.1;
        this.r = 3.0;

    }
    seek(target) {
        let desired = p5.Vector.sub(target, this.location);
        desired.normalize();
        desired.mult(this.maxspeed);

        let steer = p5.Vector.sub(desired, this.velocity);
        steer.limit(this.maxforce);
        this.applyForce(steer);
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
    findDirection() {
        let tempLoc = this.velocity.copy();
        tempLoc.normalize();
        tempLoc.mult(this.r);
        this.desiredLoc = p5.Vector.add(this.location, tempLoc);
        let randomAngle = random(360);
        angle = 0;
        while(angle < 360) {
            angle++;
            let newPointX = this.desiredLoc.x + this.r*20 * cos(radians(angle));
            let newPointY = this.desiredLoc.y +  this.r*20 * sin(radians(angle));
            stroke('blue');
            strokeWeight(1);
            point(newPointX, newPointY);
        }
        
         
        let newPoint = createVector(this.desiredLoc.x + this.r*20 * cos(radians(randomAngle)), this.desiredLoc.y +  this.r*20 * sin(radians(randomAngle)));
        stroke('red');
        strokeWeight(4);
        point(newPoint.x, newPoint.y);
        this.seek(newPoint);
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
    stayWithinWalls() {
        if (this.location.x < 25) {
            let desired = createVector(this.maxspeed, this.velocity.y);
            let steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
    }
}
function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    //physics = new VerletPhysics2D();
    vehicle = new Vehicle(centerX, centerY);
      
}

function draw() {
    clear();
    //physics.update();
    background(255);
    //vehicle.findDirection(); 
    vehicle.stayWithinWalls();
    vehicle.update();
    vehicle.display();

}

function canvasPressed() {
    let target = createVector(mouseX, mouseY);
    vehicle.seek(target);
}
function mouseReleased(){
}