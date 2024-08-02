let points = [];
let t = 0;
let widthLeft, heightTop;
let debugPoint;

function setup() {
    createCanvas(WIDTH, HEIGHT);
    colorMode(HSL, 360, 100, 100);
    frameRate(60);
    
    widthLeft = random(0, WIDTH);
    heightTop = random(0, HEIGHT);
    
    for (let i = 0; i < N; i++) {
        points.push(new Point(i));
    }

    if (DEBUG_MODE) {
        debugPoint = points[DEBUG_POINT_INDEX];
        console.log("Debug mode is ON");
        console.log(`Canvas dimensions: ${WIDTH}x${HEIGHT}`);
        console.log(`New origin: (${widthLeft}, ${heightTop})`);
        console.log("Initial state of debug point:\n", debugPoint.getDebugInfo());
    }
}

function draw() {
    translate(widthLeft, heightTop);
    
    for (let point of points) {
        point.update(t);
        point.draw();
    }
    
    if (DEBUG_MODE && t >= DEBUG_START_TIME && t <= DEBUG_END_TIME) {
        console.log(`\nTime: ${t}\n`);
        debugPoint.printDebugInfo(t);
    }

    t += DT;
    if (t > MAX_TIME) {
        noLoop();
    }
}

function mousePressed() {
    if (mouseButton === LEFT) {
        noLoop();
        console.log("Simulation stopped by mouse click");
    }
}

function spiral(theta) {
    return A * Math.sqrt(theta);
}
