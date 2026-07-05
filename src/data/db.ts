import type { 
  ArchiveItem, 
  JoinedUrbanPlanningItem, 
  JoinedHealthcareItem, 
  JoinedFilmItem,
  ArchiveCategory
} from './types';
import { 
  archiveItems, 
  urbanPlanningMetadata, 
  healthcareMetadata, 
  filmMetadata 
} from './archiveItems';

/**
 * Get all archive items
 */
export function getAllItems(): ArchiveItem[] {
  return archiveItems;
}

/**
 * Get a single archive item by ID, with its relationally joined metadata
 */
export function getItemById(id: string): any {
  const item = archiveItems.find(i => i.id === id);
  if (!item) return null;

  if (item.category === 'urban_planning') {
    const planning = urbanPlanningMetadata.find(m => m.itemId === id);
    return { ...item, planning } as JoinedUrbanPlanningItem;
  }

  if (item.category === 'healthcare') {
    const healthcare = healthcareMetadata.find(m => m.itemId === id);
    return { ...item, healthcare } as JoinedHealthcareItem;
  }

  if (item.category === 'film') {
    const film = filmMetadata.find(m => m.itemId === id);
    return { ...item, film } as JoinedFilmItem;
  }

  return item;
}

/**
 * Get all urban planning items joined with their spatial planning metadata
 */
export function getJoinedUrbanPlanningItems(): JoinedUrbanPlanningItem[] {
  return archiveItems
    .filter(item => item.category === 'urban_planning')
    .map(item => {
      const planning = urbanPlanningMetadata.find(m => m.itemId === item.id)!;
      return { ...item, planning };
    });
}

/**
 * Get all healthcare items joined with their healthcare metadata
 */
export function getJoinedHealthcareItems(): JoinedHealthcareItem[] {
  return archiveItems
    .filter(item => item.category === 'healthcare')
    .map(item => {
      const healthcare = healthcareMetadata.find(m => m.itemId === item.id)!;
      return { ...item, healthcare };
    });
}

/**
 * Get all film items joined with their film metadata
 */
export function getJoinedFilmItems(): JoinedFilmItem[] {
  return archiveItems
    .filter(item => item.category === 'film')
    .map(item => {
      const film = filmMetadata.find(m => m.itemId === item.id)!;
      return { ...item, film };
    });
}

/**
 * Search and filter archive items
 */
export function searchItems(
  query: string, 
  category?: ArchiveCategory | 'all', 
  decade?: number | 'all'
): ArchiveItem[] {
  let filtered = [...archiveItems];

  // Apply category filter
  if (category && category !== 'all') {
    filtered = filtered.filter(item => item.category === category);
  }

  // Apply decade filter
  if (decade && decade !== 'all') {
    filtered = filtered.filter(item => item.decade === Number(decade));
  }

  // Apply text search query
  if (query.trim()) {
    const lowerQuery = query.toLowerCase();
    filtered = filtered.filter(item => {
      return (
        item.titleEn.toLowerCase().includes(lowerQuery) ||
        item.titleZh.includes(lowerQuery) ||
        item.summaryEn.toLowerCase().includes(lowerQuery) ||
        item.summaryZh.includes(lowerQuery) ||
        item.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    });
  }

  return filtered;
}
