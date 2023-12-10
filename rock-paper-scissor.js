let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreElement();
  /*
  if (!score) {
    score = {
      wins: 0,
      losses: 0,
      ties: 0
    };
  }
  */

function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You lose.';
      } else if (computerMove === 'paper') {
        result = 'You win.';
      } else if (computerMove === 'scissors') {
        result = 'Draw.';
      }

    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You win.';
      } else if (computerMove === 'paper') {
        result = 'Draw.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.';
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Draw.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You win.';
      }
    }

    if (result === 'You win.') {
      score.wins += 1;
    } else if (result === 'You lose.') {
      score.losses += 1;
    } else if (result === 'Draw.') {
      score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

   updateScoreElement();

   document.querySelector('.js-result').innerHTML = result;

   document.querySelector('.js-moves').innerHTML = `${playerMove}
    - vs - ${computerMove}`;
}

function updateScoreElement(){
    document.querySelector('.js-score').innerHTML = 
    `Wins :  ${score.wins} , Lossеs: ${score.losses} , Draws: ${score.ties}`;
}

function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
  }

  return computerMove;
}


   
const scoreElement = document.querySelector('.js-score'); // Селектиране на елемента

     // Създаване на MutationObserver
const observer = new MutationObserver(function(mutations) {
 mutations.forEach(function(mutation) {
    if (mutation.type === 'childList') {
      checkAndUpdateScore(); // Извикване на функцията за проверка при промяна в резултата
    }
  });
});

// Стартиране на следенето на елемента с резултатите
observer.observe(scoreElement, { attributes: true, childList: true, subtree: true });

// Функция за проверка на броя победи и загуби
function checkAndUpdateScore() {
  const victories = score.wins;
  const losses = score.losses;
  const ties = score.ties;

  // Проверка за достигане на 10 победи или загуби
  if (victories >= 10) {
    kokoloto(); // Активиране на функцията при достигане на 20 победи
  }else{
    kokoloto1();
  }

  if (losses >= 10) {
    koko(); // Активиране на функцията при достигане на 10 загуби
  }else{
    koko1();
  }
  if (ties >= 10){
    noWin();
  }else{
    noWin1();
  }
}

  
function kokoloto(){
  const congratulations = document.querySelector('.congratulations');
  congratulations.style.display = 'block';
}


function koko(){
  const youlosse = document.querySelector('.YouLosse');
  youlosse.style.display = 'block';
}
 
function kokoloto1(){
  const congratulations = document.querySelector('.congratulations');
  congratulations.style.display = 'none';
}

function koko1(){
  const youlosse = document.querySelector('.YouLosse');
  youlosse.style.display = 'none';
}

function noWin(){
  const noWinner = document.querySelector('.no-wineer');
  noWinner.style.display = 'block';
}

function noWin1(){
  const noWinner = document.querySelector('.no-wineer');
  noWinner.style.display = 'none';
}

 

// Селектиране на елементите, които следим
const congratulations = document.querySelector('.congratulations');
const youLose = document.querySelector('.YouLosse');
const noWinner = document.querySelector('.no-wineer');

// Селектиране на всички бутони
const buttons = document.querySelectorAll('.rock, .paper, .scissor');

// Функция, която проверява видимостта на елементите и променя състоянието на бутоните
function checkVisibility() {
  const isVisibleCongrats = window.getComputedStyle(congratulations).getPropertyValue('display') !== 'none';
  const isVisibleLose = window.getComputedStyle(youLose).getPropertyValue('display') !== 'none';
  const isVisibleNoWinner = window.getComputedStyle(noWinner).getPropertyValue('display') !== 'none';

  buttons.forEach((button) => {
    if (isVisibleCongrats || isVisibleLose || isVisibleNoWinner) {
      button.disabled = true; // Неактивни бутони
    } else {
      button.disabled = false; // Активни бутони
    }
  });
}

// Създаване на MutationObserver за всяко отделно скрито съобщение
const observerCongrats = new MutationObserver(checkVisibility);
const observerLose = new MutationObserver(checkVisibility);
const observerNoWinner = new MutationObserver(checkVisibility);

// Стартиране на следенето на елементите
observerCongrats.observe(congratulations, { attributes: true, attributeFilter: ['style'] });
observerLose.observe(youLose, { attributes: true, attributeFilter: ['style'] });
observerNoWinner.observe(noWinner, { attributes: true, attributeFilter: ['style'] });

// Инициализиране на проверката за първоначална видимост
checkVisibility();

