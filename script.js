/* game menu */
const xoContainer = document.querySelector(".xo-container");
const xSelection = xoContainer.querySelector(".x-container");
const oSelection = xoContainer.querySelector(".o-container");

const errorMessage = document.querySelector(".error-message");

var markPicked;

xSelection.addEventListener("click", (e) => {
  xSelection.classList.add("clicked");
  oSelection.classList.remove("clicked");
  errorMessage.classList.add("hidden");
  markPicked = "X";
});

oSelection.addEventListener("click", (e) => {
  oSelection.classList.add("clicked");
  xSelection.classList.remove("clicked");
  errorMessage.classList.add("hidden");
  markPicked = "O";
});

/* new game buttons */
const newGameButtons = document.querySelector(".buttons-container");
const newGameVsCpuButton = newGameButtons.querySelector("#cpu");
const newGameVsPlayerButton = newGameButtons.querySelector("#player");

const gameBoardContainer = document.querySelector(".game-board-container");
const newGameMenuContainer = document.querySelector(".new-game-menu-container");

const footer = gameBoardContainer.querySelector(".footer");
const xWinsSpan = gameBoardContainer.querySelector(".x-wins span:nth-child(1)");
const oWinsSpan = gameBoardContainer.querySelector(".o-wins span:nth-child(1)");

var isPlayer = null;

var hasError = () => {
  if (
    xSelection.classList.contains("clicked") ||
    oSelection.classList.contains("clicked")
  ) {
    return false;
  }
  return true;
};
newGameVsCpuButton.addEventListener("click", () => {
  if (hasError()) {
    errorMessage.classList.remove("hidden");
    return;
  }
  newGameMenuContainer.classList.add("hidden");
  gameBoardContainer.classList.remove("hidden");
  if (markPicked === "O") {
    xWinsSpan.textContent = "X (cpu)";
    oWinsSpan.textContent = "o (you)";
  }
  isPlayer = false;
  handlePlayerVsPlayer();
});

newGameVsPlayerButton.addEventListener("click", () => {
  if (hasError()) {
    errorMessage.classList.remove("hidden");
    return;
  }
  newGameMenuContainer.classList.add("hidden");
  gameBoardContainer.classList.remove("hidden");

  if (markPicked === "O") {
    xWinsSpan.textContent = "X (P2)";
    oWinsSpan.textContent = "o (P1)";
  } else {
    xWinsSpan.textContent = "X (P1)";
    oWinsSpan.textContent = "o (P2)";
  }
  isPlayer = true;
  handlePlayerVsPlayer();
});

/* game core handling */

var ties = 0;
var xWins = 0;
var oWins = 0;

