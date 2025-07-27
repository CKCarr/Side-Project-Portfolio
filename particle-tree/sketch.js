let particles = [];
let maxDepth; // maximum depth of branches
let paused = false; // controls restart of redraw cycle

function setup() {
    createCanvas(600, 600);
    background(12);
    angleMode(DEGREES);
    generateTree();
}

function draw() {
    fill(255);
    noStroke();
    textSize(22);
    textAlign(CENTER);
    text(`Depth: ${maxDepth}`, width / 2, 30);
    if (paused) {
        return; // skip drawing if paused
    }
    background(12, 20); // semi-transparent background for fading effect
    // draw the particles
    for (let p of particles) {
        p.update();
        p.display();
        if (!p.spawned || p.life < p.len) {
            allDone = false; // if any particle is still growing, we are not done
        }
        // when done drawing particles pause draw loop
        if (allDone) {
            paused = true;
        }
    }
}

function restartTree() {
    background(12); // clear canvas
    particles = []; // reset particles
    paused = false; // allow draw loop to run
    generateTree(); // regenerate the tree
}

function generateTree() {
    // randomize the maximum depth of branches
    maxDepth = int(random(6, 11));
    // ROOT = branch( width, height, angle, depth)
    particles.push(new Branch(width / 2, height, -90, maxDepth));
}

class Branch {
    constructor(x, y, angle, depth) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.depth = depth;
        // length
        this.len = 60;
        // life of branch
        this.life = 0;
        // starting point of spawn
        this.spawned = false;
    }

    // update particle 
    update() {
        if (this.life < this.len) {
            this.life++;
        }
        else if (!this.spawned && this.depth > 0) {
            let angle1 = this.angle - random(15, 35);
            let angle2 = this.angle + random(15, 35);
            let newX = this.x + cos(this.angle) * this.len;
            let newY = this.y + sin(this.angle) * this.len;
            particles.push(new Branch(newX, newY, angle1, this.depth - 1));
            particles.push(new Branch(newX, newY, angle2, this.depth - 1));
            this.spawned = true;
        }
    }

    display() {
        // colors
        let leafColor = color(0, 255, 100); // green color for trunk
        let trunkColor = color(139, 69, 19); // brown color for leaves
        let branchColor = lerpColor(trunkColor, leafColor, 1 - (this.depth / maxDepth));

        stroke(branchColor);
        strokeWeight(this.depth);
        // set the line to be semi-transparent
        strokeWeight(map(this.depth, 0, maxDepth, 1, 14));
        let endX = this.x + cos(this.angle) * this.life;
        let endY = this.y + sin(this.angle) * this.life;
        line(this.x, this.y, endX, endY);
    }
}
