// Blog: interactive article widgets + titles/descriptions typed like code.
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));

/* ───────── Typewriter: text is in the HTML for SEO, retyped on view ───────── */
async function typeEl(el, speed) {
  const text = el.textContent;
  el.style.minHeight = `${el.offsetHeight}px`;
  el.textContent = "";
  el.classList.add("tw-on");
  const caret = document.createElement("i");
  caret.className = "tw-caret";
  const node = document.createTextNode("");
  el.append(node, caret);
  for (let i = 1; i <= text.length; i++) { node.textContent = text.slice(0, i); if (text[i - 1] !== " ") await wait(speed); }
  caret.remove();
  el.style.minHeight = "";
}
$$("[data-typewrite]").forEach((root) => {
  const groups = $$("[data-tw-group]", root);
  const targets = groups.length ? groups : [root];
  targets.forEach((g, gi) => {
    const els = $$("[data-tw]", g);
    if (reduced || !els.length) return;
    els.forEach((el) => el.classList.add("tw-wait"));
    new IntersectionObserver(async ([e], io) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      await wait((gi % 3) * 160);
      for (const el of els) { el.classList.remove("tw-wait"); await typeEl(el, el.dataset.tw === "slow" ? 28 : 9); }
    }, { threshold: 0.25 }).observe(g);
  });
});

