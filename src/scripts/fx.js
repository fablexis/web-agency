// Code-flavoured effects: hero decode, live coding playground, git-log testimonials, playable footer F.
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const noLoader = () => document.documentElement.classList.contains("no-loader");

/* ───────── Decode text from code glyphs ───────── */
const GLYPHS = "{}[]()=;:+*#$_01/";
function decode(el, dur = 900) {
  const text = el.dataset.final ?? el.textContent;
  el.dataset.final = text;
  if (reduced) { el.textContent = text; return Promise.resolve(); }
  const start = performance.now();
  return new Promise((res) => {
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const n = Math.floor(p * text.length);
      const frag = document.createDocumentFragment();
      frag.append(text.slice(0, n));
      for (let i = n; i < text.length; i++) {
        if (text[i] === " ") { frag.append(" "); continue; }
        const g = document.createElement("span");
        g.className = "gl";
        g.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0];
        frag.append(g);
      }
      el.replaceChildren(frag);
      if (p < 1) requestAnimationFrame(tick);
      else { el.textContent = text; res(); }
    };
    requestAnimationFrame(tick);
  });
}

/* ───────── Hero: command + headline decode ───────── */
const heroCmd = $("[data-hero-cmd]");
if (heroCmd && !reduced) {
  const full = heroCmd.dataset.text;
  const lines = $$("[data-scramble]", $("[data-hero-h1]"));
  heroCmd.textContent = "";
  lines.forEach((l) => { l.dataset.final = l.textContent; l.style.visibility = "hidden"; });
  setTimeout(async () => {
    for (let i = 1; i <= full.length; i++) { heroCmd.textContent = full.slice(0, i); await wait(18 + Math.random() * 22); }
    await wait(140);
    for (const l of lines) { l.style.visibility = ""; await decode(l, 650); }
  }, noLoader() ? 250 : 1900);
}

/* ───────── Hero: live coding playground ───────── */
const live = $("[data-live]");
if (live) {
  const scenes = JSON.parse(live.dataset.scenes);
  const i18n = JSON.parse(live.dataset.i18n);
  const code = $("[data-live-code]", live);
  const status = $("[data-live-status]", live);
  const tabs = $$("[data-live-tabs] span", live);
  const sceneEls = $$(".live__scene", live);
  const strip = (h) => { const d = document.createElement("div"); d.innerHTML = h; return d.textContent; };
  let visible = false, started = false;
  const setStatus = (ok, txt) => { status.classList.toggle("is-ok", ok); status.lastChild.textContent = txt; };
  const showStep = (el, n) => $$("[data-step]", el).forEach((s) => s.classList.toggle("is-on", +s.dataset.step <= n));
  async function play() {
    for (let k = 0; ; k = (k + 1) % scenes.length) {
      while (!visible) await wait(300);
      const sc = scenes[k];
      tabs.forEach((t, i) => t.classList.toggle("is-on", i === k));
      sceneEls.forEach((el, i) => el.classList.toggle("is-on", i === k));
      showStep(sceneEls[k], -1);
      code.innerHTML = "";
      setStatus(false, i18n.compiling);
      const t0 = performance.now();
      for (let li = 0; li < sc.code.length; li++) {
        const ln = document.createElement("span");
        ln.className = "ln is-cur";
        code.appendChild(ln);
        const plain = strip(sc.code[li]);
        if (!reduced) {
          for (let c = 1; c <= plain.length; c++) {
            ln.textContent = plain.slice(0, c);
            ln.insertAdjacentHTML("beforeend", '<i class="cur"></i>');
            await wait(plain[c - 1] === " " ? 6 : 14 + Math.random() * 16);
          }
        }
        ln.innerHTML = sc.code[li];
        ln.classList.remove("is-cur");
        showStep(sceneEls[k], sc.steps[li]);
        await wait(reduced ? 0 : 150);
      }
      setStatus(true, `${i18n.compiled} ${((performance.now() - t0) / 9000).toFixed(2)}s · ${i18n.hot}`);
      await wait(reduced ? 6000 : 2600);
    }
  }
  new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !started) { started = true; setTimeout(play, noLoader() ? 500 : 2300); }
  }, { threshold: 0.2 }).observe(live);
}

/* ───────── Testimonials: git log ───────── */
const tlog = $("[data-tlog]");
if (tlog) {
  const tabs = $$('[role="tab"]', tlog);
  const panels = $$(".tlog__q", tlog);
  const DUR = 7500;
  let cur = 0, elapsed = 0, last = performance.now(), hover = false, inView = false;
  const show = (i, focus = false) => {
    cur = i; elapsed = 0;
    tabs.forEach((t, n) => {
      t.classList.toggle("is-active", n === i);
      t.setAttribute("aria-selected", String(n === i));
      t.tabIndex = n === i ? 0 : -1;
      $(".tlog__prog b", t).style.transform = "scaleX(0)";
    });
    panels.forEach((p, n) => { p.hidden = n !== i; p.classList.toggle("is-active", n === i); });
    const q = $("[data-decode]", panels[i]);
    if (q) decode(q, 650);
    if (focus) tabs[i].focus();
  };
  tabs.forEach((t, i) => { t.tabIndex = i === 0 ? 0 : -1; t.addEventListener("click", () => show(i)); });
  tlog.addEventListener("keydown", (e) => {
    if (!["ArrowDown", "ArrowUp"].includes(e.key) || !e.target.matches('[role="tab"]')) return;
    e.preventDefault();
    show((cur + (e.key === "ArrowDown" ? 1 : -1) + tabs.length) % tabs.length, true);
  });
  tlog.addEventListener("pointerenter", () => (hover = true));
  tlog.addEventListener("pointerleave", () => (hover = false));
  const tick = (now) => {
    const dt = now - last; last = now;
    if (inView && !hover && !reduced) {
      elapsed += dt;
      const p = Math.min(1, elapsed / DUR);
      $(".tlog__prog b", tabs[cur]).style.transform = `scaleX(${p})`;
      if (p >= 1) show((cur + 1) % tabs.length);
    }
    requestAnimationFrame(tick);
  };
  new IntersectionObserver(([e]) => { inView = e.isIntersecting; }, { threshold: 0.3 }).observe(tlog);
  requestAnimationFrame(tick);
}

