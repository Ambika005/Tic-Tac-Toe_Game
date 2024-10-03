const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const checkWin = () => {
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            gameActive = false;
            return gameState[a];
        }
    }
    return gameState.includes("") ? null : "Draw";
};

const updateStatus = (result) => {
    if (result === 'Draw') {
        statusText.textContent = "It's a Draw!";
    } else if (result) {
        statusText.textContent = `Player ${result} Wins!`;
    } else {
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
    }
};

const handleCellClick = (event) => {
    const cellIndex = event.target.getAttribute('data-index');

    if (gameState[cellIndex] === "" && gameActive) {
        gameState[cellIndex] = currentPlayer;
        event.target.textContent = currentPlayer;
        const result = checkWin();
        updateStatus(result);

        if (!result) {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
};

const resetGame = () => {
    gameState = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.textContent = "");
    currentPlayer = 'X';
    gameActive = true;
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

updateStatus();
