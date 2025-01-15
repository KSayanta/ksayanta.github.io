export default class Dino {
  WALK_CYCLE_TIMER = 100;
  walkCycleTimer = this.WALK_CYCLE_TIMER;
  dinoWalkSprites = [];

  DINO_WIDTH = 88;
  DINO_HEIGHT = 94;

  DINO_DUCK_WIDTH = 118;
  DINO_DUCK_HEIGHT = 60;

  JUMP_SPEED = 0.6;
  DINO_MIN_JUMP = 250;
  DINO_MAX_JUMP = 350;
  GRAVITY = 0.45;

  isJumpPressed = false;
  isJumping = false;
  isFalling = false;
  isDuckPressed = false;
  isDucking = false;

  constructor(ctx) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.width = this.DINO_WIDTH;
    this.height = this.DINO_HEIGHT;
    this.minJump = this.DINO_MIN_JUMP;
    this.maxJump = this.DINO_MAX_JUMP;

    this.x = 20;
    this.Y = this.canvas.height - this.DINO_HEIGHT - 10; // Store original y position
    this.y = this.Y;

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

    // Ducking sprite
    const dinoDuck1 = new Image();
    dinoDuck1.src = "sprite/dino-duck1.png";

    const dinoDuck2 = new Image();
    dinoDuck2.src = "sprite/dino-duck2.png";

    this.dinoWalkSprites.push(dinoDuck1);
    this.dinoWalkSprites.push(dinoDuck2);

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
    if (!this.isJumping) {
      this.walk(gameSpeed, frameTimeDelta);
    }

    if (this.isJumping) {
      this.sprite = this.dinoStanding;
    }

    this.jump(frameTimeDelta);
  }

  reset() {
    this.sprite = this.dinoStanding;
    this.width = this.DINO_WIDTH;
    this.height = this.DINO_HEIGHT;
    this.y = this.Y;
  }

  walk(gameSpeed, frameTimeDelta) {
    this.caclulateBoundingBox();

    if (!this.isDuckPressed) {
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
    } else {
      if (this.walkCycleTimer <= 0) {
        // Switch sprite
        if (this.sprite === this.dinoWalkSprites[2]) {
          this.sprite = this.dinoWalkSprites[3];
        } else {
          this.sprite = this.dinoWalkSprites[2];
        }
        // Reset timer
        this.walkCycleTimer = this.WALK_CYCLE_TIMER;
      }
    }

    // Decrement timer
    this.walkCycleTimer -= gameSpeed * frameTimeDelta;
  }

  jump(frameTimeDelta) {
    if (this.isJumpPressed && !this.isDucking) {
      this.isJumping = true;
    }

    if (this.isDuckPressed && !this.isJumping) {
      this.isDucking = true;
    } else {
      this.isDucking = false;
    }

    if (this.isJumping && !this.isFalling && !this.isDucking) {
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
      if (this.isFalling) {
        this.y += this.GRAVITY * frameTimeDelta;
        if (this.y + this.height > this.canvas.height) {
          this.y = this.Y;
          this.isFalling = false;
          this.isJumping = false;
        }
      }
    }
  }

  dead() {
    this.sprite = this.dinoDead;
    this.width = this.DINO_WIDTH;
    this.height = this.DINO_HEIGHT;
    if (this.isDucking) {
      this.y = this.Y;
    }
  }

  caclulateBoundingBox() {
    if (this.isDucking) {
      this.width = this.DINO_DUCK_WIDTH;
      this.height = this.DINO_DUCK_HEIGHT;
      this.y = this.canvas.height - this.DINO_DUCK_HEIGHT - 10;
    } else {
      this.width = this.DINO_WIDTH;
      this.height = this.DINO_HEIGHT;
      this.y = this.Y;
    }
  }

  onKeyDown = (event) => {
    if (
      event.code === "Space" ||
      event.code === "ArrowUp" ||
      event.code === "KeyW"
    ) {
      this.isJumpPressed = true;
    }

    if (
      event.code === "ControlLeft" ||
      event.code === "ArrowDown" ||
      event.code === "KeyS"
    ) {
      this.isDuckPressed = true;
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

    if (
      event.code === "ControlLeft" ||
      event.code === "ArrowDown" ||
      event.code === "KeyS"
    ) {
      this.isDuckPressed = false;
    }
  };
}
