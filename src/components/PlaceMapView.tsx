import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin, Search } from 'lucide-react';
import type { ArchiveGenre } from '../data/types';
import { GENRE_META, GENRE_ORDER } from '../data/types';
import {
  getAllCards,
  getPlaceClusters,
  layoutMapPlaces,
  type PlaceCluster,
} from '../data/db';
import { ArchiveCardTile } from './ArchiveCardTile';

const SHANGHAI_CENTER: [number, number] = [31.2304, 121.4737];
const DEFAULT_ZOOM = 11;
const FOCUS_ZOOM = 14;

function MapController({
  center,
  zoom,
}: {
  center: [number, number] | null;
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo(center, zoom, { duration: 0.9 });
  }, [center, zoom, map]);
  return null;
}

function placeIcon(count: number, active: boolean) {
  const bg = active ? '#f5c2e4' : '#89b4fa';
  const fg = '#11111b';
  const html = `
    <div class="place-marker-pin" style="
      min-width:28px;height:28px;padding:0 6px;
      display:flex;align-items:center;justify-content:center;
      background:${bg};color:${fg};
      border:3px solid #11111b;
      box-shadow:3px 3px 0 #313244;
      font-family:monospace;font-size:11px;font-weight:700;
      border-radius:2px;
      pointer-events:auto;
    ">${count}</div>
  `;
  return L.divIcon({
    html,
    className: 'place-marker',
    iconSize: [28, 28],
    iconAnchor: [14, 28],
  });
}

interface PlaceMapViewProps {
  language: 'en' | 'zh';
  onSelectItem: (id: string) => void;
  focusCardId?: string | null;
}

