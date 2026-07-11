import type {
  ArchiveCard,
  ArchiveFilters,
  ArchiveGenre,
  DistrictKey,
} from './types';
import { DISTRICT_KEYS, GENRE_META, GENRE_ORDER } from './types';
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
    if (!list.some((c) => c.id === card.id)) list.push(card);
    byKey.set(key, list);
  }

  const usedIds = new Set<string>();
  return [...byKey.values()]
    .map((group) => {
      const sorted = [...group].sort((a, b) => b.year - a.year);
      const lat =
        sorted.reduce((s, c) => s + (c.latitude as number), 0) / sorted.length;
      const lng =
        sorted.reduce((s, c) => s + (c.longitude as number), 0) / sorted.length;
      const head = sorted[0];
      let id = head.landmarkEn
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      if (usedIds.has(id)) id = `${id}-${head.id.slice(0, 8)}`;
      usedIds.add(id);
      return {
        id,
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

/** Pin layout on map — separate markers that would stack on the same spot. */
export type MapPlacePin = PlaceCluster & { mapLat: number; mapLng: number };

const MIN_PIN_GAP = 0.0032; // ~350m at Shanghai latitude

export function layoutMapPlaces(places: PlaceCluster[]): MapPlacePin[] {
  const pins: MapPlacePin[] = places.map((p) => ({
    ...p,
    mapLat: p.latitude,
    mapLng: p.longitude,
  }));

  for (let i = 0; i < pins.length; i++) {
    for (let attempt = 0; attempt < 24; attempt++) {
      let collides = false;
      for (let j = 0; j < i; j++) {
        const dLat = pins[i].mapLat - pins[j].mapLat;
        const dLng = pins[i].mapLng - pins[j].mapLng;
        if (Math.hypot(dLat, dLng) < MIN_PIN_GAP) {
          collides = true;
          const angle = i * 2.399963 + attempt * 0.65;
          const radius = MIN_PIN_GAP * (1 + attempt * 0.28);
          pins[i].mapLat = pins[i].latitude + Math.sin(angle) * radius;
          pins[i].mapLng = pins[i].longitude + Math.cos(angle) * radius;
          break;
        }
      }
      if (!collides) break;
    }
  }

  return pins;
}

export function getPlaceById(
  placeId: string,
  cards?: ArchiveCard[]
): PlaceCluster | undefined {
  return getPlaceClusters(cards).find((p) => p.id === placeId);
}

/** Filter cards for map/index browsing */
export function browseCards(
  cards: ArchiveCard[],
  filters: { genre: ArchiveGenre | 'all'; decade: number | 'all'; query: string }
): ArchiveCard[] {
  let list = [...cards];
  if (filters.genre !== 'all') {
    list = list.filter((c) => c.genre === filters.genre);
  }
  if (filters.decade !== 'all') {
    list = list.filter((c) => c.decade === filters.decade);
  }
  if (filters.query.trim()) {
    const q = filters.query.toLowerCase();
    list = list.filter(
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
        c.credits?.artist?.toLowerCase().includes(q)
    );
  }
  return list.sort((a, b) => b.year - a.year);
}

/** Dominant genre for a place cluster pin color */
export function placePinColor(cards: ArchiveCard[]): string {
  if (cards.length === 0) return '#89b4fa';
  const counts = new Map<ArchiveGenre, number>();
  for (const c of cards) counts.set(c.genre, (counts.get(c.genre) ?? 0) + 1);
  let best: ArchiveGenre = cards[0].genre;
  let max = 0;
  for (const [g, n] of counts) {
    if (n > max) {
      max = n;
      best = g;
    }
  }
  if (counts.size > 1 && max < cards.length) {
    return '#f9e2af';
  }
  return GENRE_META[best].color;
}
