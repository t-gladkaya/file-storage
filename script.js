const imgCards = [
    {name: "uranus", src: "assets/img/uranus.png", alt: "Uranus"},
    {name: "earth", src: "assets/img/earth.png", alt: "Earth"},
    {name: "jupiter", src: "assets/img/jupiter.png", alt: "Jupiter"},
    {name: "pluto", src: "assets/img/pluto.png", alt: "Pluto"},
    {name: "saturn", src: "assets/img/saturn.png", alt: "Saturn"},
    {name: "mercury", src: "assets/img/mercury.png", alt: "Mercury"},
    {name: "mars", src: "assets/img/mars.png", alt: "Mars"},
    {name: "venus", src: "assets/img/venus.png", alt: "Venus"},
    {name: "neptune", src: "assets/img/neptune.png", alt: "Neptune"},
    {name: "earth2", src: "assets/img/earth2.png", alt: "Earth2"}
];

const tableCells = document.querySelectorAll(".table-cell");
const attemptCount = document.getElementById("attempt-count");
const restartButton = document.getElementById("restart");

let firstCard = null;
let secondCard = null;
let numberOfClicks = 0;
let attemptCounter = 0;
let pairedCards = [];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initGame() {
    firstCard = null;
    secondCard = null;
    numberOfClicks = 0;
    attemptCounter = 0;
    attemptCount.textContent = attemptCounter;
    pairedCards = shuffle(imgCards.concat(imgCards));

    tableCells.forEach((cell, index) => {
        cell.innerHTML = "";
        cell.style.backgroundColor = "";
        const card = pairedCards[index];

        const cardInner = document.createElement("div");
        cardInner.classList.add("card-inner");

        const cardFront = document.createElement("div");
        cardFront.classList.add("card-front");

        const cardBack = document.createElement("div");
        cardBack.classList.add("card-back");

        const img = document.createElement("img");
        img.src = card.src;
        img.alt = card.alt;

        cardBack.appendChild(img);
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        cell.appendChild(cardInner);

        cell.onclick = () => handleCardClick(cardInner, card.name);
    });

    restartButton.style.display = "none";
}

function handleCardClick(cardInner, cardName) {
    if (cardInner.classList.contains("card-flipped")) return;
    if (numberOfClicks >= 2) return;

    cardInner.classList.add("card-flipped");
    numberOfClicks++;

    if (!firstCard) {
        firstCard = {cardInner, name: cardName};
    } else {
        secondCard = {cardInner, name: cardName};

        attemptCounter++;
        attemptCount.textContent = attemptCounter;

        if (firstCard.name === secondCard.name) {
            firstCard = null;
            secondCard = null;
            numberOfClicks = 0;
        } else {
            setTimeout(() => {
                firstCard.cardInner.classList.remove("card-flipped");
                secondCard.cardInner.classList.remove("card-flipped");
                firstCard = null;
                secondCard = null;
                numberOfClicks = 0;
            }, 1000);
        }
    }
    gameOver();
}

function gameOver() {
    const allCards = document.querySelectorAll(".card-inner");
    const allFlipped = Array.from(allCards).every(card => card.classList.contains("card-flipped"));

    if (allFlipped) {
        setTimeout(() => {
            tableCells.forEach(cell => {
                cell.style.backgroundColor = "rgb(108, 208, 1)"; 
                restartButton.style.display = "block";
            });
        }, 1000);

    }

}

restartButton.addEventListener("click", initGame);


window.addEventListener("DOMContentLoaded", initGame);
