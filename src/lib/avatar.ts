/**
 * Pixel-art faces built from small rounded blocks, in the Tetris spirit of the logo.
 * Each testimonial passes explicit traits so every person reads as someone different.
 */
export type Face = { hair: "short" | "long" | "bun" | "curly" | "bald"; skin: string; hairColor: string; shirt: string; bg: string; glasses?: boolean; beard?: boolean };

export function faceSvg(f: Face, size = 48) {
  const W = 8, H = 9;
  const g: (string | null)[][] = Array.from({ length: H }, () => Array(W).fill(null));
  const put = (x: number, y: number, c: string) => { if (x >= 0 && x < W && y >= 0 && y < H) g[y][x] = c; };
  // face + neck + shoulders
  for (let y = 2; y <= 5; y++) for (let x = 1; x <= 6; x++) put(x, y, f.skin);
  put(3, 6, f.skin); put(4, 6, f.skin);
  for (let x = 1; x <= 6; x++) put(x, 7, f.shirt);
  for (let x = 0; x <= 7; x++) put(x, 8, f.shirt);
  // hair
  const h = f.hairColor;
  if (f.hair === "short") { for (let x = 1; x <= 6; x++) put(x, 1, h); put(1, 2, h); put(6, 2, h); for (let x = 2; x <= 5; x++) put(x, 0, h); }
  if (f.hair === "bun") { for (let x = 1; x <= 6; x++) put(x, 1, h); put(1, 2, h); put(6, 2, h); put(1, 3, h); put(6, 3, h); put(3, 0, h); put(4, 0, h); }
  if (f.hair === "long") { for (let x = 2; x <= 5; x++) put(x, 0, h); for (let x = 1; x <= 6; x++) put(x, 1, h); for (let y = 2; y <= 6; y++) { put(1, y, h); put(6, y, h); } put(0, 4, h); put(7, 4, h); put(0, 5, h); put(7, 5, h); put(0, 6, h); put(7, 6, h); }
  if (f.hair === "curly") { put(1, 0, h); put(3, 0, h); put(4, 0, h); put(6, 0, h); for (let x = 0; x <= 7; x++) put(x, 1, h); put(0, 2, h); put(7, 2, h); put(1, 2, h); put(6, 2, h); put(0, 3, h); put(7, 3, h); }
  if (f.beard) { for (let x = 2; x <= 5; x++) put(x, 5, h); put(1, 5, h); put(6, 5, h); put(3, 6, h); put(4, 6, h); }
  // eyes, glasses, mouth
  const eye = "#1b1f2e";
  if (f.glasses) { put(1, 3, "#2a2f45"); put(2, 3, eye); put(3, 3, "#2a2f45"); put(4, 3, "#2a2f45"); put(5, 3, eye); put(6, 3, "#2a2f45"); }
  else { put(2, 3, eye); put(5, 3, eye); }
  if (!f.beard) { put(3, 5, "#c0705e"); put(4, 5, "#c0705e"); }
  const u = 10, gap = 1.2;
  const blocks: string[] = [];
  let k = 0;
  for (let y = H - 1; y >= 0; y--) for (let x = 0; x < W; x++) {
    const c = g[y][x];
    if (c) blocks.push(`<rect style="--i:${k++}" x="${x * u + gap / 2}" y="${y * u + gap / 2}" width="${u - gap}" height="${u - gap}" rx="2" fill="${c}"/>`);
  }
  return `<svg class="face" viewBox="-8 -8 96 106" width="${size}" height="${Math.round(size * 106 / 96)}" aria-hidden="true"><rect x="-8" y="-8" width="96" height="106" rx="22" fill="${f.bg}"/>${blocks.join("")}</svg>`;
}
