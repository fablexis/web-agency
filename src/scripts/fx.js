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
    for (const s of l1s) { s.classList.add("is-on", "is-cur"); await wait(120); s.classList.remove("is-cur"); }
    // line 2: written as code first…
    for (let i = 1; i <= code.length; i++) { l2.textContent = code.slice(0, i); await wait(76); }
    await wait(880);
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
    await wait(l2s.length * 82 + 1200);
    l2.textContent = t2;
    l1.textContent = t1;
  }, noLoader() ? 150 : 2250);
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
    if (visible && !started) { started = true; setTimeout(play, noLoader() ? 500 : 3150); }
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

/* ───────── Team photos: assembled from falling tetrominoes ───────── */
const SHAPES = {
  I: [[0, 0], [1, 0], [2, 0], [3, 0]], O: [[0, 0], [1, 0], [0, 1], [1, 1]], T: [[0, 0], [1, 0], [2, 0], [1, 1]],
  L: [[0, 0], [0, 1], [0, 2], [1, 2]], J: [[1, 0], [1, 1], [1, 2], [0, 2]], S: [[1, 0], [2, 0], [0, 1], [1, 1]], Z: [[0, 0], [1, 0], [1, 1], [2, 1]],
};
const norm = (cells) => { const mx = Math.min(...cells.map((c) => c[0])), my = Math.min(...cells.map((c) => c[1])); return cells.map(([x, y]) => [x - mx, y - my]); };
const rotations = (cells) => { const out = []; let c = cells; for (let i = 0; i < 4; i++) { c = norm(c.map(([x, y]) => [-y, x])); const k = JSON.stringify([...c].sort()); if (!out.some((o) => o.k === k)) out.push({ k, c }); } return out.map((o) => o.c); };
const PIECES = Object.values(SHAPES).flatMap(rotations);
const TINTS = ["#45E0FF", "#9B6BFF", "#3B6BFF", "#4BE3A0", "#B58CFF", "#7fe7ff"];

