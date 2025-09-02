const board = document.getElementById("board");
const statusText = document.getElementById("status");
const scoreXText = document.getElementById("scoreX");
const scoreOText = document.getElementById("scoreO");

let currentPlayer = "X";
let gameActive = true;
let cells = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0;
let scoreO = 0;

function createBoard() {
  board.innerHTML = "";
  cells.forEach((_, index) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.dataset.index = index;
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;
  if (cells[index] !== "" || !gameActive) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken");

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} Wins!`;
    if (currentPlayer === "X") {
      scoreX++;
      scoreXText.textContent = `Player X: ${scoreX}`;
    } else {
      scoreO++;
      scoreOText.textContent = `Player O: ${scoreO}`;
    }
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell !== "")) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin() {
  const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  return winPatterns.some(pattern => {
    return pattern.every(index => cells[index] === currentPlayer);
  });
}

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  cells = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = "Player X's Turn";
  createBoard();
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', function() {
  createBoard();
});
