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

/***/ "./src/memory-game.js":
/*!****************************!*\
  !*** ./src/memory-game.js ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const obj = __webpack_require__(/*! ./object */ \"./src/object.js\");\n\ndocument.addEventListener(\"DOMContentLoaded\", function() {\n  const cardsArr = Array.prototype.slice.call(obj.cardsDiv.getElementsByClassName('card'));\n  cardsArr.forEach((card) => {\n    obj.cardsDiv.removeChild(card);\n  });\n  shuffleCards(cardsArr);\n  cardsArr.forEach((card) => {\n    obj.cardsDiv.appendChild(card);\n  })\n});\n\nfunction shuffleCards(arrOfCards) {\n  for (let i = arrOfCards.length - 1; i > 0; i--) {\n    const int = Math.floor(Math.random() * (i + 1));\n    const tempCard = arrOfCards[i];\n    arrOfCards[i] = arrOfCards[int];\n    arrOfCards[int] = tempCard;\n  }\n  return arrOfCards;\n}\n\nobj.cards.forEach((card) => {\n  card.addEventListener(\"click\", () => {\n    if(!obj.cardID.includes(card.getAttribute(\"idNum\"))){\n      card.classList.add(\"clicked\");\n      if (obj.counter === 0) {\n        obj.cardID.push(card.getAttribute(\"idNum\"));\n        obj.firstSelection = card.getAttribute(\"item\");\n        obj.counter++;\n      } else {\n        obj.cardsIdTemp.push(card.getAttribute(\"idNum\"))\n        obj.secondSelection = card.getAttribute(\"item\");\n        obj.counter = 0;\n        return checkIfCorrect();\n      };\n    };\n  });\n});\n\nfunction checkIfCorrect() {\n  const correctCards = document.querySelectorAll( \".card[item='\" + obj.firstSelection + \"']\");\n  const incorrectCards = document.querySelectorAll(\".card.clicked\");\n  if (obj.firstSelection === obj.secondSelection) {\n    obj.wins++;\n    obj.result.style.color = \"green\"\n    obj.result.innerText = obj.wins === 6 ? \"Congratulations!\" : \"Correct!\";\n    obj.winStreak++;\n    obj.streak.innerText = `Winning Streak: ${obj.winStreak}`;\n    correctCards[0].classList.add(\"checked\");\n    correctCards[0].classList.remove(\"clicked\");\n    correctCards[1].classList.add(\"checked\");\n    correctCards[1].classList.remove(\"clicked\");\n    obj.cardID.push(obj.cardsIdTemp[0]);\n    obj.cardsIdTemp = [];\n  } else {\n    obj.cardID.pop();\n    obj.cardsIdTemp = [];\n    obj.result.style.color = \"red\"\n    obj.result.innerText = \"Incorrect!\";\n    obj.winStreak = 0;\n    obj.streak.innerText = `Winning Streak: ${obj.winStreak}`;\n    incorrectCards[0].classList.add(\"turn\");\n    incorrectCards[1].classList.add(\"turn\");\n\n    setTimeout(() => {\n      incorrectCards[0].classList.remove(\"turn\");\n      incorrectCards[0].classList.remove(\"clicked\");\n      incorrectCards[1].classList.remove(\"turn\");\n      incorrectCards[1].classList.remove(\"clicked\");\n    }, 800);\n  }\n}\n\nmodule.exports = {checkIfCorrect, shuffleCards};\n\n//# sourceURL=webpack://emag-yromem-my/./src/memory-game.js?");

/***/ }),

/***/ "./src/object.js":
/*!***********************!*\
  !*** ./src/object.js ***!
  \***********************/
/***/ ((module) => {

eval("module.exports = {\n    counter: 0,\n    firstSelection: \"\",\n    secondSelection: \"\",\n    cardID: [],\n    cardsIdTemp: [],\n    winStreak: 0,\n    wins: 0,\n    streak: document.querySelector(\".streak\"),\n    result: document.querySelector(\".result\"),\n    cardsDiv: document.querySelector(\".cards\"),\n    cards: document.querySelectorAll(\".cards .card\"),\n};\n\n\n//# sourceURL=webpack://emag-yromem-my/./src/object.js?");

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