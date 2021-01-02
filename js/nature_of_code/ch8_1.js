let centerX;
let centerY;

let current = 'A';
let next = '';
let counter = 0;
let turtle;
let lsys;
class LSystem {
  
    // Construct an LSystem with a startin sentence and a ruleset
    constructor(axiom, r) {
      this.sentence = axiom;
      this.ruleset = r;
      this.generation = 0;
    }
  
    // Generate the next generation
    generate() {
      // An empty StringBuffer that we will fill
      let nextgen = '';
      // For every character in the sentence
      for (let i = 0; i < this.sentence.length; i++) {
        // What is the character
        let curr = this.sentence.charAt(i);
        // We will replace it with itself unless it matches one of our rules
        let replace = "" + curr;
        // Check every rule
        for (let j = 0; j < this.ruleset.length; j++) {
          let a = this.ruleset[j].getA();
          // if we match the Rule, get the replacement String out of the Rule
          if (a == curr) {
            replace = this.ruleset[j].getB();
            break; 
          }
        }
        // Append replacement String
        nextgen += replace;
      }
      // Replace sentence
      this.sentence = nextgen;
      // Increment generation
      this.generation++;
    }
  
    getSentence() {
      return this.sentence; 
    }
  
    getGeneration() {
      return this.generation; 
    }
  
  
  }
class Turtle {
    constructor(s, l, t) {
      this.todo = s;
      this.len = l; 
      this.theta = t;
    } 
  
    render() {
      stroke(0, 175);
      for (let i = 0; i < this.todo.length; i++) {
        let c = this.todo.charAt(i);
        if (c == 'F' || c == 'G') {
          line(0, 0, this.len, 0);
          translate(this.len, 0);
        } else if (c == '+') {
          rotate(this.theta);
        } else if (c == '-') {
          rotate(-this.theta);
        } else if (c == '[') {
          push();
        } else if (c == ']') {
          pop();
        }
      }
    }
  
    setLen(l) {
      this.len = l;
    } 
  
    changeLen(percent) {
      this.len *= percent;
    }
  
    setToDo(s) {
      this.todo = s;
    }
  }
class Rule {
  
    constructor(a_, b_) {
      this.a = a_;
      this.b = b_; 
    }
  
    getA() {
      return this.a;
    }
  
    getB() {
      return this.b;
    }
  
  }

function setup() {
    centerX = windowWidth/2;
    centerY = windowHeight/2;
    let cnv = createCanvas(windowWidth - 40, windowHeight - 40);
    cnv.mousePressed(canvasPressed);
   let ruleset = [];
   ruleset.push(new Rule('F', "FF+[+F-F-F]-[-F+F+F]"));
   lsys = new LSystem('F', ruleset);
   turtle = new Turtle(lsys.getSentence(), windowWidth/4, radians(25));
}

function draw() {
    background(255);
    translate(windowWidth/2, windowHeight);
    rotate(-PI/2);
    turtle.render();
    noLoop();
    
}

function canvasPressed() {
    if (counter < 5) {
        push();
        lsys.generate();
        //println(lsys.getSentence());
        turtle.setToDo(lsys.getSentence());
        turtle.changeLen(0.5);
        pop();
        redraw();
        counter++;
    }
}
