const container = document.querySelector(`.container`);
const gamestate = document.querySelector(`.gamestate`);
const scoreDisplay = document.querySelector(`.score`);
const start = document.querySelector(`.start`);

const personFactory = (name, symbol, score) => {
  return {
    name,
    symbol,
    score,
  };
};

const playerOne = personFactory(`Player 1`, `X`, 0);
const playerTwo = personFactory(`Player 2`, `O`, 0);
let activePlayer = playerOne;

const gameboard = (() => {
  const array = [``, ``, ``, ``, ``, ``, ``, ``, ``];
  const drawBoard = () => {
    container.innerHTML = ``;

    gameboard.array.forEach((e, index) => {
      const box = document.createElement(`button`);
      box.setAttribute(`data-index`, index);
      box.classList.add(`box`);
      box.textContent = `${e}`;
      container.appendChild(box);
    });
  };
  const toggleBox = (event) => {
    const index = event.target.getAttribute(`data-index`);

    gameboard.array.splice(index, 1, activePlayer.symbol);
    if (activePlayer === playerOne) {
      activePlayer = playerTwo;
    } else if (activePlayer === playerTwo) {
      activePlayer = playerOne;
    } else {
      return;
    }
    gamestate.textContent = `${activePlayer.name}'s (${activePlayer.symbol}) turn!`;
    gameboard.drawBoard();
  };

  return {
    array,
    drawBoard,
    toggleBox,
  };
})();
gameboard.drawBoard();

const game = (() => {
  const winCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const checkWin = (arr) => {
    let logWin;
    // Iterates through winCombo and on each iteration we will use the arrays that are inside winCombo
    arr.forEach((subArr) => {
      // Uses every number (0,1,2 ... 3,4,5 ... 6,7,8) inside of the arrays (subArr) of winCombo as indexes for gameboard.array (i.e. checks gameboard.array index 0, 1 and 2 to see if they all contain either an X or a O)
      if (
        subArr.every((element) => gameboard.array[element] === playerOne.symbol)
      ) {
        game.disableButtons();
        logWin = true;
        playerOne.score++;
        console.log(playerOne.score);
        gamestate.textContent = `Player 1 wins! Congrats!`;
      }
      if (
        subArr.every((element) => gameboard.array[element] === playerTwo.symbol)
      ) {
        game.disableButtons();
        logWin = true;
        playerTwo.score++;
        console.log(playerTwo.score);
        gamestate.textContent = `Player 2 wins! Congrats!`;
      }
    });
    // If nobody has won the round we run tieGame to check if theres a tie. We use the checker so we dont run the tieGame function potentially when someone wins and declare a tie instead of a win
    if (logWin !== true) {
      game.tieGame();
    }
    scoreDisplay.textContent = `${playerOne.name} score: ${playerOne.score} | ${playerTwo.name} score: ${playerTwo.score}`;
  };
  const disableButtons = () => {
    const buttons = container.querySelectorAll(`.box`);
    buttons.forEach((e) => {
      e.disabled = true;
    });
  };
  const enableButtons = () => {
    const buttons = container.querySelectorAll(`.box`);
    buttons.forEach((e) => {
      e.disabled = false;
    });
  };
  const startNewGame = () => {
    // Empty the array
    gameboard.array = [``, ``, ``, ``, ``, ``, ``, ``, ``];
    // Set turn to player ones turn
    activePlayer = playerOne;
    gameboard.drawBoard();
    game.enableButtons();
    gamestate.textContent = `${activePlayer.name}'s (${activePlayer.symbol}) turn!`;
    scoreDisplay.textContent = `${playerOne.name} score: ${playerOne.score} | ${playerTwo.name} score: ${playerTwo.score}`;
  };
  const tieGame = () => {
    if (gameboard.array.includes(``)) {
      return;
    } else {
      gamestate.textContent = `Tie game!`;
      game.disableButtons();
    }
  };

  return {
    winCombo,
    checkWin,
    disableButtons,
    enableButtons,
    startNewGame,
    tieGame,
  };
})();
game.disableButtons();

start.addEventListener(`click`, () => {
  game.startNewGame();
});

container.addEventListener(`click`, (event) => {
  if (event.target.className === `box` && event.target.innerHTML === ``) {
    gameboard.toggleBox(event);
    game.checkWin(game.winCombo);
  }
});
