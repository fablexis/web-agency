/**
 * Tetris-style person icon built from a few chunky blocks (hair, head, torso).
 * The seed picks a hair style and where the accent block sits, so every
 * testimonial gets a stable, distinct avatar.
 */
export function avatarSvg(seed: number, colors: string[], size = 44) {
  const [skin, body, accent] = colors;
  const blocks: { x: number; y: number; c: string }[] = [];
  const add = (x: number, y: number, c: string) => blocks.push({ x, y, c });
  const hair = seed % 3; // 0 short · 1 long · 2 bun
  // hair
  if (hair === 2) add(1.5, -1, accent);
  add(1, 0, accent); add(2, 0, accent);
  if (hair === 1) { add(0, 1, accent); add(3, 1, accent); }
  // head
  add(1, 1, skin); add(2, 1, skin);
  // torso (Tetris T-piece + base)
  add(0, 3, body); add(1, 3, body); add(2, 3, body); add(3, 3, body);
  add(0, 4, body); add(1, 4, body); add(2, 4, body); add(3, 4, body);
  const badge = blocks.findIndex((b) => b.y === 3 && b.x === (seed % 2 ? 2 : 1));
  if (badge >= 0) blocks[badge].c = accent;

  const s = 10;
  const rects = blocks
    .sort((a, b) => b.y - a.y || a.x - b.x)
    .map((b, k) => `<rect style="--i:${k}" x="${b.x * s}" y="${(b.y + 1) * s}" width="${s - 1.5}" height="${s - 1.5}" rx="2" fill="${b.c}"/>`)
    .join("");
  return `<svg class="tav" viewBox="-2 -2 43 64" width="${Math.round(size * 43 / 64)}" height="${size}" aria-hidden="true">${rects}</svg>`;
}
