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

/** Decade atmosphere palettes — low sat 70s → neon 90s → cool 00s+ */
const DECADE_FACES: Record<string, string[]> = {
  '1970': ['#c4a484', '#b8a99a', '#9a8f7f', '#d4c4a8'],
  '1980': ['#e8c4a8', '#d4a574', '#c9a0a0', '#f2cdcd'],
  '1990': ['#f5c2e4', '#cba6f7', '#89b4fa', '#f9e2af'],
  '2000': ['#a6adc8', '#89b4fa', '#94e2d5', '#cdd6f4'],
  '2010': ['#94e2d5', '#89dceb', '#b4befe', '#cdd6f4'],
  '2020': ['#cdd6f4', '#bac2de', '#89b4fa', '#a6e3a1'],
};

const ACCENT_COLORS = ['#11111b', '#45475a', '#585b70', '#1e1e2e', '#313244'];

function decadeBucket(decade?: number): string {
  if (!decade) return '2000';
  if (decade <= 1970) return '1970';
  if (decade <= 1980) return '1980';
  if (decade <= 1990) return '1990';
  if (decade <= 2000) return '2000';
  if (decade <= 2010) return '2010';
  return '2020';
}

/** Genre-specific motif drawn as extra pixels */
function genreMotif(genre: ArchiveGenre, h: number): { x: number; y: number; c: string }[] {
  const pixels: { x: number; y: number; c: string }[] = [];
  const ink = GENRE_META[genre].color;

  if (genre === 'movie') {
    for (let i = 0; i < 4; i++) {
      pixels.push({ x: 1, y: 2 + i * 3, c: ink });
      pixels.push({ x: 14, y: 2 + i * 3, c: ink });
    }
  } else if (genre === 'music') {
    pixels.push({ x: 12, y: 3, c: ink }, { x: 12, y: 4, c: ink }, { x: 12, y: 5, c: ink });
    pixels.push({ x: 11, y: 6, c: ink }, { x: 10, y: 7, c: ink }, { x: 13, y: 3, c: ink });
  } else if (genre === 'sports') {
    pixels.push({ x: 3, y: 12, c: ink }, { x: 4, y: 11, c: ink }, { x: 5, y: 12, c: ink }, { x: 4, y: 13, c: ink });
  } else if (genre === 'food') {
    pixels.push({ x: 7, y: 1, c: ink }, { x: 8, y: 2, c: ink }, { x: 9, y: 1, c: ink });
  } else if (genre === 'social_study') {
    for (let y = 10; y <= 14; y++) pixels.push({ x: 2, y, c: ink });
    pixels.push({ x: 3, y: 10, c: ink }, { x: 3, y: 14, c: ink });
  } else if (genre === 'public_health') {
    pixels.push({ x: 12, y: 2, c: ink }, { x: 12, y: 3, c: ink }, { x: 12, y: 4, c: ink });
    pixels.push({ x: 11, y: 3, c: ink }, { x: 13, y: 3, c: ink });
  }

  const sx = 2 + (h % 12);
  const sy = 2 + ((h >> 4) % 4);
  pixels.push({ x: sx, y: sy, c: ink });

  return pixels;
}

/**
 * Collectible 16×16 pixel avatar unique to each archive entry.
 * Axes: genre color band × decade atmosphere × identity motif × seed face.
 */
export function buildAvatarPixels(
  seed: string,
  genre: ArchiveGenre,
  decade?: number
) {
  const h = hashSeed(seed + genre + String(decade ?? ''));
  const faces = DECADE_FACES[decadeBucket(decade)];
  const face = pick(faces, h);
  const outline = pick(ACCENT_COLORS, h >> 3);
  const cheek = pick(faces, (h >> 6) + 2);
  const eye = '#11111b';
  const bg = '#181825';
  const band = GENRE_META[genre].color;

  const grid: string[][] = Array.from({ length: 16 }, () => Array(16).fill(bg));

  for (let y = 3; y <= 12; y++) {
    for (let x = 4; x <= 11; x++) {
      grid[y][x] = face;
    }
  }
  for (let x = 5; x <= 10; x++) grid[2][x] = face;
  for (let x = 6; x <= 9; x++) grid[1][x] = face;

  for (let x = 5; x <= 10; x++) {
    if (grid[1][x] === face) grid[0][x] = outline;
  }
  for (let y = 2; y <= 12; y++) {
    if (grid[y][4] === face) grid[y][3] = outline;
    if (grid[y][11] === face) grid[y][12] = outline;
  }

  // Identity: glasses for social_study / public_health
  const eyeY = 5 + (h % 2);
  const eyeGap = 2 + ((h >> 2) % 2);
  grid[eyeY][6] = eye;
  grid[eyeY][6 + eyeGap + 1] = eye;
  if (genre === 'social_study' || genre === 'public_health') {
    grid[eyeY][5] = outline;
    grid[eyeY][7] = outline;
    grid[eyeY][6 + eyeGap] = outline;
    grid[eyeY][6 + eyeGap + 2] = outline;
    grid[eyeY][7 + eyeGap] = outline;
  }
  if ((h >> 5) % 2 === 0) {
    grid[eyeY - 1][6] = outline;
    grid[eyeY - 1][6 + eyeGap + 1] = outline;
  }

  // Director brim for movie
  if (genre === 'movie') {
    for (let x = 4; x <= 11; x++) grid[1][x] = outline;
    for (let x = 3; x <= 12; x++) grid[0][x] = band;
  }

  grid[eyeY + 2][5] = cheek;
  grid[eyeY + 2][10] = cheek;

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

  // Genre color band (collar)
  for (let x = 3; x <= 12; x++) {
    grid[13][x] = band;
    grid[14][x] = band;
  }
  grid[15][4] = band;
  grid[15][11] = band;

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
  decade?: number;
  size?: number;
  className?: string;
  title?: string;
}

export function PixelAvatar({
  seed,
  genre,
  decade,
  size = 64,
  className = '',
  title,
}: PixelAvatarProps) {
  const grid = buildAvatarPixels(seed, genre, decade);
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
