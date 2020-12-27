

let centerX;
let centerY;


let world;
let boxes = [];
let boundary;
let curvedBoundary;
let pair;
function Boundary(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.position = scaleToWorld(new box2d.b2Vec2(this.x, this.y));
    bd.type = box2d.b2BodyType.b2_staticBody;
    let b = world.CreateBody(bd);

    let fd = new box2d.b2FixtureDef();
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w), scaleToWorld(this.h));
    b.CreateFixture(fd);
}
Boundary.prototype.display = function() {
    fill(0);
    stroke(0);
    line(this.x, this.y, this.x+this.w, this.y);
    //rectMode(CENTER);
    //rect(this.x, this.y, windowWidth/2, this.h);
}

function CurvedBoundary() {
    this.x = 0;
    this.y = windowWidth-40;
    let bd = new box2d.b2BodyDef();
    let b = world.CreateBody(bd);
    let fd = new box2d.b2FixtureDef();
    fd.shape = new box2d.b2ChainShape();
    this.vertices = [];
    this.vertices.push(scaleToWorld(new box2d.b2Vec2(0, windowHeight-80)));
    this.vertices.push(scaleToWorld(new box2d.b2Vec2(windowWidth/2, windowHeight-60)));
    this.vertices.push(scaleToWorld(new box2d.b2Vec2(windowWidth, windowHeight-40)));
    fd.shape.CreateChain(this.vertices, this.vertices.length);
    fd.density = 1.0; //1.0;
    fd.friction = 0.3;
    fd.restitution = 0.5;

    b.CreateFixture(fd, 1);
}

CurvedBoundary.prototype.display = function() {
    strokeWeight(1);
    stroke(0);
    noFill();
    beginShape();
    this.vertices.forEach(v => {
        vertex(scaleToPixels(v).x, scaleToPixels(v).y);
    });
    endShape();
}

function Box(x, y) {
    this.w = 16;
    this.h = 16;

    // Define a body
    let bd = new box2d.b2BodyDef();
    bd.type = box2d.b2BodyType.b2_dynamicBody;
    //bd.SetPosition(scaleToWorld(x, y));
    bd.position = scaleToWorld(new box2d.b2Vec2(x, y));
    // Define a fixture
    let fd = new box2d.b2FixtureDef();
    // Fixture holds shape
    fd.shape = new box2d.b2PolygonShape();
    fd.shape.SetAsBox(scaleToWorld(this.w / 2), scaleToWorld(this.h / 2));

    // Some physics
    fd.density = 1.0; //1.0;
    fd.friction = 0.3;
    fd.restitution = 0.5;

    // Create the body
    this.body = world.CreateBody(bd);
    this.body.SetLinearVelocity(new box2d.b2Vec2(0, 0));
    this.body.SetAngularVelocity(1.2);
    //this.body.SetPosition(scaleToWorld(x, y));
    // Attach the fixture
    this.body.CreateFixture(fd);
    console.log('Body Position ' + JSON.stringify(scaleToPixels(this.body.GetPosition())));
}
Box.prototype.display = function() {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    rect(0, 0, this.w, this.h);
    pop();
}
function Particle(x, y) {
      this.r = 8;
      // Define a body
      let bd = new box2d.b2BodyDef();
      bd.type = box2d.b2BodyType.b2_dynamicBody;
      bd.position = scaleToWorld(x, y);
  
      // Define a fixture
      let fd = new box2d.b2FixtureDef();
      // Fixture holds shape
      fd.shape = new box2d.b2CircleShape();
      fd.shape.m_radius = scaleToWorld(this.r);
  
      // Some physics
      fd.density = 1.0;
      fd.friction = 0.1;
      fd.restitution = 0.3;
  
      // Create the body
      this.body = world.CreateBody(bd);
      // Attach the fixture
      this.body.CreateFixture(fd);
  
      // Some additional stuff
      this.body.SetLinearVelocity(new box2d.b2Vec2(random(-5, 5), random(2, 5)));
      this.body.SetAngularVelocity(random(-5, 5));
}

Particle.prototype.killBody = function() {
    world.DestroyBody(this.body);
}

Particle.prototype.done = function() {
    // Let's find the screen position of the particle
    let pos = scaleToPixels(this.body.GetPosition());
    // Is it off the bottom of the screen?
    if (pos.y > height + this.r * 2) {
        this.killBody();
        return true;
    }
    return false;   
}

Particle.prototype.display = function() {
    // Get the body's position
    let pos = scaleToPixels(this.body.GetPosition());
    // Get its angle of rotation
    let a = this.body.GetAngleRadians();

    // Draw it!
    rectMode(CENTER);
    push();
    translate(pos.x, pos.y);
    rotate(a);
    fill(127);
    stroke(200);
    strokeWeight(2);
    ellipse(0, 0, this.r * 2, this.r * 2);
    // Let's add a line so we can see the rotation
    line(0, 0, this.r, 0);
    pop();
}

function Pair(x, y) {
    this.len = 32;
    this.p1 = new Particle(x, y);
    this.p2 = new Particle(x+random(-1, 1), y+random(-1,1));
    let djd = new box2d.b2DistanceJointDef();
    djd.bodyA = this.p1.body;
    djd.bodyB = this.p2.body;
    djd.length = scaleToWorld(this.len);
    djd.frequencyHz = 0;
    djd.dampingRatio = 0;

    let dj = world.CreateJoint(djd);
}
Pair.prototype.display = function() {
    let pos1 = scaleToPixels(this.p1.body.GetPosition());
    let pos2 = scaleToPixels(this.p2.body.GetPosition());
    stroke(0);
    line(pos1.x, pos1.y, pos2.x, pos2.y);
    this.p1.display();
    this.p2.display();
}

function preload() {
}

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth-40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
    
    //world = createWorld();
    //world.SetGravity(new box2d.b2Vec2(0, 1));
    world = createWorld(new box2d.b2Vec2(0, 0));
    pair = new Pair(centerX/2, centerY);
    boundary = new Boundary(10, windowHeight-40, windowWidth/2, 40);
    //curvedBoundary = new CurvedBoundary();

}

function draw() {
    clear();
    boundary.display();
    let timeStep = 1.0 / 30;
  // 2nd and 3rd arguments are velocity and position iterations
    world.Step(timeStep, 10, 10);
    pair.display();
    //curvedBoundary.display();
    boxes.forEach(box => {
        box.display();
    });
}

function canvasPressed() {
   let newBox = new Box(mouseX, mouseY);
   boxes.push(newBox);
}