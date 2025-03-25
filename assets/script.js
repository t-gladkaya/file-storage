const prev = document.getElementById("prev");
const next = document.getElementById("next");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const covers = [document.getElementById("cover-beyonce"), document.getElementById("cover-dualipa")];
const audios = [document.getElementById("audio-beyonce"), document.getElementById("audio-dualipa")];
const durationTime = document.getElementById("duration-time");
const currentTimeDisplay = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");


let currentIndex = 0;

covers.forEach((cover, index) => {
    cover.style.display = index === currentIndex ? "block" : "none";
});

audios.forEach((audio, index) => {
    audio.pause();
    audio.currentTime = 0;
});

prev.addEventListener("click", function () {
    changeTrack(-1);
});

next.addEventListener("click", function () {
    changeTrack(1);
});

play.addEventListener("click", function () {
    audios[currentIndex].play();
    covers[currentIndex].style.transform = "scale(1.2)";
    updatePlayStopButton(true);
});

pause.addEventListener("click", function () {
    audios[currentIndex].pause();
    covers[currentIndex].style.transform = "scale(1)";
    updatePlayStopButton(false);
});

progressBar.addEventListener("input", function () {
    const currentAudio = audios[currentIndex];
    const seekTime = (progressBar.value / 100) * currentAudio.duration;
    currentAudio.currentTime = seekTime;
    currentTimeDisplay.textContent = formatTime(seekTime);
});

function changeTrack(direction) {
    audios[currentIndex].pause(); 
    covers[currentIndex].style.display = "none";

    currentIndex = (currentIndex + direction + covers.length) % covers.length;
    document.body.style.setProperty('--background-url', `url(${covers[currentIndex].src})`);

    covers[currentIndex].style.display = "block";
    audios[currentIndex].currentTime = 0;
    audios[currentIndex].play();

    updateDuration(); 
    updateProgress();
    updatePlayStopButton(true);
}

function updatePlayStopButton(isPlaying) {
    play.style.display = isPlaying ? "none" : "block";
    pause.style.display = isPlaying ? "block" : "none";
}

// Audio duration time

function updateDuration() {
    const currentAudio = audios[currentIndex];

    if (currentAudio.readyState > 0) {
        durationTime.textContent = formatTime(currentAudio.duration);
    } else {
        currentAudio.addEventListener("loadedmetadata", () => {
            durationTime.textContent = formatTime(currentAudio.duration);
        });
    }
}

function updateProgress() {
    const currentAudio = audios[currentIndex];
    
    currentAudio.addEventListener("timeupdate", () => {
        currentTimeDisplay.textContent = formatTime(currentAudio.currentTime);
        progressBar.value = (currentAudio.currentTime / currentAudio.duration) * 100;
    });
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

document.addEventListener("DOMContentLoaded", () => {
    updateDuration();
    updateProgress();
});
