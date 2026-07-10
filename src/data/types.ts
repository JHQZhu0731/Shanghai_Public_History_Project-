export type ArchiveGenre =
  | 'music'
  | 'movie'
  | 'sports'
  | 'food'
  | 'social_study'
  | 'public_health';

export type LanguageType = 'en' | 'zh';

/** Digestible archive card — designed for fast browsing, not dense academic essays. */
export interface ArchiveCard {
  id: string;
  /** Genre / collection shelf */
  genre: ArchiveGenre;
  titleEn: string;
  titleZh: string;
  /** One short sentence for the card face */
  summaryEn: string;
  summaryZh: string;
  /** Slightly longer context for the detail panel (still concise) */
  contextEn: string;
  contextZh: string;
  year: number;
  decade: number;
  /** Landmark / place label shown on cards and map */
  landmarkEn: string;
  landmarkZh: string;
  districtEn: string;
  districtZh: string;
  /** Map coordinates — omit only if truly city-wide / non-spatial */
  latitude?: number;
  longitude?: number;
  /** Link to original article / encyclopedia / archive page */
  sourceUrl: string;
  sourceLabelEn: string;
  sourceLabelZh: string;
  /** Link to film, album, match, recipe archive, etc. when available */
  workUrl?: string;
  workLabelEn?: string;
  workLabelZh?: string;
  /** Extra credits shown on movie/music cards */
  credits?: {
    director?: string;
    studio?: string;
    artist?: string;
    venue?: string;
  };
  tags: string[];
  /** Seed for unique pixel avatar generation */
  avatarSeed: string;
}

export interface GenreMeta {
  id: ArchiveGenre;
  labelEn: string;
  labelZh: string;
  color: string;
  accent: string;
}

export const GENRE_META: Record<ArchiveGenre, GenreMeta> = {
  music: {
    id: 'music',
    labelEn: 'Music',
    labelZh: '音乐',
    color: '#cba6f7',
    accent: '#1e1e2e',
  },
  movie: {
    id: 'movie',
    labelEn: 'Movie',
    labelZh: '电影',
    color: '#f38ba8',
    accent: '#1e1e2e',
  },
  sports: {
    id: 'sports',
    labelEn: 'Sports',
    labelZh: '体育',
    color: '#a6e3a1',
    accent: '#1e1e2e',
  },
  food: {
    id: 'food',
    labelEn: 'Food',
    labelZh: '美食',
    color: '#fab387',
    accent: '#1e1e2e',
  },
  social_study: {
    id: 'social_study',
    labelEn: 'Social Study',
    labelZh: '社会研究',
    color: '#89b4fa',
    accent: '#1e1e2e',
  },
  public_health: {
    id: 'public_health',
    labelEn: 'Public Health',
    labelZh: '公共卫生',
    color: '#94e2d5',
    accent: '#1e1e2e',
  },
};
