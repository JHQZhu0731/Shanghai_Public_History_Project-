import type { ArchiveGenre } from './types';

/** Shared browse filters for Map + Index */
export interface BrowseFilters {
  genre: ArchiveGenre | 'all';
  decade: number | 'all';
  query: string;
}

export const DEFAULT_BROWSE_FILTERS: BrowseFilters = {
  genre: 'all',
  decade: 'all',
  query: '',
};
