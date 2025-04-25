const url = "https://apis.scrimba.com/deckofcards/api/deck/";

const btnNew = document.getElementById("newDeck");
const btnDraw = document.getElementById("draw");
const elmImgWrapperNL = document.querySelectorAll(".imageHolder");
const elmResultText = document.getElementById("feedbackText");
const elmCounter = document.getElementById("counterRem");
const elmBotScore = document.getElementById("scoreBot");
const elmPlayerScore = document.getElementById("scorePlayer");

const cardsArr = [
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "JACK",
  "QUEEN",
  "KING",
  "ACE",
];
let deckId;
let score = [0, 0];

window.addEventListener("DOMContentLoaded", () => {
  initGame();
});
btnNew.addEventListener("click", newDeck);
btnDraw.addEventListener("click", drawCards);

function initGame() {
  !deckId && btnDraw.setAttribute("disabled", "");
}

function endGame() {
  btnDraw.setAttribute("disabled", "");

  setTimeout(() => {
    if (score[0] < score[1])
      elmResultText.innerHTML = `
    You Won the Game!<br>
    <span class="orbitron-display">${score[0]} - ${score[1]}</span>
    `;
    else if (score[0] > score[1])
      elmResultText.innerHTML = `
    I Win the Game!<br>
    <span class="orbitron-display">${score[0]} - ${score[1]}</span>
    `;
    else
      elmResultText.innerHTML = `
    It's a Draw!<br>
    <span class="orbitron-display">${score[0]} - ${score[1]}</span>
    `;

    // show start screen
    elmBotScore.parentElement.classList.add("vis-hidden");
    btnNew.parentElement.classList.remove("vis-hidden");
  }, 2000);
}

async function newDeck() {
  // init new deck from api

  clear("Game of War");
  btnNew.parentElement.classList.add("vis-hidden");
  elmBotScore.parentElement.classList.remove("vis-hidden");
  score = [0, 0];
  elmBotScore.innerText = score[0];
  elmPlayerScore.innerText = score[1];

  const data = await fetch(url + "new/shuffle/").then(res => res.json());
  deckId = data.deck_id;
  elmCounter.innerText = data.remaining;

  // enable draw button
  btnDraw.removeAttribute("disabled");
}

async function drawCards() {
  // fetches cards from api

  const data = await fetch(url + deckId + "/draw/?count=2").then(res =>
    res.json()
  );
  elmCounter.innerText = data.remaining;
  display(data.cards);

  setTimeout(() => {
    // delay before updating score
    updateScore(data.cards);

    // game over
    if (!data.remaining) endGame();
  }, 1000);
}

function display(cardsArr) {
  // renders cards in viewport
  // @param   {array} cards

  clear("..."); // clear prev cards first

  cardsArr.forEach((card, idx) => {
    const imgElm = document.createElement("img");
    imgElm.src = card.image;
    imgElm.alt = `${card.value} of ${card.suit}.`;

    imgElm.onload = () => {
      elmImgWrapperNL[idx].appendChild(imgElm);
    };
  });
}

function updateScore(cardsArr) {
  // updates player score
  // @param   {array} card objects

  const result = compareCards(cardsArr[0], cardsArr[1]);
  elmResultText.innerHTML = result.text;
  Number.isInteger(result.playerIdx) && (score[result.playerIdx] += 1);
  elmBotScore.innerText = score[0];
  elmPlayerScore.innerText = score[1];
}

function compareCards(card1, card2) {
  // compares cards to determine winner
  // @param   {object} first card
  // @param   {object} second card
  // @return  {object} text and player id, player id is null when draw

  const card1Score = cardsArr.indexOf(card1.value);
  const card2Score = cardsArr.indexOf(card2.value);
  if (card1Score > card2Score) return { playerIdx: 0, text: "I Win!" };
  if (card1Score < card2Score) return { playerIdx: 1, text: "You Won!" };
  if (card1Score === card2Score) return { playerIdx: null, text: "War!" };
}

function clear(str) {
  // clears card images and feedback text
  // @param   {string}  feedback text to display

  elmResultText.innerHTML = str;
  elmImgWrapperNL.forEach(elm => (elm.innerHTML = ""));
}
