import { useMemo, useState } from 'react';
import { Search, ChevronUp, ChevronDown, Eye } from 'lucide-react';
import type { ArchiveFilters, ArchiveGenre, DistrictKey } from '../data/types';
import { GENRE_META, GENRE_ORDER } from '../data/types';
import {
  countByDecade,
  countByGenre,
  filterCards,
  getDistrictDensity,
  primaryDistrict,
} from '../data/db';
import { PixelShanghaiMap } from './PixelShanghaiMap';
import { GenreLayerBar } from './GenreLayerBar';
import { DensityStrip } from './DensityStrip';
import { TimelineBand } from './TimelineBand';
import { ArchiveCardTile } from './ArchiveCardTile';
import { PixelAvatar } from './PixelAvatar';

interface AtlasViewProps {
  language: 'en' | 'zh';
  filters: ArchiveFilters;
  onFiltersChange: (next: ArchiveFilters) => void;
  onSelectItem: (id: string) => void;
  focusCardId?: string | null;
}

export function AtlasView({
  language,
  filters,
  onFiltersChange,
  onSelectItem,
  focusCardId,
}: AtlasViewProps) {
  const isEn = language === 'en';
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [previewId, setPreviewId] = useState<string | null>(null);

  const cards = useMemo(() => filterCards(filters), [filters]);
  const density = useMemo(() => getDistrictDensity(cards), [cards]);
  const genreCounts = useMemo(() => countByGenre(cards), [cards]);
  const decadeCounts = useMemo(() => countByDecade(filterCards({
    ...filters,
    decade: 'all',
  })), [filters.genres, filters.district, filters.query]);

  const mapped = useMemo(
    () => cards.filter((c) => c.latitude != null && c.longitude != null),
    [cards]
  );

  const preview =
    cards.find((c) => c.id === previewId) ??
    cards.find((c) => c.id === focusCardId) ??
    cards[0] ??
    null;

  const highlightDistrict =
    filters.district ??
    (preview ? primaryDistrict(preview) : null) ??
    undefined;

  const eventPins = useMemo(
    () =>
      mapped.map((c) => {
        const d = primaryDistrict(c);
        // Approximate pin from district center with seed jitter so clusters read
        const base = d
          ? { x: ({ Jiading: 20, Qingpu: 14, Changning: 30, "Jing'an": 40, Xuhui: 38, Huangpu: 50, Hongkou: 56, Yangpu: 68, Pudong: 78, Chongming: 86 } as Record<string, number>)[d],
              y: ({ Jiading: 20, Qingpu: 46, Changning: 50, "Jing'an": 46, Xuhui: 66, Huangpu: 54, Hongkou: 34, Yangpu: 28, Pudong: 56, Chongming: 12 } as Record<string, number>)[d] }
          : { x: 50, y: 50 };
        let h = 0;
        for (let i = 0; i < c.id.length; i++) h = (h * 31 + c.id.charCodeAt(i)) >>> 0;
        const jx = ((h % 11) - 5) * 0.7;
        const jy = (((h >> 4) % 11) - 5) * 0.7;
        return {
          id: c.id,
          x: Math.min(92, Math.max(8, (base.x ?? 50) + jx)),
          y: Math.min(88, Math.max(12, (base.y ?? 50) + jy)),
          color: GENRE_META[c.genre].color,
          active: preview?.id === c.id,
        };
      }),
    [mapped, preview?.id]
  );

  const setGenres = (genres: ArchiveGenre[]) =>
    onFiltersChange({ ...filters, genres });
  const setDecade = (decade: number | 'all') =>
    onFiltersChange({ ...filters, decade });
  const setDistrict = (district: DistrictKey | null) =>
    onFiltersChange({ ...filters, district });
  const setQuery = (query: string) =>
    onFiltersChange({ ...filters, query });

  return (
    <div className="space-y-4">
      <GenreLayerBar
        language={language}
        active={filters.genres}
        counts={genreCounts}
        onChange={setGenres}
      />

      <TimelineBand
        language={language}
        decade={filters.decade}
        counts={decadeCounts}
        onChange={setDecade}
      />

      {/* Atlas stage */}
      <div className="border-4 border-[#89b4fa] bg-[#0b1220] overflow-hidden relative">
        <PixelShanghaiMap
          className="w-full"
          language={language}
          highlightDistrict={
            typeof highlightDistrict === 'string' ? highlightDistrict : undefined
          }
          eventPins={eventPins}
          onDistrictClick={(district) => {
            const key = district as DistrictKey;
            setDistrict(filters.district === key ? null : key);
          }}
          onEventClick={(id) => {
            setPreviewId(id);
            setDrawerOpen(true);
          }}
        />

        {/* Floating preview chip */}
        {preview && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-sm bg-[#11111b]/95 border-2 border-[#f5c2e4] p-3 flex gap-3 items-start">
            <PixelAvatar
              seed={preview.avatarSeed}
              genre={preview.genre}
              decade={preview.decade}
              size={44}
            />
            <div className="min-w-0 flex-1 space-y-1">
              <div
                className="text-[8px] font-bold"
                style={{ color: GENRE_META[preview.genre].color }}
              >
                {isEn
                  ? GENRE_META[preview.genre].labelEn
                  : GENRE_META[preview.genre].labelZh}{' '}
                · {preview.year}
              </div>
              <div className="text-[11px] font-bold text-[#e2e8f0] line-clamp-2 leading-snug">
                {isEn ? preview.titleEn : preview.titleZh}
              </div>
              <p className="text-[9px] text-[#a6adc8] line-clamp-2 m-0">
                {isEn ? preview.summaryEn : preview.summaryZh}
              </p>
              <button
                type="button"
                className="text-[9px] font-mono text-[#f9e2af] underline flex items-center gap-1 mt-1"
                onClick={() => onSelectItem(preview.id)}
              >
                <Eye className="w-3 h-3" />
                {isEn ? 'Open record' : '打开档案'}
              </button>
            </div>
          </div>
        )}
      </div>

      <DensityStrip
        language={language}
        density={density}
        active={filters.district}
        onSelect={setDistrict}
      />

      {/* Index drawer */}
      <div className="border-4 border-[#313244] bg-[#11111b]">
        <button
          type="button"
          className="w-full flex items-center justify-between px-4 py-3 text-left"
          onClick={() => setDrawerOpen((o) => !o)}
        >
          <div>
            <p className="text-[9px] font-mono text-[#f5c2e4] m-0 tracking-widest">
              {isEn ? 'INDEX DRAWER' : '索引抽屉'}
            </p>
            <p className="text-[11px] text-[#a6adc8] m-0 mt-0.5">
              {cards.length}{' '}
              {isEn
                ? 'records in current layers'
                : '条档案在当前图层'}
              {filters.district &&
                ` · ${filters.district}`}
            </p>
          </div>
          {drawerOpen ? (
            <ChevronDown className="w-4 h-4 text-[#585b70]" />
          ) : (
            <ChevronUp className="w-4 h-4 text-[#585b70]" />
          )}
        </button>

        {drawerOpen && (
          <div className="border-t-2 border-[#313244] p-3 space-y-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#585b70]" />
              <input
                value={filters.query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={
                  isEn
                    ? 'Search title, landmark, person, tag…'
                    : '搜索标题、地标、人物、标签…'
                }
                className="nes-input w-full !pl-9 text-xs bg-[#0c0d14] text-[#e2e8f0]"
              />
            </div>

            {cards.length === 0 ? (
              <p className="text-[11px] text-[#585b70] font-mono m-0 py-4 text-center">
                {isEn
                  ? 'No records in these layers. Try All layers.'
                  : '当前图层无档案。试试「全部图层」。'}
              </p>
            ) : (
              <div className="grid sm:grid-cols-2 gap-2 max-h-[420px] overflow-y-auto">
                {cards.map((card) => (
                  <ArchiveCardTile
                    key={card.id}
                    card={card}
                    language={language}
                    compact
                    selected={preview?.id === card.id}
                    onSelect={(id) => {
                      setPreviewId(id);
                      onSelectItem(id);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-[10px] text-[#585b70] font-mono m-0 leading-relaxed">
        {isEn
          ? `Trace path: Place → Event → Content → Source. Active gates: ${
              filters.genres.length === GENRE_ORDER.length
                ? 'all six'
                : filters.genres.map((g) => GENRE_META[g].labelEn).join(', ')
            }.`
          : `追溯路径：地点 → 事件 → 内容 → 来源。当前入口：${
              filters.genres.length === GENRE_ORDER.length
                ? '六类全部'
                : filters.genres.map((g) => GENRE_META[g].labelZh).join('、')
            }。`}
      </p>
    </div>
  );
}
