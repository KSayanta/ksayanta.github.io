import Cactus from "./cactus.js";

const CACTI_CONFIG = [
    {width : 34, height : 70, imagePath : 'sprite/cactus1.png'},
    {width : 69, height : 70, imagePath : 'sprite/cactus2.png'},
    {width : 102, height : 70, imagePath : 'sprite/cactus3.png'},
    {width : 50, height : 100, imagePath : 'sprite/big-cactus1.png'},
    {width : 103, height : 100, imagePath : 'sprite/big-cactus2.png'},
    {width : 150, height : 100, imagePath : 'sprite/big-cactus3.png'},
]

// Creating cactus sprites from config
const cactusSprites = CACTI_CONFIG.map((cactus) => {
    const sprite = new Image();
    sprite.src = cactus.imagePath;
    return {
        sprite : sprite,
        width : cactus.width,
        height : cactus.height,
    };
});

export default class CactiController {
    CACTUS_INTERVAL_MIN = 500;
    CACTUS_INTERVAL_MAX = 1500;

    nextCactusInterval = null;
    cacti = [];

    constructor(ctx, speed) {
        this.ctx = ctx;
        this.canvas = this.ctx.canvas;
        this.speed = speed;

        this.setNextCactusInterval(); // Init cactus interval
    }

    draw() {
        this.cacti.forEach((cactus) => {
            cactus.draw();
        });
    }

    update(gameSpeed, frameTimeDelta) {
        
        // Create new cactus
        if(this.nextCactusInterval < 0) { 
        this.createCactus();
        this.setNextCactusInterval();
        }

        // Update cactus interval
        this.nextCactusInterval -= frameTimeDelta * gameSpeed;

        // Update cacti
        this.cacti.forEach((cactus) => {
        cactus.update(this.speed, gameSpeed, frameTimeDelta);
        });

        // Remove cacti that are out of canvas
        this.cacti = this.cacti.filter((cactus) => {
        return cactus.x > -cactus.width;
        });     
    }

    detectCollision(sprite) {
        return this.cacti.some((cactus) => {
            return cactus.detectCollision(sprite);
        });
    }

    setNextCactusInterval() {
        // Set random interval between min and max
        this.nextCactusInterval = this.getRandomNumberBetween(this.CACTUS_INTERVAL_MIN, this.CACTUS_INTERVAL_MAX);
    }

    createCactus() {
        const idx = this.getRandomNumberBetween(0, cactusSprites.length - 1);
        const cactusSprite = cactusSprites[idx];

        const X = this.canvas.width * 1.5;
        const Y = this.canvas.height - cactusSprite.height;

        const cactus = new Cactus(this.ctx, X, Y, cactusSprite.width, cactusSprite.height, cactusSprite.sprite);
        this.cacti.push(cactus);
    }

    getRandomNumberBetween(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

}