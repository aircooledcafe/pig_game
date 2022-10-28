"use strict";

// Selecting Elements
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const diceEl = document.querySelector(".dice");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// initiating starting conditions for game
let scores, currentScore, activePlayer, playing;
// let currentScore;
// let activePlayer;
// let playing;

// function to initialize the game
const newGame = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  // Set score to zero and plkaying to active
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  // remove and add the relevant classes to players.
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  document.getElementById(`current--0`).textContent = 0;
  document.getElementById(`current--1`).textContent = 0;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};

newGame();

// function to switch the active play and reset current scores of now inactive player
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// rolling the dice
const dice = Math.trunc(Math.random() * 6) + 1;
console.log(dice);

btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1 generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    // 2 display the dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    // 3 check for rolled 1 and if true switch payer
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // add score to current score of active player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    console.log(scores);
    // check if active players score is >= 100
    // finish game declare winner
    if (scores[activePlayer] >= 100) {
      playing = false;
      console.log("winner");
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", newGame);
