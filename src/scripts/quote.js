const vsc = document.querySelector("[data-vsc]");
const form = document.getElementById("quote-form");

if (vsc && form) {
  const $ = (s, r = vsc) => r.querySelector(s);
  const $$ = (s, r = vsc) => [...r.querySelectorAll(s)];
  const es = vsc.dataset.lang === "es";
  const term = $(".vsc__term");
  const done = $(".vsc__done");
  const cells = $$(".fbuild__f i:not(.is-fork)");
  const forkCell = $(".fbuild__f .is-fork");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));
  const DRAFT = "fk-quote-v2";
  const T = es
    ? { valid: "válido", fix: "corrige y vuelve a ejecutar", err: "error", typing: "› validando…", ok: "0 errores", pack: "› empaquetando proyecto", open: "listo · abriendo tu correo…", restored: "› borrador restaurado", cleared: "› variables reiniciadas", copied: "✓ Copiado", from: "(desde la página anterior)", hello: "Hola Forklia, quiero iniciar un proyecto.", subject: "Nuevo proyecto", labels: { name: "Nombre", email: "Email", modules: "Módulos", budget: "Presupuesto (USD)", idea: "Idea" },
        msg: { name: "nombre: escribe al menos 2 caracteres", email: "email: necesitamos un correo válido", modules: "módulos: elige al menos uno", idea: "idea: cuéntanos un poco más (20+ caracteres)" } }
    : { valid: "valid", fix: "fix and run again", err: "error", typing: "› type-checking…", ok: "0 errors", pack: "› packing project", open: "ready · opening your email app…", restored: "› draft restored", cleared: "› variables cleared", copied: "✓ Copied", from: "(from the previous page)", hello: "Hi Forklia, I'd like to start a project.", subject: "New project", labels: { name: "Name", email: "Email", modules: "Modules", budget: "Budget (USD)", idea: "Idea" },
        msg: { name: "name: at least 2 characters", email: "email: we need a valid email to reply", modules: "modules: pick at least one", idea: "idea: tell us a bit more (20+ characters)" } };

  const log = (html, cls = "") => {
    const el = document.createElement("div");
    el.className = `tl ${cls}`;
    el.innerHTML = html;
    term.appendChild(el);
    while (term.children.length > 24) term.firstElementChild.remove();
    term.scrollTop = term.scrollHeight;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (ch) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[ch]);

  const read = () => {
    const fd = new FormData(form);
    return {
      name: (fd.get("name") || "").trim(),
      email: (fd.get("email") || "").trim(),
      modules: fd.getAll("modules"),
      idea: (fd.get("idea") || "").trim(),
      budget: fd.get("budget") || "",
    };
  };
  const checks = (d) => ({
    name: d.name.length >= 2,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email),
    modules: d.modules.length > 0,
    idea: d.idea.length >= 20,
  });
  // 9 F modules: 2 per required field + 1 for the optional budget.
  const weight = { name: 2, email: 2, modules: 2, idea: 2 };

  function update() {
    const d = read();
    const c = checks(d);
    let filled = Object.entries(c).reduce((n, [k, v]) => n + (v ? weight[k] : 0), 0) + (d.budget ? 1 : 0);
    cells.forEach((cell, i) => cell.classList.toggle("is-in", i < filled));
    $("[data-prog]").style.width = `${(filled / 9) * 100}%`;
    $("[data-prog-txt]").textContent = `${filled} / 9`;
    $$("[data-field]", form).forEach((row) => {
      const k = row.dataset.field;
      row.classList.toggle("is-ok", k === "budget" ? !!d.budget : !!c[k]);
    });
    try { localStorage.setItem(DRAFT, JSON.stringify(d)); } catch {}
    return { d, c };
  }

  const timers = {};
  form.addEventListener("input", (e) => {
    const { c } = update();
    const name = e.target.name;
    clearTimeout(timers[name]);
    timers[name] = setTimeout(() => {
      if (name in c && c[name]) log(`<span class="ok">✓</span> ${esc(name)} <span class="m">${T.valid}</span>`);
      else if (name === "budget") log(`<span class="ok">✓</span> budget = <span class="s">"${esc(e.target.value)}"</span>`);
    }, 700);
  });

  // restore draft + preselect module from ?m=
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT) || "null");
    if (saved) {
      ["name", "email", "idea"].forEach((k) => { if (saved[k]) form.elements[k].value = saved[k]; });
      $$('input[name="modules"]', form).forEach((i) => (i.checked = saved.modules?.includes(i.value)));
      $$('input[name="budget"]', form).forEach((i) => (i.checked = i.value === saved.budget));
      if (saved.name || saved.idea) log(`<span class="m">${T.restored}</span>`);
    }
  } catch {}
  const pre = new URLSearchParams(location.search).get("m");
  if (pre) {
    const box = form.querySelector(`input[name="modules"][value="${CSS.escape(pre)}"]`);
    if (box) { box.checked = true; log(`<span class="ok">✓</span> modules ← <span class="s">"${esc(pre)}"</span> <span class="m">${T.from}</span>`); }
  }
  update();

  form.querySelector("[data-reset]").addEventListener("click", () => {
    form.reset();
    try { localStorage.removeItem(DRAFT); } catch {}
    done.hidden = true;
    forkCell.classList.remove("is-in");
    vsc.classList.remove("is-sent");
    log(`<span class="m">${T.cleared}</span>`);
    update();
  });

  const summary = (d) => {
    const names = $$('input[name="modules"]', form).filter((i) => i.checked).map((i) => i.dataset.label);
    return [
      T.hello, "",
      `${T.labels.name}: ${d.name}`,
      `${T.labels.email}: ${d.email}`,
      `${T.labels.modules}: ${names.join(", ")}`,
      d.budget ? `${T.labels.budget}: ${d.budget}` : null,
      "", `${T.labels.idea}:`, d.idea,
    ].filter((l) => l !== null).join("\n");
  };

  let running = false;
  async function submit() {
    if (running) return;
    const { d, c } = update();
    log(`<span class="p">forklia ~ %</span> ${es ? "enviar" : "send"}(project)`);
    const errors = Object.keys(c).filter((k) => !c[k]);
    const status = $("[data-status-errors]");
    status.textContent = `⊘ ${errors.length}`;
    status.classList.toggle("is-err", errors.length > 0);
    if (errors.length) {
      errors.forEach((k) => log(`<span class="err">✗ ${T.err}</span> ${esc(T.msg[k])}`));
      log(`<span class="m">› ${T.fix}</span>`);
      form.querySelector(`[name="${errors[0]}"]`)?.focus();
      vsc.classList.remove("is-shake"); void vsc.offsetWidth; vsc.classList.add("is-shake");
      return;
    }
    running = true;
    const msg = summary(d);
    const mailto = `mailto:${vsc.dataset.email}?subject=${encodeURIComponent(`${T.subject} · ${d.name}`)}&body=${encodeURIComponent(msg)}`;
    log(`<span class="m">${T.typing}</span>`);
    await wait(350);
    log(`<span class="ok">✓</span> ${T.ok}`);
    await wait(300);
    log(`<span class="m">${T.pack}</span>`);
    await wait(350);
    forkCell.classList.add("is-in");
    vsc.classList.add("is-sent");
    log(`<span class="ok">✓</span> ${T.open}`);
    done.querySelector("[data-mailto]").href = mailto;
    done.querySelector("[data-wa]").href = `${vsc.dataset.wa}?text=${encodeURIComponent(msg)}`;
    done.hidden = false;
    running = false;
    window.location.href = mailto;
  }

  form.addEventListener("submit", (e) => { e.preventDefault(); submit(); });
  form.addEventListener("keydown", (e) => { if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); submit(); } });
  done.querySelector("[data-copy-sum]").addEventListener("click", async (e) => {
    const label = e.target.textContent;
    try { await navigator.clipboard.writeText(summary(read())); e.target.textContent = T.copied; } catch {}
    setTimeout(() => (e.target.textContent = label), 1600);
  });
}
