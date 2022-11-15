const element = require('./dom-elements');
const controller = require('./game-controllers');
const {
  createChosenGrid,
  checkIfCorrect,
  restartGame,
  replayGame,
  timeElapsed,
} = require('../utils/functions');

element.grids.forEach((grid) => {
  let gridSize; let
    columns;
  grid.addEventListener('click', () => {
    setTimeout(() => {
      columns = 'auto auto auto auto';
      if (grid.getAttribute('grid') === '2X2') {
        gridSize = 7;
        columns = 'auto auto';
      } else if (grid.getAttribute('grid') === '3X2') {
        gridSize = 5;
        columns = 'auto auto auto';
      } else if (grid.getAttribute('grid') === '4X2') {
        gridSize = 3;
      }
      createChosenGrid(gridSize, columns);
      element.time.style.display = 'block';
    }, 500);
  });
});

element.cards.forEach((card) => {
  element.cardsDiv.style.pointerEvents = 'initial';
  card.addEventListener('click', () => {
    if (controller.clicks === 0) {
      timeElapsed();
    }
    if (!controller.cardID.includes(card.getAttribute('idNum'))) {
      card.classList.add('rotate');
      card.classList.add('clicked');
      if (controller.counter === 0) {
        controller.cardID.push(card.getAttribute('idNum'));
        controller.firstSelection = card.getAttribute('item');
        controller.counter++;
        controller.clicks++;
      } else {
        element.cardsDiv.style.pointerEvents = 'none';
        controller.cardsIdTemp.push(card.getAttribute('idNum'));
        controller.secondSelection = card.getAttribute('item');
        controller.counter = 0;
        return checkIfCorrect();
      }
    }
  });
});

element.restartBtn.addEventListener('click', () => {
  element.restartBtn.style.transform = 'scale(.8)';
  setTimeout(() => {
    element.restartBtn.style.transform = 'scale(1)';
  }, 300);
  setTimeout(() => {
    restartGame();
  }, 700);
});

element.replayBtn.addEventListener('click', () => {
  element.replayBtn.style.transform = 'scale(.8)';
  setTimeout(() => {
    element.replayBtn.style.transform = 'scale(1)';
  }, 300);
  setTimeout(() => {
    replayGame();
  }, 700);
});

module.exports = { checkIfCorrect, createChosenGrid, replayGame };