var currentTurnIsX = true;
const boardItems = gameBoardContainer.querySelectorAll(".board-item");
let array = [
  [" ", " ", " "],
  [" ", " ", " "],
  [" ", " ", " "],
];
const currentTurnSpan = gameBoardContainer.querySelector("#turn");
var checkWin = () => {
  var winningArray = null;

  if (
    array[0][0] === array[0][1] &&
    array[0][1] === array[0][2] &&
    array[0][0] != " "
  ) {
    winningArray = ["00", "01", "02"];
    console.log("win");
  } else if (
    array[1][0] === array[1][1] &&
    array[1][1] === array[1][2] &&
    array[1][0] != " "
  ) {
    winningArray = ["10", "11", "12"];
  } else if (
    array[2][0] === array[2][1] &&
    array[2][1] === array[2][2] &&
    array[2][0] != " "
  ) {
    winningArray = ["20", "21", "22"];
  } else if (
    array[0][0] === array[1][0] &&
    array[1][0] === array[2][0] &&
    array[0][0] != " "
  ) {
    winningArray = ["00", "10", "20"];
  } else if (
    array[0][1] === array[1][1] &&
    array[1][1] === array[2][1] &&
    array[0][1] != " "
  ) {
    winningArray = ["01", "11", "21"];
  } else if (
    array[0][2] === array[1][2] &&
    array[1][2] === array[2][2] &&
    array[0][2] != " "
  ) {
    winningArray = ["02", "12", "22"];
  } else if (
    array[0][0] === array[1][1] &&
    array[1][1] === array[2][2] &&
    array[0][0] != " "
  ) {
    winningArray = ["00", "11", "22"];
  } else if (
    array[0][2] === array[1][1] &&
    array[1][1] === array[2][0] &&
    array[0][2] != " "
  ) {
    winningArray = ["02", "11", "20"];
  }
  return winningArray;
};
var resetGameBoard = () => {
  const resultDivSvg = document
    .querySelector(".result-container")
    .querySelector("svg");

    boardItems.forEach((boardItem)=>{
      boardItem.addEventListener('click', handleBoardItemClick)
    })

  const resultMessage = document.querySelector("#result-message");
  const xWinCount = gameBoardContainer.querySelector("#x-win-count");
  const oWinCount = gameBoardContainer.querySelector("#o-win-count");
  const tiesCount = gameBoardContainer.querySelector("#ties-count");
  const gameWithoutResults = document.querySelector(".game-without-results");
  const resultsContainer = document.querySelector(".result-container");

  xWinCount.textContent = 0;
  oWinCount.textContent = 0;
  tiesCount.textContent = 0;
  gameWithoutResults.classList.remove("game-over");

  resultDivSvg.classList.remove("hidden");
  resultMessage.classList.remove("hidden");

  array = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  currentTurnIsX = true;
  currentBox = "";

  boardItems.forEach((boardItem) => {
    boardItem.innerHTML = "";
    boardItem.className = "board-item";
  });

  currentTurnSpan.innerHTML =
    '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>';
  resultsContainer.classList.add("hidden");
};
var handleGameOverAfterMath = () => {
  console.log("entered");
  const quitButton = gameBoardContainer.querySelector("#quit-button");
  const nextRoundButton =
    gameBoardContainer.querySelector("#next-round-button");

  const xWinCount = gameBoardContainer.querySelector("#x-win-count");
  const oWinCount = gameBoardContainer.querySelector("#o-win-count");
  const tiesCount = gameBoardContainer.querySelector("#ties-count");

  var handleQuitButton = () => {
    gameBoardContainer.classList.add("hidden");
    newGameMenuContainer.classList.remove("hidden");
    resetGameBoard();
    console.log(array);
  };

  var handleNextRoundButton = () => {
    console.log("clicked");
    const resultsContainer = document.querySelector(".result-container");

    resetGameBoard();

    xWinCount.textContent = xWins;
    oWinCount.textContent = oWins;
    tiesCount.textContent = ties;

    resultsContainer.classList.add("hidden");
  };
  quitButton.addEventListener("click", handleQuitButton);
  nextRoundButton.addEventListener("click", handleNextRoundButton);
};

var handleTie = () => {
  const gameWithoutResults = document.querySelector(".game-without-results");
  const resultsContainer = document.querySelector(".result-container");

  const resultDiv = resultsContainer.querySelector("#result");

  const resultDivSvg = resultDiv.querySelector("svg");
  const resultDivSpan = resultDiv.querySelector("span");
  const resultMessage = document.querySelector("#result-message");

  resultDivSvg.classList.add("hidden");
  resultMessage.classList.add("hidden");
  resultDivSpan.textContent = "round tied";
  resultDivSpan.style.color = "#a8bfc9";

  gameWithoutResults.classList.add("game-over");
  resultsContainer.classList.remove("hidden");

  ties++;

  handleGameOverAfterMath();
};
var handleWinning = (winningArray, currentTurn) => {
  const firstBox = document.getElementById(winningArray[0]);
  const secondBox = document.getElementById(winningArray[1]);
  const thirdBox = document.getElementById(winningArray[2]);

  const gameWithoutResults = document.querySelector(".game-without-results");
  const resultsContainer = document.querySelector(".result-container");

  const resultDiv = resultsContainer.querySelector("#result");

  const resultDivSvg = resultDiv.querySelector("svg");
  const resultDivSpan = resultDiv.querySelector("span");
  const resultMessage = document.querySelector("#result-message");

  firstBox.classList.add("winner");
  secondBox.classList.add("winner");
  thirdBox.classList.add("winner");

  gameWithoutResults.classList.add("game-over");
  resultsContainer.classList.remove("hidden");

  resultDivSpan.textContent = 'takes the round'
  console.log(currentTurn)
  if (currentTurn === "X") {
    firstBox.classList.add("green");
    secondBox.classList.add("green");
    thirdBox.classList.add("green");

    resultDivSvg.innerHTML =
      '<path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/>';
    resultDivSpan.style.color = "#31c3bd";
    if (markPicked === "X") {
      resultMessage.textContent = "Player 1 wins!";
    } else {
      resultMessage.textContent = "Player 2 wins!";
    }

    xWins++;
  } else {
    firstBox.classList.add("orange");
    secondBox.classList.add("orange");
    thirdBox.classList.add("orange");

    resultDivSpan.style.color = "#f2b137";


    resultDivSvg.innerHTML =
      '<path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/>';
    console.log("o wins");
    if (markPicked === "X") {
      resultMessage.textContent = "Player 2 wins!";
    } else {
      resultMessage.textContent = "Player 1 wins!";
    }

    oWins++;
  }
  handleGameOverAfterMath();
};
var checkTie = (winningArray)=>{
  for(let i = 0; i <=2; ++i){
    for(let j = 0; j <=2; j++){
      if(array[i][j] === ' '){
        return false
      }
    }
  }
  if(winningArray === null){
    return true;
  }
  return false;
}

