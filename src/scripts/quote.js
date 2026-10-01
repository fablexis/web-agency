const vsc = document.querySelector("[data-vsc]");
const form = document.getElementById("quote-form");

if (vsc && form) {
  const $ = (s, r = vsc) => r.querySelector(s);
  const $$ = (s, r = vsc) => [...r.querySelectorAll(s)];
  const term = $(".vsc__term");
  const json = $(".vsc__json");
  const done = $(".vsc__done");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));
  const DRAFT = "fk-quote-draft";

  const log = (html, cls = "") => {
    const el = document.createElement("div");
    el.className = `tl ${cls}`;
    el.innerHTML = html;
    term.appendChild(el);
    while (term.children.length > 40) term.firstElementChild.remove();
    term.scrollTop = term.scrollHeight;
  };
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

  const read = () => {
    const fd = new FormData(form);
    return {
      nombre: (fd.get("nombre") || "").trim(),
      email: (fd.get("email") || "").trim(),
      empresa: (fd.get("empresa") || "").trim(),
      pais: (fd.get("pais") || "").trim(),
      superpoderes: fd.getAll("superpoderes"),
      idea: (fd.get("idea") || "").trim(),
      referencia: (fd.get("referencia") || "").trim(),
      presupuesto: fd.get("presupuesto") || "",
      plazo: fd.get("plazo") || "",
      canal: fd.get("canal") || "email",
      fuente: fd.get("fuente") || "",
    };
  };

  const checks = (d) => ({
    nombre: d.nombre.length >= 2,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(d.email),
    superpoderes: d.superpoderes.length > 0,
    idea: d.idea.length >= 20,
    presupuesto: !!d.presupuesto,
  });
  const messages = {
    nombre: "nombre: escribe al menos 2 caracteres",
    email: "email: necesitamos un correo válido para responderte",
    superpoderes: "superpoderes: elige al menos uno",
    idea: "idea: cuéntanos un poco más (20+ caracteres)",
    presupuesto: "presupuesto: elige un rango (o “aún no sé”)",
  };
  const blockOf = { nombre: "contacto", email: "contacto", superpoderes: "proyecto", idea: "proyecto", presupuesto: "alcance" };

  const clean = (d) => Object.fromEntries(Object.entries(d).filter(([, v]) => (Array.isArray(v) ? v.length : v)));

  function update() {
    const d = read();
    const c = checks(d);
    const ok = Object.values(c).filter(Boolean).length;
    const total = Object.keys(c).length;
    $("[data-prog]").style.width = `${(ok / total) * 100}%`;
    $("[data-prog-txt]").textContent = `${ok} / ${total}`;
    const blocks = { contacto: c.nombre && c.email, proyecto: c.superpoderes && c.idea, alcance: c.presupuesto, extras: !!(d.fuente || d.canal !== "email") };
    Object.entries(blocks).forEach(([k, v]) => {
      const el = $(`[data-state="${k}"]`);
      el.classList.toggle("is-ok", v);
      el.setAttribute("aria-label", v ? "completo" : "pendiente");
    });
    json.textContent = JSON.stringify(clean(d), null, 2);
    try { localStorage.setItem(DRAFT, JSON.stringify(d)); } catch {}
    return { d, c, ok, total };
  }

  // Live validation log, debounced per field
  const lastLogged = {};
  form.addEventListener("input", (e) => {
    update();
    const name = e.target.name;
    clearTimeout(lastLogged[name]);
    lastLogged[name] = setTimeout(() => {
      const { d, c } = update();
      if (name in c) {
        if (c[name]) log(`<span class="ok">✓</span> ${name} <span class="m">válido</span>`);
        else if ((Array.isArray(d[name]) ? d[name].length : d[name]) !== 0) log(`<span class="warn">⚠</span> ${esc(messages[name])}`);
      } else if (e.target.type === "radio" || e.target.tagName === "SELECT") {
        log(`<span class="ok">✓</span> ${name} = <span class="s">"${esc(e.target.value)}"</span>`);
      }
    }, 650);
  });

  // Cursor position in status bar
  form.addEventListener("focusin", (e) => {
    const line = e.target.closest(".cl");
    const lines = $$(".cl", form);
    $("[data-ln]").textContent = lines.indexOf(line) + 1 || 1;
    const block = e.target.closest("[data-block]")?.dataset.block;
    if (block) setActive(block);
  });
  form.addEventListener("keyup", (e) => {
    if ("selectionStart" in e.target && e.target.selectionStart != null) $("[data-col]").textContent = e.target.selectionStart + 1;
  });

  function setActive(id) {
    $$("[data-tab]").forEach((t) => t.classList.toggle("is-on", t.dataset.tab === id));
    $$("[data-file]").forEach((t) => t.classList.toggle("is-on", t.dataset.file === id));
  }
  $$("[data-tab], [data-file]").forEach((a) =>
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const id = a.dataset.tab || a.dataset.file;
      setActive(id);
      const block = form.querySelector(`[data-block="${id}"]`);
      block.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
      block.querySelector("input, textarea, select")?.focus({ preventScroll: true });
    }),
  );

  // Panel tabs
  $$("[data-ptab]").forEach((b) =>
    b.addEventListener("click", () => {
      $$("[data-ptab]").forEach((x) => { x.classList.toggle("is-on", x === b); x.setAttribute("aria-selected", String(x === b)); });
      term.hidden = b.dataset.ptab !== "term";
      json.hidden = b.dataset.ptab !== "json";
    }),
  );

  // Restore draft + preselect service from URL
  try {
    const saved = JSON.parse(localStorage.getItem(DRAFT) || "null");
    if (saved) {
      ["nombre", "email", "empresa", "pais", "idea", "referencia"].forEach((k) => { if (saved[k]) form.elements[k].value = saved[k]; });
      ["canal", "fuente"].forEach((k) => { if (saved[k]) form.elements[k].value = saved[k]; });
      $$('input[name="superpoderes"]', form).forEach((i) => (i.checked = saved.superpoderes?.includes(i.value)));
      ["presupuesto", "plazo"].forEach((k) => $$(`input[name="${k}"]`, form).forEach((i) => (i.checked = i.value === saved[k])));
      if (saved.nombre || saved.idea) log(`<span class="m">› borrador restaurado desde tu navegador</span>`);
    }
  } catch {}
  const pre = new URLSearchParams(location.search).get("servicio");
  if (pre) {
    const box = form.querySelector(`input[name="superpoderes"][value="${CSS.escape(pre)}"]`);
    if (box) { box.checked = true; log(`<span class="ok">✓</span> superpoderes ← <span class="s">"${esc(pre)}"</span> <span class="m">(desde la página anterior)</span>`); }
  }
  update();

  form.querySelector("[data-reset]").addEventListener("click", () => {
    form.reset();
    try { localStorage.removeItem(DRAFT); } catch {}
    done.hidden = true;
    log(`<span class="m">› variables reiniciadas</span>`);
    update();
  });

  const buildMessage = (d) => {
    const names = $$('input[name="superpoderes"]', form).filter((i) => i.checked).map((i) => i.dataset.label);
    const opt = (label, v) => (v ? `${label}: ${v}` : null);
    return [
      "Hola Forklia, quiero iniciar un proyecto.",
      "",
      `Nombre: ${d.nombre}`,
      `Email: ${d.email}`,
      opt("Empresa", d.empresa),
      opt("País", d.pais),
      `Superpoderes: ${names.join(", ")}`,
      `Presupuesto (USD): ${d.presupuesto}`,
      opt("Plazo", d.plazo),
      `Canal preferido: ${d.canal}`,
      opt("Referencia", d.referencia),
      opt("Nos conoció por", d.fuente),
      "",
      "Idea:",
      d.idea,
    ]
      .filter((l) => l !== null)
      .join("\n");
  };

  let running = false;
  async function submit() {
    if (running) return;
    const { d, c } = update();
    term.hidden = false; json.hidden = true;
    $$("[data-ptab]").forEach((x) => x.classList.toggle("is-on", x.dataset.ptab === "term"));
    log(`<span class="p">forklia ~ %</span> propuesta.enviar()`);
    const errors = Object.keys(c).filter((k) => !c[k]);
    $("[data-status-errors]").textContent = `⊘ ${errors.length} ⚠ 0`;
    $("[data-status-errors]").classList.toggle("is-err", errors.length > 0);
    if (errors.length) {
      errors.forEach((k) => log(`<span class="err">✗ error</span> ${esc(messages[k])}`));
      log(`<span class="m">› corrige ${errors.length === 1 ? "el campo" : "los campos"} y vuelve a ejecutar</span>`);
      const first = form.querySelector(`[name="${errors[0]}"]`);
      setActive(blockOf[errors[0]]);
      first?.focus();
      vsc.classList.remove("is-shake"); void vsc.offsetWidth; vsc.classList.add("is-shake");
      return;
    }
    running = true;
    const msg = buildMessage(d);
    const subject = `Nuevo proyecto · ${d.nombre}${d.empresa ? " · " + d.empresa : ""}`;
    const mailto = `mailto:${vsc.dataset.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(msg)}`;
    const wa = `${vsc.dataset.wa}?text=${encodeURIComponent(msg)}`;
    log(`<span class="m">› validando tipos…</span>`);
    await wait(350);
    log(`<span class="ok">✓</span> 0 errores, 0 advertencias`);
    await wait(300);
    log(`<span class="m">› empaquetando propuesta.json (${new Blob([JSON.stringify(clean(d))]).size} bytes)</span>`);
    await wait(400);
    log(`<span class="ok">✓ listo</span> abriendo tu cliente de correo…`);
    done.querySelector("[data-mailto]").href = mailto;
    done.querySelector("[data-wa]").href = wa;
    done.hidden = false;
    vsc.classList.add("is-sent");
    running = false;
    window.location.href = mailto;
  }

  form.addEventListener("submit", (e) => { e.preventDefault(); submit(); });
  form.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") { e.preventDefault(); submit(); }
  });
  done.querySelector("[data-copy-json]").addEventListener("click", async (e) => {
    try { await navigator.clipboard.writeText(JSON.stringify(clean(read()), null, 2)); e.target.textContent = "✓ Copiado"; } catch { e.target.textContent = "No se pudo copiar"; }
    setTimeout(() => (e.target.textContent = "Copiar JSON"), 1600);
  });
}
