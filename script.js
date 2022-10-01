'use strict';

let scorePlayer1 = 0;
let scorePlayer2 = 0;
let currentscore = 0;
let playerPlaying = 0;
let playing = true;

const displayScore = function (player, point) {
  if (player === 0) document.querySelector('#score--0').textContent = point;
  else document.querySelector('#score--1').textContent = point;
};

const displayCurrent = function (player, point) {
  if (player === 0) {
    document.querySelector('#current--0').textContent = point;
    document.querySelector('#current--1').textContent = 0;
  } else {
    document.querySelector('#current--0').textContent = 0;
    document.querySelector('#current--1').textContent = point;
  }
};

const displayRoll = function (number) {
  if (number !== 0) {
    for (let i = 1; i <= 6; i++) {
      if (number === i) {
        document.querySelector('.dice').src = `dice-${number}.png`;
        break;
      }
    }

    if (document.querySelector('.dice').classList.contains('hidden'))
      document.querySelector('.dice').classList.remove('hidden');
  } else {
    if (!document.querySelector('.dice').classList.contains('hidden'))
      document.querySelector('.dice').classList.add('hidden');
  }
};

const displayPlayer = function (number) {
  if (number === 0) {
    if (
      !document.querySelector('.player--0').classList.contains('player--active')
    ) {
      document.querySelector('.player--0').classList.add('player--active');
      document.querySelector('.player--1').classList.remove('player--active');
    }
  }
  if (number === 1) {
    if (
      !document.querySelector('.player--1').classList.contains('player--active')
    ) {
      document.querySelector('.player--1').classList.add('player--active');
      document.querySelector('.player--0').classList.remove('player--active');
    }
  }
};

const resetGame = function () {
  currentscore = 0;
  playerPlaying = 0;
  scorePlayer1 = 0;
  scorePlayer2 = 0;
  playing = true;
  displayCurrent(0, 0);
  displayScore(0, 0);
  displayScore(1, 0);
  displayRoll(0);
  displayPlayer(playerPlaying);
  // If winner then clear
  if (document.querySelector('.player--0').classList.contains('player--winner'))
    document.querySelector('.player--0').classList.remove('player--winner');
  else if (
    document.querySelector('.player--1').classList.contains('player--winner')
  )
    document.querySelector('.player--1').classList.remove('player--winner');
};

// Start setting
resetGame();

// New Game Setting
document.querySelector('.btn--new').addEventListener('click', resetGame);

// Roll dice setting
document.querySelector('.btn--roll').addEventListener('click', function () {
  if (playing) {
    const numberRoll = Math.trunc(Math.random() * 6) + 1;
    currentscore += numberRoll;

    //   display picture roll
    displayRoll(numberRoll);

    //   If numberRoll = 1
    if (numberRoll === 1) {
      if (playerPlaying === 0) {
        playerPlaying = 1;
        currentscore = 0;
        displayPlayer(1);
        displayCurrent(0, 0);
      } else {
        playerPlaying = 0;
        currentscore = 0;
        displayPlayer(0);
        displayCurrent(0, 0);
      }
    } else {
      //  Display current point
      if (playerPlaying === 0) displayCurrent(0, currentscore);
      else displayCurrent(1, currentscore);
    }
  }
});

// Hold Setting
document.querySelector('.btn--hold').addEventListener('click', function () {
  if (playing) {
    if (playerPlaying === 0) {
      scorePlayer1 += currentscore;
      playerPlaying = 1;
      currentscore = 0;
      displayCurrent(0, 0);
      displayScore(0, scorePlayer1);
      displayPlayer(1);
    } else {
      scorePlayer2 += currentscore;
      playerPlaying = 0;
      currentscore = 0;
      displayCurrent(0, 0);
      displayScore(1, scorePlayer2);
      displayPlayer(0);
    }
  }

  //   If score > 100 then
  if (scorePlayer1 >= 100) {
    playing = false;
    document.querySelector('.player--0').classList.add('player--winner');
  } else if (scorePlayer2 >= 100) {
    playing = false;
    document.querySelector('.player--1').classList.add('player--winner');
  }
});
