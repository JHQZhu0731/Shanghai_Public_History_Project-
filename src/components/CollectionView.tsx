import { useMemo, useState } from 'react';
import { Search, Compass } from 'lucide-react';
import type { ArchiveGenre } from '../data/types';
import { GENRE_META } from '../data/types';
import { searchCards, getDecades } from '../data/db';
import { ArchiveCardTile } from './ArchiveCardTile';
import { PixelShanghaiMap } from './PixelShanghaiMap';

interface CollectionViewProps {
  language: 'en' | 'zh';
  onSelectItem: (id: string) => void;
}

const GENRES: Array<ArchiveGenre | 'all'> = [
  'all',
  'music',
  'movie',
  'sports',
  'food',
  'social_study',
  'public_health',
];

export function CollectionView({ language, onSelectItem }: CollectionViewProps) {
  const isEn = language === 'en';
  const [genre, setGenre] = useState<ArchiveGenre | 'all'>('all');
  const [decade, setDecade] = useState<number | 'all'>('all');
  const [query, setQuery] = useState('');
  const decades = getDecades();

  const cards = useMemo(
    () => searchCards(query, genre, decade),
    [query, genre, decade]
  );

  return (
    <div className="space-y-8">
      {/* Signature creative pixel atlas */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div className="text-left">
            <p className="text-[10px] font-mono text-[#f9e2af] m-0 tracking-widest">
              {isEn ? 'SIGNATURE ATLAS' : '馆藏图志'}
            </p>
            <h2 className="text-sm md:text-base font-bold text-[#f5c2e4] m-0 mt-1">
              {isEn ? 'Shanghai Pixel Map' : '上海像素地图'}
            </h2>
          </div>
          <div className="flex items-center gap-2 text-[10px] text-[#89b4fa] font-mono">
            <Compass className="w-3.5 h-3.5" />
            {cards.length} {isEn ? 'cards in view' : '张卡片在当前视图'}
          </div>
        </div>

        <div className="border-4 border-[#89b4fa] bg-[#0b1220] shadow-[8px_8px_0px_0px_rgba(49,50,68,1)] overflow-hidden">
          <PixelShanghaiMap className="w-full" language={language} />
        </div>

        <p className="text-[11px] text-[#a6adc8] leading-relaxed m-0 text-left max-w-3xl">
          {isEn
            ? 'A hand-illustrated pixel atlas of Shanghai — districts, the Huangpu ribbon, and landmark icons. Browse Music, Movie, Sports, Food, Social Study, and Public Health as short cards below.'
            : '手绘风格的上海像素图志：区划色块、黄浦江光带与地标图标。下方以短卡片浏览音乐、电影、体育、美食、社会研究与公共卫生。'}
        </p>
      </div>

      {/* Filters */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#585b70]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={isEn ? 'Search title, landmark, tag…' : '搜索标题、地标、标签…'}
            className="nes-input w-full !pl-10 text-xs bg-[#11111b] text-[#e2e8f0]"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {GENRES.map((g) => {
            const active = genre === g;
            const label =
              g === 'all'
                ? isEn
                  ? 'All'
                  : '全部'
                : isEn
                  ? GENRE_META[g].labelEn
                  : GENRE_META[g].labelZh;
            const color = g === 'all' ? '#cdd6f4' : GENRE_META[g].color;
            return (
              <button
                key={g}
                type="button"
                onClick={() => setGenre(g)}
                className={`text-[10px] font-bold px-3 py-1.5 border-2 border-[#11111b] ${
                  active ? 'shadow-[3px_3px_0px_0px_rgba(245,194,228,1)]' : 'opacity-80'
                }`}
                style={{
                  backgroundColor: active ? color : '#313244',
                  color: active ? '#11111b' : '#cdd6f4',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setDecade('all')}
            className={`nes-btn text-[10px] ${decade === 'all' ? 'is-primary' : ''}`}
          >
            {isEn ? 'All eras' : '全部年代'}
          </button>
          {decades.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDecade(d)}
              className={`nes-btn text-[10px] ${decade === d ? 'is-warning' : ''}`}
            >
              {d}s
            </button>
          ))}
        </div>
      </div>

      {/* Card grid */}
      <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
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
        <p className="text-center text-xs text-[#585b70] font-mono py-12">
          {isEn ? 'No cards match this filter.' : '没有符合筛选条件的卡片。'}
        </p>
      )}
    </div>
  );
}
