

let centerX;
let centerY;

let world;
let wall;
let particles = [];
function CustomListener() {}
CustomListener.prototype.BeginContact = function(contact) {
    console.log('Begin Contact...');
    // Get both fixtures
    let f1 = contact.GetFixtureA();
    let f2 = contact.GetFixtureB();
    // Get both bodies
    let b1 = f1.GetBody();
    let b2 = f2.GetBody();

    // Get our objects that reference these bodies
    let o1 = b1.GetUserData();
    let o2 = b2.GetUserData();

    if (o1 instanceof Particle && o2 instanceof Particle) {
      o1.change();
      o2.change();
    }
}

CustomListener.prototype.EndContact = function(contact) {};

CustomListener.prototype.PreSolve = function(contact, manifold) {};

CustomListener.prototype.PostSolve = function(contact, manifold) {};

function Particle(x, y, r) {
    this.r = r;

    this.col = color(127);

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

    this.body.SetUserData(this);
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
     fill(this.col);
     stroke(200);
     strokeWeight(2);
     ellipse(0, 0, this.r * 2, this.r * 2);
     // Let's add a line so we can see the rotation
     line(0, 0, this.r, 0);
     pop();
}

Particle.prototype.change = function() {
    this.col = color(255, 0, 0);
}

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

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    world = createWorld(new box2d.b2Vec2(0, 0));
    world.SetContactListener(new CustomListener());
    wall = new Boundary(windowWidth / 2, windowHeight - 50, windowWidth-50, 10);
}

function draw() {
    clear();
    let timeStep = 1.0 / 30;
    // 2nd and 3rd arguments are velocity and position iterations
    world.Step(timeStep, 10, 10);
  
    if (random(1) < 0.1) {
      let sz = random(4, 8);
      particles.push(new Particle(random(windowWidth), 20, sz));
    }
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].display();
        // Particles that leave the screen, we delete them
        // (note they have to be deleted from both the box2d world and our list
        if (particles[i].done()) {
          particles.splice(i, 1);
        }
      }
    
      wall.display();
}

function mousePressed() {
   
}
function beginContact() {
    console.log('Start contact');
}