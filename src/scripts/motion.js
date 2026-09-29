const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = window.matchMedia("(pointer: fine)").matches;
const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* ───────── Split headings into words ───────── */
function splitWords(root) {
  let i = 0;
  const walk = (node, extraClass) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === 3) {
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.appendChild(document.createTextNode(" "));
          const w = document.createElement("span");
          w.className = "w";
          const inner = document.createElement("span");
          inner.textContent = part;
          inner.style.setProperty("--i", i++);
          if (extraClass) inner.className = extraClass;
          w.appendChild(inner);
          frag.appendChild(w);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === 1) {
        const grad = child.classList.contains("grad-text");
        if (grad) child.classList.remove("grad-text");
        walk(child, grad ? "grad-text" : extraClass);
      }
    });
  };
  walk(root);
}
$$("[data-split]").forEach(splitWords);

/* ───────── Reveal on view ───────── */
const onEnter = new Map();
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add("is-in");
      io.unobserve(e.target);
      onEnter.get(e.target)?.();
    });
  },
  { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
);
const whenVisible = (el, fn) => {
  if (!el) return;
  onEnter.set(el, fn);
  io.observe(el);
};
$$("[data-reveal], [data-split], [data-inview]").forEach((el) => io.observe(el));

/* ───────── Counters ───────── */
function animateCount(el) {
  const target = parseFloat(el.dataset.count);
  const suffix = el.dataset.suffix || "";
  const dec = el.dataset.dec === "1";
  const fmt = (v) => (dec ? v.toFixed(1) : Math.round(v).toLocaleString("en-US")) + suffix;
  if (reduced) return (el.textContent = fmt(target));
  const start = performance.now();
  const step = (now) => {
    const p = Math.min((now - start) / 1800, 1);
    el.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
$$("[data-count]").forEach((el) => whenVisible(el, () => animateCount(el)));

/* ───────── Nav: scrolled state, progress, hover pill, mobile menu ───────── */
const nav = $("#nav");
const progress = $("#scroll-progress");
const onScrollUI = () => {
  const y = window.scrollY;
  nav?.classList.toggle("is-scrolled", y > 40);
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
};

const links = $("[data-navlinks]");
const pill = $(".nav__pill");
if (links && pill) {
  const moveTo = (a) => {
    if (!a) return (pill.style.opacity = "0");
    pill.style.opacity = "1";
    pill.style.width = a.offsetWidth + "px";
    pill.style.transform = `translateX(${a.offsetLeft}px)`;
  };
  const active = () => $("a.is-active", links);
  $$("a", links).forEach((a) => a.addEventListener("mouseenter", () => moveTo(a)));
  links.addEventListener("mouseleave", () => moveTo(active()));
  moveTo(active());
}

const menuBtn = $("#menu-btn");
menuBtn?.addEventListener("click", () => {
  const open = document.body.classList.toggle("menu-open");
  menuBtn.setAttribute("aria-expanded", String(open));
  document.body.style.overflow = open ? "hidden" : "";
});
$$("#drawer a").forEach((a) =>
  a.addEventListener("click", () => {
    document.body.classList.remove("menu-open");
    document.body.style.overflow = "";
    menuBtn?.setAttribute("aria-expanded", "false");
  }),
);

/* ───────── Pointer effects: glow, spotlight, magnetic, tilt ───────── */
const glow = $("#cursor-glow");
if (!finePointer && glow) glow.style.display = "none";
if (finePointer) {
  window.addEventListener(
    "pointermove",
    (e) => {
      if (glow) glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    },
    { passive: true },
  );

  $$("[data-spotlight]").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  });

  if (!reduced) {
    $$("[data-magnetic]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.25;
        const y = (e.clientY - r.top - r.height / 2) * 0.35;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });

    $$("[data-tilt]").forEach((el) => {
      el.addEventListener("pointermove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 8}deg) translateY(-4px)`;
      });
      el.addEventListener("pointerleave", () => (el.style.transform = ""));
    });
  }
}

