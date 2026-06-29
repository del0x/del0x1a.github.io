function pauseGif() {
    // Grab ALL images inside the .nav-gif span (solves duplicate mobile/desktop navs)
    const gifs = document.querySelectorAll(".nav-gif img");
    if (gifs.length === 0) return;

    const basePath = window.location.pathname.includes("/notes/") ? "../images/" : "images/";

    const assets = {
        catAnim: basePath + "cat-roll.gif",
        catStill: basePath + "cat-roll-frame20.png",
        hatAnim: basePath + "hat.gif",
        hatStill: basePath + "hat.png"
    };

    let isPaused = sessionStorage.getItem("gifPaused") === "true";

    const updateGifSrc = () => {
        const body = document.body;
        const hasDarkClass = body.classList.contains("dark-mode") || body.classList.contains("psx-dark");
        const hasLightClass = body.classList.contains("light-mode") || body.classList.contains("psx-light");
        const prefersSystemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        const isDark = hasDarkClass || (prefersSystemDark && !hasLightClass);

        const targetAnim = isDark ? assets.hatAnim : assets.catAnim;
        const targetStill = isDark ? assets.hatStill : assets.catStill;

        // Loop through every GIF on the page and update it
        gifs.forEach(gif => {
            gif.src = isPaused ? targetStill : targetAnim;
        });
    };

    updateGifSrc();

    // Attach the click listener to all found GIFs
    gifs.forEach(gif => {
        gif.addEventListener("click", () => {
            isPaused = !isPaused;
            sessionStorage.setItem("gifPaused", isPaused.toString());
            updateGifSrc();
        });
    });

    const observer = new MutationObserver(updateGifSrc);
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateGifSrc);
    }
}

pauseGif();