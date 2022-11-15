const element = require('../src/dom-elements');
const controller = require('../src/game-controllers');

function createChosenGrid(num, str) {
  const cardsArr = Array.prototype.slice.call(element.cardsDiv.getElementsByClassName('card')); const
    grid = num;
  element.winStreakCount.style.display = 'block';
  element.replayBtn.style.display = 'block';
  cardsArr.forEach((card) => {
    element.cardsDiv.removeChild(card);
  });
  for (let i = 0; i <= grid; i++) cardsArr.pop();
  shuffleCards(cardsArr);
  cardsArr.forEach((card) => {
    element.cardsDiv.appendChild(card);
  });
  revealCardsUI(str);
}

function checkIfCorrect() {
  const correctCards = document.querySelectorAll(`.card[item='${controller.firstSelection}']`);
  const incorrectCards = document.querySelectorAll('.card.clicked');
  const cardsArr = Array.prototype.slice.call(element.cardsDiv.getElementsByClassName('card')).length;
  if (controller.firstSelection === controller.secondSelection) {
    controller.wins += 1;
    element.result.style.color = 'lime';
    if ((controller.wins === 6 && cardsArr === 12) || (controller.wins === 4 && cardsArr === 8) || (controller.wins === 3 && cardsArr === 6) || (controller.wins === 2 && cardsArr === 4)) {
      clearInterval(controller.startTime);
      element.time.style.color = 'gold';
      element.time.innerText = `${controller.mins}`.length === 1 && `${controller.secs}`.length === 1 ? `Completed In ${controller.mins}:0${controller.secs}` : `${controller.mins}`.length !== 1 && `${controller.secs}`.length === 1 ? `Completed In ${controller.mins}:${controller.secs}` : `Completed In ${controller.mins}:${controller.secs}`;
      controller.winStreak += 1;
      element.winStreakCount.innerText = `Consecutive Matched Pairs : ${controller.winStreak}`;
      element.result.innerText = 'Congratulations!';
      atcivateButtons();
      element.stats.style.display = 'block';
      element.cardsDiv.style.pointerEvents = 'initial';
    } else {
      matchCards();
    }
    remainUpturned(correctCards);
  } else {
    flipBack(incorrectCards);
  }
}

function shuffleCards(arrOfCards) {
  const cardsArr = arrOfCards;
  for (let i = arrOfCards.length - 1; i > 0; i--) {
    const int = Math.floor(Math.random() * (i + 1)); const
      tempCard = cardsArr[i];
    cardsArr[i] = cardsArr[int];
    cardsArr[int] = tempCard;
  }
  return arrOfCards;
}

function restartGame() {
  window.location.reload();
}

function replayGame() {
  const cardsArr = Array.prototype.slice.call(element.cardsDiv.getElementsByClassName('card'));
  resetGame();
  createChosenGrid();
  element.time.style.display = 'block';
  resetCards(cardsArr);
  element.winStreakCount.innerText = `Consecutive Matched Pairs : ${controller.winStreak}`;
  element.replayBtn.style.pointerEvents = 'none';
}

function timeElapsed() {
  controller.startTime = setInterval(() => {
    if (controller.secs === 60) {
      controller.mins++;
      controller.secs = 0;
    }
    controller.secs++;
    element.time.innerText = `${controller.mins}`.length === 1 && `${controller.secs}`.length === 1 ? `${controller.mins}:0${controller.secs}` : `${controller.mins}`.length !== 1 && `${controller.secs}`.length === 1 ? `${controller.mins}:0${controller.secs}` : `${controller.mins}:${controller.secs}`;
  }, 1000);
}

function matchCards() {
  controller.winStreak += 1;
  element.winStreakCount.innerText = `Consecutive Matched Pairs : ${controller.winStreak}`;
  element.result.innerText = 'Correct!';
  element.replayBtnTxt.innerText = 'Match More Cards & Win The Game';
  setTimeout(() => {
    element.cardsDiv.style.pointerEvents = 'initial';
  }, 200);
}

function flipBack(incorrectCards) {
  controller.winStreak = 0;
  element.winStreakCount.innerText = `Consecutive Matched Pairs : ${controller.winStreak}`;
  controller.cardID.pop();
  controller.cardsIdTemp = [];
  element.result.style.color = 'red';
  element.result.innerText = 'Incorrect!';
  element.replayBtnTxt.innerText = 'Flip A Card & Try Again';
  incorrectCards[0].classList.add('turn');
  incorrectCards[1].classList.add('turn');
  setTimeout(() => {
    incorrectCards.forEach((card) => {
      card.classList.remove('turn');
      card.classList.remove('clicked');
      card.classList.remove('rotate');
    });
    element.cardsDiv.style.pointerEvents = 'initial';
  }, 800);
}

function resetCards(cardsArr) {
  cardsArr.forEach((card) => {
    card.classList.remove('turn');
    card.classList.remove('checked');
    card.classList.remove('rotate');
  });
}

function resetGame() {
  controller.startTime = null; controller.mins = 0; controller.secs = 0;
  controller.wins = 0; element.replayBtnTxt.innerText = 'Flip All Matching Pairs To Win';
  controller.cardID = []; controller.winStreak = 0; controller.clicks = 0;
  element.result.style.color = 'gold'; element.time.style.color = 'white';
  element.time.innerText = '0:00';
}

function revealCardsUI(str) {
  element.result.innerHTML = "Let's Play!";
  element.show[0].style.gridTemplateColumns = `${str}`;
  element.hide[0].style.display = 'none';
  element.show[0].style.display = 'grid';
  element.guide.style.display = 'none';
  element.stats.style.display = 'none';
  element.restartBtn.style.display = 'none';
  element.time.style.display = 'none';
}

function atcivateButtons() {
  element.replayBtn.style.pointerEvents = 'initial';
  element.restartBtn.style.pointerEvents = 'initial';
  element.buttonText.innerText = 'Restart';
  element.replayBtnTxt.innerText = 'Replay';
  element.restartBtn.style.display = 'grid';
}

function remainUpturned(correctCards) {
  correctCards.forEach((card) => {
    card.classList.add('checked');
    card.classList.remove('clicked');
  });
  controller.cardID.push(controller.cardsIdTemp[0]);
  controller.cardsIdTemp = [];
}

module.exports = {
  createChosenGrid, checkIfCorrect, replayGame, restartGame, timeElapsed,
};
