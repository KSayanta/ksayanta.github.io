export default class Score {
  score = 0;
  HIGH_SCORE_KEY = "high_score";

  constructor(ctx) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20;

    this.ctx.font = "1rem monospace";
    this.ctx.fillStyle = "black";

    const scoreX = this.canvas.width - 75;
    const highScoreX = scoreX - 125;

    const scorePadded = Math.floor(this.score).toString().padStart(6, "0");
    const highScorePadded = Math.floor(highScore).toString().padStart(6, "0");

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }

  update(frameTimeDelta) {
    this.score += frameTimeDelta * 0.01;
  }

  reset() {
    this.score = 0;
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, this.score);
    }
  }
}
