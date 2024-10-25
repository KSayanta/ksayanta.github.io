export default class Cactus {
    constructor(ctx, x, y, width, height, sprite) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.sprite = sprite;
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }

    update(speed, gameSpeed, frameTimeDelta) {
        this.x -= speed * gameSpeed * frameTimeDelta;
    }
}