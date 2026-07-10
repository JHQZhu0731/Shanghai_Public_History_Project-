import type {
  ArchiveCard,
  ArchiveFilters,
  ArchiveGenre,
  DistrictKey,
} from './types';
import { DISTRICT_KEYS, GENRE_ORDER } from './types';
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

export function getDecades(): number[] {
  return [...new Set(archiveCards.map((c) => c.decade))].sort((a, b) => a - b);
}

/** Parse districtEn / districtZh into canonical district keys (supports "A / B"). */
export function cardDistrictKeys(card: ArchiveCard): DistrictKey[] {
  const raw = `${card.districtEn} ${card.districtZh}`;
  return DISTRICT_KEYS.filter(
    (key) =>
      raw.toLowerCase().includes(key.toLowerCase()) ||
      raw.includes(
        key === "Jing'an"
          ? '静安'
          : key === 'Jiading'
            ? '嘉定'
            : key === 'Qingpu'
              ? '青浦'
              : key === 'Changning'
                ? '长宁'
                : key === 'Xuhui'
                  ? '徐汇'
                  : key === 'Huangpu'
                    ? '黄浦'
                    : key === 'Hongkou'
                      ? '虹口'
                      : key === 'Yangpu'
                        ? '杨浦'
                        : key === 'Pudong'
                          ? '浦东'
                          : '崇明'
      )
  );
}

export function primaryDistrict(card: ArchiveCard): DistrictKey | null {
  return cardDistrictKeys(card)[0] ?? null;
}

export function filterCards(filters: ArchiveFilters): ArchiveCard[] {
  let filtered = [...archiveCards];

  if (filters.genres.length > 0 && filters.genres.length < GENRE_ORDER.length) {
    const set = new Set(filters.genres);
    filtered = filtered.filter((c) => set.has(c.genre));
  }

  if (filters.decade !== 'all') {
    filtered = filtered.filter((c) => c.decade === filters.decade);
  }

  if (filters.district) {
    filtered = filtered.filter((c) =>
      cardDistrictKeys(c).includes(filters.district!)
    );
  }

  if (filters.query.trim()) {
    const q = filters.query.toLowerCase();
    filtered = filtered.filter(
      (c) =>
        c.titleEn.toLowerCase().includes(q) ||
        c.titleZh.includes(q) ||
        c.summaryEn.toLowerCase().includes(q) ||
        c.summaryZh.includes(q) ||
        c.landmarkEn.toLowerCase().includes(q) ||
        c.landmarkZh.includes(q) ||
        c.districtEn.toLowerCase().includes(q) ||
        c.districtZh.includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q)) ||
        c.credits?.director?.toLowerCase().includes(q) ||
        c.credits?.artist?.toLowerCase().includes(q) ||
        c.credits?.studio?.toLowerCase().includes(q)
    );
  }

  return filtered.sort((a, b) => b.year - a.year);
}

/** @deprecated prefer filterCards — kept for simple call sites */
export function searchCards(
  query: string,
  genre?: ArchiveGenre | 'all',
  decade?: number | 'all'
): ArchiveCard[] {
  return filterCards({
    query,
    genres:
      !genre || genre === 'all' ? [...GENRE_ORDER] : [genre],
    decade: decade ?? 'all',
    district: null,
  });
}

export function getDistrictDensity(
  cards: ArchiveCard[]
): { key: DistrictKey; count: number }[] {
  const counts = Object.fromEntries(
    DISTRICT_KEYS.map((k) => [k, 0])
  ) as Record<DistrictKey, number>;

  for (const card of cards) {
    for (const key of cardDistrictKeys(card)) {
      counts[key] += 1;
    }
  }

  return DISTRICT_KEYS.map((key) => ({ key, count: counts[key] })).filter(
    (d) => d.count > 0
  );
}

export function getRelatedCards(
  card: ArchiveCard,
  limit = 4
): {
  sameLandmark: ArchiveCard[];
  sameDecade: ArchiveCard[];
  sameGenre: ArchiveCard[];
} {
  const others = archiveCards.filter((c) => c.id !== card.id);
  const landmarkKey = card.landmarkEn.toLowerCase();

  const sameLandmark = others
    .filter(
      (c) =>
        c.landmarkEn.toLowerCase() === landmarkKey ||
        c.landmarkZh === card.landmarkZh
    )
    .slice(0, limit);

  const sameDecade = others
    .filter((c) => c.decade === card.decade)
    .slice(0, limit);

  const sameGenre = others
    .filter((c) => c.genre === card.genre)
    .slice(0, limit);

  return { sameLandmark, sameDecade, sameGenre };
}

export function countByGenre(cards: ArchiveCard[]): Record<ArchiveGenre, number> {
  const out = Object.fromEntries(GENRE_ORDER.map((g) => [g, 0])) as Record<
    ArchiveGenre,
    number
  >;
  for (const c of cards) out[c.genre] += 1;
  return out;
}

export function countByDecade(
  cards: ArchiveCard[]
): { decade: number; count: number }[] {
  const map = new Map<number, number>();
  for (const c of cards) {
    map.set(c.decade, (map.get(c.decade) ?? 0) + 1);
  }
  return [...map.entries()]
    .map(([decade, count]) => ({ decade, count }))
    .sort((a, b) => a.decade - b.decade);
}

/** A real map place: one landmark pin with all related archive cards. */
export interface PlaceCluster {
  id: string;
  landmarkEn: string;
  landmarkZh: string;
  districtEn: string;
  districtZh: string;
  latitude: number;
  longitude: number;
  cards: ArchiveCard[];
}

/** Group mapped cards by landmark so clicking a place lists related content. */
export function getPlaceClusters(cards: ArchiveCard[] = archiveCards): PlaceCluster[] {
  const mapped = cards.filter(
    (c) => typeof c.latitude === 'number' && typeof c.longitude === 'number'
  );
  const byKey = new Map<string, ArchiveCard[]>();

  for (const card of mapped) {
    const key = card.landmarkEn.toLowerCase().trim();
    const list = byKey.get(key) ?? [];
    list.push(card);
    byKey.set(key, list);
  }

  return [...byKey.values()]
    .map((group) => {
      const sorted = [...group].sort((a, b) => b.year - a.year);
      const lat =
        sorted.reduce((s, c) => s + (c.latitude as number), 0) / sorted.length;
      const lng =
        sorted.reduce((s, c) => s + (c.longitude as number), 0) / sorted.length;
      const head = sorted[0];
      return {
        id: head.landmarkEn.toLowerCase().replace(/\s+/g, '-'),
        landmarkEn: head.landmarkEn,
        landmarkZh: head.landmarkZh,
        districtEn: head.districtEn,
        districtZh: head.districtZh,
        latitude: lat,
        longitude: lng,
        cards: sorted,
      };
    })
    .sort((a, b) => b.cards.length - a.cards.length || a.landmarkEn.localeCompare(b.landmarkEn));
}

export function getPlaceById(
  placeId: string,
  cards?: ArchiveCard[]
): PlaceCluster | undefined {
  return getPlaceClusters(cards).find((p) => p.id === placeId);
}
