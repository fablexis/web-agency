const root = document.querySelector("[data-pass]");
if (root && !root.dataset.ready) {
  root.dataset.ready = "1";
  const still = matchMedia("(prefers-reduced-motion: reduce)");
  const lang = document.documentElement.lang.startsWith("es") ? "es" : "en";
  const lines = lang === "es"
    ? ["01 spec · 4 sprints", "02 diseño · web + ios", "03 build · 128 mód · 214", "04 prod · web + store"]
    : ["01 spec · 4 sprints", "02 design · web + ios", "03 build · 128 mod · 214", "04 prod · web + store"];
  const marks = [0.04, 0.28, 0.56, 0.9];
  const read = root.querySelector("[data-pass-read]");
  const fig = root.querySelector("[data-pass-fig]");
  const buttons = [...root.querySelectorAll("[data-gate]")];
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const gateOf = (value) => (value < 0.18 ? 0 : value < 0.44 ? 1 : value < 0.72 ? 2 : 3);
  let p = still.matches ? marks[3] : marks[0];
  let target = p;
  let touring = !still.matches;
  let clock = 0;
  let visible = false;
  let frame = 0;
  let last = 0;
  let said = -1;
  let idle = 0;

  const tourAt = (t) => marks[Math.floor(t / 2.6) % marks.length];

  function draw() {
    root.style.setProperty("--p", p.toFixed(4));
    const gate = gateOf(p);
    const text = lines[gate];
    if (read.textContent !== text) read.textContent = text;
    if (fig) fig.textContent = String(gate + 1).padStart(2, "0");
    buttons.forEach((button, index) => {
      const on = index === gate;
      button.classList.toggle("is-on", on);
      if (on) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
    if (said !== gate) {
      said = gate;
      root.setAttribute("aria-valuenow", String(gate + 1));
      root.setAttribute("aria-valuetext", text);
    }
  }

  function tick(now) {
    if (!visible && touring) { frame = 0; last = 0; return; }
    const dt = last ? Math.min((now - last) / 1000, 1 / 30) : 1 / 60;
    last = now;
    const calm = still.matches;
    if (touring && !calm) {
      clock += dt;
      target = tourAt(clock);
    }
    p = calm ? target : p + (target - p) * (1 - Math.exp(-dt / 0.42));
    if (Math.abs(target - p) < 0.0015) p = target;
    draw();
    const settled = !touring && p === target;
    const keep = !settled || (visible && touring);
    frame = keep ? requestAnimationFrame(tick) : 0;
  }

  const run = () => { if (!frame) { last = 0; frame = requestAnimationFrame(tick); } };
  const steer = (next) => {
    touring = false;
    target = clamp(next, 0, 1);
    clearTimeout(idle);
    idle = setTimeout(() => { touring = !still.matches; clock = 0; run(); }, 3600);
    run();
  };
  const fromEvent = (event) => {
    const box = root.getBoundingClientRect();
    return clamp((event.clientX - box.left) / box.width, 0, 1);
  };

  new IntersectionObserver((entries) => {
    visible = entries[entries.length - 1].isIntersecting;
    if (visible) run();
  }, { rootMargin: "120px 0px" }).observe(root);

  root.addEventListener("pointerdown", (event) => {
    if (event.target.closest("[data-gate]")) return;
    try { root.setPointerCapture(event.pointerId); } catch (error) { /* synthetic pointers have no capture */ }
    steer(fromEvent(event));
  });
  root.addEventListener("pointermove", (event) => {
    if (event.buttons === 0) return;
    steer(fromEvent(event));
  });
  root.addEventListener("pointerup", (event) => {
    if (event.target.closest("[data-gate]")) return;
    steer(marks[gateOf(target)]);
  });
  buttons.forEach((button, index) => button.addEventListener("click", () => steer(marks[index])));
  root.addEventListener("keydown", (event) => {
    const here = gateOf(target);
    let to = null;
    if (event.key === "ArrowRight" || event.key === "ArrowUp") to = Math.min(marks.length - 1, here + 1);
    if (event.key === "ArrowLeft" || event.key === "ArrowDown") to = Math.max(0, here - 1);
    if (event.key === "Home") to = 0;
    if (event.key === "End") to = marks.length - 1;
    if (to === null) return;
    event.preventDefault();
    steer(marks[to]);
  });
  draw();
}
