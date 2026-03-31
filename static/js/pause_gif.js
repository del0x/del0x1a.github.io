function pauseGif() {
    const gif = document.getElementById("nav-gif");

    // Pick correct paths depending on current location
    let animatedSrc, stillSrc;
    if (window.location.pathname.includes("/notes/")) {
        animatedSrc = "../images/cat-roll.gif";
        stillSrc = "../images/cat-roll-frame20.png";
    } else {
        animatedSrc = "images/cat-roll.gif";
        stillSrc = "images/cat-roll-frame20.png";
    }

    // Restore state from sessionStorage (default: false)
    sessionStorage.setItem("gifPaused", "true");
    let isPaused = sessionStorage.getItem("gifPaused") === "true";

    // Set the correct image immediately
    gif.src = isPaused ? stillSrc : animatedSrc;

    // Toggle on click and persist to sessionStorage
    gif.addEventListener("click", () => {
        if (isPaused) {
            gif.src = animatedSrc;
            sessionStorage.setItem("gifPaused", "true");
        } else {
            gif.src = stillSrc;
            sessionStorage.setItem("gifPaused", "true");
        }
        isPaused = !isPaused;
    });
}

pauseGif();