export function PlaceMapView({
  language,
  onSelectItem,
  focusCardId,
}: PlaceMapViewProps) {
  const isEn = language === 'en';
  const [genre, setGenre] = useState<ArchiveGenre | 'all'>('all');
  const [query, setQuery] = useState('');
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  const places = useMemo(() => {
    let cards = getAllCards();
    if (genre !== 'all') cards = cards.filter((c) => c.genre === genre);
    if (query.trim()) {
      const q = query.toLowerCase();
      cards = cards.filter(
        (c) =>
          c.titleEn.toLowerCase().includes(q) ||
          c.titleZh.includes(q) ||
          c.landmarkEn.toLowerCase().includes(q) ||
          c.landmarkZh.includes(q) ||
          c.districtEn.toLowerCase().includes(q) ||
          c.districtZh.includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    return getPlaceClusters(cards);
  }, [genre, query]);

  const mapPins = useMemo(() => layoutMapPlaces(places), [places]);

  useEffect(() => {
    if (!focusCardId) return;
    const hit = places.find((p) => p.cards.some((c) => c.id === focusCardId));
    if (hit) setSelectedPlaceId(hit.id);
  }, [focusCardId, places]);

  useEffect(() => {
    if (selectedPlaceId && !places.some((p) => p.id === selectedPlaceId)) {
      setSelectedPlaceId(null);
    }
  }, [places, selectedPlaceId]);

  const selected: PlaceCluster | null =
    places.find((p) => p.id === selectedPlaceId) ?? null;

  const selectedPin = selected
    ? mapPins.find((p) => p.id === selected.id)
    : null;

  const flyTarget: [number, number] | null = selectedPin
    ? [selectedPin.mapLat, selectedPin.mapLng]
    : null;

  const selectPlace = (placeId: string) => {
    setSelectedPlaceId((prev) => (prev === placeId ? null : placeId));
  };

  return (
    <div className="space-y-4">
      <div className="text-left space-y-1">
        <p className="text-[10px] font-mono text-[#89b4fa] m-0 tracking-widest">
          {isEn ? 'PLACE MAP' : '地点地图'}
        </p>
        <h2 className="text-sm md:text-base font-bold text-[#e2e8f0] m-0">
          {isEn
            ? 'One pin per place — click to list related records'
            : '每个地点一个标记 — 点击查看相关档案'}
        </h2>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => {
            setGenre('all');
            setSelectedPlaceId(null);
          }}
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
              onClick={() => {
                setGenre(g);
                setSelectedPlaceId(null);
              }}
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
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#585b70]" />
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelectedPlaceId(null);
          }}
          placeholder={isEn ? 'Search place or title…' : '搜索地点或标题…'}
          className="nes-input w-full !pl-9 text-xs bg-[#11111b] text-[#e2e8f0]"
        />
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-4 items-start">
        <div className="border-4 border-[#313244] h-[440px] md:h-[560px] overflow-hidden bg-[#11111b]">
          <MapContainer
            key="shanghai-place-map"
            center={SHANGHAI_CENTER}
            zoom={DEFAULT_ZOOM}
            className="w-full h-full"
            scrollWheelZoom
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            <MapController
              center={flyTarget}
              zoom={selected ? FOCUS_ZOOM : DEFAULT_ZOOM}
            />
            {mapPins.map((place) => {
              const active = place.id === selected?.id;
              return (
                <Marker
                  key={place.id}
                  position={[place.mapLat, place.mapLng]}
                  icon={placeIcon(place.cards.length, active)}
                  zIndexOffset={active ? 1000 : 0}
                  eventHandlers={{
                    click: (e) => {
                      L.DomEvent.stopPropagation(e);
                      selectPlace(place.id);
                    },
                  }}
                />
              );
            })}
          </MapContainer>
        </div>

        <div className="border-4 border-[#313244] bg-[#11111b] min-h-[440px] md:min-h-[560px] flex flex-col">
          {selected ? (
            <>
              <div className="border-b-4 border-[#313244] p-4 text-left space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[9px] font-mono text-[#f9e2af] m-0 tracking-widest">
                    {isEn ? 'SELECTED PLACE' : '当前地点'}
                  </p>
                  <button
                    type="button"
                    className="text-[9px] font-mono text-[#585b70] underline"
                    onClick={() => setSelectedPlaceId(null)}
                  >
                    {isEn ? 'Clear' : '清除'}
                  </button>
                </div>
                <h3 className="text-sm font-bold text-[#e2e8f0] m-0 flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#89b4fa] shrink-0 mt-0.5" />
                  <span>{isEn ? selected.landmarkEn : selected.landmarkZh}</span>
                </h3>
                <p className="text-[10px] font-mono text-[#585b70] m-0 pl-6">
                  {isEn ? selected.districtEn : selected.districtZh}
                  {' · '}
                  {selected.cards.length} {isEn ? 'records' : '条档案'}
                </p>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                {selected.cards.map((card) => (
                  <ArchiveCardTile
                    key={card.id}
                    card={card}
                    language={language}
                    compact
                    onSelect={onSelectItem}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="flex-1 p-4 text-left space-y-4">
              <p className="text-[9px] font-mono text-[#585b70] m-0 tracking-widest">
                {isEn ? 'PLACES' : '地点列表'}
              </p>
              <p className="text-[11px] text-[#a6adc8] m-0 leading-relaxed">
                {isEn
                  ? 'Each pin is one place. Pick on the map or from the list.'
                  : '每个标记对应一个地点。在地图或列表中选择。'}
              </p>
              <div className="space-y-1.5 max-h-[420px] overflow-y-auto">
                {places.map((place) => (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => selectPlace(place.id)}
                    className="w-full text-left border-2 border-[#313244] hover:border-[#89b4fa] bg-[#0c0d14] px-3 py-2.5 flex items-center justify-between gap-2"
                  >
                    <span className="min-w-0">
                      <span className="block text-[11px] font-bold text-[#e2e8f0] truncate">
                        {isEn ? place.landmarkEn : place.landmarkZh}
                      </span>
                      <span className="block text-[9px] font-mono text-[#585b70] truncate">
                        {isEn ? place.districtEn : place.districtZh}
                      </span>
                    </span>
                    <span className="shrink-0 text-[10px] font-mono font-bold bg-[#89b4fa] text-[#11111b] px-2 py-0.5 border-2 border-[#11111b]">
                      {place.cards.length}
                    </span>
                  </button>
                ))}
                {places.length === 0 && (
                  <p className="text-[11px] text-[#585b70] font-mono py-6 text-center m-0">
                    {isEn ? 'No places match.' : '没有匹配的地点。'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