/* ───────── CLI: typing loop + copy ───────── */
const cli = $("[data-type-loop]");
if (cli) {
  const words = JSON.parse(cli.dataset.typeLoop);
  cli.textContent = words[0];
  if (!reduced) {
    (async () => {
      let n = 0;
      await wait(2200);
      for (;;) {
        const cur = words[n % words.length];
        for (let i = cur.length; i >= 0; i--) { cli.textContent = cur.slice(0, i); await wait(28); }
        const next = words[++n % words.length];
        for (let i = 1; i <= next.length; i++) { cli.textContent = next.slice(0, i); await wait(55 + Math.random() * 40); }
        await wait(2400);
      }
    })();
  }
  const copyBtn = $("[data-copy]");
  copyBtn?.addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(cli.textContent); } catch {}
    copyBtn.classList.add("is-copied");
    copyBtn.setAttribute("aria-label", "Copiado");
    setTimeout(() => { copyBtn.classList.remove("is-copied"); copyBtn.setAttribute("aria-label", "Copiar comando"); }, 1600);
  });
}

/* ───────── Hero: tilt-on-scroll + parallax chips ───────── */
const heroTilt = $("#hero-tilt");
const parallax = $$("[data-parallax]");
function heroScroll() {
  if (!heroTilt || reduced) return;
  const r = heroTilt.getBoundingClientRect();
  const p = clamp((innerHeight - r.top) / (innerHeight * 0.75));
  heroTilt.style.setProperty("--tilt", `${(1 - p) * 22}deg`);
  heroTilt.style.setProperty("--scale", `${0.92 + p * 0.08}`);
  parallax.forEach((el) => {
    el.style.transform = `translateY(${r.top * parseFloat(el.dataset.parallax)}px)`;
  });
}

/* ───────── Hero: live activity feed ───────── */
const feed = $("#feed");
if (feed) {
  const events = [
    ["↗", "ic-cyan", "Nueva visita orgánica", "Madrid · /servicios"],
    ["$", "ic-green", "Compra completada", "$1,240 · Plan Pro"],
    ["★", "ic-violet", "Reseña de 5 estrellas", "Google Business"],
    ["✉", "ic-blue", "Lead desde formulario", "Campaña Q4"],
    ["⚡", "ic-green", "Deploy a producción", "v2.4.1 · 38s"],
    ["↗", "ic-cyan", "Keyword en top 3", "“agencia web”"],
  ];
  let k = 0;
  const push = () => {
    const [ic, cls, t, s] = events[k++ % events.length];
    const row = document.createElement("div");
    row.className = "feed__row";
    row.innerHTML = `<i class="${cls}">${ic}</i><span><b>${t}</b><small>${s}</small></span>`;
    feed.prepend(row);
    while (feed.children.length > 4) feed.lastElementChild.remove();
  };
  for (let n = 0; n < 3; n++) push();
  if (!reduced) setInterval(push, 2600);
}

/* ───────── Services: code typing, ranks climbing ───────── */
const code = $("[data-code]");
if (code) {
  const src = [
    ['<span class="c">// app/page.tsx</span>', ""],
    ['<span class="k">export default async function</span> <span class="f">Home</span>() {', ""],
    ['  <span class="k">const</span> data = <span class="k">await</span> <span class="f">getProducts</span>()', ""],
    ['  <span class="k">return</span> &lt;<span class="f">Store</span> items={data} seo=<span class="s">"optimizado"</span> /&gt;', ""],
    ["}", ""],
  ];
  code.innerHTML = reduced ? src.map((l) => l[0]).join("\n") : "";
  whenVisible(code, async () => {
    if (reduced) return;
    let html = "";
    for (const [line] of src) {
      html += line + "\n";
      code.innerHTML = html + '<span class="caret"></span>';
      await wait(420);
    }
  });
}

const ranks = $("[data-ranks]");
if (ranks) {
  const climb = async () => {
    for (;;) {
      const you = $(".is-you", ranks);
      const prev = you.previousElementSibling;
      if (!prev) break;
      const items = $$(".rank", ranks);
      const before = new Map(items.map((el) => [el, el.getBoundingClientRect().top]));
      ranks.insertBefore(you, prev);
      $$(".rank", ranks).forEach((el, idx) => {
        el.querySelector("b").textContent = idx + 1;
        const d = before.get(el) - el.getBoundingClientRect().top;
        el.style.transition = "none";
        el.style.transform = `translateY(${d}px)`;
        requestAnimationFrame(() => requestAnimationFrame(() => { el.style.transition = ""; el.style.transform = ""; }));
      });
      await wait(1100);
    }
  };
  whenVisible(ranks, () => (reduced ? null : setTimeout(climb, 700)));
}

