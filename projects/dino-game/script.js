import Dino from "./script/dino.js";
import CactiController from "./script/cactiController.js";
import Ground from "./script/ground.js";
import Score from "./script/score.js";

const GAME_SPEED_INIT = 0.75; // NOTE: game speed should be set upto 1.0
const GAME_SPEED_INCREMENT = 0.00001; // NOTE: adjust this value to increase or decrease game speed
const GAME_WIDTH = 1000;
const GAME_HEIGHT = 400;
const INIT_GROUND_OBJ_SPEED = 0.5;

// Canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

// Game variables
let gameOver = false;
let gameWaiting = true;
let previousTime = null;
let frameTimeDelta = null;
let gameSpeed = GAME_SPEED_INIT;

// Game objects
let dino = null;
let cactiController = null;
let ground = null;
let score = null;

// Helper functions
function init() {
  dino = new Dino(ctx);
  cactiController = new CactiController(ctx, INIT_GROUND_OBJ_SPEED);
  ground = new Ground(ctx, INIT_GROUND_OBJ_SPEED);
  score = new Score(ctx);
}

function reset() {
  gameOver = false;
  gameSpeed = GAME_SPEED_INIT;
  dino.reset();
  ground.reset();
  cactiController.reset();
  score.reset();
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
  // Display game over screen
  const x = GAME_WIDTH / 3.3;
  const y = GAME_HEIGHT / 3;
  const gameOverSprite = new Image();
  gameOverSprite.src = "sprite/game-over.png";
  ctx.drawImage(gameOverSprite, x, y);
}

function main(currentTime) {
  // Calculate frame time delta
  if (previousTime !== null) {
    frameTimeDelta = currentTime - previousTime;
  }
  previousTime = currentTime;

  // Clear canvas
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // Update game objects and game speed
  if (!gameOver && !gameWaiting) {
    ground.update(gameSpeed, frameTimeDelta);
    cactiController.update(gameSpeed, frameTimeDelta);
    dino.update(gameSpeed, frameTimeDelta);
    score.update(frameTimeDelta);
    gameSpeed += frameTimeDelta * GAME_SPEED_INCREMENT;
  }

  // Detect collision and game over
  if (!gameOver && cactiController.detectCollision(dino)) {
    gameOver = true;
    dino.dead();
    score.setHighScore();
  }

  // Draw game objects
  score.draw();
  ground.draw();
  cactiController.draw();
  dino.draw();

  // Show start screen
  if (gameWaiting) {
    displayStartScreen();
  }

  // Show game over screen
  if (gameOver) {
    displayGameOver();
  }

  // Request new frame
  requestAnimationFrame(main);
}

// Create game objects
init();

// Start game
requestAnimationFrame(main);

// Hang the game on page load and game over
if (gameWaiting || gameOver) {
  window.addEventListener("keydown", event => {
    if (event.code === "Space") {
      if (gameWaiting) gameWaiting = false;
      if (gameOver) reset();
    }
  });
}

