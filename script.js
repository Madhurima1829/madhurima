const board = document.getElementById('board');
const rollButton = document.getElementById('rollButton');
const message = document.getElementById('message');

const totalCells = 100;
let playerPosition = 0;

// Define snakes and ladders
const snakes = {
    16: 6,
    47: 26,
    49: 11,
    56: 53,
    62: 19,
    64: 60,
    87: 24,
    93: 73,
    95: 75,
    98: 78
};

const ladders = {
    1: 38,
    4: 14,
    9: 31,
    21: 42,
    28: 84,
    36: 44,
    51: 67,
    71: 91,
    80: 100
};

// Create the board
function createBoard() {
    for (let i = totalCells; i >= 1; i--) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.innerText = i;
        board.appendChild(cell);
    }
}

// Move the player
function movePlayer(steps) {
    playerPosition += steps;
    if (playerPosition > totalCells) {
        playerPosition = totalCells;
    }

    // Check for snakes or ladders
    if (snakes[playerPosition]) {
        playerPosition = snakes[playerPosition];
        message.innerText = 'Oops! Bitten by a snake!';
    } else if (ladders[playerPosition]) {
        playerPosition = ladders[playerPosition];
        message.innerText = 'Yay! Climbed a ladder!';
    } else {
        message.innerText = '';
    }

    updateBoard();
}

// Update the board
function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => cell.classList.remove('player'));

    if (playerPosition > 0) {
        cells[totalCells - playerPosition].classList.add('player');
    }

    if (playerPosition === totalCells) {
        message.innerText = 'Congratulations! You won!';
        rollButton.disabled = true;
    }
}

// Roll the dice
rollButton.addEventListener('click', () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    movePlayer(diceRoll);
});

// Initialize the board
createBoard();
