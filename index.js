import { cards } from "./Cards/cards.js";
// variables
let mycards = [...cards];
let groundCards = [];
let p1Cards = [];
let p2Cards = [];
let p1Score = 0;
let p2Score = 0;
let whoPlays = true;
//

//
const ground = document.querySelector("div.ground");
const p1Ground = document.querySelector("div.p1");
const p2Ground = document.querySelector("div.p2");
const score1Elem = document.querySelector(".score1");
const score2Elem = document.querySelector(".score2");
/* -------------------------------- */
{
}

/* ----------------------- functions ----------------------- */
function GetCard() {
  return mycards.splice(Random(0, mycards.length - 1), 1)[0];
}

function Random(min, max) {
  return Math.random() * (max - min) + min;
}

function PlayerCards(ground, b) {
  for (let i = 0; i < 4; i++) {
    const card = GetCard();
    if (b) {
      ground.innerHTML += `<div class="card-cont" b="true" cardName="${card.name}" onclick='clickHandler(this)'>
                <img src="Cards/${card.img}" />
              </div>`;
      p1Cards.push(card);
    } else {
      ground.innerHTML += `<div class="card-cont" b="false" cardName="${card.name}" onclick='clickHandler(this)'>
        <img src="Cards/${card.img}" />
        </div>`;
      p2Cards.push(card);
    }
  }
}
function PlayCards() {
  for (let i = 0; i < 4; i++) {
    const card = GetCard();
    groundCards.push(card);
    ground.innerHTML += `<div class="card-cont" cardName="${card.name}" onclick='clickHandler(this)'>
            <img src="Cards/${card.img}" />
          </div>`;
  }
}
function CompareCard(cardName, b) {
  let cardNameArr = cardName.split("_");
  cardNameArr.pop();
  const cardNameStr = cardNameArr.join("");
  let groundCard = groundCards.find((card) => {
    const ss = card.name.split("_");
    ss.pop();
    return ss.join("") === cardNameStr;
  });
  if (groundCard !== undefined) {
    RemoveCard(cardName, b, groundCard);
  } else {
    AddToGround(cardName, b);
  }
  whoPlays = !whoPlays;
  if (p1Cards.length === 0) {
    PlayerCards(p1Ground, true);
  }
  if (p2Cards.length === 0) {
    PlayerCards(p2Ground, false);
  }
  if (p1Score >= 50) {
    alert("Player 1 Won");
    ResetGame();
  }
  if (p2Score >= 50) {
    alert("Player 2 Won");
    ResetGame();
  }
}
function RemoveCard(cardName, b, groundCard) {
  if (b === "true") {
    p1Score += p1Cards.find((c) => c.name === cardName).score;
    score1Elem.textContent = p1Score;
    p1Cards = p1Cards.filter((card) => card.name != cardName);
    groundCards = groundCards.filter((card) => card.name != groundCard.name);
    UpdateGround(p1Ground, p1Cards, b);
  } else {
    p2Score += p2Cards.find((c) => c.name === cardName).score;
    score2Elem.textContent = p2Score;
    p2Cards = p2Cards.filter((card) => card.name != cardName);
    groundCards = groundCards.filter((card) => card.name != groundCard.name);
    UpdateGround(p2Ground, p2Cards, b);
  }
  UpdateGround(ground, groundCards);
}

function UpdateGround(ground, cards, b = "") {
  ground.innerHTML = "";
  for (let i = 0; i < cards.length; i++) {
    ground.innerHTML += `<div class="card-cont" b="${b}" cardName="${cards[i].name}" onclick='clickHandler(this)'>
            <img src="Cards/${cards[i].img}" />
          </div>`;
  }
}

function AddToGround(cardName, b) {
  let card;
  if (b === "true") {
    card = p1Cards.find((c) => c.name === cardName);
    p1Cards = p1Cards.filter((c) => c.name != card.name);
    UpdateGround(p1Ground, p1Cards, b);
    groundCards.push(card);
    UpdateGround(ground, groundCards);
  } else {
    card = p2Cards.find((c) => c.name === cardName);
    p2Cards = p2Cards.filter((c) => c.name != card.name);
    UpdateGround(p2Ground, p2Cards, b);
    groundCards.push(card);
    UpdateGround(ground, groundCards);
  }
}
function ResetGame() {
  mycards = [...cards];
  p1Cards = [];
  p2Cards = [];
  p1Score = 0;
  p2Score = 0;
  score1Elem.textContent = 0;
  score2Elem.textContent = 0;
  ground.innerHTML = "";
  p1Ground.innerHTML = "";
  p2Ground.innerHTML = "";
  whoPlays = true;
}

function StartGame() {
  PlayCards();
  PlayerCards(p1Ground, true);
  PlayerCards(p2Ground, false);
}
/* ----------------------- events ----------------------- */
window.clickHandler = clickHandler;
function clickHandler(cardElement) {
  const b = cardElement.getAttribute("b");
  if (b.length) {
    if (whoPlays === (b === "true"))
      CompareCard(cardElement.getAttribute("cardName"), b);
    else alert("wrong player");
  }
}

document
  .querySelector("div.input-cont > button")
  .addEventListener("click", () => {
    ResetGame();
    StartGame();
  });
