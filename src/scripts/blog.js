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
    const code = $(".pw-stack__code", w), stacks = JSON.parse(code.dataset.stacks);
    const btns = $$(".pw-stack__types button", w);
    let token = 0;
    const render = async (k) => {
      const my = ++token;
      const lines = ["export default {", `  project: "${k}",`, "  stack: [", ...stacks[k].map((s) => `    "${s}",`), "  ],", "};"];
      code.textContent = "";
      for (const ln of lines) {
        for (let i = 1; i <= ln.length; i++) { if (my !== token) return; code.textContent = code.textContent.replace(/[^\n]*$/, ln.slice(0, i)); await wait(8); }
        code.textContent += "\n";
      }
    };
    btns.forEach((b) => b.addEventListener("click", () => { btns.forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-pressed", String(x === b)); }); render(b.dataset.type); }));
    render(btns[0].dataset.type);
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
