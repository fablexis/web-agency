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

/* ───────── Hero: typed headline that compiles from code ───────── */
const heroCmd = $("[data-hero-cmd]");
const h1 = $("[data-hero-h1]");
if (h1 && !reduced) {
  const l1 = $("[data-type]", h1), l2 = $("[data-compile]", h1);
  const t1 = l1.textContent, t2 = l2.textContent, code = l2.dataset.code;
  const full = heroCmd?.dataset.text ?? "";
  const letters = (el, text) => {
    el.textContent = "";
    return [...text].map((ch) => { const s = document.createElement("span"); s.className = "tl-ch"; s.textContent = ch; el.appendChild(s); return s; });
  };
  const l1s = letters(l1, t1);
  l2.classList.add("is-code");
  l2.textContent = "";
  if (heroCmd) heroCmd.textContent = "";
  h1.classList.add("is-typing");
  setTimeout(async () => {
    // command line types in parallel
    if (heroCmd) (async () => { for (let i = 1; i <= full.length; i++) { heroCmd.textContent = full.slice(0, i); await wait(11); } })();
    // line 1: typed with a block caret
    for (const s of l1s) { s.classList.add("is-on", "is-cur"); await wait(34); s.classList.remove("is-cur"); }
    // line 2: written as code first…
    for (let i = 1; i <= code.length; i++) { l2.textContent = code.slice(0, i); await wait(17); }
    await wait(170);
    // …then compiled letter by letter into the headline
    l2.classList.remove("is-code");
    const l2s = letters(l2, t2);
    const W = l2.getBoundingClientRect().width;
    l2s.forEach((s, i) => {
      s.style.setProperty("--i", i);
      s.style.backgroundSize = `${W}px 100%`;
      s.style.backgroundPosition = `${-s.offsetLeft}px 0`;
      s.classList.add("is-flip");
    });
    h1.classList.remove("is-typing");
    h1.classList.add("is-compiled");
    await wait(l2s.length * 22 + 520);
    l2.textContent = t2;
    l1.textContent = t1;
  }, noLoader() ? 150 : 1400);
} else if (heroCmd) heroCmd.textContent = heroCmd.dataset.text;

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

/* ───────── Team photos: compile from ASCII, live ASCII on hover ───────── */
const RAMP = " .,:;i1tfLCG08@";
$$("[data-ascii]").forEach((fig) => {
  const img = $("img", fig), canvas = $("canvas", fig), scan = $(".dev__scan", fig);
  const accent = getComputedStyle(fig.closest(".dev") || fig).getPropertyValue("--fc").trim() || "#45E0FF";
  const ctx = canvas.getContext("2d");
  let lum = null, cols = 0, rows = 0, cw = 0, ch = 0, reveal = 0, hover = 0, hoverTarget = 0, raf = 0, started = false;
  const sample = () => {
    const r = fig.getBoundingClientRect();
    const dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
    cols = r.width < 360 ? 52 : 78;
    cw = canvas.width / cols; ch = cw * 1.7; rows = Math.ceil(canvas.height / ch);
    const off = document.createElement("canvas");
    off.width = cols; off.height = rows;
    const o = off.getContext("2d");
    // mimic object-fit: cover; object-position: 50% 18%
    const s = Math.max(cols / img.naturalWidth, rows * (ch / cw) / img.naturalHeight);
    const dw = img.naturalWidth * s, dh = img.naturalHeight * s / (ch / cw);
    o.drawImage(img, (cols - dw) / 2, (rows - dh) * 0.18, dw, dh);
    const d = o.getImageData(0, 0, cols, rows).data;
    lum = new Float32Array(cols * rows);
    for (let i = 0; i < cols * rows; i++) lum[i] = (d[i * 4] * 0.3 + d[i * 4 + 1] * 0.59 + d[i * 4 + 2] * 0.11) / 255;
  };
  const draw = (t) => {
    if (!lum) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const scanRow = reveal * rows;
    ctx.font = `${Math.round(ch * 0.82)}px "JetBrains Mono", monospace`;
    ctx.textBaseline = "top";
    for (let y = 0; y < rows; y++) {
      const hidden = y >= scanRow;            // not yet compiled → solid ASCII
      const a = hidden ? 1 : hover;            // compiled → ASCII only while hovering
      if (a <= 0.01) continue;
      ctx.fillStyle = `rgba(6, 7, 14, ${hidden ? 1 : 0.92 * a})`;
      ctx.fillRect(0, y * ch, canvas.width, ch + 1);
      for (let x = 0; x < cols; x++) {
        let v = lum[y * cols + x];
        if (hover > 0 && Math.random() < 0.012) v = Math.random();
        const c = RAMP[Math.min(RAMP.length - 1, Math.floor(Math.pow(v, 0.75) * RAMP.length))];
        if (c === " ") continue;
        ctx.globalAlpha = Math.min(1, 0.45 + v * 1.1) * (hidden ? 1 : a);
        ctx.fillStyle = v > 0.55 ? "#eef2f8" : accent;
        ctx.fillText(c, x * cw, y * ch);
      }
      ctx.globalAlpha = 1;
    }
    if (scan) { scan.style.opacity = reveal > 0 && reveal < 1 ? "1" : "0"; scan.style.transform = `translateY(${(scanRow * ch) / (canvas.height / fig.clientHeight)}px)`; }
  };
  const loop = (now) => {
    hover += (hoverTarget - hover) * 0.12;
    draw(now);
    raf = (reveal < 1 || Math.abs(hoverTarget - hover) > 0.01 || hoverTarget > 0) ? requestAnimationFrame(loop) : 0;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
  const start = () => {
    if (started) return; started = true;
    sample();
    if (reduced) { reveal = 1; draw(); return; }
    const t0 = performance.now();
    const step = (now) => { reveal = Math.min(1, (now - t0) / 1500); if (reveal < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step); kick();
  };
  const ready = () => new IntersectionObserver(([e], io) => { if (e.isIntersecting) { io.disconnect(); setTimeout(start, 250); } }, { threshold: 0.35 }).observe(fig);
  img.complete && img.naturalWidth ? ready() : img.addEventListener("load", ready, { once: true });
  if (!reduced) {
    fig.closest(".dev").addEventListener("pointerenter", () => { if (started && reveal >= 1) { hoverTarget = 1; kick(); } });
    fig.closest(".dev").addEventListener("pointerleave", () => { hoverTarget = 0; kick(); });
  }
  addEventListener("resize", () => { if (started) { sample(); draw(); } }, { passive: true });
});
