const toggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const themes = ['light', 'dark', 'auto'];

// Initialize: Get preference from storage or default to 'auto'
let savedTheme = localStorage.getItem('theme') || 'auto';
let currentIndex = themes.indexOf(savedTheme);

// Apply the theme
function updateTheme(theme) {
  // Remove all mode classes
  body.classList.remove('light-mode', 'dark-mode');

  if (theme === 'auto') {
    toggleBtn.textContent = '🔄'; // Auto/system
    localStorage.removeItem('theme');
  } else if (theme === 'light') {
    body.classList.add('light-mode');
    toggleBtn.textContent = '🌞'; // Light
    localStorage.setItem('theme', theme);
  } else if (theme === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '🌙'; // Dark
    localStorage.setItem('theme', theme);
  }
}

// Set initial state
updateTheme(themes[currentIndex]);

// Cycle through themes on click
toggleBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % themes.length;
  updateTheme(themes[currentIndex]);
});