const videos = [
    { src: "video1.mp4", title: "Day 1: My First Message" },
    { src: "video2.mp4", title: "Day 2: Another Special Moment" },
    { src: "video3.mp4", title: "Day 3: Just for You" }
];

const startDate = new Date("2025-02-01").getTime(); // Adjust the official start date
const today = new Date().getTime();
const daysPassed = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));

let unlockedVideos = JSON.parse(localStorage.getItem("unlockedVideos")) || 0;

if (daysPassed > unlockedVideos) {
    unlockedVideos = daysPassed;
    localStorage.setItem("unlockedVideos", JSON.stringify(unlockedVideos));
}

const videoList = document.getElementById("video-list");

videos.forEach((video, index) => {
    const videoWrapper = document.createElement("div");
    videoWrapper.classList.add("video-item");

    const title = document.createElement("h3");
    title.textContent = video.title;

    const videoElement = document.createElement("video");
    videoElement.src = video.src;
    videoElement.controls = true;

    if (index > unlockedVideos) {
        videoElement.classList.add("locked");
        title.textContent += " (Locked)";
    }

    videoWrapper.appendChild(title);
    videoWrapper.appendChild(videoElement);
    videoList.appendChild(videoWrapper);
});

// Countdown Timer
function updateCountdown() {
    const now = new Date();
    const nextUnlock = new Date();
    nextUnlock.setHours(0, 0, 0, 0); 
    nextUnlock.setDate(nextUnlock.getDate() + 1); 

    const timeLeft = nextUnlock - now;

    if (timeLeft > 0) {
        const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);

        document.getElementById("countdown").textContent =
            `Next video unlocks in: ${hours}h ${minutes}m ${seconds}s`;
    } else {
        document.getElementById("countdown").textContent = "A new video is available!";
    }
}

setInterval(updateCountdown, 1000);
updateCountdown();