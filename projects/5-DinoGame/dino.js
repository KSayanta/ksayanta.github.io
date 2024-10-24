// Dino
class Dino {
    constructor(width, height, path) {
        this.width = width,
        this.height = height,
        this.img = new Image(),
        this.img.src = path,
        this.x = 60,
        this.y = canvasHeight - this.height;
    }
}

// Cactus
class Cactus {
    constructor(width, height, path) {
        this.width = width,
        this.height = height,
        this.img = new Image(),
        this.img.src = path,
        this.x = 900,
        this.y = canvasHeight - this.height;
    }
}

// Canvas
let canvas;
const canvasWidth = 1000;
const canvasHeight = 300;
let ctx;

// Game objects
const dino = new Dino(88, 94, 'sprite/dino.png');
let cactusQueue = [];

// Game Logic
const velocityX = 8; // Moving speed
const gravity = 0.4; // Jumping speed
let velocityY = 0;
const jumpHeightLow = 10;
const jumpHeightHigh = 15;
let gameOver = false;
let score = 0;

// Main
window.onload = function() {
    canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx = canvas.getContext('2d');

    if (!gameOver) {
        requestAnimationFrame(updateFrames);
        setInterval(spawnCactus, 1000);
        document.addEventListener('keydown', jumpLow);
    }
}


// Functions
function updateFrames() {
    requestAnimationFrame(updateFrames);

    // clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Dino
    velocityY += gravity;
    dino.y = Math.min(dino.y + velocityY, canvasHeight - dino.height);
    ctx.drawImage(dino.img, dino.x, dino.y, dino.width, dino.height);

    // Cactus
    for (let i = 0; i < cactusQueue.length; i++) {
        ctx.drawImage(cactusQueue[i].img, cactusQueue[i].x, cactusQueue[i].y, cactusQueue[i].width, cactusQueue[i].height);
        cactusQueue[i].x -= velocityX;
    }
}

function spawnCactus() {

    const spawnChance = Math.random();

    if (spawnChance > 0.85) {
        //spawn cactus 3
        cactusQueue.push(new Cactus(102, 70, 'sprite/cactus3.png'));
    } else if (spawnChance > 0.75) {
        // spawn cactus 2
        cactusQueue.push(new Cactus(69, 70, 'sprite/cactus2.png'));
    } else if (spawnChance > 0.55) {
        //spawn cactus 1
        cactusQueue.push(new Cactus(34, 70, 'sprite/cactus1.png'));
    }

    if (cactusQueue.length > 7) {
        cactusQueue.shift(); // Free unused cactus
    }
}



function jumpLow(e) {
    if ((e.code === "Space" || e.code === "ArrowUp" || e.code === "KeyW") && dino.y === canvasHeight - dino.height) {
        // dino.y -= jumpHeightLow;
        velocityY = -10;
    }
}
