const startMessage = document.querySelector(".start-message");
const choosePlayerMessage = document.querySelector(".who-starts-message");
const form = document.getElementById("start-message-form");
const overlay = document.querySelector(".overlay");
const croissant = document.getElementById("croissant");
const bagel = document.getElementById("bagel");
const tableCells = document.querySelectorAll(".table-cell");
const croissantTotalWin = document.getElementById("croissantTotalWin");
const bagelTotalWin = document.getElementById("bagelTotalWin");
const winMessage = document.querySelector(".win-message");
const startNewGame = document.getElementById("start-new-game");

const player1Button = document.getElementById("who-starts-player-1-button");
const player2Button = document.getElementById("who-starts-player-2-button");

let gameOver = false;
let isFirstPlayerTurn = true;
let currentPlayerClass;
let opponentPlayerClass;
let moves;

const winCombinations = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 6, 9],
    [3, 5, 7],
    [4, 5, 6],
    [7, 8, 9]
];

window.addEventListener("DOMContentLoaded", () => {
    startMessage.style.display = "block";
    overlay.style.display = "block";
    choosePlayerMessage.style.display = "none";

    // Один раз навешиваем обработчики на клетки
    tableCells.forEach(cell => {
        cell.addEventListener("click", () => handleCellClick(cell));
    });
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    startMessage.style.display = "none";
    choosePlayerMessage.style.display = "block";
});

player1Button.addEventListener("click", () => {
    initGame(croissant);
});

player2Button.addEventListener("click", () => {
    initGame(bagel);
});

startNewGame.addEventListener("click", function () {
    winMessage.style.display = "none";
    overlay.style.display = "block";
    startNewGame.style.display = "none";
    choosePlayerMessage.style.display = "block";
    gameOver = false;
    resetBoard();
});

function initGame(firstPlayerElement) {
    choosePlayerMessage.style.display = "none";
    overlay.style.display = "none";
    startGame(firstPlayerElement.id);
}

function startGame(firstClass) {
    currentPlayerClass = firstClass;
    opponentPlayerClass = getOpponentClass(firstClass);
    moves = initPlayerMoves();
    isFirstPlayerTurn = true;
    gameOver = false;
    resetBoard();
}

function handleCellClick(cell) {
    if (gameOver || isCellTaken(cell)) return;

    const currentClass = isFirstPlayerTurn ? currentPlayerClass : opponentPlayerClass;
    makeMove(cell, currentClass, moves);

    if (checkWin(moves[currentClass])) {
        handleWin(currentClass);
        gameOver = true;
        return;
    }

    const totalMoves = moves.croissant.length + moves.bagel.length;
    if (totalMoves === 9) {
        handleDraw();
        gameOver = true;
        return;
    }

    isFirstPlayerTurn = !isFirstPlayerTurn;
}

function handleDraw() {
    winMessage.textContent = "It's a draw!";
    winMessage.style.display = "block";
    overlay.style.display = "block";
    startNewGame.style.display = "block";
}

function getOpponentClass(playerClass) {
    return playerClass === "croissant" ? "bagel" : "croissant";
}

function initPlayerMoves() {
    return {
        croissant: [],
        bagel: []
    };
}

function isCellTaken(cell) {
    return cell.classList.contains("croissant") || cell.classList.contains("bagel");
}

function makeMove(cell, playerClass, moves) {
    cell.classList.add(playerClass);
    const cellId = parseInt(cell.id);
    moves[playerClass].push(cellId);
}

function checkWin(playerMoves) {
    return winCombinations.some(combination =>
        combination.every(cell => playerMoves.includes(cell))
    );
}

function handleWin(playerClass) {
    winMessage.textContent = `${capitalize(playerClass)} won!`;
    winMessage.style.display = "block";
    overlay.style.display = "block";
    startNewGame.style.display = "block";

    if (playerClass === "croissant") {
        croissantTotalWin.textContent = parseInt(croissantTotalWin.textContent) + 1;
    } else {
        bagelTotalWin.textContent = parseInt(bagelTotalWin.textContent) + 1;
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function resetBoard() {
    tableCells.forEach(cell => {
        cell.classList.remove("croissant", "bagel");
    });
}
