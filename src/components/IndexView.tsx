import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { ArchiveGenre } from '../data/types';
import { GENRE_META, GENRE_ORDER } from '../data/types';
import { getAllCards } from '../data/db';
import { ArchiveCardTile } from './ArchiveCardTile';

interface IndexViewProps {
  language: 'en' | 'zh';
  onSelectItem: (id: string) => void;
}

export function IndexView({ language, onSelectItem }: IndexViewProps) {
  const isEn = language === 'en';
  const [genre, setGenre] = useState<ArchiveGenre | 'all'>('all');
  const [query, setQuery] = useState('');

  const cards = useMemo(() => {
    let list = getAllCards();
    if (genre !== 'all') list = list.filter((c) => c.genre === genre);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (c) =>
          c.titleEn.toLowerCase().includes(q) ||
          c.titleZh.includes(q) ||
          c.summaryEn.toLowerCase().includes(q) ||
          c.summaryZh.includes(q) ||
          c.landmarkEn.toLowerCase().includes(q) ||
          c.landmarkZh.includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return [...list].sort((a, b) => b.year - a.year);
  }, [genre, query]);

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

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setGenre('all')}
          className="text-[10px] font-bold px-3 py-1.5 border-2 border-[#11111b]"
          style={{
            backgroundColor: genre === 'all' ? '#cdd6f4' : '#313244',
            color: genre === 'all' ? '#11111b' : '#cdd6f4',
          }}
        >
          {isEn ? 'All' : '全部'}
        </button>
        {GENRE_ORDER.map((g) => {
          const on = genre === g;
          return (
            <button
              key={g}
              type="button"
              onClick={() => setGenre(g)}
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

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#585b70]" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={
            isEn ? 'Search title, landmark, tag…' : '搜索标题、地标、标签…'
          }
          className="nes-input w-full !pl-10 text-xs bg-[#11111b] text-[#e2e8f0]"
        />
      </div>

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
    </div>
  );
}
