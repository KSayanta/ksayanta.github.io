const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const GAME_WIDTH = 1000;
const GAME_HEIGHT = 400;
const DINO_WIDTH = 88;
const DINO_HEIGHT = 94;
const DINO_MAX_JUMP = GAME_HEIGHT - 50;
const DINO_MIN_JUMP = GAME_HEIGHT - 200;

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

function main() {
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    requestAnimationFrame(main);
}

requestAnimationFrame(main);