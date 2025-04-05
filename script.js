const generateBtn = document.querySelector(".btn-generate");
const backgroundImg = document.getElementById("background-img");
const languageItems = document.querySelectorAll(".language-changer-item");
const textEl = document.getElementById("text");
const authorEl = document.getElementById("author");

const backgrounds = [
    "assets/img/field-1.jpg", 
    "assets/img/field-2.jpg",
    "assets/img/field-3.jpg",
    "assets/img/field-4.jpg",
    "assets/img/field-5.jpg",
]

generateBtn.addEventListener("click", function(event) {
    event.preventDefault();
    let newBackgroundIndex = Math.floor(Math.random() * backgrounds.length);
    backgroundImg.src = backgrounds[newBackgroundIndex];

    event.preventDefault();
    showRandomQuote();
});

languageItems.forEach(item => {
    item.addEventListener("click", function() {
        languageItems.forEach(lang => lang.classList.remove("active"));
        item.classList.add("active");
    });
});

let quotesData = []; // сюда загрузим цитаты

// Загрузка цитат из JSON
async function loadQuotes() {
    const response = await fetch("belarusian_quotes_translated.json");
    quotesData = await response.json();
}
// Генерация рандомной цитаты 
function showRandomQuote() {
    if (quotesData.length === 0) return;

    const randomIndex = Math.floor(Math.random() * quotesData.length);
    const quote = quotesData[randomIndex];

    textEl.textContent = `"${quote.text}"`;
    authorEl.textContent = `— ${quote.author}`;
}

// Переключение языка (визуально)
languageItems.forEach(item => {
    item.addEventListener("click", function () {
        languageItems.forEach(lang => lang.classList.remove("active"));
        item.classList.add("active");
        // можно здесь переключать язык цитат, если будет английский json
    });
});

// Загрузим цитаты при старте
loadQuotes();