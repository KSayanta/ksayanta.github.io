import Dino from "./dino.js";
import CactiController from "./cactiController.js";
import Ground from "./ground.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const GAME_SPEED_INIT = 0.75; // NOTE: game speed should be set upto 1.0
const GAME_SPEED_INCREMENT = 0.00001; // NOTE: adjust this value to increase or decrease game speed

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 400;

const DINO_WIDTH = 88;
const DINO_HEIGHT = 94;

const DINO_MAX_JUMP = GAME_HEIGHT - 100;
const DINO_MIN_JUMP = GAME_HEIGHT - 200;

const GROUND_WIDTH = 2400;
const GROUND_HEIGHT = 24;
const GROUND_CACTUS_SPEED = 0.5;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

let previousTime = null;
let frameTimeDelta = null;
let gameSpeed = GAME_SPEED_INIT;

// Game flags
let gameOver = false;
let gameReset = false;
let gameWaiting = true;

// Game objects
let dino = null;
let cactiController = null;
let ground = null;

function init() {
    dino = new Dino(ctx, DINO_WIDTH, DINO_HEIGHT, DINO_MIN_JUMP, DINO_MAX_JUMP);
    cactiController = new CactiController(ctx, GROUND_CACTUS_SPEED);
    ground = new Ground(ctx, GROUND_WIDTH, GROUND_HEIGHT, GROUND_CACTUS_SPEED);
}

function reset() {
    gameOver = false;
    gameReset = false;
    gameSpeed = GAME_SPEED_INIT;

    dino.reset();
    ground.reset();
    cactiController.reset();
}

function initGameReset() {
    if(!gameReset) {
        gameReset = true;

        setTimeout(() => {
            window.addEventListener("keyup", (event) => {
                if(event.code === "Space") {
                    reset();
                    gameReset = false;
                }
            }, { once: true });
        }, 500);
    }
}

function displayStartScreen() {
    // Display start screen
    const x = GAME_WIDTH / 5;
    const y = GAME_HEIGHT / 2.5;
    ctx.font = "3rem monospace";
    ctx.fillStyle = "grey";
    ctx.fillText("Press SPACE to start", x, y);
}

function displayGameOver() {
    // Display game over sprite
    const x = GAME_WIDTH / 3.3;
    const y = GAME_HEIGHT / 3;
    const gameOverSprite = new Image();
    gameOverSprite.src = "sprite/game-over.png";
    ctx.drawImage(gameOverSprite, x, y);    
}

function main(currentTime) {

    // Calculate frame time delta
    if(previousTime !== null) {
        frameTimeDelta = (currentTime - previousTime);
    }

    previousTime = currentTime;
        
    // Clear canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    if(!gameOver && !gameWaiting) {// Update game objects
        ground.update(gameSpeed, frameTimeDelta);
        cactiController.update(gameSpeed, frameTimeDelta);
        dino.update(gameSpeed, frameTimeDelta);

        // Update game speed
        gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
    }

    if(!gameOver && cactiController.detectCollision(dino)) { // Detect collision
        gameOver = true;
    }
    
    if(gameOver) {
        dino.dead();
        displayGameOver();
        initGameReset();
    }

    if(gameWaiting) {
        displayStartScreen();
    }

    // Draw game objects
    ground.draw();
    cactiController.draw();
    dino.draw();
    
    // Request new frame
    requestAnimationFrame(main);
}

init(); // Create game objects
requestAnimationFrame(main); // Start game

window.addEventListener("keyup", (event) => {
    if(event.code === "Space") {
        gameWaiting = false;
    }
}, { once: true });