$$("[data-tetris]").forEach((fig, figIndex) => {
  const img = $("img", fig), canvas = $("canvas", fig), card = fig.closest(".dev") || fig;
  const ctx = canvas.getContext("2d");
  let W = 0, H = 0, cs = 0, cols = 8, rows = 0, pieces = [], t0 = 0, raf = 0, built = false, started = false, hoverPiece = null, xray = 0, xrayTarget = 0;
  let map = null; // image cover mapping
  const rng = (seed => () => (seed = (seed * 16807) % 2147483647) / 2147483647)(9 + figIndex * 7);

  const layout = () => {
    const r = fig.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
    W = canvas.width = Math.round(r.width * dpr); H = canvas.height = Math.round(r.height * dpr);
    cols = r.width < 360 ? 7 : 8; cs = W / cols; rows = Math.ceil(H / cs);
    const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    map = { s, ox: (W - img.naturalWidth * s) / 2, oy: (H - img.naturalHeight * s) * 0.18 };
    // tile the grid bottom-up with tetrominoes (dominoes/monominoes only as filler)
    const grid = Array.from({ length: rows }, () => Array(cols).fill(-1));
    pieces = [];
    const fits = (cells, ax, ay) => cells.every(([x, y]) => { const gx = ax + x, gy = ay + y; return gx >= 0 && gx < cols && gy >= 0 && gy < rows && grid[gy][gx] < 0; });
    for (let y = rows - 1; y >= 0; y--) for (let x = 0; x < cols; x++) {
      if (grid[y][x] >= 0) continue;
      const opts = [...PIECES].sort(() => rng() - 0.5);
      let placed = null;
      for (const shape of opts) {
        for (const [cx, cy] of shape) { const ax = x - cx, ay = y - cy; if (fits(shape, ax, ay)) { placed = shape.map(([a, b]) => [ax + a, ay + b]); break; } }
        if (placed) break;
      }
      if (!placed) for (const sh of [[[0, 0], [1, 0]], [[0, 0], [0, 1]], [[0, -1], [0, 0]], [[0, 0]]]) if (fits(sh, x, y)) { placed = sh.map(([a, b]) => [x + a, y + b]); break; }
      const id = pieces.length;
      placed.forEach(([gx, gy]) => (grid[gy][gx] = id));
      const top = Math.min(...placed.map((c) => c[1]));
      pieces.push({ cells: placed, top, tint: TINTS[Math.floor(rng() * TINTS.length)], landed: 0, dist: top + 2 + Math.max(...placed.map((c) => c[1])) - top + Math.floor(rng() * 2) });
    }
    // drop order: lowest pieces first, like a real stack
    pieces.sort((a, b) => Math.max(...b.cells.map((c) => c[1])) - Math.max(...a.cells.map((c) => c[1])) || a.cells[0][0] - b.cells[0][0]);
    pieces.forEach((p, i) => (p.delay = i * 80));
  };

  const block = (gx, gy, dy, tint, tintA, lift = 0) => {
    const g = Math.max(1, cs * 0.035), x = gx * cs, y = gy * cs + dy - lift;
    const sx = (x - map.ox) / map.s, sy = (gy * cs - map.oy) / map.s, sw = cs / map.s;
    ctx.drawImage(img, sx, sy, sw, sw, x + g, y + g, cs - 2 * g, cs - 2 * g);
    if (tintA > 0.01) { ctx.globalAlpha = tintA; ctx.fillStyle = tint; ctx.fillRect(x + g, y + g, cs - 2 * g, cs - 2 * g); ctx.globalAlpha = 1; }
    // bevel: light top/left, dark bottom/right
    const b = Math.max(1.5, cs * 0.06);
    ctx.fillStyle = "rgba(255,255,255,.16)"; ctx.fillRect(x + g, y + g, cs - 2 * g, b); ctx.fillRect(x + g, y + g, b, cs - 2 * g);
    ctx.fillStyle = "rgba(0,0,0,.28)"; ctx.fillRect(x + g, y + cs - g - b, cs - 2 * g, b); ctx.fillRect(x + cs - g - b, y + g, b, cs - 2 * g);
  };

  const draw = (now) => {
    ctx.clearRect(0, 0, W, H);
    const t = now - t0;
    const rowFill = new Array(rows).fill(0);
    let allDone = true;
    for (const p of pieces) {
      const local = t - p.delay;
      if (local < 0 && !built) { allDone = false; continue; }
      const STEP = 34; // ms per row: stepped, like a real Tetris drop
      const fallen = built ? p.dist : Math.min(p.dist, Math.floor(local / STEP));
      const dy = -(p.dist - fallen) * cs;
      if (fallen >= p.dist && !p.landed) p.landed = now;
      const since = p.landed ? now - p.landed : -1;
      let tintA = built ? 0 : since < 0 ? 0.55 : Math.max(0, 0.55 - since / 700);
      if (since >= 0 && since < 120 && !built) tintA = 0.9 - since / 300; // impact flash
      if (!built && (since < 0 || tintA > 0)) allDone = false;
      const isHover = hoverPiece === p;
      if (built) tintA = xray * (isHover ? 0.45 : 0.2);
      for (const [gx, gy] of p.cells) {
        block(gx, gy, dy, p.tint, tintA, isHover ? xray * cs * 0.12 : 0);
        if (since >= 0) rowFill[gy]++;
      }
      if (built && xray > 0.01) { // x-ray outlines of each piece
        ctx.globalAlpha = xray * (isHover ? 1 : 0.55); ctx.strokeStyle = p.tint; ctx.lineWidth = Math.max(1.5, cs * 0.04);
        for (const [gx, gy] of p.cells) ctx.strokeRect(gx * cs + 2, gy * cs + 2 - (isHover ? xray * cs * 0.12 : 0), cs - 4, cs - 4);
        ctx.globalAlpha = 1;
      }
    }
    // line clear flash when a row completes
    if (!built) rowFill.forEach((n, r) => {
      if (n === cols) {
        const p0 = pieces.filter((p) => p.cells.some((c) => c[1] === r)).reduce((m, p) => Math.max(m, p.landed || 0), 0);
        const a = 1 - (now - p0) / 380;
        if (a > 0) { ctx.globalAlpha = a * 0.55; ctx.fillStyle = "#eef2f8"; ctx.fillRect(0, r * cs, W, cs); ctx.globalAlpha = 1; }
      }
    });
    return allDone;
  };

  const loop = (now) => {
    xray += (xrayTarget - xray) * 0.14;
    const done = draw(now);
    if (!built && done) { built = true; fig.classList.add("is-built"); }
    raf = !built || Math.abs(xrayTarget - xray) > 0.01 || xrayTarget > 0 ? requestAnimationFrame(loop) : 0;
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
  const start = () => {
    if (started) return; started = true;
    layout(); t0 = performance.now();
    if (reduced) { built = true; fig.classList.add("is-built"); return; }
    kick();
  };
  fig.classList.add("is-tetris");
  const ready = () => new IntersectionObserver(([e], io) => { if (e.isIntersecting) { io.disconnect(); setTimeout(start, 200 + figIndex * 250); } }, { threshold: 0.3 }).observe(fig);
  img.complete && img.naturalWidth ? ready() : img.addEventListener("load", ready, { once: true });
  if (!reduced) {
    fig.addEventListener("pointermove", (e) => {
      if (!built) return;
      const r = fig.getBoundingClientRect(), dpr = W / r.width;
      const gx = Math.floor(((e.clientX - r.left) * dpr) / cs), gy = Math.floor(((e.clientY - r.top) * dpr) / cs);
      hoverPiece = pieces.find((p) => p.cells.some((c) => c[0] === gx && c[1] === gy)) || null;
      xrayTarget = 1; fig.classList.add("is-xray"); kick();
    });
    fig.addEventListener("pointerleave", () => { xrayTarget = 0; hoverPiece = null; fig.classList.remove("is-xray"); kick(); });
  }
  addEventListener("resize", () => { if (started) { layout(); if (built) draw(performance.now()); } }, { passive: true });
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
