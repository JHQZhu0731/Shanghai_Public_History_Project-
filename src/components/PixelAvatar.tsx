import type { ArchiveGenre } from '../data/types';
import { GENRE_META } from '../data/types';

/** Simple deterministic hash from seed string */
function hashSeed(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function pick<T>(arr: T[], n: number): T {
  return arr[n % arr.length];
}

const FACE_COLORS = ['#f2cdcd', '#f9e2af', '#cba6f7', '#89b4fa', '#a6e3a1', '#fab387', '#94e2d5', '#f5c2e4'];
const ACCENT_COLORS = ['#11111b', '#45475a', '#585b70', '#1e1e2e', '#313244'];

/** Genre-specific motif drawn as extra pixels */
function genreMotif(genre: ArchiveGenre, h: number): { x: number; y: number; c: string }[] {
  const pixels: { x: number; y: number; c: string }[] = [];
  const ink = GENRE_META[genre].color;

  if (genre === 'movie') {
    // film strip corners
    for (let i = 0; i < 4; i++) {
      pixels.push({ x: 1, y: 2 + i * 3, c: ink });
      pixels.push({ x: 14, y: 2 + i * 3, c: ink });
    }
  } else if (genre === 'music') {
    // note stem
    pixels.push({ x: 12, y: 3, c: ink }, { x: 12, y: 4, c: ink }, { x: 12, y: 5, c: ink });
    pixels.push({ x: 11, y: 6, c: ink }, { x: 10, y: 7, c: ink }, { x: 13, y: 3, c: ink });
  } else if (genre === 'sports') {
    // ball dots
    pixels.push({ x: 3, y: 12, c: ink }, { x: 4, y: 11, c: ink }, { x: 5, y: 12, c: ink }, { x: 4, y: 13, c: ink });
  } else if (genre === 'food') {
    // steam curls
    pixels.push({ x: 7, y: 1, c: ink }, { x: 8, y: 2, c: ink }, { x: 9, y: 1, c: ink });
  } else if (genre === 'social_study') {
    // book spine
    for (let y = 10; y <= 14; y++) pixels.push({ x: 2, y, c: ink });
    pixels.push({ x: 3, y: 10, c: ink }, { x: 3, y: 14, c: ink });
  } else if (genre === 'public_health') {
    // cross
    pixels.push({ x: 12, y: 2, c: ink }, { x: 12, y: 3, c: ink }, { x: 12, y: 4, c: ink });
    pixels.push({ x: 11, y: 3, c: ink }, { x: 13, y: 3, c: ink });
  }

  // seed-based sparkle
  const sx = 2 + (h % 12);
  const sy = 2 + ((h >> 4) % 4);
  pixels.push({ x: sx, y: sy, c: pick(FACE_COLORS, h >> 8) });

  return pixels;
}

/**
 * Collectible 16×16 pixel avatar unique to each archive entry.
 * Deterministic from avatarSeed + genre so the same card always looks the same.
 */
export function buildAvatarPixels(seed: string, genre: ArchiveGenre) {
  const h = hashSeed(seed + genre);
  const face = pick(FACE_COLORS, h);
  const outline = pick(ACCENT_COLORS, h >> 3);
  const cheek = pick(FACE_COLORS, (h >> 6) + 2);
  const eye = '#11111b';
  const bg = '#181825';

  const grid: string[][] = Array.from({ length: 16 }, () => Array(16).fill(bg));

  // body / head silhouette
  for (let y = 3; y <= 12; y++) {
    for (let x = 4; x <= 11; x++) {
      grid[y][x] = face;
    }
  }
  // rounder top
  for (let x = 5; x <= 10; x++) grid[2][x] = face;
  for (let x = 6; x <= 9; x++) grid[1][x] = face;

  // outline
  for (let x = 5; x <= 10; x++) {
    if (grid[1][x] === face) grid[0][x] = outline;
  }
  for (let y = 2; y <= 12; y++) {
    if (grid[y][4] === face) grid[y][3] = outline;
    if (grid[y][11] === face) grid[y][12] = outline;
  }

  // eyes — position varies by seed
  const eyeY = 5 + (h % 2);
  const eyeGap = 2 + ((h >> 2) % 2);
  grid[eyeY][6] = eye;
  grid[eyeY][6 + eyeGap + 1] = eye;
  // brows
  if ((h >> 5) % 2 === 0) {
    grid[eyeY - 1][6] = outline;
    grid[eyeY - 1][6 + eyeGap + 1] = outline;
  }

  // cheeks
  grid[eyeY + 2][5] = cheek;
  grid[eyeY + 2][10] = cheek;

  // mouth style
  const mouthY = 9 + ((h >> 7) % 2);
  const mouthStyle = (h >> 9) % 3;
  if (mouthStyle === 0) {
    grid[mouthY][7] = outline;
    grid[mouthY][8] = outline;
  } else if (mouthStyle === 1) {
    grid[mouthY][7] = outline;
    grid[mouthY + 1][8] = outline;
  } else {
    grid[mouthY][6] = outline;
    grid[mouthY][7] = outline;
    grid[mouthY][8] = outline;
    grid[mouthY][9] = outline;
  }

  // shoulders / collar
  for (let x = 3; x <= 12; x++) {
    grid[13][x] = GENRE_META[genre].color;
    grid[14][x] = GENRE_META[genre].color;
  }
  grid[15][4] = GENRE_META[genre].color;
  grid[15][11] = GENRE_META[genre].color;

  // genre motif overlays
  for (const p of genreMotif(genre, h)) {
    if (p.x >= 0 && p.x < 16 && p.y >= 0 && p.y < 16) {
      grid[p.y][p.x] = p.c;
    }
  }

  return grid;
}

interface PixelAvatarProps {
  seed: string;
  genre: ArchiveGenre;
  size?: number;
  className?: string;
  title?: string;
}

export function PixelAvatar({ seed, genre, size = 64, className = '', title }: PixelAvatarProps) {
  const grid = buildAvatarPixels(seed, genre);
  const pixel = size / 16;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      style={{ imageRendering: 'pixelated' }}
      role="img"
      aria-label={title ?? 'Pixel avatar'}
    >
      {grid.map((row, y) =>
        row.map((color, x) => (
          <rect
            key={`${x}-${y}`}
            x={x * pixel}
            y={y * pixel}
            width={pixel}
            height={pixel}
            fill={color}
          />
        ))
      )}
    </svg>
  );
}
