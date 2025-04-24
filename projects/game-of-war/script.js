const url = "https://apis.scrimba.com/deckofcards/api/deck/";

const btnNew = document.getElementById("newDeck");
const btnDraw = document.getElementById("draw");
const imgWrapperNL = document.querySelectorAll(".image-wrapper");
const resultText = document.getElementById("feedbackText");
const counterStat = document.getElementById("counterRem");
const scoreBot = document.getElementById("scoreBot");
const scorePlayer = document.getElementById("scorePlayer");

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

  if (score[0] < score[1]) resultText.innerText = "You Won the Game!";
  else if (score[0] > score[1]) resultText.innerText = "I Win the Game!";
  else resultText.innerText = "It's a Draw!";
}

async function newDeck() {
  // init new deck from api

  const data = await fetch(url + "new/shuffle/").then(res => res.json());

  deckId = data.deck_id;
  counterStat.innerText = `Remaining Cards: ${data.remaining}`;

  // enable draw button
  btnDraw.removeAttribute("disabled");
}

async function drawCards() {
  // fetches cards from api

  const data = await fetch(url + deckId + "/draw/?count=2").then(res =>
    res.json()
  );

  counterStat.innerText = `Remaining Cards: ${data.remaining}`;
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

  clear(); // clear prev cards first

  cardsArr.forEach((card, idx) => {
    const imgElm = document.createElement("img");
    imgElm.src = card.image;
    imgElm.alt = `${card.value} of ${card.suit}.`;

    imgElm.onload = () => {
      imgWrapperNL[idx].appendChild(imgElm);
    };
  });
}

function updateScore(cardsArr) {
  // updates player score
  // @param   {array} card objects

  const result = compareCards(cardsArr[0], cardsArr[1]);
  resultText.innerHTML = result.text;
  Number.isInteger(result.playerIdx) && (score[result.playerIdx] += 1);
  scoreBot.innerText = score[0];
  scorePlayer.innerText = score[1];
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

function clear() {
  // clears card images and feedback text
  resultText.innerHTML = "...";
  imgWrapperNL.forEach(elm => (elm.innerHTML = ""));
}
