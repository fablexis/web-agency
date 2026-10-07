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
  const t1 = l1.textContent, t2 = l2.textContent, code = l2.dataset.src;
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
    if (heroCmd) (async () => { for (let i = 1; i <= full.length; i++) { heroCmd.textContent = full.slice(0, i); await wait(40); } })();
    // line 1: typed with a block caret
    for (const s of l1s) { s.classList.add("is-on", "is-cur"); await wait(85); s.classList.remove("is-cur"); }
    // line 2: written as code first…
    for (let i = 1; i <= code.length; i++) { l2.textContent = code.slice(0, i); await wait(52); }
    await wait(520);
    // …then compiled letter by letter into the headline
    l2.classList.remove("is-code");
    const l2s = letters(l2, t2);
    // size every letter's gradient to the whole line so the colors match the final text exactly
    const box = l2.getBoundingClientRect();
    l2s.forEach((s, i) => {
      const r = s.getBoundingClientRect();
      s.style.setProperty("--i", i);
      s.style.backgroundSize = `${box.width}px ${box.height}px`;
      s.style.backgroundPosition = `${box.left - r.left}px ${box.top - r.top}px`;
      s.classList.add("is-flip");
    });
    h1.classList.remove("is-typing");
    h1.classList.add("is-compiled");
    await wait(l2s.length * 30 + 560);
    l2.textContent = t2;
    l1.textContent = t1;
  }, noLoader() ? 150 : 2250);
} else if (heroCmd) heroCmd.textContent = heroCmd.dataset.text;

/* ───────── Hero: product showcase (3D fan, auto-rotating) ───────── */
const showcase = $("[data-showcase]");
if (showcase) {
  const cards = $$("[data-card]", showcase), rail = $$("[data-go]", showcase);
  const DWELL = 3200;
  let front = 0, t = 0, last = performance.now(), hover = false, visible = false, phoneTimer = 0;
  const layout = () => {
    cards.forEach((c, i) => {
      const pos = (i - front + cards.length) % cards.length;
      c.dataset.pos = pos;
      c.classList.toggle("is-front", pos === 0);
      $(".sc-card__link", c).tabIndex = pos === 0 ? 0 : -1;
    });
    rail.forEach((r, i) => { r.classList.toggle("is-on", i === front); r.setAttribute("aria-selected", String(i === front)); });
    // phone: flip through app screens while in front
    clearInterval(phoneTimer);
    const shots = $$(".sc-phone__screens img", cards[front]);
    if (shots.length && !reduced) { let k = 0; phoneTimer = setInterval(() => { shots[k].classList.remove("is-on"); k = (k + 1) % shots.length; shots[k].classList.add("is-on"); }, 1050); }
  };
  const go = (i) => { front = (i + cards.length) % cards.length; t = 0; layout(); };
  cards.forEach((c, i) => c.addEventListener("click", (e) => { if (i !== front) { e.preventDefault(); go(i); } }));
  rail.forEach((r, i) => r.addEventListener("click", () => go(i)));
  showcase.addEventListener("pointerenter", () => (hover = true));
  showcase.addEventListener("pointerleave", () => { hover = false; showcase.style.setProperty("--mx", "0"); showcase.style.setProperty("--my", "0"); });
  showcase.addEventListener("pointermove", (e) => {
    const r = showcase.getBoundingClientRect();
    showcase.style.setProperty("--mx", ((e.clientX - r.left) / r.width - 0.5).toFixed(3));
    showcase.style.setProperty("--my", ((e.clientY - r.top) / r.height - 0.5).toFixed(3));
  });
  new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0.2 }).observe(showcase);
  const tick = (now) => {
    const dt = now - last; last = now;
    if (visible && !hover && !reduced) {
      t += dt;
      rail[front].style.setProperty("--p", Math.min(1, t / DWELL));
      if (t >= DWELL) go(front + 1);
    }
    requestAnimationFrame(tick);
  };
  layout();
  requestAnimationFrame(tick);
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
  const letterEls = $$(".fplay__lg", fplay);
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

