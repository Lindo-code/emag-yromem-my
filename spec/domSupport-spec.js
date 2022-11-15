const jsdom = require('jsdom');

const { JSDOM } = jsdom;
const fs = require('fs');

const dom = new JSDOM(fs.readFileSync('./index.html', 'utf-8'));
global.document = dom.window.document;
const { checkIfCorrect, createChosenGrid, replayGame } = require('../src/memory-game');
const element = require('../src/dom-elements');
const controller = require('../src/game-controllers');
const { timeElapsed } = require('../utils/functions');

describe('checkIfCorrect()', () => {
  it('should change Consecutive Matched Pairs : 0 to Consecutive Matched Pairs : 1', () => {
    controller.winStreak = 0;
    controller.firstSelection = 'coffee';
    controller.counter = 1;
    controller.secondSelection = 'coffee';
    checkIfCorrect();
    expect(global.document.querySelector('.winning-streak').innerText).toBe('Consecutive Matched Pairs : 1');
  });
  it('should change Consecutive Matched Pairs : 2 to Consecutive Matched Pairs : 3', () => {
    controller.winStreak = 2;
    controller.firstSelection = 'whale';
    controller.counter = 1;
    controller.secondSelection = 'whale';
    checkIfCorrect();
    expect(global.document.querySelector('.winning-streak').innerText).toBe('Consecutive Matched Pairs : 3');
  });
  it('should display Correct! at the top of ui', () => {
    controller.firstSelection = 'hexagon';
    controller.counter = 1;
    controller.secondSelection = 'hexagon';
    checkIfCorrect();
    expect(global.document.querySelector('.result').innerText).toBe('Correct!');
  });
  it('should display Congratulations! at the top of ui', () => {
    controller.firstSelection = 'hexagon';
    controller.counter = 1;
    controller.secondSelection = 'hexagon';
    controller.wins = 5;
    checkIfCorrect();
    expect(global.document.querySelector('.result').innerText).toBe('Congratulations!');
  });
});

describe('createChosenGrid()', () => {
  createChosenGrid('auto auto auto auto');
  it('should display 12 cards on the ui', () => {
    const cardsArr = Array.prototype.slice.call(global.document.getElementsByClassName('card')).length;
    expect(cardsArr).toBe(12);
  });
  it('should hide grid ui buttons', () => {
    expect(global.document.getElementsByClassName('hide')[0].style.display).toBe('none');
  });
  it('should display cards ui', () => {
    expect(global.document.getElementsByClassName('show')[0].style.display).toBe('grid');
  });
  it('should hide Pick A Grid text', () => {
    expect(global.document.getElementsByClassName('guide')[0].style.display).toBe('none');
  });
});

describe('replayGame()', () => {
  createChosenGrid('auto auto auto auto');
  it('should revert wins, winStreak & cardID to initial values', () => {
    controller.firstSelection = 'hexagon';
    controller.counter = 1;
    controller.secondSelection = 'hexagon';
    controller.wins = 5;
    checkIfCorrect();
    replayGame();
    expect(controller.cardID.length).toBe(0);
    expect(controller.winStreak).toBe(0);
    expect(controller.wins).toBe(0);
  });
});

describe('shuffleCards()', () => {
  it('should display Flip All Matching Pairs To Win', () => {
    const cardsArr = Array.prototype.slice.call(element.cardsDiv.getElementsByClassName('card'));
    createChosenGrid('auto auto auto auto');
    expect(Array.prototype.slice.call(element.cardsDiv.getElementsByClassName('card'))).not.toBe(cardsArr);
  });
});

describe('timeElapsed()', () => {
  it('should display Completed In 0:01 text after win', (done) => {
    controller.firstSelection = 'hexagon';
    timeElapsed();
    controller.counter = 1;
    controller.secondSelection = 'hexagon';
    controller.wins = 5;
    setTimeout(() => {
      checkIfCorrect();
      expect(global.document.querySelector('.time').innerText).toBe('Completed In 0:01');
      done();
    }, 1000);
  });
});
