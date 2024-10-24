export default class Ground {
    constructor(ctx, width, height, speed) {
       this.ctx = ctx;
       this.canvas = ctx.canvas;
       this.width = width;
       this.height = height;
       this.speed = speed;

       this.x = 0;
       this.y = this.canvas.height - this.height - 10;

       this.ground = new Image();
       this.ground.src = "sprite/track.png";
       this.sprite = this.ground;
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);

        this.ctx.drawImage(this.sprite, this.x + this.width, this.y, this.width, this.height);
    }

    update() {
        this.x -= this.speed;
        if (this.x < -this.width) {
            this.x = 0;
        }
    }
}