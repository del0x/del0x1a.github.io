// Nav links data
const navLinksData = [
  { href: "/index.html", text: "Me" },
  { href: "/notes/index.html", text: "Notes" },
];

// Function to generate nav
function generateNav() {
  const container = document.getElementById("nav-container");

  const nav = document.createElement("nav");

  // Use the header nav CSS
  nav.classList.add("header-nav");

  // GIF
  const gifSpan = document.createElement("span");
  gifSpan.classList.add("nav-gif");
  const gifImg = document.createElement("img");
  gifImg.src = "images/cat-roll.gif";
  gifImg.alt = "Pixel Art GIF";
  gifImg.width = 36;
  gifImg.height = 36;
  gifSpan.appendChild(gifImg);
  nav.appendChild(gifSpan);

  // Links
  navLinksData.forEach(linkData => {
    const link = document.createElement("a");
    link.href = linkData.href;
    link.textContent = linkData.text;

    // Highlight current page using your CSS class
    const linkPath = new URL(link.href, window.location.origin).pathname;
    if (linkPath === window.location.pathname) {
      link.classList.add("active");
    }

    nav.appendChild(link);
  });

  container.appendChild(nav);
}

// Generate nav
generateNav();
