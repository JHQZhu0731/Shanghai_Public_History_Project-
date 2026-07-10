import type { ArchiveCard, ArchiveGenre } from './types';
import { archiveCards } from './archiveCards';

export function getAllCards(): ArchiveCard[] {
  return archiveCards;
}

export function getCardById(id: string): ArchiveCard | undefined {
  return archiveCards.find((c) => c.id === id);
}

export function getMappedCards(): ArchiveCard[] {
  return archiveCards.filter(
    (c) => typeof c.latitude === 'number' && typeof c.longitude === 'number'
  );
}

export function searchCards(
  query: string,
  genre?: ArchiveGenre | 'all',
  decade?: number | 'all'
): ArchiveCard[] {
  let filtered = [...archiveCards];

  if (genre && genre !== 'all') {
    filtered = filtered.filter((c) => c.genre === genre);
  }

  if (decade && decade !== 'all') {
    filtered = filtered.filter((c) => c.decade === Number(decade));
  }

  if (query.trim()) {
    const q = query.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.titleEn.toLowerCase().includes(q) ||
        c.titleZh.includes(q) ||
        c.summaryEn.toLowerCase().includes(q) ||
        c.summaryZh.includes(q) ||
        c.landmarkEn.toLowerCase().includes(q) ||
        c.landmarkZh.includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
    );
  }

  return filtered.sort((a, b) => b.year - a.year);
}

export function getDecades(): number[] {
  return [...new Set(archiveCards.map((c) => c.decade))].sort((a, b) => a - b);
}
