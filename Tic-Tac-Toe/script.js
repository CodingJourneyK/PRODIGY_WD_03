let board;
let currentPlayer;
let gameActive;

const statusDisplay = document.querySelector('#status');

// winning conditions

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

// function to initialize the game

function initializeGame() {
    board = Array(9).fill(null);
    currentPlayer = 'X';
    gameActive = true;
    gameMode = '2players'; //default mode
    document.querySelectorAll('.cell').forEach(cell=>cell.innerHTML = '');
    statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
}

//function to handle cell click
function handleCellClick(cellIndex) {
    if(board[cellIndex] !== null || !gameActive) {
        return;
    }

    makeMove(cellIndex);
}

function makeMove(cellIndex) {
    board[cellIndex] = currentPlayer;
    document.getElementById(`cell-${cellIndex}`).innerHTML = currentPlayer;

    checkResult();

    //switch player
    if(gameActive) {
        currentPlayer = currentPlayer ==='X' ? '0' : 'X';
        statusDisplay.innerHTML = `Player ${currentPlayer}'s turn`;
    }
}

//function to check result 
function checkResult() {
    let roundWon = false;
    for(let i=0; i<winningConditions.length; i++) {
        const [a,b,c] = winningConditions[i];
        if(board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
   }

   if(roundWon)
    {
        statusDisplay.innerHTML = `Player ${currentPlayer} Wins !`;
        gameActive = false;
        return;
    }

    if(!board.includes(null)) {
        statusDisplay.innerHTML = `It's a draw !`;
        gameActive = false;
        return;
    }
}

//function to reset the game
function resetGame() {
    initializeGame();
}

//initialize the game when the page loads
window.onload = initializeGame;