/* ───────── Footer: playable F + glowing letters ───────── */
const fplay = $("#fplay");
if (fplay) {
  const box = $(".fplay__f", fplay);
  const letterEls = $$(".fplay__l", fplay);
  const cursor = document.createElement("i");
  cursor.className = "fplay__cursor";
  fplay.appendChild(cursor);
  const cells = $$("i", box).map((el) => ({ el, fork: el.classList.contains("is-fork"), x: 0, y: 0, r: 0, vx: 0, vy: 0, vr: 0, tx: 0, ty: 0, tr: 0 }));
  let pointer = null, dropping = false, running = false, inView = false, idle = 0;
  const unit = () => box.getBoundingClientRect().height / 32;
  const homes = () => {
    const b = box.getBoundingClientRect();
    return cells.map((c) => { const r = c.el.getBoundingClientRect(); return { x: r.left - c.x + r.width / 2 - b.left, y: r.top - c.y + r.height / 2 - b.top }; });
  };
  const glow = () => letterEls.forEach((l) => {
    if (!pointer) return l.style.setProperty("--glow", "0");
    const r = l.getBoundingClientRect();
    const d = Math.hypot(pointer.x - (r.left + r.width / 2), pointer.y - (r.top + r.height / 2));
    l.style.setProperty("--glow", Math.max(0, 1 - d / 240).toFixed(3));
  });
  const frame = () => {
    const u = unit();
    const b = box.getBoundingClientRect();
    const hs = homes();
    let energy = 0;
    cells.forEach((c, i) => {
      let tx = c.tx, ty = c.ty, tr = c.tr;
      const h = hs[i];
      if (!dropping && pointer) {
        const px = pointer.x - b.left, py = pointer.y - b.top;
        if (c.fork) {
          if (Math.hypot(px - h.x, py - h.y) < 70 * u) { tx = (px - h.x) * 0.92; ty = (py - h.y) * 0.92; tr = tx * 0.5; }
        } else {
          const dx = h.x - px, dy = h.y - py, d = Math.hypot(dx, dy) || 1, R = 14 * u;
          if (d < R) { const f = (1 - d / R) * 9 * u; tx = (dx / d) * f; ty = (dy / d) * f; tr = (dx / d) * 18; }
          c.el.classList.toggle("is-hot", d < R * 0.8);
        }
      } else c.el.classList.remove("is-hot");
      const k = dropping ? 0.06 : 0.12, damp = dropping ? 0.82 : 0.78;
      c.vx = (c.vx + (tx - c.x) * k) * damp; c.vy = (c.vy + (ty - c.y) * k) * damp; c.vr = (c.vr + (tr - c.r) * k) * damp;
      c.x += c.vx; c.y += c.vy; c.r += c.vr;
      energy += Math.abs(c.vx) + Math.abs(c.vy) + Math.abs(tx - c.x) + Math.abs(ty - c.y);
      c.el.style.transform = `translate(${c.x.toFixed(2)}px, ${c.y.toFixed(2)}px) rotate(${c.r.toFixed(1)}deg)`;
    });
    glow();
    idle = energy < 0.5 && !pointer ? idle + 1 : 0;
    if (inView && idle < 30) requestAnimationFrame(frame);
    else running = false;
  };
  const kick = () => { if (!running && inView) { running = true; idle = 0; requestAnimationFrame(frame); } };
  if (!reduced) {
    fplay.addEventListener("pointermove", (e) => {
      pointer = { x: e.clientX, y: e.clientY };
      const r = fplay.getBoundingClientRect();
      cursor.style.left = `${e.clientX - r.left}px`;
      cursor.style.top = `${e.clientY - r.top}px`;
      kick();
    });
    fplay.addEventListener("pointerleave", () => { pointer = null; kick(); });
    fplay.addEventListener("click", () => {
      if (dropping) return;
      dropping = true;
      const u = unit();
      const hs = homes();
      const stack = [0, 0, 0, 0, 0];
      cells.forEach((c, i) => {
        const col = i % 5;
        stack[col] += 1;
        c.tx = (col - 2) * 6.5 * u + 12.75 * u - hs[i].x;
        c.ty = 32 * u - stack[col] * 6.5 * u + 3 * u - hs[i].y;
        c.tr = Math.random() > 0.5 ? 90 : 0;
      });
      kick();
      setTimeout(() => { cells.forEach((c) => { c.tx = 0; c.ty = 0; c.tr = 0; }); kick(); setTimeout(() => (dropping = false), 900); }, 1400);
    });
  }
  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    if (inView) { fplay.classList.add("is-in"); kick(); }
  }, { threshold: 0.3 }).observe(fplay);
  if (reduced) fplay.classList.add("is-in");
}
