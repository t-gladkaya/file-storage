const accessKey = "XYEZsj84hfngAfPYTLI5C87oSCunjO7CwgSm7vOIclw";

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const gallery = document.querySelector(".img-gallery");

window.addEventListener("DOMContentLoaded", () => {
    input.focus();
    fetchRandomImages();
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const query = input.value.trim();
    if (query) {
        fetchImages(query);
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