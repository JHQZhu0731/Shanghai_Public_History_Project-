import { useMemo } from 'react';
import { Search } from 'lucide-react';
import type { ArchiveFilters, ArchiveGenre } from '../data/types';
import { GENRE_ORDER } from '../data/types';
import { countByDecade, countByGenre, filterCards } from '../data/db';
import { GenreLayerBar } from './GenreLayerBar';
import { TimelineBand } from './TimelineBand';
import { ArchiveCardTile } from './ArchiveCardTile';

interface IndexViewProps {
  language: 'en' | 'zh';
  filters: ArchiveFilters;
  onFiltersChange: (next: ArchiveFilters) => void;
  onSelectItem: (id: string) => void;
}

export function IndexView({
  language,
  filters,
  onFiltersChange,
  onSelectItem,
}: IndexViewProps) {
  const isEn = language === 'en';
  const cards = useMemo(() => filterCards(filters), [filters]);
  const genreCounts = useMemo(() => countByGenre(filterCards({
    ...filters,
    genres: [...GENRE_ORDER],
  })), [filters.decade, filters.district, filters.query]);
  const decadeCounts = useMemo(
    () =>
      countByDecade(
        filterCards({ ...filters, decade: 'all' })
      ),
    [filters.genres, filters.district, filters.query]
  );

  return (
    <div className="space-y-5">
      <div className="text-left space-y-1">
        <p className="text-[10px] font-mono text-[#f9e2af] m-0 tracking-widest">
          {isEn ? 'INDEX · DIGESTIBLE RECORDS' : '索引 · 可消化档案块'}
        </p>
        <h2 className="text-sm md:text-base font-bold text-[#f5c2e4] m-0">
          {isEn
            ? 'Browse by genre, decade, place, and keyword'
            : '按类型、年代、地点与关键词浏览'}
        </h2>
      </div>

      <GenreLayerBar
        language={language}
        active={filters.genres}
        counts={genreCounts}
        onChange={(genres: ArchiveGenre[]) =>
          onFiltersChange({ ...filters, genres })
        }
      />

      <TimelineBand
        language={language}
        decade={filters.decade}
        counts={decadeCounts}
        onChange={(decade) => onFiltersChange({ ...filters, decade })}
      />

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#585b70]" />
        <input
          value={filters.query}
          onChange={(e) =>
            onFiltersChange({ ...filters, query: e.target.value })
          }
          placeholder={
            isEn
              ? 'Search title, landmark, person, tag…'
              : '搜索标题、地标、人物、标签…'
          }
          className="nes-input w-full !pl-10 text-xs bg-[#11111b] text-[#e2e8f0]"
        />
      </div>

      <p className="text-[10px] font-mono text-[#89b4fa] m-0">
        {cards.length} {isEn ? 'cards in view' : '张卡片在当前视图'}
      </p>

      <div className="grid sm:grid-cols-2 gap-3">
        {cards.map((card) => (
          <ArchiveCardTile
            key={card.id}
            card={card}
            language={language}
            onSelect={onSelectItem}
          />
        ))}
      </div>

      {cards.length === 0 && (
        <p className="text-xs text-[#585b70] font-mono text-center py-8">
          {isEn ? 'No matching records.' : '没有匹配的档案。'}
        </p>
      )}
    </div>
  );
}
