'use strict';
//////////////////////// Functions //////////////////////////////////////////////////////////////

// random number between 1 and 20
const getRandomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min) + min);

// get user number
const getUserInput = () => {
  const inputNumber = document.getElementById('input').value;
  return inputNumber;
};

//display message (hints)
const hintMessage = message => {
  document.querySelector('.number-hint').textContent = message;
};

// button toggle (disabilty)
const btnDisable = value => {
  document.querySelector('.btn--check').disabled = value;
};

//update high score
const updateScore = score => {
  if (score.currentScore > score.highScore) {
    score.highScore = score.currentScore;
    document.querySelector('.highScore-num').textContent = score.highScore;
  }
};

// display score
const displayScore = score => {
  document.querySelector('.score-num').textContent = score.currentScore;
};

// background color set
const bgColor = color => {
  document.body.style.backgroundColor = color;
};

//display random number
const displayRanNum = num => {
  document.querySelector('.target-number').textContent = num;
};

// check game state win or lost
const gameLost = score => {
  if (score.currentScore < 2) {
    score.currentScore--;
    displayScore(score);
    hintMessage('💥 you lost the game');
    return true;
  }
  return false;
};

// game logic
const gameLogic = (randomNumber, userNumber, score) => {
  const lost = gameLost(score);
  if (!lost && randomNumber === userNumber) {
    score.currentScore--;
    hintMessage('🎉 correct Number');
    btnDisable(true);
    displayScore(score);
    bgColor('#60b347');
    displayRanNum(randomNumber);
    updateScore(score);
  } else if (!lost && userNumber != randomNumber) {
    score.currentScore--;
    displayScore(score);
    hintMessage(userNumber > randomNumber ? '📈 too high!' : '📉 too low!');
  }
};

// reset function
const reset = score => {
  btnDisable(false);
  bgColor('#333');
  score.currentScore = 20;
  displayScore(score);
  hintMessage('Start Guessing...');
  displayRanNum('?');
  console.log(document.querySelector('#input').textContent);
  document.querySelector('#input').value = '';
};

// game main function
const main = (randomNumber, currentScore) => {
  let userNumber = Number(getUserInput());
  //   if input is non-empty then work
  !userNumber
    ? hintMessage('⚠ No Number')
    : gameLogic(randomNumber, userNumber, currentScore);
};

//game start function
const start = (score, randomNumber) => {
  document.querySelector('.btn--check').addEventListener('click', function () {
    main(randomNumber, score);
  });
  document.querySelector('.btn--again').addEventListener('click', function () {
    reset(score);
  });
};

////////////////////// Main ///////////////////////////////////////////////////////////////////////
let score = {
  currentScore: 20,
  highScore: 0,
};

let randomNumber = getRandomNumber(1, 20);

start(score, randomNumber);
