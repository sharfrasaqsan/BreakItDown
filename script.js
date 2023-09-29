let isRunning = false;
let interval;
let workTime = 25 * 60; // 25 minutes in seconds
let breakTime = 5 * 60; // 5 minutes in seconds

const timerText = document.getElementById("timer-text");
const timerDisplay = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");
const workTimeInput = document.getElementById("work-time");
const breakTimeInput = document.getElementById("break-time");
const workBeepSound = new Audio("work-beep.mp3"); // Replace with your work beep sound file
const breakBeepSound = new Audio("break-beep.mp3"); // Replace with your break beep sound file

const colors = [
  "#007BFF",
  "#FF6347",
  "#00CD00",
  "#FFD700",
  "#9400D3",
  "#FF1493",
  "#32CD32",
  "#FF4500",
  "#8A2BE2",
  "#00CED1",
  "#FFA500",
  "#6A5ACD",
  "#ADFF2F",
  "#FF69B4",
  "#1E90FF",
  "#20B2AA",
  "#FFC0CB",
  "#87CEEB",
  "#FFD700",
  "#8B008B",
];

function getRandomColor() {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
}

function updateTimer() {
  timerDisplay.textContent = formatTime(isWorkTime() ? workTime : breakTime);
  timerDisplay.style.color = getRandomColor(); // Set a random color
}

function isWorkTime() {
  return timerText.textContent === "Work Time";
}

function playNotificationSound() {
  const beepSound = isWorkTime() ? workBeepSound : breakBeepSound;
  beepSound.currentTime = 0; // Reset the audio to the beginning
  beepSound.play();
}

function showNotification() {
  const notificationTitle = isWorkTime()
    ? "Work Time Ended"
    : "Break Time Ended";
  const notificationOptions = {
    body: "Your timer has finished.",
    icon: "icon.png", // Replace with the path to your notification icon
  };

  // Request permission to show notifications
  if ("Notification" in window) {
    Notification.requestPermission().then(function (permission) {
      if (permission === "granted") {
        // Show the notification
        const notification = new Notification(
          notificationTitle,
          notificationOptions
        );
      }
    });
  }
}

function startTimer() {
  isRunning = true;
  startButton.textContent = "Pause";

  interval = setInterval(function () {
    if (isWorkTime()) {
      if (workTime > 0) {
        workTime--;
        updateTimer();
      } else {
        clearInterval(interval);
        timerText.textContent = "Break Time";
        playNotificationSound();
        showNotification(); // Show a desktop notification
        startBreak();
      }
    } else {
      if (breakTime > 0) {
        breakTime--;
        updateTimer();
      } else {
        clearInterval(interval);
        timerText.textContent = "Work Time";
        playNotificationSound();
        showNotification(); // Show a desktop notification
        startWork();
      }
    }
  }, 1000);
}

function startBreak() {
  breakTime = parseInt(breakTimeInput.value) * 60;
  updateTimer();
  startTimer();
}

function startWork() {
  workTime = parseInt(workTimeInput.value) * 60;
  updateTimer();
  startTimer();
}

function toggleTimer() {
  if (isRunning) {
    clearInterval(interval);
    isRunning = false;
    startButton.textContent = "Resume";
  } else {
    startTimer();
  }
}

function resetTimer() {
  clearInterval(interval);
  isRunning = false;
  workTime = parseInt(workTimeInput.value) * 60;
  breakTime = parseInt(breakTimeInput.value) * 60;
  workTimeInput.disabled = false;
  breakTimeInput.disabled = false;
  updateTimer();
  startButton.textContent = "Start";
  timerText.textContent = "Work Time";
}

// Event listeners for input fields
workTimeInput.addEventListener("input", function () {
  if (!isRunning) {
    workTime = parseInt(this.value) * 60;
    updateTimer();
  }
});

breakTimeInput.addEventListener("input", function () {
  if (!isRunning) {
    breakTime = parseInt(this.value) * 60;
    updateTimer();
  }
});

// Event listener for spacebar key to start/stop the timer
document.addEventListener("keydown", function (event) {
  if (event.key === " ") {
    toggleTimer();
  }

  // Add a shortcut for resetting the timer (e.g., "R" key)
  if (event.key === "r" || event.key === "R") {
    resetTimer();
  }
});

startButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);

updateTimer();

//DARK MODE

// JavaScript
const darkModeToggle = document.getElementById("dark-mode-toggle");
const body = document.body; // Get the body element
const container = document.querySelector(".container"); // Get the container element

// Function to enable dark mode for the body and container
function enableDarkMode() {
  body.classList.add("dark-mode");
  container.classList.add("dark-mode");
}

// Function to disable dark mode for the body and container
function disableDarkMode() {
  body.classList.remove("dark-mode");
  container.classList.remove("dark-mode");
}

// Toggle dark mode for the body and container when the button is clicked
darkModeToggle.addEventListener("click", () => {
  if (body.classList.contains("dark-mode")) {
    disableDarkMode();
  } else {
    enableDarkMode();
  }
});
