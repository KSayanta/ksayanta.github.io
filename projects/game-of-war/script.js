const url = "https://apis.scrimba.com/deckofcards/api/deck/";

const btnNew = document.getElementById("newDeck");
const btnDraw = document.getElementById("draw");
const imgWrapperNL = document.querySelectorAll(".image-wrapper");
const resultText = document.getElementById("feedbackText");
const counterStat = document.getElementById("counterRem");

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

window.addEventListener("DOMContentLoaded", () => {
  update();
});
btnNew.addEventListener("click", newDeck);
btnDraw.addEventListener("click", drawCards);

function update(data = {}) {
  btnDraw.removeAttribute("disabled");
  !deckId && btnDraw.setAttribute("disabled", "");
  !data.remaining && btnDraw.setAttribute("disabled", "");
}

function newDeck() {
  fetch(url + "new/shuffle/")
    .then(res => res.json())
    .then(data => {
      deckId = data.deck_id;
      counterStat.innerText = `Remaining Cards: ${data.remaining}`;
      update(data);
    });
}

function drawCards() {
  clear();
  fetch(url + deckId + "/draw/?count=2")
    .then(res => res.json())

    .then(data => {
      counterStat.innerText = `Remaining Cards: ${data.remaining}`;
      update(data);
      display(data.cards);
    });
}

function display(cardsArr) {
  // @param: array of cards
  cardsArr.forEach((card, idx) => {
    const imgElm = document.createElement("img");
    imgElm.src = card.image;
    imgElm.alt = `${card.value} of ${card.suit}.`;

    imgElm.onload = () => {
      imgWrapperNL[idx].appendChild(imgElm);
      updateScore(cardsArr);
    };
  });
}

function updateScore(cardsArr) {
  resultText.innerHTML = compareCards(cardsArr[0], cardsArr[1]);
}

function compareCards(card1, card2) {
  // @param two cards object

  const card1Score = cardsArr.indexOf(card1.value);
  const card2Score = cardsArr.indexOf(card2.value);
  if (card1Score > card2Score) return "I Win!";
  if (card1Score < card2Score) return "You Won!";
  if (card1Score === card2Score) return "War!";
}

function clear() {
  imgWrapperNL.forEach(elm => (elm.innerHTML = ""));
}
