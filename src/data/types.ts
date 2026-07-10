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
  /** Short city-role line for atlas gates */
  roleEn: string;
  roleZh: string;
  color: string;
  accent: string;
  motifEn: string;
  motifZh: string;
}

export const GENRE_ORDER: ArchiveGenre[] = [
  'music',
  'movie',
  'sports',
  'food',
  'social_study',
  'public_health',
];

export const GENRE_META: Record<ArchiveGenre, GenreMeta> = {
  music: {
    id: 'music',
    labelEn: 'Music',
    labelZh: '音乐',
    roleEn: 'Sound & stage',
    roleZh: '声音与现场',
    color: '#cba6f7',
    accent: '#1e1e2e',
    motifEn: 'Note / stage',
    motifZh: '音符 / 舞台',
  },
  movie: {
    id: 'movie',
    labelEn: 'Movie',
    labelZh: '电影',
    roleEn: 'Image & studio',
    roleZh: '影像与制片',
    color: '#f38ba8',
    accent: '#1e1e2e',
    motifEn: 'Film sprocket',
    motifZh: '胶片齿孔',
  },
  sports: {
    id: 'sports',
    labelEn: 'Sports',
    labelZh: '体育',
    roleEn: 'Arena & body',
    roleZh: '赛场与身体',
    color: '#a6e3a1',
    accent: '#1e1e2e',
    motifEn: 'Pitch / circuit',
    motifZh: '球场 / 赛道',
  },
  food: {
    id: 'food',
    labelEn: 'Food',
    labelZh: '美食',
    roleEn: 'Taste & daily life',
    roleZh: '口味与日常',
    color: '#fab387',
    accent: '#1e1e2e',
    motifEn: 'Steamer / stall',
    motifZh: '蒸笼 / 摊位',
  },
  social_study: {
    id: 'social_study',
    labelEn: 'Social Study',
    labelZh: '社会研究',
    roleEn: 'Structure & people',
    roleZh: '结构与人群',
    color: '#89b4fa',
    accent: '#1e1e2e',
    motifEn: 'Folder / grid',
    motifZh: '档案夹 / 网格',
  },
  public_health: {
    id: 'public_health',
    labelEn: 'Public Health',
    labelZh: '公共卫生',
    roleEn: 'Body & institution',
    roleZh: '身体与制度',
    color: '#94e2d5',
    accent: '#1e1e2e',
    motifEn: 'Cross / clinic',
    motifZh: '十字 / 诊所',
  },
};

/** Canonical district keys used by atlas density + hotspots */
export const DISTRICT_KEYS = [
  'Jiading',
  'Qingpu',
  'Changning',
  "Jing'an",
  'Xuhui',
  'Huangpu',
  'Hongkou',
  'Yangpu',
  'Pudong',
  'Chongming',
] as const;

export type DistrictKey = (typeof DISTRICT_KEYS)[number];

export const DISTRICT_META: Record<
  DistrictKey,
  { labelEn: string; labelZh: string; cx: number; cy: number }
> = {
  Jiading: { labelEn: 'Jiading', labelZh: '嘉定', cx: 20, cy: 20 },
  Qingpu: { labelEn: 'Qingpu', labelZh: '青浦', cx: 14, cy: 46 },
  Changning: { labelEn: 'Changning', labelZh: '长宁', cx: 30, cy: 50 },
  "Jing'an": { labelEn: "Jing'an", labelZh: '静安', cx: 40, cy: 46 },
  Xuhui: { labelEn: 'Xuhui', labelZh: '徐汇', cx: 38, cy: 66 },
  Huangpu: { labelEn: 'Huangpu', labelZh: '黄浦', cx: 50, cy: 54 },
  Hongkou: { labelEn: 'Hongkou', labelZh: '虹口', cx: 56, cy: 34 },
  Yangpu: { labelEn: 'Yangpu', labelZh: '杨浦', cx: 68, cy: 28 },
  Pudong: { labelEn: 'Pudong', labelZh: '浦东', cx: 78, cy: 56 },
  Chongming: { labelEn: 'Chongming', labelZh: '崇明', cx: 86, cy: 12 },
};

/** Shared filter state for Atlas / Index / Timeline */
export interface ArchiveFilters {
  genres: ArchiveGenre[];
  decade: number | 'all';
  district: DistrictKey | null;
  query: string;
}