var handleBoardItemClick = (e) => {
  const svg1 = currentTurnIsX
    ? '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>'
    : '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>';
  e.currentTarget.innerHTML = svg1;
  var currentBox = e.currentTarget.id;
  
  let currentTurn = currentTurnIsX ? "X" : "O";
  let currentRow = parseInt(currentBox.charAt(0));
  let currentCol = parseInt(currentBox.charAt(1));

  array[currentRow][currentCol] = currentTurn;
  console.log(array);
  let svg2 = currentTurnIsX
    ? '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0Zm0 18.963c-7.2 0-13.037 5.837-13.037 13.037 0 7.2 5.837 13.037 13.037 13.037 7.2 0 13.037-5.837 13.037-13.037 0-7.2-5.837-13.037-13.037-13.037Z" fill="#F2B137"/></svg>'
    : '<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><path d="M15.002 1.147 32 18.145 48.998 1.147a3 3 0 0 1 4.243 0l9.612 9.612a3 3 0 0 1 0 4.243L45.855 32l16.998 16.998a3 3 0 0 1 0 4.243l-9.612 9.612a3 3 0 0 1-4.243 0L32 45.855 15.002 62.853a3 3 0 0 1-4.243 0L1.147 53.24a3 3 0 0 1 0-4.243L18.145 32 1.147 15.002a3 3 0 0 1 0-4.243l9.612-9.612a3 3 0 0 1 4.243 0Z" fill="#31C3BD" fill-rule="evenodd"/></svg>';
  currentTurnSpan.innerHTML = svg2;
  let winningArray = checkWin();

  if (winningArray != null) {
    console.log("win");
    handleWinning(winningArray, currentTurn);
    return;
  }

  if (checkTie(winningArray)) {
    console.log("tie");
    handleTie();
    return;
  }
  currentTurnIsX = !currentTurnIsX;
  e.currentTarget.removeEventListener("click", handleBoardItemClick);
};
var handlePlayerVsPlayer = () => {
  boardItems.forEach((boardItem) => {

    boardItem.addEventListener("click", handleBoardItemClick);
  });
};


/*replay button */
const replayButton = gameBoardContainer.querySelector('#replay-button');
var handleReplayButton = (e)=>{
  const resultsContainer = gameBoardContainer.querySelector('.result-container')

  const quitButton = resultsContainer.querySelector('#quit-button')
  const nextRoundButton = resultsContainer.querySelector('#next-round-button')
  const result = resultsContainer.querySelector('#result')

  const resultDivSvg = resultsContainer.querySelector("#result svg");
  const resultDivSpan = resultsContainer.querySelector("#result span");
  const resultMessage = resultsContainer.querySelector("#result-message");

  resultsContainer.classList.remove('hidden')
  
  resultDivSvg.classList.add('hidden')
  resultDivSpan.textContent = 'restart game?'
  resultDivSpan.style.color = '#a8bfc9'
  resultMessage.classList.add('hidden')

  quitButton.textContent = 'no, cancel'
  nextRoundButton.textContent = 'yes, restart'

  quitButton.addEventListener('click', ()=>{
    resultsContainer.classList.add('hidden')
  })

  nextRoundButton.addEventListener('click', ()=>{
    resetGameBoard();
    const xWinCount = gameBoardContainer.querySelector("#x-win-count");
  const oWinCount = gameBoardContainer.querySelector("#o-win-count");
  const tiesCount = gameBoardContainer.querySelector("#ties-count");

  xWinCount.textContent = xWins;
    oWinCount.textContent = oWins;
    tiesCount.textContent = ties;

    quitButton.textContent = 'quit'
  nextRoundButton.textContent = 'next round'
    
  })

}

replayButton.addEventListener('click', handleReplayButton)