document.addEventListener("DOMContentLoaded", () => {
  const ANIM_JUMP = "dino-jump";
  let isJumping = false;

  const dino = document.getElementById("dino");
  const style = getComputedStyle(dino);
  const animDuration = parseFloat(style.animationDuration);

  window.addEventListener("keydown", (event) => {
    if (event.code === "Space" && !isJumping) {
      if (!dino.classList.contains(ANIM_JUMP)) {
        dino.classList.add(ANIM_JUMP);
        isJumping = true;
      }
      setTimeout(() => {
        dino.classList.remove(ANIM_JUMP);
        isJumping = false;
      }, animDuration * 1000);
    }
  });
});
