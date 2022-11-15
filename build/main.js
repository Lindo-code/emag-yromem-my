/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom-elements.js":
/*!*****************************!*\
  !*** ./src/dom-elements.js ***!
  \*****************************/
/***/ ((module) => {

eval("module.exports = {\n  buttonText: document.querySelector('.btn-text'),\n  replayBtnTxt: document.querySelector('.replay-btn-txt'),\n  result: document.querySelector('.result'),\n  cardsDiv: document.querySelector('.cards'),\n  cards: document.querySelectorAll('.cards .card'),\n  gridsDiv: document.querySelector('.grids'),\n  grids: document.querySelectorAll('.grids .grid-button'),\n  guide: document.querySelector('.guide'),\n  stats: document.querySelector('.stats'),\n  restartBtn: document.querySelector('.restart'),\n  replayBtn: document.querySelector('.replay'),\n  show: document.getElementsByClassName('show'),\n  hide: document.getElementsByClassName('hide'),\n  winStreakCount: document.querySelector('.winning-streak'),\n  time: document.querySelector('.time'),\n};\n\n\n//# sourceURL=webpack://emag-yromem-my/./src/dom-elements.js?");

/***/ }),

/***/ "./src/game-controllers.js":
/*!*********************************!*\
  !*** ./src/game-controllers.js ***!
  \*********************************/
/***/ ((module) => {

eval("module.exports = {\n  clicks: 0,\n  secs: 0,\n  mins: 0,\n  startTime: null,\n  counter: 0,\n  firstSelection: '',\n  secondSelection: '',\n  cardID: [],\n  cardsIdTemp: [],\n  winStreak: 0,\n  wins: 0,\n};\n\n\n//# sourceURL=webpack://emag-yromem-my/./src/game-controllers.js?");

/***/ }),

/***/ "./src/memory-game.js":
/*!****************************!*\
  !*** ./src/memory-game.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const element = __webpack_require__(/*! ./dom-elements */ \"./src/dom-elements.js\");\nconst controller = __webpack_require__(/*! ./game-controllers */ \"./src/game-controllers.js\");\nconst {\n  createChosenGrid,\n  checkIfCorrect,\n  restartGame,\n  replayGame,\n  timeElapsed,\n} = __webpack_require__(/*! ../utils/functions */ \"./utils/functions.js\");\n\nelement.grids.forEach((grid) => {\n  let gridSize, columns;\n  grid.addEventListener('click', () => {\n    setTimeout(() => {\n      columns = 'auto auto auto auto';\n      if (grid.getAttribute('grid') === '2X2') {\n        gridSize = 7;\n        columns = 'auto auto';\n      } else if (grid.getAttribute('grid') === '3X2') {\n        gridSize = 5;\n        columns = 'auto auto auto';\n      } else if (grid.getAttribute('grid') === '4X2') {\n        gridSize = 3;\n      }\n      createChosenGrid(gridSize, columns);\n      element.time.style.display = 'block';\n    }, 500);\n  });\n});\n\nelement.cards.forEach((card) => {\n  element.cardsDiv.style.pointerEvents = 'initial';\n  card.addEventListener('click', () => {\n    if (controller.clicks === 0) {\n      timeElapsed();\n    }\n    if (!controller.cardID.includes(card.getAttribute('idNum'))) {\n      card.classList.add('rotate');\n      card.classList.add('clicked');\n      if (controller.counter === 0) {\n        controller.cardID.push(card.getAttribute('idNum'));\n        controller.firstSelection = card.getAttribute('item');\n        controller.counter++;\n        controller.clicks++;\n      } else {\n        element.cardsDiv.style.pointerEvents = 'none';\n        controller.cardsIdTemp.push(card.getAttribute('idNum'));\n        controller.secondSelection = card.getAttribute('item');\n        controller.counter = 0;\n        return checkIfCorrect();\n      }\n    }\n  });\n});\n\nelement.restartBtn.addEventListener('click', () => {\n  element.restartBtn.style.transform = 'scale(.8)';\n  setTimeout(() => {\n    element.restartBtn.style.transform = 'scale(1)';\n  }, 300);\n  setTimeout(() => {\n    restartGame();\n  }, 700);\n});\n\nelement.replayBtn.addEventListener('click', () => {\n  element.replayBtn.style.transform = 'scale(.8)';\n  setTimeout(() => {\n    element.replayBtn.style.transform = 'scale(1)';\n  }, 300);\n  setTimeout(() => {\n    replayGame();\n  }, 700);\n});\n\nmodule.exports = { checkIfCorrect, createChosenGrid, replayGame };\n\n\n//# sourceURL=webpack://emag-yromem-my/./src/memory-game.js?");

