const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themes = ['light', 'dark', 'auto', 'psx-light', 'psx-dark'];

// --- GIF Asset Setup ---
const gifs = document.querySelectorAll(".nav-gif img");
const basePath = window.location.pathname.includes("/notes/") ? "../images/" : "images/";
const assets = {
    catAnim: basePath + "cat-roll.gif",
    catStill: basePath + "cat-roll-frame20.png",
    hatAnim: basePath + "hat.gif",
    hatStill: basePath + "hat.png"
};
let isGifPaused = sessionStorage.getItem("gifPaused") === "true";

// Initialize Theme State
let savedTheme = localStorage.getItem('theme') || 'auto';
let currentIndex = themes.indexOf(savedTheme);
// Fallback if localStorage had an invalid value
if (currentIndex === -1) currentIndex = 2; 

// --- Core Update Functions ---

function updateGifDisplay(activeTheme) {
    if (gifs.length === 0) return;

    let isVisuallyDark = false;

    // Determine if the screen is currently dark
    if (activeTheme === 'dark' || activeTheme === 'psx-dark') {
        isVisuallyDark = true;
    } else if (activeTheme === 'auto') {
        // If auto, ask the operating system
        isVisuallyDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // Pick the right image
    const targetAnim = isVisuallyDark ? assets.hatAnim : assets.catAnim;
    const targetStill = isVisuallyDark ? assets.hatStill : assets.catStill;

    // Apply to all instances of the nav-gif
    gifs.forEach(gif => {
        gif.src = isGifPaused ? targetStill : targetAnim;
    });
}

function updateTheme(theme) {
    // 1. Remove all mode classes
    body.classList.remove('light-mode', 'dark-mode', 'psx-light', 'psx-dark');

    // 2. Apply classes and button text
    if (theme === 'auto') {
        toggleBtn.textContent = '🔄'; 
        localStorage.removeItem('theme');
    } else {
        body.classList.add(theme + (theme.startsWith('psx') ? '' : '-mode'));
        localStorage.setItem('theme', theme);
        
        // Update button emojis
        if (theme === 'light') toggleBtn.textContent = '🌞';
        else if (theme === 'dark') toggleBtn.textContent = '🌙';
        else if (theme === 'psx-light') toggleBtn.textContent = '🎮';
        else if (theme === 'psx-dark') toggleBtn.textContent = '👾';
    }

    // 3. Immediately update the GIF to match the new theme
    updateGifDisplay(theme);
}

// --- Initialization & Event Listeners ---

// Set initial state on load
updateTheme(themes[currentIndex]);

// Cycle through themes on click
toggleBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % themes.length;
    updateTheme(themes[currentIndex]);
});

// Handle GIF pause/play clicks
gifs.forEach(gif => {
    gif.addEventListener("click", () => {
        isGifPaused = !isGifPaused;
        sessionStorage.setItem("gifPaused", isGifPaused.toString());
        updateGifDisplay(themes[currentIndex]);
    });
});

// Listen for OS-level dark mode changes (only matters if user is in 'auto' mode)
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (themes[currentIndex] === 'auto') {
            updateGifDisplay('auto');
        }
    });
}