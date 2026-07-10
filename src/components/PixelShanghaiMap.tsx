import { useState } from 'react';
import mapArt from '../assets/pixel-scenes/shanghai-pixel-map.webp';

/**
 * Signature creative pixel map of Shanghai.
 * Illustrated atlas + soft hotspots + optional event pins.
 */
interface EventPin {
  id: string;
  x: number;
  y: number;
  color: string;
  active?: boolean;
}

interface PixelShanghaiMapProps {
  className?: string;
  highlightDistrict?: string;
  onDistrictClick?: (district: string) => void;
  language?: 'en' | 'zh';
  eventPins?: EventPin[];
  onEventClick?: (id: string) => void;
}

const DISTRICTS: {
  id: string;
  labelZh: string;
  labelEn: string;
  cx: number;
  cy: number;
  rx: number;
  ry: number;
}[] = [
  { id: 'Jiading', labelZh: '嘉定', labelEn: 'Jiading', cx: 20, cy: 20, rx: 11, ry: 10 },
  { id: 'Qingpu', labelZh: '青浦', labelEn: 'Qingpu', cx: 14, cy: 46, rx: 10, ry: 11 },
  { id: 'Changning', labelZh: '长宁', labelEn: 'Changning', cx: 30, cy: 50, rx: 8, ry: 8 },
  { id: "Jing'an", labelZh: '静安', labelEn: "Jing'an", cx: 40, cy: 46, rx: 7, ry: 7 },
  { id: 'Xuhui', labelZh: '徐汇', labelEn: 'Xuhui', cx: 38, cy: 66, rx: 9, ry: 9 },
  { id: 'Huangpu', labelZh: '黄浦', labelEn: 'Huangpu', cx: 50, cy: 54, rx: 7, ry: 8 },
  { id: 'Hongkou', labelZh: '虹口', labelEn: 'Hongkou', cx: 56, cy: 34, rx: 8, ry: 7 },
  { id: 'Yangpu', labelZh: '杨浦', labelEn: 'Yangpu', cx: 68, cy: 28, rx: 9, ry: 8 },
  { id: 'Pudong', labelZh: '浦东', labelEn: 'Pudong', cx: 78, cy: 56, rx: 13, ry: 16 },
  { id: 'Chongming', labelZh: '崇明', labelEn: 'Chongming', cx: 86, cy: 12, rx: 10, ry: 7 },
];

function matchDistrict(highlight: string | undefined, d: (typeof DISTRICTS)[0]) {
  if (!highlight) return false;
  const h = highlight.toLowerCase();
  return (
    h.includes(d.id.toLowerCase()) ||
    highlight.includes(d.labelZh) ||
    h.includes(d.labelEn.toLowerCase())
  );
}

export function PixelShanghaiMap({
  className = '',
  highlightDistrict,
  onDistrictClick,
  language = 'zh',
  eventPins = [],
  onEventClick,
}: PixelShanghaiMapProps) {
  const isEn = language === 'en';
  const interactive = Boolean(onDistrictClick);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className={`relative overflow-hidden bg-[#0b1220] ${className}`}>
      <img
        src={mapArt}
        alt={isEn ? 'Creative pixel map of Shanghai' : '上海创意像素地图'}
        className="block w-full h-auto select-none"
        style={{ imageRendering: 'pixelated' }}
        draggable={false}
      />

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-label={isEn ? 'District hotspots and event pins' : '区划热点与事件点位'}
      >
        <defs>
          <radialGradient id="pixelMapGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f9e2af" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#89b4fa" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#89b4fa" stopOpacity="0" />
          </radialGradient>
        </defs>

        {DISTRICTS.map((d) => {
          const active = matchDistrict(highlightDistrict, d);
          const isHover = hovered === d.id;
          const lit = active || isHover;

          return (
            <g
              key={d.id}
              onClick={() => onDistrictClick?.(d.id)}
              onMouseEnter={() => interactive && setHovered(d.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: interactive ? 'pointer' : 'default' }}
              role={interactive ? 'button' : undefined}
              tabIndex={interactive ? 0 : undefined}
              onKeyDown={
                interactive
                  ? (e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onDistrictClick?.(d.id);
                      }
                    }
                  : undefined
              }
            >
              {lit && (
                <ellipse
                  cx={d.cx}
                  cy={d.cy}
                  rx={d.rx + 2.5}
                  ry={d.ry + 2.5}
                  fill="url(#pixelMapGlow)"
                  className={active ? 'pixel-map-pulse' : undefined}
                  style={{ pointerEvents: 'none' }}
                />
              )}
              <ellipse
                cx={d.cx}
                cy={d.cy}
                rx={d.rx}
                ry={d.ry}
                fill={
                  lit
                    ? 'rgba(249,226,175,0.18)'
                    : interactive
                      ? 'rgba(137,180,250,0.04)'
                      : 'transparent'
                }
                stroke={
                  lit
                    ? '#f9e2af'
                    : interactive
                      ? 'rgba(205,214,244,0.2)'
                      : 'transparent'
                }
                strokeWidth={lit ? 0.55 : 0.3}
              >
                <title>{isEn ? d.labelEn : d.labelZh}</title>
              </ellipse>
            </g>
          );
        })}

        {/* Event dots — archive data points by genre color */}
        {eventPins.map((pin) => (
          <g
            key={pin.id}
            onClick={(e) => {
              e.stopPropagation();
              onEventClick?.(pin.id);
            }}
            style={{ cursor: onEventClick ? 'pointer' : 'default' }}
          >
            {pin.active && (
              <circle
                cx={pin.x}
                cy={pin.y}
                r={2.8}
                fill="none"
                stroke="#f5c2e4"
                strokeWidth={0.45}
                className="pixel-map-pulse"
              />
            )}
            <rect
              x={pin.x - 0.9}
              y={pin.y - 0.9}
              width={1.8}
              height={1.8}
              fill={pin.color}
              stroke="#11111b"
              strokeWidth={0.25}
            />
          </g>
        ))}
      </svg>

      {(hovered || highlightDistrict) && (
        <div className="absolute top-2 right-2 bg-[#11111b]/92 border-2 border-[#f9e2af] px-2 py-1 pointer-events-none">
          <p className="text-[9px] font-mono text-[#f9e2af] m-0 tracking-wide">
            {(() => {
              const id =
                hovered ??
                DISTRICTS.find((d) => matchDistrict(highlightDistrict, d))?.id;
              const d = DISTRICTS.find((x) => x.id === id);
              if (!d) return isEn ? 'District' : '区划';
              return isEn ? d.labelEn.toUpperCase() : d.labelZh;
            })()}
          </p>
        </div>
      )}
    </div>
  );
}
