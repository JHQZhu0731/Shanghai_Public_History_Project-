/**
 * Signature pixel-style map of Shanghai — districts, river, and landmark pins.
 * Used as a collectible archival visual (not a GIS basemap).
 */
interface PixelShanghaiMapProps {
  className?: string;
  highlightDistrict?: string;
  onDistrictClick?: (district: string) => void;
}

const DISTRICTS: {
  id: string;
  label: string;
  path: string;
  cx: number;
  cy: number;
}[] = [
  { id: 'Huangpu', label: '黄浦', path: 'M148,118 L168,110 L178,128 L170,148 L150,152 L140,136 Z', cx: 158, cy: 130 },
  { id: "Jing'an", label: '静安', path: 'M118,108 L148,118 L140,136 L120,140 L108,124 Z', cx: 128, cy: 124 },
  { id: 'Xuhui', label: '徐汇', path: 'M108,140 L140,136 L150,152 L138,172 L112,168 L100,152 Z', cx: 124, cy: 154 },
  { id: 'Hongkou', label: '虹口', path: 'M168,78 L190,72 L198,96 L178,110 L168,110 L160,92 Z', cx: 178, cy: 90 },
  { id: 'Yangpu', label: '杨浦', path: 'M198,70 L230,66 L238,98 L210,112 L198,96 Z', cx: 218, cy: 88 },
  { id: 'Pudong', label: '浦东', path: 'M178,128 L210,112 L250,120 L258,170 L220,190 L178,168 L170,148 Z', cx: 214, cy: 150 },
  { id: 'Changning', label: '长宁', path: 'M78,118 L118,108 L108,124 L100,152 L72,148 L68,128 Z', cx: 90, cy: 130 },
  { id: 'Jiading', label: '嘉定', path: 'M40,40 L100,36 L110,70 L78,88 L42,78 Z', cx: 72, cy: 58 },
  { id: 'Qingpu', label: '青浦', path: 'M20,100 L68,90 L72,130 L48,150 L18,138 Z', cx: 44, cy: 118 },
];

const LANDMARKS = [
  { name: '外滩', x: 172, y: 122 },
  { name: '陆家嘴', x: 198, y: 136 },
  { name: '豫园', x: 160, y: 142 },
  { name: '虹口球场', x: 182, y: 86 },
  { name: '徐家汇', x: 122, y: 158 },
  { name: '赛车场', x: 70, y: 52 },
  { name: '南翔', x: 78, y: 62 },
];

export function PixelShanghaiMap({
  className = '',
  highlightDistrict,
  onDistrictClick,
}: PixelShanghaiMapProps) {
  return (
    <svg
      viewBox="0 0 280 220"
      className={className}
      style={{ imageRendering: 'pixelated' }}
      role="img"
      aria-label="Pixel map of Shanghai"
    >
      <defs>
        <pattern id="pixelGrid" width="4" height="4" patternUnits="userSpaceOnUse">
          <rect width="4" height="4" fill="#11111b" />
          <rect width="1" height="1" fill="#1e1e2e" />
        </pattern>
      </defs>

      {/* Water / bay backdrop */}
      <rect width="280" height="220" fill="url(#pixelGrid)" />
      <rect x="0" y="180" width="280" height="40" fill="#1a3a4a" />
      <rect x="200" y="160" width="80" height="60" fill="#1a3a4a" />

      {/* Huangpu River — pixel ribbon */}
      <path
        d="M165,40 L172,80 L168,110 L175,140 L168,175 L175,200"
        fill="none"
        stroke="#89dceb"
        strokeWidth="6"
        strokeLinecap="square"
      />
      <path
        d="M165,40 L172,80 L168,110 L175,140 L168,175 L175,200"
        fill="none"
        stroke="#74c7ec"
        strokeWidth="2"
        strokeLinecap="square"
      />

      {/* Districts */}
      {DISTRICTS.map((d) => {
        const active =
          highlightDistrict &&
          (highlightDistrict.includes(d.id) ||
            highlightDistrict.includes(d.label) ||
            d.id.includes(highlightDistrict));
        return (
          <g
            key={d.id}
            onClick={() => onDistrictClick?.(d.id)}
            style={{ cursor: onDistrictClick ? 'pointer' : 'default' }}
          >
            <path
              d={d.path}
              fill={active ? '#f9e2af' : '#313244'}
              stroke="#11111b"
              strokeWidth="2"
            />
            <text
              x={d.cx}
              y={d.cy}
              textAnchor="middle"
              fill={active ? '#11111b' : '#a6adc8'}
              fontSize="7"
              fontFamily="monospace"
              style={{ pointerEvents: 'none' }}
            >
              {d.label}
            </text>
          </g>
        );
      })}

      {/* Landmark pins */}
      {LANDMARKS.map((lm) => (
        <g key={lm.name}>
          <rect x={lm.x - 2} y={lm.y - 2} width="4" height="4" fill="#f38ba8" stroke="#11111b" strokeWidth="1" />
          <text
            x={lm.x + 5}
            y={lm.y + 2}
            fill="#f5c2e4"
            fontSize="5"
            fontFamily="monospace"
          >
            {lm.name}
          </text>
        </g>
      ))}

      {/* Title plate */}
      <rect x="8" y="8" width="92" height="22" fill="#11111b" stroke="#f5c2e4" strokeWidth="2" />
      <text x="14" y="22" fill="#f5c2e4" fontSize="8" fontFamily="monospace">
        SHANGHAI PIXEL MAP
      </text>
    </svg>
  );
}
