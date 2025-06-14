
const board = document.getElementById("board");
const message = document.getElementById("message");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let scores = { X: 0, O: 0 };

function drawBoard() {
  board.innerHTML = "";
  gameBoard.forEach((cell, i) => {
    const td = document.createElement("td");
    td.textContent = cell;
    td.addEventListener("click", () => makeMove(i));
    board.appendChild(td);
  });
}

function makeMove(i) {
  if (gameBoard[i] === "") {
    gameBoard[i] = currentPlayer;
    drawBoard();
    if (checkWin(currentPlayer)) {
      message.textContent = `Pemain ${currentPlayer} menang!`;
      scores[currentPlayer]++;
      updateScores();
      launchConfetti();
    } else if (!gameBoard.includes("")) {
      message.textContent = "Seri!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      message.textContent = `Giliran: ${currentPlayer}`;
    }
  }
}

function checkWin(p) {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  return winCombos.some(combo => combo.every(i => gameBoard[i] === p));
}

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  message.textContent = "Giliran: X";
  drawBoard();
}

function resetScores() {
  scores = { X: 0, O: 0 };
  updateScores();
  restartGame();
}

function launchConfetti() {
  // Dummy confetti effect using alert for simplicity
  alert("🎉🎉🎉");
}

drawBoard();