/***/ }),

/***/ "./utils/functions.js":
/*!****************************!*\
  !*** ./utils/functions.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const element = __webpack_require__(/*! ../src/dom-elements */ \"./src/dom-elements.js\");\nconst controller = __webpack_require__(/*! ../src/game-controllers */ \"./src/game-controllers.js\");\n\nfunction createChosenGrid(num, str) {\n  const cardsArr = Array.prototype.slice.call(element.cardsDiv.getElementsByClassName('card')); const\n    grid = num;\n  element.winStreakCount.style.display = 'block';\n  element.replayBtn.style.display = 'block';\n  cardsArr.forEach((card) => {\n    element.cardsDiv.removeChild(card);\n  });\n  for (let i = 0; i <= grid; i++) cardsArr.pop();\n  shuffleCards(cardsArr);\n  cardsArr.forEach((card) => {\n    element.cardsDiv.appendChild(card);\n  });\n  revealCardsUI(str);\n}\n\nfunction checkIfCorrect() {\n  const correctCards = document.querySelectorAll(`.card[item='${controller.firstSelection}']`);\n  const incorrectCards = document.querySelectorAll('.card.clicked');\n  const cardsArr = Array.prototype.slice.call(element.cardsDiv.getElementsByClassName('card')).length;\n  if (controller.firstSelection === controller.secondSelection) {\n    controller.wins += 1;\n    element.result.style.color = 'lime';\n    if ((controller.wins === 6 && cardsArr === 12) || (controller.wins === 4 && cardsArr === 8) || (controller.wins === 3 && cardsArr === 6) || (controller.wins === 2 && cardsArr === 4)) {\n      clearInterval(controller.startTime);\n      element.time.style.color = 'gold';\n      element.time.innerText = `${controller.mins}`.length === 1 && `${controller.secs}`.length === 1 ? `Completed In ${controller.mins}:0${controller.secs}` : `${controller.mins}`.length !== 1 && `${controller.secs}`.length === 1 ? `Completed In ${controller.mins}:${controller.secs}` : `Completed In ${controller.mins}:${controller.secs}`;\n      controller.winStreak += 1;\n      element.winStreakCount.innerText = `Consecutive Matched Pairs : ${controller.winStreak}`;\n      element.result.innerText = 'Congratulations!';\n      atcivateButtons();\n      element.stats.style.display = 'block';\n      element.cardsDiv.style.pointerEvents = 'initial';\n    } else {\n      matchCards();\n    }\n    remainUpturned(correctCards);\n  } else {\n    flipBack(incorrectCards);\n  }\n}\n\nfunction shuffleCards(arrOfCards) {\n  const cardsArr = arrOfCards;\n  for (let i = arrOfCards.length - 1; i > 0; i--) {\n    const int = Math.floor(Math.random() * (i + 1)); const\n      tempCard = cardsArr[i];\n    cardsArr[i] = cardsArr[int];\n    cardsArr[int] = tempCard;\n  }\n  return arrOfCards;\n}\n\nfunction restartGame() {\n  window.location.reload();\n}\n\nfunction replayGame() {\n  const cardsArr = Array.prototype.slice.call(element.cardsDiv.getElementsByClassName('card'));\n  resetGame();\n  createChosenGrid();\n  element.time.style.display = 'block';\n  resetCards(cardsArr);\n  element.winStreakCount.innerText = `Consecutive Matched Pairs : ${controller.winStreak}`;\n  element.replayBtn.style.pointerEvents = 'none';\n}\n\nfunction timeElapsed() {\n  controller.startTime = setInterval(() => {\n    if (controller.secs === 60) {\n      controller.mins++;\n      controller.secs = 0;\n    }\n    controller.secs++;\n    element.time.innerText = `${controller.mins}`.length === 1 && `${controller.secs}`.length === 1 ? `${controller.mins}:0${controller.secs}` : `${controller.mins}`.length !== 1 && `${controller.secs}`.length === 1 ? `${controller.mins}:0${controller.secs}` : `${controller.mins}:${controller.secs}`;\n  }, 1000);\n}\n\nfunction matchCards() {\n  controller.winStreak += 1;\n  element.winStreakCount.innerText = `Consecutive Matched Pairs : ${controller.winStreak}`;\n  element.result.innerText = 'Correct!';\n  element.replayBtnTxt.innerText = 'Match More Cards & Win The Game';\n  setTimeout(() => {\n    element.cardsDiv.style.pointerEvents = 'initial';\n  }, 200);\n}\n\nfunction flipBack(incorrectCards) {\n  controller.winStreak = 0;\n  element.winStreakCount.innerText = `Consecutive Matched Pairs : ${controller.winStreak}`;\n  controller.cardID.pop();\n  controller.cardsIdTemp = [];\n  element.result.style.color = 'red';\n  element.result.innerText = 'Incorrect!';\n  element.replayBtnTxt.innerText = 'Flip A Card & Try Again';\n  incorrectCards[0].classList.add('turn');\n  incorrectCards[1].classList.add('turn');\n  setTimeout(() => {\n    incorrectCards.forEach((card) => {\n      card.classList.remove('turn');\n      card.classList.remove('clicked');\n      card.classList.remove('rotate');\n    });\n    element.cardsDiv.style.pointerEvents = 'initial';\n  }, 800);\n}\n\nfunction resetCards(cardsArr) {\n  cardsArr.forEach((card) => {\n    card.classList.remove('turn');\n    card.classList.remove('checked');\n    card.classList.remove('rotate');\n  });\n}\n\nfunction resetGame() {\n  controller.startTime = null; controller.mins = 0; controller.secs = 0;\n  controller.wins = 0; element.replayBtnTxt.innerText = 'Flip All Matching Pairs To Win';\n  controller.cardID = []; controller.winStreak = 0; controller.clicks = 0;\n  element.result.style.color = 'gold'; element.time.style.color = 'white';\n  element.time.innerText = '0:00';\n}\n\nfunction revealCardsUI(str) {\n  element.result.innerHTML = \"Let's Play!\";\n  element.show[0].style.gridTemplateColumns = `${str}`;\n  element.hide[0].style.display = 'none';\n  element.show[0].style.display = 'grid';\n  element.guide.style.display = 'none';\n  element.stats.style.display = 'none';\n  element.restartBtn.style.display = 'none';\n  element.time.style.display = 'none';\n}\n\nfunction atcivateButtons() {\n  element.replayBtn.style.pointerEvents = 'initial';\n  element.restartBtn.style.pointerEvents = 'initial';\n  element.buttonText.innerText = 'Restart';\n  element.replayBtnTxt.innerText = 'Replay';\n  element.restartBtn.style.display = 'grid';\n}\n\nfunction remainUpturned(correctCards) {\n  correctCards.forEach((card) => {\n    card.classList.add('checked');\n    card.classList.remove('clicked');\n  });\n  controller.cardID.push(controller.cardsIdTemp[0]);\n  controller.cardsIdTemp = [];\n}\n\nmodule.exports = {\n  createChosenGrid, checkIfCorrect, replayGame, restartGame, timeElapsed,\n};\n\n\n//# sourceURL=webpack://emag-yromem-my/./utils/functions.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/memory-game.js");
/******/ 	
/******/ })()
;