export type ArchiveCategory = 'urban_planning' | 'demographics' | 'healthcare' | 'film';
export type ArchiveItemType = 'video' | 'text' | 'research_paper' | 'oral_history' | 'photograph';

export interface ArchiveItem {
  id: string;
  titleEn: string;
  titleZh: string;
  decade: number; // e.g., 1970, 1980, 1990, 2000, 2010, 2020
  exactYear: number;
  category: ArchiveCategory;
  itemType: ArchiveItemType;
  summaryEn: string;
  summaryZh: string;
  contentMarkdownEn: string;
  contentMarkdownZh: string;
  thumbnailUrl: string;
  mediaUrl?: string; // Video URL, PDF URL, or high-res image URL
  tags: string[];
}

export interface UrbanPlanningMetadata {
  itemId: string;
  district: string; // e.g., 'Pudong', 'Huangpu', 'Xuhui', 'Jing\'an', 'Yangpu', 'All'
  planningType: 'infrastructure' | 'residential_reform' | 'skyscrapers' | 'heritage_preservation' | 'transportation';
  latitude: number;
  longitude: number;
  keyFigures?: string[];
  scale?: string; // e.g., 'District', 'City-wide', 'Neighborhood'
}

export interface HealthcareMetadata {
  itemId: string;
  eraType: 'barefoot_doctors' | 'marketization' | 'universal_insurance' | 'modern_digital';
  keyDiseases?: string[];
  lifeExpectancy?: number;
  hospitalCount?: number;
  innovationType?: string; // e.g., 'Traditional Chinese Medicine', 'Surgical Innovation', 'Public Health Policy'
}

export interface FilmMetadata {
  itemId: string;
  director: string;
  studio: string; // e.g., 'Shanghai Film Studio (上海电影制片厂)', 'Independent', 'Sino-Foreign Joint'
  genre: string[];
  shanghaiThemes: string[]; // e.g., 'Lilong Life', 'Pudong Demolition', 'Migrant Workers', 'Nostalgia'
  releaseYear: number;
  cast?: string[];
}

// Relational joined types
export interface JoinedUrbanPlanningItem extends ArchiveItem {
  planning: UrbanPlanningMetadata;
}

export interface JoinedHealthcareItem extends ArchiveItem {
  healthcare: HealthcareMetadata;
}

export interface JoinedFilmItem extends ArchiveItem {
  film: FilmMetadata;
}

// Time-series demographics data point
export interface DemographicsDataPoint {
  year: number;
  totalPopulation: number; // in millions
  registeredHukou: number; // in millions
  floatingPopulation: number; // in millions
  agingRate65Plus: number; // percentage of population aged 65+
  urbanizationRate: number; // percentage
  birthRate: number; // per 1,000 people
}

// Time-series healthcare data point
export interface HealthcareDataPoint {
  year: number;
  lifeExpectancy: number; // years
  hospitalCount: number; // number of major hospitals
  infantMortalityRate: number; // per 1,000 live births
  maternalMortalityRate: number; // per 100,000 live births
}
