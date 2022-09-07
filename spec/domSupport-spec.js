const {checkIfCorrect, shuffleCards} = require("../src/memory-game");
const obj = require("../src/object");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const fs = require("fs");
const document = new JSDOM(fs.readFileSync("./index.html", "utf-8")).window
  .document;
global.document = document;
const obj = require("../src/memory-game")
describe("checkIfCorrect()", () => {
    
});