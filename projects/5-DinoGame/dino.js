export default class Dino {
    WALK_CYCLE_TIMER = 100;
    walkCycleTimer = this.WALK_CYCLE_TIMER;
    dinoWalkSprites = [];

    JUMP_SPEED = 0.6;
    GRAVITY = 0.4;

    isJumpPressed = false;
    isJumping = false;
    isFalling = false;

    constructor(ctx, width, height, minJump, maxJump) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.width = width;
        this.height = height;
        this.minJump = minJump;
        this.maxJump = maxJump;

        this.x = 20;
        this.y = this.canvas.height - this.height - 10;
        this.Y = this.y; // Store original y position

        const dinoStanding = new Image();
        dinoStanding.src = "sprite/dino.png";
        this.sprite = dinoStanding;

        const dinoWalk1 = new Image();
        dinoWalk1.src = "sprite/dino-run1.png";
        
        const dinoWalk2 = new Image();
        dinoWalk2.src = "sprite/dino-run2.png";
        
        this.dinoWalkSprites.push(dinoWalk1);
        this.dinoWalkSprites.push(dinoWalk2);

        // Event handlers remove first
        document.removeEventListener("keydown", this.onKeyDown);
        document.removeEventListener("keyup", this.onKeyUp);

        // then add
        document.addEventListener("keydown", this.onKeyDown);
        document.addEventListener("keyup", this.onKeyUp);
    }

    draw() {
        this.ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
    }

    update(gameSpeed) {
        this.walk(gameSpeed);
        this.jump();
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

    jump(gameSpeed) {
        if(this.isJumpPressed) {
            this.isJumping = true;
        }
        
        if(this.isJumping && !this.isFalling) { // If jumping upwards

            if( // If not at max height and jump is pressed
                this.y > this.canvas.height - this.minJump || (
                this.y > this.canvas.height - this.maxJump && this.isJumpPressed)
            ) { // Keep jumping
                this.y -= this.JUMP_SPEED;
            } else { // Else falling
                this.isFalling = true;
            }
        } else {
            if(this.y < this.Y) { // If not at original height
                this.y += this.GRAVITY;
                if(this.y + this.height > this.canvas.height) {
                    this.y = this.Y;
                }
            } else {
                this.isFalling = false;
                this.isJumping = false;
            }
        }
    }

    onKeyDown = (event) => {
        if(event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") {
            this.isJumpPressed = true;
        }
    }

    onKeyUp = (event) => {
        if(event.code === "Space" || event.code === "ArrowUp" || event.code === "KeyW") {
            this.isJumpPressed = false;
        }
    }
}