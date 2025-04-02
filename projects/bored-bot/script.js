const url = "https://apis.scrimba.com/bored/api/activity";

// DOM Objects
const activityElm = document.querySelector(".activity");
const btnNewActivity = document.querySelector("#btn--new-activity");

// Handler functions
const getActivity = function () {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayActivity(data);
    });
};

const displayActivity = function (data) {
  activityElm.textContent = data.activity;
};

const drawConfetti = function () {
  const confetti = document.createElement("div");
  confetti.textContent = "🎉";
  confetti.classList.add("confetti");
  confetti.style.left = Math.random() * innerWidth + "px";
  document.body.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 5000);
};

const displayConfetti = function () {
  const intervalId = setInterval(() => {
    drawConfetti();
  }, 200);
  setTimeout(() => {
    clearInterval(intervalId);
  }, 3000);
};

// Event listener
btnNewActivity.addEventListener("click", () => {
  getActivity();
  displayConfetti();
});
