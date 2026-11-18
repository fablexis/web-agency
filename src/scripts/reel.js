// Hero reel: a scripted camera flies across the three products (wide → close-up → wide)
// while each interface plays a short story. One pausable clock drives every step, so
// the reel freezes off-screen and the rail can jump to any scene.
const reel = document.querySelector("[data-reel]");
if (reel) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, root = reel) => root.querySelector(s);
  const $$ = (s, root = reel) => [...root.querySelectorAll(s)];

  const view = $(".reel__view"), world = $("[data-world]");
  const devs = $$("[data-dev]"), rail = $$("[data-go]"), meta = $("[data-reel-meta]"), metaItems = $$("[data-meta]");
  const W = 1260, H = 660;

  /* ───────── clock: sleep() and tween() only advance while the reel is playing ───────── */
  const ABORT = Symbol("abort");
  let clock = 0, last = 0, playing = false, raf = 0, gen = 0;
  const jobs = new Set();
  const frame = (now) => {
    clock += Math.min(64, now - last); last = now;
    for (const j of [...jobs]) j.step(clock);
    raf = playing ? requestAnimationFrame(frame) : 0;
  };
  const play = () => { if (playing) return; playing = true; last = performance.now(); raf = requestAnimationFrame(frame); };
  const pause = () => { playing = false; cancelAnimationFrame(raf); raf = 0; };
  const job = (dur, fn = () => {}) => {
    const g = gen, t0 = clock;
    return new Promise((res, rej) => {
      const j = {
        step(now) {
          if (g !== gen) { jobs.delete(j); return rej(ABORT); }
          const p = dur ? Math.min(1, (now - t0) / dur) : 1;
          fn(p);
          if (p >= 1) { jobs.delete(j); res(); }
        },
        kill() { jobs.delete(j); rej(ABORT); },
      };
      jobs.add(j);
    });
  };
  const sleep = (ms) => job(ms);
  const ease = { io: (p) => (p < .5 ? 4 * p * p * p : 1 - (-2 * p + 2) ** 3 / 2), out: (p) => 1 - (1 - p) ** 3, lin: (p) => p };
  const tween = (ms, fn, e = ease.io) => job(ms, (p) => fn(e(p)));
  const lerp = (a, b, p) => a + (b - a) * p;
  const abortAll = () => { gen++; for (const j of [...jobs]) j.kill(); };

  /* ───────── camera ───────── */
  const cam = { x: W / 2, y: H / 2, s: .5 };
  let shot = null;
  const applyCam = () => {
    const vw = view.clientWidth, vh = view.clientHeight;
    world.style.transform = `translate(${(vw / 2 - cam.x * cam.s).toFixed(2)}px, ${(vh / 2 - cam.y * cam.s).toFixed(2)}px) scale(${cam.s.toFixed(4)})`;
  };
  // position of an element in world coordinates (offsets ignore transforms, so this is stable mid-flight)
  const rectOf = (el) => {
    let x = 0, y = 0, n = el;
    while (n && n !== world) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x, y, w: el.offsetWidth, h: el.offsetHeight };
  };
  const WIDE = { x: -20, y: -50, w: W + 40, h: H + 70 };
  const target = (r, fill) => {
    const vw = view.clientWidth, vh = view.clientHeight;
    return { x: r.x + r.w / 2, y: r.y + r.h / 2, s: Math.min((vw * fill) / r.w, (vh * fill) / r.h) };
  };
  const snap = (r, fill = .9) => { shot = [r, fill]; Object.assign(cam, target(r, fill)); applyCam(); };
  const fly = async (r, ms = 1100, fill = .9) => {
    shot = [r, fill];
    const a = { ...cam }, b = target(r, fill);
    // zoom out a little on long pans so the move reads as a camera, not a slide
    const dist = Math.hypot(b.x - a.x, b.y - a.y) / W;
    world.classList.add("is-moving");
    try {
      await tween(ms, (p) => {
        cam.x = lerp(a.x, b.x, p); cam.y = lerp(a.y, b.y, p);
        cam.s = lerp(a.s, b.s, p) * (1 - Math.sin(p * Math.PI) * Math.min(.22, dist * .5));
        applyCam();
      });
    } finally { world.classList.remove("is-moving"); }
  };
  addEventListener("resize", () => { if (shot && !world.classList.contains("is-moving")) snap(...shot); });

  /* ───────── focus, rail and caption ───────── */
  const focus = (i) => {
    reel.dataset.focus = i;
    if (i === "all") return;
    rail.forEach((r, k) => { r.classList.toggle("is-on", k === i); r.setAttribute("aria-selected", String(k === i)); r.style.setProperty("--p", 0); });
    metaItems.forEach((m, k) => m.classList.toggle("is-on", k === i));
    meta.href = metaItems[i].dataset.href;
  };
  const progress = (i, ms) => tween(ms, (p) => rail[i].style.setProperty("--p", p), ease.lin).catch(() => {});

  /* ───────── Lyapp ───────── */
  const ly = $("[data-ly]"), lyScreens = $$("[data-lyscreen]"), lyTabs = $$("[data-lytab]");
  const lyAvg = $("[data-lyavg]"), lyTimer = $("[data-rtimer]"), lyBtn = $("[data-lybtn]");
  const lyScreen = (k) => {
    lyScreens.forEach((s, i) => { s.classList.toggle("is-active", i === k); s.classList.toggle("is-past", i < k); });
    lyTabs.forEach((t, i) => t.classList.toggle("is-on", i === k));
  };
  const tap = (el) => { el.classList.remove("is-tapped"); void el.offsetWidth; el.classList.add("is-tapped"); };
  const lyReset = () => { lyScreen(0); ly.classList.remove("is-timing"); lyTimer.textContent = "0:00"; lyAvg.textContent = "0.0h"; };
  const lyFinal = () => { lyScreen(1); lyAvg.textContent = "13.6h"; };

  async function sceneLyapp() {
    lyReset(); focus(0); progress(0, 7200);
    await fly(rectOf(devs[0]), 1200, .92);
    await sleep(300);
    tap(lyTabs[1]);
    await sleep(180);
    lyScreen(1);
    tween(1300, (p) => (lyAvg.textContent = `${(13.6 * p).toFixed(1)}h`), ease.out).catch(() => {});
    await fly(rectOf($("[data-lyweek]")), 1100, .78);
    await sleep(1500);
    await fly(rectOf(devs[0]), 900, .92);
    tap(lyTabs[0]);
    lyScreen(0);
    await sleep(700);
    tap(lyBtn);
    ly.classList.add("is-timing");
    tween(2200, (p) => { const s = Math.floor(p * 3); lyTimer.textContent = `0:0${s}`; }, ease.lin).catch(() => {});
    await sleep(1300);
  }

  /* ───────── Your English Buddy ───────── */
  const web = $(".rd-web"), url = $("[data-url]"), page = $("[data-page]"), wire = $("[data-wire]");
  const insp = $("[data-insp]"), press = $("[data-press]"), lift = $("[data-lift]"), cursor = $("[data-cursor]");
  const fullUrl = url.dataset.full;
  const setVar = (el, k, v) => el.style.setProperty(k, v);
  const cur = { x: 470, y: 330 };
  const moveCursor = (x, y, ms) => {
    const a = { ...cur };
    return tween(ms, (p) => { cur.x = lerp(a.x, x, p); cur.y = lerp(a.y, y, p); setVar(cursor, "--cx", cur.x); setVar(cursor, "--cy", cur.y); });
  };
  const webReset = () => {
    url.textContent = ""; setVar(web, "--load", 0); setVar(web, "--load-o", 1);
    wire.style.display = ""; setVar(page, "--rev", 0); setVar(page, "--scan-o", 0); setVar(page, "--sy", 0);
    insp.classList.remove("is-on"); press.classList.remove("is-on"); lift.classList.remove("is-on");
    cur.x = 470; cur.y = 330; setVar(cursor, "--cx", 470); setVar(cursor, "--cy", 330); setVar(cursor, "--co", 0);
  };
  const webFinal = () => { webReset(); url.textContent = fullUrl; setVar(web, "--load-o", 0); wire.style.display = "none"; };

  async function sceneBuddy() {
    webReset(); focus(1); progress(1, 7200);
    await fly(rectOf(devs[1]), 1200, .9);
    web.classList.add("is-typing");
    await tween(800, (p) => (url.textContent = fullUrl.slice(0, Math.round(p * fullUrl.length))), ease.lin);
    web.classList.remove("is-typing");
    tween(700, (p) => setVar(web, "--load", p), ease.out).then(() => setVar(web, "--load-o", 0)).catch(() => {});
    // the wireframe gets scanned into the real, shipped page
    setVar(page, "--scan-o", 1);
    await tween(1000, (p) => setVar(page, "--rev", p * 420), ease.io);
    insp.classList.add("is-on");
    await sleep(500);
    setVar(cursor, "--co", 1);
    await moveCursor(78, 288, 850);
    insp.classList.remove("is-on");
    setVar(cursor, "--cs", .85); press.classList.add("is-on");
    await sleep(160);
    setVar(cursor, "--cs", 1);
    await sleep(350);
    press.classList.remove("is-on");
    // scroll into the next section while the scan finishes it
    await Promise.all([
      tween(1100, (p) => setVar(page, "--sy", p * 380)),
      tween(900, (p) => setVar(page, "--rev", 420 + p * 340), ease.lin).then(() => { setVar(page, "--scan-o", 0); wire.style.display = "none"; }),
      moveCursor(190, 600, 1100),
    ]);
    lift.classList.add("is-on");
    await sleep(1200);
  }

  /* ───────── Simply Andy ───────── */
  const andy = $("[data-andy]"), cap = $("[data-cap]"), prog = $("[data-prog]"), burst = $("[data-burst]");
  const like = $("[data-like]"), likes = $("[data-likes]"), follow = $("[data-follow]");
  const followOff = follow.textContent, followOn = follow.dataset.on;
  const lines = [[JSON.parse(cap.dataset.a), JSON.parse(cap.dataset.ma)], [JSON.parse(cap.dataset.b), JSON.parse(cap.dataset.mb)]];
  const setCap = ([words, marks], on = false) => {
    cap.replaceChildren(...words.map((w, i) => {
      const s = document.createElement("span");
      s.textContent = w;
      if (marks.includes(i)) s.classList.add("is-mark");
      if (on) s.classList.add("is-on");
      return s;
    }));
    return [...cap.children];
  };
  const showWords = async (spans, gap = 190) => { for (const s of spans) { s.classList.add("is-on"); await sleep(gap); } };
  const andyReset = () => {
    setCap(lines[0]); setVar(prog, "--p", 0); setVar(andy, "--zoom", 1);
    like.classList.remove("is-liked"); likes.textContent = "1,284"; follow.classList.remove("is-on"); follow.textContent = followOff;
  };
  const andyFinal = () => { andyReset(); setCap(lines[0], true); setVar(prog, "--p", .4); };

  async function sceneAndy() {
    andyReset(); focus(2); progress(2, 7000);
    tween(7400, (p) => { setVar(prog, "--p", p); setVar(andy, "--zoom", 1 + p * .06); }, ease.lin).catch(() => {});
    await fly(rectOf(devs[2]), 1200, .92);
    await showWords([...cap.children]);
    const r = rectOf(devs[2]);
    await fly({ x: r.x, y: r.y + r.h * .42, w: r.w, h: r.h * .58 }, 1000, .9);
    await sleep(350);
    burst.classList.remove("is-on"); void burst.offsetWidth; burst.classList.add("is-on");
    await sleep(220);
    like.classList.add("is-liked"); likes.textContent = "1,285";
    await sleep(600);
    follow.classList.add("is-on"); follow.textContent = followOn;
    await sleep(500);
    await showWords(setCap(lines[1]), 170);
    await sleep(900);
    await fly(rectOf(devs[2]), 800, .92);
  }

  /* ───────── direction ───────── */
  const scenes = [sceneLyapp, sceneBuddy, sceneAndy];
  async function run(from = -1) {
    try {
      if (from < 0) { focus("all"); snap(WIDE, 1); await sleep(1400); from = 0; }
      for (;;) {
        for (let i = from; i < scenes.length; i++) await scenes[i]();
        focus("all");
        await fly(WIDE, 1400, 1);
        await sleep(1600);
        from = 0;
      }
    } catch (e) { if (e !== ABORT) console.error(e); }
  }
  const jump = (i) => {
    if (reduced) { focus(i); snap(rectOf(devs[i]), .92); return; }
    abortAll();
    run(i);
    play();
  };
  rail.forEach((r, i) => r.addEventListener("click", () => jump(i)));

  // Initial frame: wide shot with every product in its finished state
  lyFinal(); webFinal(); andyFinal();
  snap(WIDE, 1);
  focus("all");
  if (reduced) {
    reel.classList.add("is-in");
  } else {
    let started = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !document.hidden) {
        if (!started) { started = true; run(); }
        play();
      } else pause();
    }, { threshold: .25 });
    io.observe(view);
    document.addEventListener("visibilitychange", () => (document.hidden ? pause() : view.getBoundingClientRect().top < innerHeight && play()));
  }
}