/* ───────── Process tabs (autoplay with progress) ───────── */
const proc = $("[data-proc]");
if (proc) {
  const tabs = $$(".ptab", proc);
  const views = $$(".pview", proc);
  const winTabs = $$("#win-tabs span", proc);
  const DURATION = 7000;
  let current = 0, startedAt = 0, raf = 0, visible = false, userPicked = false;
  let token = 0;

  const scenes = [
    async (t) => {
      const items = $$("li", views[0]);
      items.forEach((li) => li.classList.remove("is-done"));
      for (const li of items) { await wait(900); if (t !== token) return; li.classList.add("is-done"); }
    },
    async (t) => {
      const wire = $("#wire"), cur = $("#fake-cursor");
      wire.classList.remove("is-built", "is-styled");
      cur.style.transform = "translate(40px, 300px)";
      await wait(300); if (t !== token) return;
      wire.classList.add("is-built");
      await wait(900); if (t !== token) return;
      cur.style.transform = "translate(220px, 110px)";
      await wait(1300); if (t !== token) return;
      cur.style.transform = "translate(250px, 190px)";
      wire.classList.add("is-styled");
      await wait(1300); if (t !== token) return;
      cur.style.transform = "translate(120px, 280px)";
    },
    async (t) => {
      const lines = $$(".ln", views[2]);
      const bar = $(".progress i", views[2]);
      lines.forEach((l) => l.classList.remove("is-on"));
      bar.style.width = "0";
      for (const l of lines) {
        await wait(l.querySelector(".progress") ? 250 : 520);
        if (t !== token) return;
        l.classList.add("is-on");
        if (l.contains(bar)) requestAnimationFrame(() => (bar.style.width = "100%"));
      }
    },
    async (t) => {
      const bars = $$(".growth__bars i", views[3]);
      bars.forEach((b) => (b.style.height = "8%"));
      await wait(200); if (t !== token) return;
      bars.forEach((b) => (b.style.height = b.dataset.h + "%"));
    },
  ];

  const show = (i) => {
    current = i;
    token++;
    tabs.forEach((t, n) => { t.classList.toggle("is-active", n === i); t.setAttribute("aria-selected", String(n === i)); });
    views.forEach((v, n) => v.classList.toggle("is-active", n === i));
    winTabs.forEach((w, n) => w.classList.toggle("is-on", n === i));
    $$(".ptab__bar i", proc).forEach((b) => (b.style.transform = "scaleX(0)"));
    startedAt = performance.now();
    if (reduced) {
      if (i === 0) $$("li", views[0]).forEach((li) => li.classList.add("is-done"));
      if (i === 1) $("#wire").classList.add("is-built", "is-styled");
      if (i === 2) { $$(".ln", views[2]).forEach((l) => l.classList.add("is-on")); $(".progress i", views[2]).style.width = "100%"; }
      if (i === 3) $$(".growth__bars i", views[3]).forEach((b) => (b.style.height = b.dataset.h + "%"));
    } else scenes[i](token);
  };

  const tick = (now) => {
    if (visible && !userPicked && !reduced) {
      const p = (now - startedAt) / DURATION;
      const bar = $(".ptab.is-active .ptab__bar i", proc);
      if (bar) bar.style.transform = `scaleX(${clamp(p)})`;
      if (p >= 1) show((current + 1) % tabs.length);
    }
    raf = requestAnimationFrame(tick);
  };

  tabs.forEach((t, i) => t.addEventListener("click", () => { userPicked = true; show(i); }));
  proc.addEventListener("keydown", (e) => {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
    e.preventDefault();
    const d = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    userPicked = true;
    show((current + d + tabs.length) % tabs.length);
    tabs[current].focus();
  });

  new IntersectionObserver(([e]) => {
    const was = visible;
    visible = e.isIntersecting;
    if (visible && !was) { show(current); if (!raf) raf = requestAnimationFrame(tick); }
  }, { threshold: 0.35 }).observe(proc);
}

