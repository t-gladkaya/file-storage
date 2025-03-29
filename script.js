const bigPlay = document.getElementById("big-play-btn");
const play = document.getElementById("play");
const pause = document.getElementById("pause");
const video = document.getElementById("main-video");
const durationTime = document.getElementById("duration-time");
const currentTimeDisplay = document.getElementById("current-time");
const progressbar = document.getElementById("video-progress-bar");
const volumeBar = document.getElementById("volume-progress-bar");
const mic = document.getElementById("mic");
const mute = document.getElementById("mute");

let currentIndex = 0;

video.volume = 0.5;

volumeBar.value = video.volume * 100; 
updateVolumeBarColor();


// navigation 

bigPlay.addEventListener("click", function() {
    video.play();
    bigPlay.style.display = "none";
    updatePlayPauseBtn(true);
})

play.addEventListener("click", function() {
    video.play();
    bigPlay.style.display = "none";
    updatePlayPauseBtn(true);
})

pause.addEventListener("click", function() {
    video.pause();
    bigPlay.style.display = "block";
    updatePlayPauseBtn(false);
})

video.addEventListener("click", function() {
    video.pause();
    bigPlay.style.display = "block";
    updatePlayPauseBtn(false);
})

function updatePlayPauseBtn(isPlaying) {
    play.style.display = isPlaying ? "none" : "block";
    pause.style.display = isPlaying ? "block" : "none";
}

// Update video progressbar 

function updateTimeDisplay() {
    let currentMinutes = Math.floor(video.currentTime / 60);
    let currentSeconds = Math.floor(video.currentTime % 60);
    let durationMinutes = Math.floor(video.duration / 60);
    let durationSeconds = Math.floor(video.duration % 60);

    currentTimeDisplay.textContent = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds}`;
    durationTime.textContent = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds}`;
    
    currentTimeDisplay.style.display = "none";
    durationTime.style.display = "none";
}

progressbar.addEventListener("input", (e) => {
    video.currentTime = (e.target.value / 100) * video.duration;
});

function updateProgressBarColor() {
    let percentage = (video.currentTime / video.duration) * 100;
    progressbar.style.background = `linear-gradient(to right, #c9b56e ${percentage}%, #c2c0b9 ${percentage}%)`;
}

video.addEventListener("timeupdate", () => {
    progressbar.value = (video.currentTime / video.duration) * 100;
    updateProgressBarColor();
});

// Update volume
volumeBar.addEventListener("input", (e) => {
    video.volume = e.target.value / 100;
    updateVolumeBarColor();
    toggleMuteIcon();
});

mic.addEventListener("click", () => {
    video.volume = 0;
    volumeBar.value = 0;
    updateVolumeBarColor();
    toggleMuteIcon();
});

mute.addEventListener("click", () => {
    video.volume = 1;
    volumeBar.value = 100;
    updateVolumeBarColor();
    toggleMuteIcon();
});

// Update Progressbar color 
function updateVolumeBarColor() {
    let percentage = volumeBar.value;
    volumeBar.style.background = `linear-gradient(to right, #c9b56e ${percentage}%, #c2c0b9 ${percentage}%)`;
}

function toggleMuteIcon() {
    if (video.volume === 0) {
        mic.style.display = "none";
        mute.style.display = "block";
    } else {
        mic.style.display = "block";
        mute.style.display = "none";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateProgress();
    updatePlayPauseBtn(false);
});
