const accessKey = "c07fdb24";

const input = document.getElementById("search-input");
const form = document.getElementById("search-form");
const button = document.getElementById("search-button");
const gallery = document.getElementById("movie-gallery");
const loadMoreBtn = document.getElementById("load-more");

let allMovies = [];
let currentIndex = 0;
const pageSize = 9;
let currentQuery = "Home";
let apiPage = 1;
let isLoading = false;

window.addEventListener("DOMContentLoaded", () => {
    input.focus();
    loadMoreBtn.style.display = "none";
    fetchMovies("Home", true);
});

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
        fetchMovies(query, true);
        button.classList.add("close");
    }
});

input.addEventListener("input", () => {
    const query = input.value.trim();
    if (query === "") {
        button.classList.remove("close");
    }
});

button.addEventListener("click", (e) => {
    if (button.classList.contains("close")) {
        e.preventDefault();
        input.value = "";
        input.focus();
        button.classList.remove("close");
        fetchMovies("Home", true);
    }
});

loadMoreBtn.addEventListener("click", () => fetchMovies(currentQuery, false));

async function fetchMovies(query, isNewSearch = false) {
    if (isLoading) return;
    isLoading = true;

    if (isNewSearch) {
        allMovies = [];
        currentIndex = 0;
        apiPage = 1;
        gallery.innerHTML = "";
        loadMoreBtn.style.display = "none";
    }

    currentQuery = query;

    try {
        const url = `https://www.omdbapi.com/?apikey=${accessKey}&s=${encodeURIComponent(query)}&page=${apiPage}`;
        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
            const detailedMovies = await Promise.all(
                data.Search.map(async movie => {
                    const res = await fetch(`https://www.omdbapi.com/?apikey=${accessKey}&i=${movie.imdbID}`);
                    return await res.json();
                })
            );

            allMovies = [...allMovies, ...detailedMovies];
            apiPage++;
            displayNextMovies();
        } else {
            gallery.innerHTML = `<p style="color:white;">No results found for "${escapeHTML(query)}"</p>`;
            loadMoreBtn.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching movies", error);
    }

    isLoading = false;
}

function displayNextMovies() {
    const nextMovies = allMovies.slice(currentIndex, currentIndex + pageSize);
    currentIndex += pageSize;

    nextMovies.forEach(movie => {
        const card = createMovieCard(movie);
        gallery.appendChild(card);
    });

    loadMoreBtn.style.display = currentIndex < allMovies.length ? "block" : "none";
}

function createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");

    const moviePoster = document.createElement("div");
    moviePoster.classList.add("movie-poster");
    const posterImg = document.createElement("img");
    posterImg.src = movie.Poster !== "N/A" ? movie.Poster : "assets/img/placeholder.png";
    moviePoster.appendChild(posterImg);

    const movieInfo = document.createElement("div");
    movieInfo.classList.add("movie-info");

    const title = document.createElement("p");
    title.classList.add("movie-title");
    title.textContent = movie.Title;

    const rating = document.createElement("div");
    rating.classList.add("movie-rating");
    rating.textContent = movie.imdbRating !== "N/A" ? movie.imdbRating : "No rating";

    movieInfo.appendChild(title);
    movieInfo.appendChild(rating);

    const description = document.createElement("div");
    description.classList.add("movie-description");
    description.textContent = movie.Plot !== "N/A" ? movie.Plot : "No description available";

    movieCard.appendChild(moviePoster);
    movieCard.appendChild(movieInfo);
    movieCard.appendChild(description);

    return movieCard;
}

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, (match) => {
        const escapeMap = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };
        return escapeMap[match];
    });
}