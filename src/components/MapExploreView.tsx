import { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Eye, Navigation } from 'lucide-react';
import type { ArchiveFilters, ArchiveGenre } from '../data/types';
import { GENRE_META } from '../data/types';
import { filterCards, primaryDistrict } from '../data/db';
import { PixelAvatar, buildAvatarPixels } from './PixelAvatar';
import { PixelShanghaiMap } from './PixelShanghaiMap';
import { GenreLayerBar } from './GenreLayerBar';
import { TimelineBand } from './TimelineBand';
import { countByDecade, countByGenre } from '../data/db';
import { GENRE_ORDER } from '../data/types';

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
}

function avatarIcon(seed: string, genre: ArchiveGenre, decade: number, active: boolean) {
  const grid = buildAvatarPixels(seed, genre, decade);
  const cells = grid
    .map((row, y) =>
      row
        .map((c, x) => `<rect x="${x}" y="${y}" width="1" height="1" fill="${c}"/>`)
        .join('')
    )
    .join('');
  const ring = active ? '#f5c2e4' : GENRE_META[genre].color;
  const html = `
    <div style="width:40px;height:40px;border:3px solid ${ring};background:#11111b;box-shadow:3px 3px 0 #313244;image-rendering:pixelated;">
      <svg width="34" height="34" viewBox="0 0 16 16" style="image-rendering:pixelated;display:block;margin:auto;">${cells}</svg>
    </div>
  `;
  return L.divIcon({
    html,
    className: 'pixel-avatar-marker',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -36],
  });
}

interface MapExploreViewProps {
  language: 'en' | 'zh';
  filters: ArchiveFilters;
  onFiltersChange: (next: ArchiveFilters) => void;
  onSelectItem: (id: string) => void;
  focusCardId?: string | null;
}

