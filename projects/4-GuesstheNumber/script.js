const chances = 10;
let randomNumber = generateRandom();

const guessSubmit = document.querySelector("#guess-btn");
const guessReset = document.querySelector("#reset-btn");
const guessInput = document.querySelector("#guess-input");
const guessList = document.querySelector("#guesses-list");
const guessChances = document.querySelector("#chances");
const guessFeedback = document.querySelector("#message");

let gameOver = false;
let attempts = 1;

guessInput.addEventListener("keypress", event => {
  if (event.which === 13 || event.keyCode === 13) {
    guessSubmit.click();
  }
});

guessSubmit.addEventListener("click", event => {
  event.preventDefault();
  const guess = parseInt(guessInput.value);
  if (!gameOver) {
    if (validateGuess(guess)) {
      checkGuess(guess);
    }
  }
});

guessReset.addEventListener("click", () => {
  if (gameOver) {
    resetGame();
  }
});

function generateRandom() {
  return parseInt(Math.random() * 100 + 1);
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number.");
    clearGuess();
    return false;
  }
  if (guess < 1 || guess > 100) {
    alert("Please enter a number between 1 and 100");
    clearGuess();
    return false;
  }
  return true;
}

function checkGuess(guess) {
  clearGuess();
  displayChances(chances - attempts);

  if (guess === randomNumber) {
    displayMessage(
      `Congratulations, you guessed the number in ${attempts} attempts!`,
      "success"
    );
    gameOver = true;
    endGame();
  } else if (attempts === chances) {
    displayMessage(
      `Sorry, you lost. The number was ${randomNumber}`,
      "failure"
    );
    gameOver = true;
    endGame();
  } else {
    if (guess < randomNumber) {
      displayPrevious(guess, "cold");
      displayMessage("Your guess is too low", "cold");
    } else if (guess > randomNumber) {
      displayPrevious(guess, "hot");
      displayMessage("Your guess is too high", "hot");
    }

    attempts++;
  }
}

function displayPrevious(guess, attr) {
  const span = document.createElement("span");
  span.setAttribute("class", attr);
  span.innerHTML = guess;
  guessList.appendChild(span);
}

function displayMessage(msg, attr) {
  guessFeedback.innerHTML = msg;
  guessFeedback.setAttribute("class", attr);
}

function displayChances(chances) {
  guessChances.innerHTML = chances;
}

function clearGuess() {
  guessInput.value = "";
  guessInput.focus();
}

function endGame() {
  guessInput.setAttribute("disabled", "disabled");
  guessSubmit.style.display = "none";
  guessReset.style.display = "block";
  guessList.innerHTML = "";
}

function resetGame() {
  guessInput.removeAttribute("disabled");
  guessSubmit.style.display = "block";
  guessReset.style.display = "none";
  guessFeedback.innerHTML = "";

  clearGuess();
  displayChances(chances);
  randomNumber = generateRandom();

  attempts = 1;
  gameOver = false;
}
