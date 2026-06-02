function pauseGif() {
  const gif = document.getElementById("nav-gif");

// store original and still src
const animatedSrc = "images/cat-roll.gif";
const stillSrc = "images/cat-roll-frame20.png";

let isPaused = false;

gif.addEventListener("click", () => {
  if (isPaused) {
    gif.src = animatedSrc; // play GIF
  } else {
    gif.src = stillSrc;    // pause GIF
  }
  isPaused = !isPaused;
});

}

function currentActivity() {
  // Array of possible activities with emojis
    const activities = [
      "reading a book 📖",
      "writing some code 💻",
      "drinking coffee ☕",
      "listening to music 🎵",
      "taking a walk 🚶",
      "thinking about life 🤔",
      "learning something new 🧠",
      "planning the next project 📝",
      "exploring the outdoors 🌳",
      "playing a game 🎮",
      "praising the sun 🌞"
    ];

    // Function to pick a random activity
    function getRandomActivity() {
      const index = Math.floor(Math.random() * activities.length);
      return activities[index];
    }

    // Update the message dynamically on page load
    const statusElement = document.getElementById("status-message");
    statusElement.textContent = ` ${getRandomActivity()}`;

} 


function getTime() {
  document.addEventListener("DOMContentLoaded", () => {
    const timezoneElement = document.getElementById("footer-timezone");

    function updateTime() {
      const now = new Date();

      // Get the user's current timezone
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const formattedZone = timeZone.split("/").pop().replace(/_/g, " ");

      // Format the local time (hour:minute only)
      const options = {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone
      };
      const localTime = new Intl.DateTimeFormat([], options).format(now);

      // Update footer text
      timezoneElement.textContent = `🕒 ${localTime} — ${formattedZone}`;
    }

    // Initial call
    updateTime();

    // Update once every minute
    setInterval(updateTime, 60000);
  });

}


currentActivity();
getTime();