export function MapExploreView({
  language,
  filters,
  onFiltersChange,
  onSelectItem,
  focusCardId,
}: MapExploreViewProps) {
  const isEn = language === 'en';
  const visible = useMemo(
    () =>
      filterCards(filters).filter(
        (c) => typeof c.latitude === 'number' && typeof c.longitude === 'number'
      ),
    [filters]
  );

  const [activeId, setActiveId] = useState<string | null>(
    focusCardId ?? visible[0]?.id ?? null
  );
  const [center, setCenter] = useState<[number, number]>([31.2304, 121.4737]);
  const [zoom, setZoom] = useState(12);

  useEffect(() => {
    if (focusCardId) setActiveId(focusCardId);
  }, [focusCardId]);

  const active = visible.find((c) => c.id === activeId) ?? visible[0] ?? null;

  useEffect(() => {
    if (active?.latitude != null && active?.longitude != null) {
      setCenter([active.latitude, active.longitude]);
      setZoom(14);
    }
  }, [active?.id]);

  const genreCounts = useMemo(
    () => countByGenre(filterCards({ ...filters, genres: [...GENRE_ORDER] })),
    [filters.decade, filters.district, filters.query]
  );
  const decadeCounts = useMemo(
    () => countByDecade(filterCards({ ...filters, decade: 'all' })),
    [filters.genres, filters.district, filters.query]
  );

  return (
    <div className="space-y-5">
      <div className="text-left space-y-1">
        <p className="text-[10px] font-mono text-[#a6e3a1] m-0 tracking-widest">
          {isEn ? 'GEO MAP · LANDMARK PINS' : '地理地图 · 地标钉'}
        </p>
        <p className="text-xs text-[#a6adc8] m-0 leading-relaxed">
          {isEn
            ? 'OSM basemap with pixel-avatar event pins. Filters stay synced with Atlas and Index.'
            : 'OpenStreetMap 底图 + 像素头像事件钉。筛选与图志、索引保持同步。'}
        </p>
      </div>

      <GenreLayerBar
        language={language}
        active={filters.genres}
        counts={genreCounts}
        onChange={(genres) => onFiltersChange({ ...filters, genres })}
      />

      <TimelineBand
        language={language}
        decade={filters.decade}
        counts={decadeCounts}
        onChange={(decade) => onFiltersChange({ ...filters, decade })}
      />

      <div className="grid lg:grid-cols-[1fr_300px] gap-4">
        <div className="border-4 border-[#313244] h-[420px] md:h-[520px] relative overflow-hidden">
          <MapContainer
            center={center}
            zoom={zoom}
            className="w-full h-full"
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <MapController center={center} zoom={zoom} />
            {visible.map((card) =>
              card.latitude != null && card.longitude != null ? (
                <Marker
                  key={card.id}
                  position={[card.latitude, card.longitude]}
                  icon={avatarIcon(
                    card.avatarSeed,
                    card.genre,
                    card.decade,
                    card.id === active?.id
                  )}
                  eventHandlers={{
                    click: () => setActiveId(card.id),
                  }}
                >
                  <Popup>
                    <div className="text-xs font-mono space-y-1 min-w-[140px]">
                      <strong>{isEn ? card.titleEn : card.titleZh}</strong>
                      <div className="text-[10px] opacity-70">
                        {isEn ? card.landmarkEn : card.landmarkZh}
                      </div>
                      <button
                        type="button"
                        className="underline text-[10px]"
                        onClick={() => onSelectItem(card.id)}
                      >
                        {isEn ? 'Open record' : '打开档案'}
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            )}
          </MapContainer>
        </div>

        <div className="space-y-3 max-h-[520px] overflow-y-auto">
          <div className="border-4 border-[#89b4fa] bg-[#0b1220] overflow-hidden hidden lg:block">
            <PixelShanghaiMap
              className="w-full"
              language={language}
              highlightDistrict={
                active
                  ? primaryDistrict(active) ??
                    (isEn ? active.districtEn : active.districtZh)
                  : filters.district ?? undefined
              }
              onDistrictClick={(district) => {
                const match = visible.find((c) =>
                  (primaryDistrict(c) ?? '').includes(district)
                );
                if (match) setActiveId(match.id);
              }}
            />
          </div>

          {visible.map((card) => {
            const selected = card.id === active?.id;
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setActiveId(card.id)}
                className={`w-full text-left p-3 border-4 flex gap-3 transition-colors ${
                  selected
                    ? 'border-[#f5c2e4] bg-[#1e1e2e]'
                    : 'border-[#313244] bg-[#11111b] hover:border-[#585b70]'
                }`}
              >
                <PixelAvatar
                  seed={card.avatarSeed}
                  genre={card.genre}
                  decade={card.decade}
                  size={40}
                />
                <div className="min-w-0 flex-1">
                  <div
                    className="text-[9px] font-bold"
                    style={{ color: GENRE_META[card.genre].color }}
                  >
                    {isEn
                      ? GENRE_META[card.genre].labelEn
                      : GENRE_META[card.genre].labelZh}{' '}
                    · {card.year}
                  </div>
                  <div className="text-[11px] font-bold text-[#e2e8f0] line-clamp-2">
                    {isEn ? card.titleEn : card.titleZh}
                  </div>
                  <div className="text-[10px] text-[#89b4fa] flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">
                      {isEn ? card.landmarkEn : card.landmarkZh}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {active && (
        <div className="border-4 border-[#313244] bg-[#11111b] p-4 flex flex-col md:flex-row md:items-center gap-4 justify-between text-left">
          <div className="space-y-1">
            <p className="text-[9px] font-mono text-[#f9e2af] m-0 tracking-widest">
              {isEn ? 'SELECTED SITE' : '当前地点'}
            </p>
            <h3 className="text-sm font-bold m-0">
              {isEn ? active.titleEn : active.titleZh}
            </h3>
            <p className="text-[11px] text-[#a6adc8] m-0 flex items-center gap-1">
              <Navigation className="w-3 h-3" />
              {isEn ? active.landmarkEn : active.landmarkZh}
            </p>
          </div>
          <button
            type="button"
            className="nes-btn is-primary text-xs flex items-center gap-2"
            onClick={() => onSelectItem(active.id)}
          >
            <Eye className="w-4 h-4" />
            {isEn ? 'Open record' : '打开档案'}
          </button>
        </div>
      )}
    </div>
  );
}
