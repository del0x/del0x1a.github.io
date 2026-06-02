const death = 3734726400000;

function tick() {
  const dist = death - Date.now();

  if (dist <= 0) {
    document.getElementById("timer").textContent = "TIME HAS RUN OUT";
    clearInterval(interval);
    return;
  }

  const d = Math.floor(dist / (1000 * 60 * 60 * 24));
  const h = Math.floor((dist / (1000 * 60 * 60)) % 24);
  const m = Math.floor((dist / (1000 * 60)) % 60);
  const s = Math.floor((dist / 1000) % 60);

  document.getElementById("timer").textContent =
    `${d}d ${h}h ${m}m ${s}s remaining`;
}

tick();
const interval = setInterval(tick, 1000);
document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); });