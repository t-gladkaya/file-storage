const accessKey = "XYEZsj84hfngAfPYTLI5C87oSCunjO7CwgSm7vOIclw";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const gallery = document.querySelector(".img-gallery");
const button = document.getElementById("search-button");

window.addEventListener("DOMContentLoaded", () => {
    input.focus();
    fetchRandomImages();
    button.classList.add("search");
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
        fetchImages(query);
        button.classList.remove("search");
        button.classList.add("close");
    }
});

input.addEventListener("input", () => {
    const query = input.value.trim();
    if (query === "") {
        button.classList.remove("close");
        button.classList.add("search");
    }
});

button.addEventListener("click", (e) => {
    if (button.classList.contains("close")) {
        e.preventDefault();
        input.value = "";
        input.focus();
        button.classList.remove("close");
        button.classList.add("search");
        fetchRandomImages();
    }
});


async function fetchRandomImages() {
    try {
        const url = `https://api.unsplash.com/photos/random?count=30&client_id=${accessKey}`;
        const response = await fetch(url);
        const data = await response.json();
        displayImages(data);
    } catch (error) {
        console.error("Error loading random images:", error);
    }
}

async function fetchImages(query) {
    try {
        const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=30&client_id=${accessKey}`;
        const response = await fetch(url);
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error("Error loading random images:", error);
    }
}

function displayImages(images) {
    gallery.innerHTML = "";
    images.forEach(image => {
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("img");

        const img = document.createElement("img");
        img.src = image.urls.small;
        img.alt = image.alt_description || "Unsplash Image";

        imgDiv.appendChild(img);
        gallery.appendChild(imgDiv);
    });
}