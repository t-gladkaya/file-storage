document.addEventListener("DOMContentLoaded", function () {
    const photos = document.querySelectorAll(".photo"); 
    const menuItems = document.querySelectorAll(".menu-item"); 
    const play = document.getElementById("play");
    const pause = document.getElementById("pause");
    
    let currentAudio = document.getElementById("audio-drozd");

    document.getElementById("photo-drozd").style.display = "flex";

    menuItems.forEach(item => {
        item.addEventListener("click", function (event) {
            event.preventDefault();

            
            photos.forEach(photo => (photo.style.display = "none"));

            const targetPhoto = document.getElementById(`photo-${item.id}`);
            if (targetPhoto) {
                targetPhoto.style.display = "flex";
            }

            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
            }

            const targetAudio = document.getElementById(`audio-${item.id}`);
            if (targetAudio) {
                targetAudio.play();
                currentAudio = targetAudio; 
                updatePlayPauseButton(true);
            }

            menuItems.forEach(menu => menu.classList.remove("active"));

            item.classList.add("active");
        });
    });

    play.addEventListener("click", function () {
        if (currentAudio) {
            currentAudio.play();
            updatePlayPauseButton(true);
        }
    });

    pause.addEventListener("click", function () {
        if (currentAudio) {
            currentAudio.pause();
            updatePlayPauseButton(false);
        }
    });

    function updatePlayPauseButton(isPlaying) {
        if (isPlaying) {
            play.style.display = "none";
            pause.style.display = "block";
        } else {
            play.style.display = "block";
            pause.style.display = "none";
        }
    }

});
