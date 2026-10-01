import raw from "../assets/brand/forklia-wordmark.svg?raw";

/** F module grid (column, row) in 6.5-unit steps; each module is 6×6 with r=1.4. */
export const fCells: [number, number][] = [
  [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 0], [2, 0], [3, 0],
  [1, 2],
];
/** The forked, gradient module that sits off-grid. */
export const fork = { x: 14.5, y: 11.5 };

const letterBounds: [string, number][] = [["o", 52], ["r", 72.5], ["k", 98], ["l", 107], ["i", 117], ["a", 999]];

function letterPaths(): { ch: string; d: string }[] {
  const d = raw.match(/<path fill="currentColor" d="([^"]+)"/)?.[1] ?? "";
  const subs = d.split(/(?=M)/).filter(Boolean);
  const groups = new Map<string, string[]>();
  for (const s of subs) {
    const x = parseFloat(s.slice(1));
    if (x < 27) continue; // F modules are rebuilt as rects
    const ch = letterBounds.find(([, max]) => x < max)![0];
    groups.set(ch, [...(groups.get(ch) ?? []), s]);
  }
  return letterBounds.map(([ch]) => ({ ch, d: (groups.get(ch) ?? []).join("") }));
}

export const letters = letterPaths();

const rect = (x: number, y: number, cls: string, i: number) =>
  `<rect class="${cls}" style="--i:${i}" x="${x}" y="${y}" width="6" height="6" rx="1.4"/>`;

/** Inline wordmark SVG with animatable F modules and per-letter paths. */
export function logoSvg(id: string, opts: { letters?: boolean } = {}) {
  const grad = `<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#22d3ee"/><stop offset=".4" stop-color="#38bdf8"/><stop offset=".75" stop-color="#818cf8"/><stop offset="1" stop-color="#8b5cf6"/></linearGradient></defs>`;
  const cells = fCells.map(([c, r], i) => rect(c * 6.5, r * 6.5, "fk-m", i)).join("");
  const forkRect = `<rect class="fk-cell" x="${fork.x}" y="${fork.y}" width="6" height="6" rx="1.4" fill="url(#${id})"/>`;
  const word = opts.letters === false ? "" : letters.map((l, i) => `<path class="fk-l" style="--i:${i}" d="${l.d}"/>`).join("");
  return `<svg class="fk-logo" viewBox="0 0 141 32" aria-hidden="true">${grad}<g class="fk-f">${cells}${forkRect}</g><g class="fk-word">${word}</g></svg>`;
}
