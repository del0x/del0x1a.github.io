const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themes = ['light', 'dark', 'auto'];

// Initialize: Get preference from storage or default to 'auto'
let savedTheme = localStorage.getItem('theme') || 'auto';
let currentIndex = themes.indexOf(savedTheme);

function updateTheme(theme) {
  body.classList.remove('light-mode', 'dark-mode');
  
  if (theme === 'auto') {
    toggleBtn.textContent = '[ AUTO ]';
    localStorage.removeItem('theme');
  } else {
    body.classList.add(`${theme}-mode`);
    toggleBtn.textContent = `[ ${theme.toUpperCase()} ]`;
    localStorage.setItem('theme', theme);
  }
}

// Set initial state
updateTheme(themes[currentIndex]);

// Cycle on click
toggleBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % themes.length;
  updateTheme(themes[currentIndex]);
});