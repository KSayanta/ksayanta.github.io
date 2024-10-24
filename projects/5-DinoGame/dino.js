export default class Dino {
    constructor(ctx, width, height, minJump, maxJump) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJump = minJump;
        this.maxJump = maxJump;

        this.x = 20;
        this.y = this.canvas.height - this.height - 10;

        this.dinoStanding = new Image();
        this.dinoStanding.src = "sprite/dino.png";

        this.sprite = this.dinoStanding;
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }
}