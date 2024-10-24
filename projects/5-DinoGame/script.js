import Dino from "./dino.js";
import Ground from "./ground.js";

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const GAME_SPEED_INIT = 0.75; // NOTE: game speed should be set upto 1.0
const GAME_SPEED_INCREMENT = 0.00005; // TODO: implement difficulty 

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

// Game objects
let dino = null;
let ground = null;

function init() {
    dino = new Dino(ctx, DINO_WIDTH, DINO_HEIGHT, DINO_MIN_JUMP, DINO_MAX_JUMP);
    ground = new Ground(ctx, GROUND_WIDTH, GROUND_HEIGHT, GROUND_CACTUS_SPEED);
}

function main(currentTime) {
    // Calculate frame time delta
    if(previousTime !== null) {
        frameTimeDelta = (currentTime - previousTime);
        // gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
    }
    previousTime = currentTime;
        
    // Clear canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Update game objects
    ground.update(gameSpeed, frameTimeDelta);
    dino.update(gameSpeed, frameTimeDelta);

    // Draw game objects
    ground.draw();
    dino.draw();
    
    // Request new frame
    requestAnimationFrame(main);
}

init(); // Create game objects
requestAnimationFrame(main); // Start game