/* ───────── App scrolly (sticky phone) ───────── */
const scrolly = $("[data-scrolly]");
const phone = $("#phone");
let scrollyStep = -1;
const chat = $("#chat");
let chatToken = 0;

async function playChat() {
  if (!chat) return;
  const t = ++chatToken;
  chat.innerHTML = "";
  const script = [
    ["in", "¡Hola! Vimos el prototipo 👀"],
    ["in", "Las animaciones se sienten increíbles"],
    ["out", "¡Gracias! Hoy subimos la versión beta 🚀", "🔥"],
    ["typing"],
    ["in", "Perfecto. ¿Lo probamos con usuarios el viernes?", "👍"],
    ["out", "Hecho. Te comparto el enlace ✓✓"],
  ];
  for (const [type, text, react] of script) {
    if (t !== chatToken) return;
    if (type === "typing") {
      const ty = document.createElement("div");
      ty.className = "typing";
      ty.innerHTML = "<i></i><i></i><i></i>";
      chat.appendChild(ty);
      await wait(reduced ? 0 : 1300);
      ty.remove();
      continue;
    }
    const m = document.createElement("div");
    m.className = `msg msg--${type}`;
    m.textContent = text;
    if (react) { const r = document.createElement("span"); r.className = "react"; r.textContent = react; m.appendChild(r); }
    chat.appendChild(m);
    await wait(reduced ? 0 : 900);
  }
}

function scrollyUpdate() {
  if (!scrolly || !phone) return;
  const r = scrolly.getBoundingClientRect();
  const total = r.height - innerHeight;
  const p = clamp(-r.top / total);

  if (!reduced) {
    const enter = clamp((innerHeight - r.top) / innerHeight);
    const settle = clamp(p / 0.25);
    const e = Math.min(enter, 1) * 0.5 + settle * 0.5;
    phone.style.setProperty("--ry", `${(1 - e) * -22 + Math.sin(p * Math.PI * 2) * 4}deg`);
    phone.style.setProperty("--rx", `${(1 - e) * 10}deg`);
    phone.style.setProperty("--ty", `${(1 - e) * 80}px`);
    phone.style.setProperty("--ps", `${0.88 + e * 0.12}`);
  }

  const step = p < 0.34 ? 0 : p < 0.67 ? 1 : 2;
  if (step === scrollyStep) return;
  scrollyStep = step;
  $$(".sstep", scrolly).forEach((s, i) => s.classList.toggle("is-active", i === step));
  $$(".scrolly__dots i", scrolly).forEach((d, i) => d.classList.toggle("is-on", i === step));
  $$(".screen", scrolly).forEach((s, i) => { s.classList.toggle("is-active", i === step); s.classList.toggle("is-past", i < step); });
  $$(".tabbar i", scrolly).forEach((d, i) => d.classList.toggle("is-on", i === step));
  $$(".scard", scrolly).forEach((c, i) => c.classList.toggle("is-on", i <= step));
  if (step === 1) playChat();
}

/* ───────── Manifesto word highlight ───────── */
const manifesto = $("[data-manifesto]");
const mWords = manifesto ? $$("span", manifesto) : [];
function manifestoUpdate() {
  if (!manifesto || reduced) return;
  const r = manifesto.getBoundingClientRect();
  const p = clamp((innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35));
  const lit = Math.round(p * mWords.length);
  mWords.forEach((w, i) => w.classList.toggle("is-lit", i < lit));
}

/* ───────── Blog filters ───────── */
const filters = $("[data-filters]");
if (filters) {
  filters.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-filter]");
    if (!btn) return;
    const cat = btn.dataset.filter;
    $$("button", filters).forEach((b) => { b.classList.toggle("is-on", b === btn); b.setAttribute("aria-pressed", String(b === btn)); });
    $$(".post[data-cat]").forEach((p) => p.classList.toggle("is-hidden", cat !== "Todos" && p.dataset.cat !== cat));
  });
}

/* ───────── Scroll loop ───────── */
let ticking = false;
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    onScrollUI();
    heroScroll();
    scrollyUpdate();
    manifestoUpdate();
    ticking = false;
  });
};
window.addEventListener("scroll", onScroll, { passive: true });
window.addEventListener("resize", onScroll, { passive: true });
onScroll();