/* ───────── Team cards: code types itself while the photo compiles ───────── */
$$(".dev").forEach((card, cardIndex) => {
  const code = $("[data-type-code]", card), fig = $("[data-compile-photo]", card);
  if (!code || !fig) return;
  const img = $("img", fig), canvas = $("canvas", fig), status = $("[data-photo-status]", fig);
  const ctx = canvas.getContext("2d");
  const lang = document.documentElement.lang;
  const file = status.textContent.split(" ")[0];
  const L = lang === "es" ? { comp: "compilando", done: "compilado en" } : { comp: "compiling", done: "compiled in" };
  const LEVELS = [5, 9, 16, 28, 48, 90];

  // collect every text node so nested spans/headings type in order
  const nodes = [];
  const walk = (n) => n.childNodes.forEach((c) => (c.nodeType === 3 ? c.textContent.length && nodes.push({ n: c, t: c.textContent }) : walk(c)));
  walk(code);
  const total = nodes.reduce((a, x) => a + x.t.length, 0);
  const caret = document.createElement("i");
  caret.className = "dev__caret";

  const pixel = (cols) => {
    const r = fig.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
    canvas.width = Math.round(r.width * dpr); canvas.height = Math.round(r.height * dpr);
    const rows = Math.max(1, Math.round(cols * canvas.height / canvas.width));
    const off = document.createElement("canvas"); off.width = cols; off.height = rows;
    const o = off.getContext("2d");
    const s = Math.max(cols / img.naturalWidth, rows / img.naturalHeight);
    const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
    o.drawImage(img, (cols - dw) / 2, (rows - dh) * 0.18, dw, dh);
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(off, 0, 0, canvas.width, canvas.height);
  };

  const run = async () => {
    if (reduced) return;
    fig.classList.add("is-compiling");
    nodes.forEach((x) => (x.n.textContent = ""));
    let typed = 0, level = -1;
    const t0 = performance.now();
    pixel(LEVELS[0]);
    for (const x of nodes) {
      x.n.parentNode.insertBefore(caret, x.n.nextSibling);
      for (let i = 1; i <= x.t.length; i++) {
        x.n.textContent = x.t.slice(0, i);
        typed++;
        const lv = Math.min(LEVELS.length - 1, Math.floor((typed / total) * LEVELS.length));
        if (lv !== level) {
          level = lv; pixel(LEVELS[lv]);
          status.textContent = `${L.comp} ${file} · ${lv + 1}/${LEVELS.length}`;
        }
        const ch = x.t[i - 1];
        if (ch !== " ") await wait(ch === "," || ch === "." ? 40 : 12);
      }
    }
    caret.remove();
    fig.classList.remove("is-compiling");
    fig.classList.add("is-built");
    status.textContent = `${L.done} ${((performance.now() - t0) / 1000).toFixed(1)}s · 880×1172`;
  };

  // hide text until the card is reached, then type; keeps the text in the HTML for SEO
  if (!reduced) code.classList.add("is-pending");
  const start = () => { code.classList.remove("is-pending"); run(); };
  const ready = () => new IntersectionObserver(([e], io) => { if (e.isIntersecting) { io.disconnect(); setTimeout(start, 150 + cardIndex * 350); } }, { threshold: 0.3 }).observe(card);
  img.complete && img.naturalWidth ? ready() : img.addEventListener("load", ready, { once: true });
});

/* ───────── Hero: floating code ornaments drift with the pointer ───────── */
const floatLayer = $(".hero2__float");
if (floatLayer && !reduced && matchMedia("(pointer: fine)").matches) {
  const items = $$(".fcode", floatLayer);
  let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0;
  const loop = () => {
    cx += (tx - cx) * 0.06; cy += (ty - cy) * 0.06;
    items.forEach((el) => { const d = +el.dataset.depth; el.style.translate = `${cx * d * 10}px ${cy * d * 8}px`; });
    raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.001 ? requestAnimationFrame(loop) : 0;
  };
  addEventListener("pointermove", (e) => {
    if (scrollY > innerHeight) return;
    tx = e.clientX / innerWidth - 0.5; ty = e.clientY / innerHeight - 0.5;
    if (!raf) raf = requestAnimationFrame(loop);
  }, { passive: true });
}

/* ───────── Module apps: includes tick off like tasks ───────── */
$$("[data-mapp]").forEach((app) => {
  const items = $$("[data-mapp-item]", app), n = $("[data-mapp-n]", app), pct = $("[data-mapp-pct]", app), ring = $("[data-mapp-ring]", app);
  const update = () => {
    const done = items.filter((i) => i.classList.contains("is-done")).length;
    n.textContent = done;
    const p = Math.round((done / items.length) * 100);
    pct.textContent = `${p}%`;
    ring.style.strokeDashoffset = String(264 - (264 * p) / 100);
  };
  const set = (it, on) => { it.classList.toggle("is-done", on); it.setAttribute("aria-pressed", String(on)); update(); };
  items.forEach((it) => it.addEventListener("click", () => { set(it, !it.classList.contains("is-done")); it.classList.remove("is-flash"); void it.offsetWidth; it.classList.add("is-flash"); }));
  new IntersectionObserver(async ([e], io) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    for (const it of items) { await wait(reduced ? 0 : 320); set(it, true); }
  }, { threshold: 0.4 }).observe(app);
});

/* ───────── Case git log + About config: rows switch on in sequence ───────── */
$$("[data-clog]").forEach((log) => {
  const rows = $$(".clog__row", log), n = $("[data-clog-n]", log);
  new IntersectionObserver(async ([e], io) => {
    if (!e.isIntersecting) return; io.disconnect();
    for (const [i, r] of rows.entries()) { await wait(reduced ? 0 : 260); r.classList.add("is-on"); n.textContent = i + 1; }
  }, { threshold: 0.25 }).observe(log);
});
$$("[data-cfg]").forEach((cfg) => {
  const rows = $$("[data-cfg-row]", cfg);
  const set = (r, on) => { r.classList.toggle("is-on", on); r.setAttribute("aria-pressed", String(on)); $("[data-cfg-val]", r).textContent = String(on); };
  rows.forEach((r) => r.addEventListener("click", () => set(r, !r.classList.contains("is-on"))));
  new IntersectionObserver(async ([e], io) => {
    if (!e.isIntersecting) return; io.disconnect();
    for (const r of rows) { await wait(reduced ? 0 : 380); set(r, true); }
  }, { threshold: 0.4 }).observe(cfg);
});

/* ───────── Testimonials wall: columns drift at different speeds ───────── */
const trev = $("[data-trev]");
if (trev && !reduced) {
  const cols = $$("[data-speed]", trev);
  let raf = 0;
  const upd = () => {
    raf = 0;
    const r = trev.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) return;
    const mid = r.top + r.height / 2 - innerHeight / 2;
    cols.forEach((c) => (c.style.transform = `translateY(${(mid * parseFloat(c.dataset.speed)).toFixed(1)}px)`));
  };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
  upd();
}
