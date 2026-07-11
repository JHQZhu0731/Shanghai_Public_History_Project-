import { Search } from 'lucide-react';
import type { BrowseFilters } from '../data/browseFilters';
import type { ArchiveGenre } from '../data/types';
import { GENRE_META, GENRE_ORDER } from '../data/types';
import { getDecades } from '../data/db';

interface FilterBarProps {
  language: 'en' | 'zh';
  filters: BrowseFilters;
  onChange: (next: BrowseFilters) => void;
  onResetSelection?: () => void;
}

export function FilterBar({
  language,
  filters,
  onChange,
  onResetSelection,
}: FilterBarProps) {
  const isEn = language === 'en';
  const decades = getDecades();

  const patch = (partial: Partial<BrowseFilters>) => {
    onChange({ ...filters, ...partial });
    onResetSelection?.();
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => patch({ genre: 'all' })}
          className="text-[10px] font-bold px-3 py-1.5 border-2 border-[#11111b]"
          style={{
            backgroundColor: filters.genre === 'all' ? '#cdd6f4' : '#313244',
            color: filters.genre === 'all' ? '#11111b' : '#cdd6f4',
          }}
        >
          {isEn ? 'All genres' : '全部类型'}
        </button>
        {GENRE_ORDER.map((g) => {
          const on = filters.genre === g;
          return (
            <button
              key={g}
              type="button"
              onClick={() => patch({ genre: g })}
              className="text-[10px] font-bold px-3 py-1.5 border-2 border-[#11111b]"
              style={{
                backgroundColor: on ? GENRE_META[g].color : '#313244',
                color: on ? '#11111b' : '#cdd6f4',
              }}
            >
              {isEn ? GENRE_META[g].labelEn : GENRE_META[g].labelZh}
            </button>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-[9px] font-mono text-[#585b70]">
          {isEn ? 'Decade' : '年代'}
        </span>
        <button
          type="button"
          onClick={() => patch({ decade: 'all' })}
          className={`text-[9px] font-mono px-2 py-1 border-2 ${
            filters.decade === 'all'
              ? 'border-[#a6e3a1] text-[#a6e3a1]'
              : 'border-[#313244] text-[#585b70]'
          }`}
        >
          {isEn ? 'All' : '全部'}
        </button>
        {decades.map((d) => (
          <button
            key={d}
            type="button"
            onClick={() => patch({ decade: d })}
            className={`text-[9px] font-mono px-2 py-1 border-2 ${
              filters.decade === d
                ? 'border-[#a6e3a1] text-[#a6e3a1] bg-[#1e1e2e]'
                : 'border-[#313244] text-[#585b70]'
            }`}
          >
            {d}s
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#585b70]" />
        <input
          value={filters.query}
          onChange={(e) => patch({ query: e.target.value })}
          placeholder={
            isEn ? 'Search place, title, tag…' : '搜索地点、标题、标签…'
          }
          className="nes-input w-full !pl-9 text-xs bg-[#11111b] text-[#e2e8f0]"
        />
      </div>
    </div>
  );
}

/** Unique genres present at a place */
export function placeGenres(cards: { genre: ArchiveGenre }[]): ArchiveGenre[] {
  return [...new Set(cards.map((c) => c.genre))];
}
