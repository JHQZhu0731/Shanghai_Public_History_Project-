import { useMemo } from 'react';
import type { BrowseFilters } from '../data/browseFilters';
import { browseCards, getAllCards } from '../data/db';
import { ArchiveCardTile } from './ArchiveCardTile';
import { FilterBar } from './FilterBar';

interface IndexViewProps {
  language: 'en' | 'zh';
  filters: BrowseFilters;
  onFiltersChange: (next: BrowseFilters) => void;
  onSelectItem: (id: string) => void;
}

export function IndexView({
  language,
  filters,
  onFiltersChange,
  onSelectItem,
}: IndexViewProps) {
  const isEn = language === 'en';

  const cards = useMemo(
    () => browseCards(getAllCards(), filters),
    [filters]
  );

  return (
    <div className="space-y-5">
      <div className="text-left space-y-1">
        <p className="text-[10px] font-mono text-[#f9e2af] m-0 tracking-widest">
          {isEn ? 'INDEX' : '索引'}
        </p>
        <h2 className="text-sm md:text-base font-bold text-[#f5c2e4] m-0">
          {isEn ? 'Browse all archive cards' : '浏览全部档案卡片'}
        </h2>
      </div>

      <FilterBar
        language={language}
        filters={filters}
        onChange={onFiltersChange}
      />

      <p className="text-[10px] font-mono text-[#89b4fa] m-0">
        {cards.length} {isEn ? 'cards' : '张卡片'}
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
        <p className="text-xs text-[#585b70] font-mono text-center py-8 m-0">
          {isEn ? 'No records match your filters.' : '没有匹配的档案。'}
        </p>
      )}
    </div>
  );
}
