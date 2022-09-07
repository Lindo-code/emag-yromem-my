const obj = require("./object");

document.addEventListener("DOMContentLoaded", function() {
  const cardsArr = Array.prototype.slice.call(obj.cardsDiv.getElementsByClassName('card'));
  cardsArr.forEach((card) => {
    obj.cardsDiv.removeChild(card);
  });
  shuffleCards(cardsArr);
  cardsArr.forEach((card) => {
    obj.cardsDiv.appendChild(card);
  })
});

function shuffleCards(arrOfCards) {
  for (let i = arrOfCards.length - 1; i > 0; i--) {
    const int = Math.floor(Math.random() * (i + 1));
    const tempCard = arrOfCards[i];
    arrOfCards[i] = arrOfCards[int];
    arrOfCards[int] = tempCard;
  }
  return arrOfCards;
}

obj.cards.forEach((card) => {
  card.addEventListener("click", () => {
    if(!obj.cardID.includes(card.getAttribute("idNum"))){
      card.classList.add("clicked");
      if (obj.counter === 0) {
        obj.cardID.push(card.getAttribute("idNum"));
        obj.firstSelection = card.getAttribute("item");
        obj.counter++;
      } else {
        obj.cardsIdTemp.push(card.getAttribute("idNum"))
        obj.secondSelection = card.getAttribute("item");
        obj.counter = 0;
        return checkIfCorrect();
      };
    };
  });
});

function checkIfCorrect() {
  const correctCards = document.querySelectorAll( ".card[item='" + obj.firstSelection + "']");
  const incorrectCards = document.querySelectorAll(".card.clicked");
  if (obj.firstSelection === obj.secondSelection) {
    obj.wins++;
    obj.result.style.color = "green"
    obj.result.innerText = obj.wins === 6 ? "Congratulations!" : "Correct!";
    obj.winStreak++;
    obj.streak.innerText = `Winning Streak: ${obj.winStreak}`;
    correctCards[0].classList.add("checked");
    correctCards[0].classList.remove("clicked");
    correctCards[1].classList.add("checked");
    correctCards[1].classList.remove("clicked");
    obj.cardID.push(obj.cardsIdTemp[0]);
    obj.cardsIdTemp = [];
  } else {
    obj.cardID.pop();
    obj.cardsIdTemp = [];
    obj.result.style.color = "red"
    obj.result.innerText = "Incorrect!";
    obj.winStreak = 0;
    obj.streak.innerText = `Winning Streak: ${obj.winStreak}`;
    incorrectCards[0].classList.add("turn");
    incorrectCards[1].classList.add("turn");

    setTimeout(() => {
      incorrectCards[0].classList.remove("turn");
      incorrectCards[0].classList.remove("clicked");
      incorrectCards[1].classList.remove("turn");
      incorrectCards[1].classList.remove("clicked");
    }, 800);
  }
}

module.exports = {checkIfCorrect, shuffleCards};