export default class Dino {
    WALK_CYCLE_TIMER = 200;
    walkCycleTimer = this.WALK_CYCLE_TIMER;
    dinoWalkSprites = [];

    constructor(ctx, width, height, minJump, maxJump) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJump = minJump;
        this.maxJump = maxJump;

        this.x = 20;
        this.y = this.canvas.height - this.height - 10;

        const dinoStanding = new Image();
        dinoStanding.src = "sprite/dino.png";
        this.sprite = dinoStanding;

        const dinoWalk1 = new Image();
        dinoWalk1.src = "sprite/dino-run1.png";
        
        const dinoWalk2 = new Image();
        dinoWalk2.src = "sprite/dino-run2.png";
        
        this.dinoWalkSprites.push(dinoWalk1);
        this.dinoWalkSprites.push(dinoWalk2);
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }

    update(gameSpeed) {
        this.walk(gameSpeed);
    }

    walk(gameSpeed) {
        
        if (this.walkCycleTimer <= 0) {
            
            // Switch sprite
            if (this.sprite === this.dinoWalkSprites[0]) {
                this.sprite = this.dinoWalkSprites[1];
            } else {
                this.sprite = this.dinoWalkSprites[0];
            }
            // Reset timer
            this.walkCycleTimer = this.WALK_CYCLE_TIMER;

        }
        
        // Decrement timer
        this.walkCycleTimer -= gameSpeed;
    }
}