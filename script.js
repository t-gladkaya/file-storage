const generateBtn = document.querySelector(".btn-generate");
const backgroundImg = document.getElementById("background-img");
const languageItems = document.querySelectorAll(".language-changer-item");
const belLang = document.getElementById("belarusian");
const enLang = document.getElementById("english");
const textEl = document.getElementById("text");
const authorEl = document.getElementById("author");

const backgrounds = [
    "assets/img/field-1.jpg", 
    "assets/img/field-2.jpg",
    "assets/img/field-3.jpg",
    "assets/img/field-4.jpg",
    "assets/img/field-5.jpg",
]

let quotesData = []; 
let selectedLang = belLang.dataset.lang;
let currentQuoteIndex = null;

generateBtn.addEventListener("click", function(event) {
    event.preventDefault();
    let newBackgroundIndex = Math.floor(Math.random() * backgrounds.length);
    backgroundImg.src = backgrounds[newBackgroundIndex];

    currentQuoteIndex = Math.floor(Math.random() * quotesData.length);
    showQuoteByIndex(currentQuoteIndex);
});

languageItems.forEach(item => {
    item.addEventListener("click", function() {
        languageItems.forEach(lang => lang.classList.remove("active"));
        item.classList.add("active");

        selectedLang = item.dataset.lang;
        loadQuotes(selectedLang);

        if (selectedLang === "en") {
            generateBtn.innerHTML = "Next quote";
        } else {
            generateBtn.innerHTML = "Наступная цытата";
        }

        if (currentQuoteIndex !== null) {
            showQuoteByIndex(currentQuoteIndex);
        }
    });
});

async function loadQuotes(language) {
    const response = await fetch("belarusian_quotes_translated.json");
    quotesData = await response.json();
}

function showQuoteByIndex(index) {
    if (!quotesData.length || index === null) return;

    const quote = quotesData[index];

    if (selectedLang === "by") {
        textEl.textContent = `"${quote.text}"`;
        authorEl.textContent = `— ${quote.author}`;
    } else {
        textEl.textContent = `"${quote.text_en}"`;
        authorEl.textContent = `— ${quote.author_en}`;
    }
}

loadQuotes();