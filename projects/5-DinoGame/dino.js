export default class Dino {
  WALK_CYCLE_TIMER = 100;
  walkCycleTimer = this.WALK_CYCLE_TIMER;
  dinoWalkSprites = [];

  DINO_WIDTH = 88;
  DINO_HEIGHT = 94;

  JUMP_SPEED = 0.6;
  DINO_MIN_JUMP = 250;
  DINO_MAX_JUMP = 350;
  GRAVITY = 0.3;

  isJumpPressed = false;
  isJumping = false;
  isFalling = false;

  constructor(ctx) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = this.DINO_WIDTH;
    this.height = this.DINO_HEIGHT;
    this.minJump = this.DINO_MIN_JUMP;
    this.maxJump = this.DINO_MAX_JUMP;

    this.x = 20;
    this.y = this.canvas.height - this.height - 10;
    this.Y = this.y; // Store original y position

    // Standing sprite
    this.dinoStanding = new Image();
    this.dinoStanding.src = "sprite/dino.png";
    this.sprite = this.dinoStanding;

    // Walking sprite
    const dinoWalk1 = new Image();
    dinoWalk1.src = "sprite/dino-run1.png";

    const dinoWalk2 = new Image();
    dinoWalk2.src = "sprite/dino-run2.png";

    this.dinoWalkSprites.push(dinoWalk1);
    this.dinoWalkSprites.push(dinoWalk2);

    // Dead sprite
    this.dinoDead = new Image();
    this.dinoDead.src = "sprite/dino-dead.png";

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

  update(gameSpeed, frameTimeDelta) {
    this.walk(gameSpeed, frameTimeDelta);

    if (this.isJumping) {
      this.sprite = this.dinoStanding;
    }

    this.jump(frameTimeDelta);
  }

  reset() {
    this.sprite = this.dinoStanding;
  }

  walk(gameSpeed, frameTimeDelta) {
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
    this.walkCycleTimer -= gameSpeed * frameTimeDelta;
  }

  jump(frameTimeDelta) {
    if (this.isJumpPressed) {
      this.isJumping = true;
    }

    if (this.isJumping && !this.isFalling) {
      // If jumping upwards

      if (
        // If not at max height and jump is pressed
        this.y > this.canvas.height - this.minJump ||
        (this.y > this.canvas.height - this.maxJump && this.isJumpPressed)
      ) {
        // Keep jumping
        this.y -= this.JUMP_SPEED * frameTimeDelta;
      } else {
        // Else falling
        this.isFalling = true;
      }
    } else {
      if (this.y < this.Y) {
        // If not at original height
        this.y += this.GRAVITY * frameTimeDelta;
        if (this.y + this.height > this.canvas.height) {
          this.y = this.Y;
        }
      } else {
        this.isFalling = false;
        this.isJumping = false;
      }
    }
  }

  dead() {
    this.sprite = this.dinoDead;
  }

  onKeyDown = (event) => {
    if (
      event.code === "Space" ||
      event.code === "ArrowUp" ||
      event.code === "KeyW"
    ) {
      this.isJumpPressed = true;
    }
  };

  onKeyUp = (event) => {
    if (
      event.code === "Space" ||
      event.code === "ArrowUp" ||
      event.code === "KeyW"
    ) {
      this.isJumpPressed = false;
    }
  };
}
