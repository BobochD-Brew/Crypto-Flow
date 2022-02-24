let num = 2000;
let noiseScale=500;
let noiseStrength=1;
let particles = [num];
let backcolor;
let dotcolor;
let backcolor2;
let width;
let height;
let seed = 99;
function setup() {
    let params = getURLParams();
    seed = params.id;
    width = windowWidth;
    height = windowHeight;
    randomSeed(seed);
    noiseSeed(seed);
    backcolor = color(random(255),random(255),random(255),10)
    backcolor2 = color(random(255),random(255),random(255),10)
    dotcolor =  color(random(255),random(255),random(255))
    createCanvas(width, height);
    background(dotcolor)
    noStroke();
    for (let i=0; i<num; i++) {
        let loc = createVector(width*random(1.2), random(1)*height, 2);
        let angle = 0;
        let dir = createVector(cos(angle), sin(angle));
        let speed = random(0.5,2);
        particles[i]= new Particle(loc, dir, speed);
    }
}

function windowResized() {
    width = windowWidth;
    height = windowHeight;
    resizeCanvas(width, height);
}
function draw() {
    blendMode(OVERLAY );
    fill(backcolor);
    blendMode(NORMAL );
    noStroke();
    rect(0, 0, width, height);
    for (let i=0; i<particles.length; i++) {
        particles[i].run();
    }
}
class Particle{
    constructor(_loc,_dir,_speed){
        this.loc = _loc;
        this.dir = _dir;
        this.speed = _speed;
    }
    run() {
        this.move();
        this.checkEdges();
        this.update();
    }
    move(){
        let angle=noise(this.loc.x/noiseScale, this.loc.y/noiseScale, frameCount*0.01/noiseScale)*TWO_PI*noiseStrength; //0-2PI
        this.dir.x = cos(angle);
        this.dir.y = sin(angle);
        let vel = this.dir.copy();
        let d =1;
        vel.mult(this.speed*d);
        this.loc.add(vel);
    }
    checkEdges(){
        if (this.loc.x<0 || this.loc.x>size || this.loc.y<0 || this.loc.y>size) {   
            this.loc.x = width*random(1.2);
            this.loc.y = height*random(1);
        }
    }
    update(){
        fill(dotcolor);
        ellipse(this.loc.x, this.loc.y, this.loc.z);
    }
}
