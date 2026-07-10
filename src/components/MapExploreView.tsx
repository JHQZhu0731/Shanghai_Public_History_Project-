import { useMemo, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Eye, Navigation } from 'lucide-react';
import { getMappedCards } from '../data/db';
import { GENRE_META, type ArchiveGenre } from '../data/types';
import { PixelAvatar, buildAvatarPixels } from './PixelAvatar';
import { PixelShanghaiMap } from './PixelShanghaiMap';

function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
}

function avatarIcon(seed: string, genre: ArchiveGenre, active: boolean) {
  const grid = buildAvatarPixels(seed, genre);
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
  onSelectItem: (id: string) => void;
}

export function MapExploreView({ language, onSelectItem }: MapExploreViewProps) {
  const isEn = language === 'en';
  const mapped = useMemo(() => getMappedCards(), []);
  const [genreFilter, setGenreFilter] = useState<ArchiveGenre | 'all'>('all');
  const [activeId, setActiveId] = useState<string | null>(mapped[0]?.id ?? null);
  const [center, setCenter] = useState<[number, number]>([31.2304, 121.4737]);
  const [zoom, setZoom] = useState(12);

  const visible = useMemo(
    () =>
      mapped.filter((c) => genreFilter === 'all' || c.genre === genreFilter),
    [mapped, genreFilter]
  );

  const active = visible.find((c) => c.id === activeId) ?? visible[0] ?? null;

  useEffect(() => {
    if (active?.latitude != null && active?.longitude != null) {
      setCenter([active.latitude, active.longitude]);
      setZoom(14);
    }
  }, [active?.id]);

  const genres: Array<ArchiveGenre | 'all'> = [
    'all',
    'music',
    'movie',
    'sports',
    'food',
    'social_study',
    'public_health',
  ];

  return (
    <div className="space-y-6">
      <div className="nes-container is-dark with-title text-left">
        <p className="title text-xs text-[#a6e3a1]">
          {isEn ? 'LANDMARK MAP' : '地标地图'}
        </p>
        <p className="text-xs text-[#a6adc8] m-0 leading-relaxed">
          {isEn
            ? 'Explore archive cards pinned to Shanghai landmarks. Click a pixel avatar on the map or pick a site from the list.'
            : '在上海地标上浏览档案卡片。点击地图上的像素头像，或从列表选择地点。'}
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {genres.map((g) => {
          const label =
            g === 'all'
              ? isEn
                ? 'All'
                : '全部'
              : isEn
                ? GENRE_META[g].labelEn
                : GENRE_META[g].labelZh;
          const activeBtn = genreFilter === g;
          const color = g === 'all' ? '#cdd6f4' : GENRE_META[g].color;
          return (
            <button
              key={g}
              type="button"
              onClick={() => {
                setGenreFilter(g);
                setActiveId(null);
              }}
              className="text-[10px] font-bold px-3 py-1.5 border-2 border-[#11111b]"
              style={{
                backgroundColor: activeBtn ? color : '#313244',
                color: activeBtn ? '#11111b' : '#cdd6f4',
              }}
            >
              {label}
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-4">
        <div className="border-4 border-[#313244] h-[420px] md:h-[520px] relative overflow-hidden shadow-[8px_8px_0px_0px_rgba(49,50,68,1)]">
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
                  icon={avatarIcon(card.avatarSeed, card.genre, card.id === active?.id)}
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
                        {isEn ? 'Open card' : '打开卡片'}
                      </button>
                    </div>
                  </Popup>
                </Marker>
              ) : null
            )}
          </MapContainer>
        </div>

        <div className="space-y-3 max-h-[520px] overflow-y-auto">
          <div className="border-4 border-[#313244] bg-[#0c0d14] p-2 hidden lg:block">
            <PixelShanghaiMap
              className="w-full h-auto"
              highlightDistrict={active ? (isEn ? active.districtEn : active.districtZh) : undefined}
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
                <PixelAvatar seed={card.avatarSeed} genre={card.genre} size={40} />
                <div className="min-w-0 flex-1">
                  <div className="text-[9px] font-bold" style={{ color: GENRE_META[card.genre].color }}>
                    {isEn ? GENRE_META[card.genre].labelEn : GENRE_META[card.genre].labelZh} · {card.year}
                  </div>
                  <div className="text-[11px] font-bold text-[#e2e8f0] line-clamp-2">
                    {isEn ? card.titleEn : card.titleZh}
                  </div>
                  <div className="text-[10px] text-[#89b4fa] flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3" />
                    <span className="truncate">{isEn ? card.landmarkEn : card.landmarkZh}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {active && (
        <div className="nes-container is-dark with-title text-left flex flex-col md:flex-row md:items-center gap-4 justify-between">
          <div className="space-y-1">
            <p className="title text-xs text-[#f9e2af]">{isEn ? 'SELECTED SITE' : '当前地点'}</p>
            <h3 className="text-sm font-bold m-0">{isEn ? active.titleEn : active.titleZh}</h3>
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
            {isEn ? 'Open archive card' : '打开档案卡片'}
          </button>
        </div>
      )}
    </div>
  );
}
