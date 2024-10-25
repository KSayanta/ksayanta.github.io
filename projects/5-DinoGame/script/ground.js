export default class Ground {
    
    GROUND_WIDTH = 2400;
    GROUND_HEIGHT = 24;

    constructor(ctx, speed) {
       this.ctx = ctx;
       this.canvas = ctx.canvas;
       this.width = this.GROUND_WIDTH;
       this.height = this.GROUND_HEIGHT;
       this.speed = speed;

       this.x = 0;
       this.y = this.canvas.height - this.height - 10;

       this.ground = new Image();
       this.ground.src = "sprite/track.png";
       this.sprite = this.ground;
    }

    draw() {
        // Draw first sprite
        this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);

        // Draw second sprite to wrap around
        this.ctx.drawImage(this.sprite, this.x + this.width, this.y, this.width, this.height);
    }

    update(gameSpeed, frameTimeDelta) {
        this.x -= this.speed * gameSpeed * frameTimeDelta;

        // Wrap around
        if (this.x < -this.width) {
            this.x = 0;
        }
    }

    reset() {
        this.x = 0;
    }
}