/* ───────── Widgets ───────── */
$$("[data-pw]").forEach((w) => {
  const type = w.dataset.pw;

  if (type === "scope") {
    const cols = { 1: $('[data-col="1"]', w), 0: $('[data-col="0"]', w) };
    const chips = $$(".pw-chip", w);
    const weeks = $("[data-weeks]", w), meter = $("[data-meter]", w);
    chips.forEach((c) => cols[c.dataset.on].appendChild(c));
    const update = () => {
      const total = chips.filter((c) => c.parentElement === cols[1]).reduce((a, c) => a + parseFloat(c.dataset.w), 0);
      weeks.textContent = total % 1 ? total.toFixed(1) : total;
      meter.style.width = `${Math.min(100, (total / 12) * 100)}%`;
      meter.classList.toggle("is-over", total > 4.5);
    };
    chips.forEach((c) => c.addEventListener("click", () => {
      const to = c.parentElement === cols[1] ? cols[0] : cols[1];
      c.classList.remove("is-move"); void c.offsetWidth; c.classList.add("is-move");
      to.appendChild(c);
      update();
    }));
    update();
  }

  if (type === "vitals") {
    const verdict = $("[data-verdict]", w);
    const rows = $$(".pw-vital", w);
    const update = () => {
      let pass = true;
      rows.forEach((r) => {
        const input = $("input", r), v = parseFloat(input.value), g = parseFloat(r.dataset.good), p = parseFloat(r.dataset.poor);
        $("output b", r).textContent = input.step < 1 ? v.toFixed(input.step < 0.1 ? 2 : 1) : v;
        const s = v <= g ? "good" : v <= p ? "ni" : "poor";
        if (s !== "good") pass = false;
        r.dataset.state = s;
        $("[data-status]", r).textContent = verdict.dataset[s];
      });
      verdict.textContent = pass ? verdict.dataset.ok : verdict.dataset.bad;
      verdict.classList.toggle("is-ok", pass);
    };
    rows.forEach((r) => $("input", r).addEventListener("input", update));
    update();
  }

  if (type === "feedback") {
    $$(".pw-fb__col", w).forEach((col) => {
      const btn = $("button", col), taps = $("[data-taps]", col), orders = $("[data-orders]", col);
      let t = 0, o = 0, busy = false;
      btn.addEventListener("click", async () => {
        taps.textContent = ++t;
        if (col.dataset.variant === "a") {
          // no feedback: every tap silently creates another order after a delay
          setTimeout(() => (orders.textContent = ++o), 900);
          return;
        }
        if (busy) return;
        busy = true;
        btn.classList.add("is-working"); btn.textContent = btn.dataset.working;
        await wait(1100);
        orders.textContent = ++o;
        btn.classList.remove("is-working"); btn.classList.add("is-done"); btn.textContent = btn.dataset.done;
        await wait(1600);
        btn.classList.remove("is-done"); btn.textContent = btn.dataset.label;
        busy = false;
      });
    });
  }

  if (type === "stack") {
    const box = $(".pw-stack", w), stacks = JSON.parse(box.dataset.stacks);
    const btns = $$(".pw-stack__types button", w), vals = $$("[data-layer]", w);
    btns.forEach((b) => b.addEventListener("click", () => {
      btns.forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-pressed", String(x === b)); });
      vals.forEach((v, i) => {
        v.classList.remove("is-swap"); void v.offsetWidth;
        setTimeout(() => { v.textContent = stacks[b.dataset.type][i]; v.classList.add("is-swap"); }, reduced ? 0 : i * 70);
      });
    }));
  }

  if (type === "funnel") {
    const get = (k) => parseFloat($(`[data-k="${k}"]`, w).value);
    const update = () => {
      const v = get("v"), l = (v * get("l")) / 100, c = (l * get("c")) / 100;
      $$(".pw-vital", w).forEach((r) => ($("output b", r).textContent = $("input", r).value));
      const f = (n) => Math.round(n).toLocaleString(document.documentElement.lang === "es" ? "es-ES" : "en-US");
      $('[data-out="v"]', w).textContent = f(v); $('[data-out="l"]', w).textContent = f(l); $('[data-out="c"]', w).textContent = f(c);
      $('[data-bar="v"]', w).style.width = "100%";
      $('[data-bar="l"]', w).style.width = `${Math.max(2, (l / v) * 100 * 4)}%`;
      $('[data-bar="c"]', w).style.width = `${Math.max(2, (c / v) * 100 * 4)}%`;
    };
    $$("input", w).forEach((i) => i.addEventListener("input", update));
    update();
  }

  if (type === "timer") {
    const phone = $("[data-phone]", w), start = $(".pw-start", w), lock = $("[data-lockbtn]", w), state = $("[data-state]", w);
    let t0 = 0, raf = 0;
    const tick = () => {
      const s = Math.floor((Date.now() - t0) / 1000);
      $$("[data-t]", w).forEach((el) => (el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`));
      raf = requestAnimationFrame(tick);
    };
    start.addEventListener("click", () => {
      const on = !phone.classList.contains("is-running");
      phone.classList.toggle("is-running", on);
      start.textContent = on ? start.dataset.stop : start.dataset.start;
      state.textContent = on ? state.dataset.run : state.dataset.idle;
      cancelAnimationFrame(raf);
      if (on) { t0 = Date.now(); tick(); } else $$("[data-t]", w).forEach((el) => (el.textContent = "0:00"));
    });
    lock.addEventListener("click", () => {
      const locked = phone.classList.toggle("is-locked");
      lock.textContent = locked ? lock.dataset.unlock : lock.dataset.lock;
      const d = new Date(); $("[data-clock]", w).textContent = `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`;
    });
  }
});

/* ───────── Table of contents: active section + reading progress ───────── */
const article = $("[data-article]");
const tocLinks = $$("[data-toc]");
if (article && tocLinks.length) {
  const heads = tocLinks.map((a) => document.getElementById(a.dataset.toc)).filter(Boolean);
  const prog = $(".toc__prog b");
  let raf = 0;
  const upd = () => {
    raf = 0;
    let cur = heads[0];
    heads.forEach((h) => { if (h.getBoundingClientRect().top < innerHeight * 0.3) cur = h; });
    tocLinks.forEach((a) => { const on = a.dataset.toc === cur.id; a.classList.toggle("is-on", on); if (on) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current"); });
    const r = article.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * 0.3 - r.top) / (r.height - innerHeight * 0.5)));
    if (prog) prog.style.transform = `scaleY(${p})`;
  };
  addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(upd); }, { passive: true });
  upd();
}
const copyLink = $("[data-copy-link]");
copyLink?.addEventListener("click", async () => {
  const label = copyLink.textContent;
  try { await navigator.clipboard.writeText(location.href.split("#")[0]); copyLink.textContent = copyLink.dataset.copied; } catch {}
  setTimeout(() => (copyLink.textContent = label), 1600);
});
