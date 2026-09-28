function revealAndCount() {
  const vh = window.innerHeight || document.documentElement.clientHeight;
  document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh * 0.9 && rect.bottom > 0) {
      const delay = parseInt(el.getAttribute("data-delay") || "0", 10);
      el.style.transitionDelay = delay + "ms";
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
      el.setAttribute("data-revealed", "1");
    }
  });
  document.querySelectorAll("[data-count]:not([data-counted])").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vh * 0.92 && rect.bottom > 0) animateCount(el);
  });
}

function animateCount(el) {
  el.setAttribute("data-counted", "1");
  const target = parseFloat(el.getAttribute("data-count"));
  const suffix = el.getAttribute("data-suffix") || "";
  const decimals = el.getAttribute("data-dec") === "1";
  const duration = 1700;
  const start = performance.now();
  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = (decimals ? value.toFixed(1) : Math.round(value).toString()) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function bindHover() {
  document.querySelectorAll("[style-hover]").forEach((el) => {
    const extra = el.getAttribute("style-hover");
    el.addEventListener("mouseenter", () => {
      const rest = el.getAttribute("style") || "";
      el.dataset.restStyle = rest;
      el.setAttribute("style", rest + ";" + extra);
    });
    el.addEventListener("mouseleave", () => {
      if (el.dataset.restStyle != null) el.setAttribute("style", el.dataset.restStyle);
    });
  });
}

function bindCursor() {
  const glow = document.getElementById("cursor-glow");
  if (!glow || window.matchMedia("(pointer: coarse)").matches) {
    if (glow) glow.style.display = "none";
    return;
  }
  window.addEventListener(
    "pointermove",
    (event) => {
      glow.style.transform = "translate(" + event.clientX + "px, " + event.clientY + "px)";
    },
    { passive: true },
  );
}

revealAndCount();
window.addEventListener("scroll", revealAndCount, { passive: true });
window.addEventListener("resize", revealAndCount, { passive: true });
const poll = setInterval(() => {
  revealAndCount();
  const pendingReveal = document.querySelectorAll("[data-reveal]:not([data-revealed])").length;
  const pendingCount = document.querySelectorAll("[data-count]:not([data-counted])").length;
  if (pendingReveal === 0 && pendingCount === 0) clearInterval(poll);
}, 180);
bindHover();
bindCursor();
