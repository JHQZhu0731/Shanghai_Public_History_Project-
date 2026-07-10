import { DISTRICT_META, type DistrictKey } from '../data/types';

interface DensityStripProps {
  language: 'en' | 'zh';
  density: { key: DistrictKey; count: number }[];
  active: DistrictKey | null;
  onSelect: (key: DistrictKey | null) => void;
}

export function DensityStrip({
  language,
  density,
  active,
  onSelect,
}: DensityStripProps) {
  const isEn = language === 'en';
  const max = Math.max(1, ...density.map((d) => d.count));

  if (density.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-[9px] font-mono text-[#89b4fa] m-0 tracking-widest">
          {isEn ? 'DISTRICT DENSITY' : '区划密度带'}
        </p>
        {active && (
          <button
            type="button"
            className="text-[9px] font-mono text-[#f5c2e4] underline"
            onClick={() => onSelect(null)}
          >
            {isEn ? 'Clear district' : '清除区划'}
          </button>
        )}
      </div>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {density.map(({ key, count }) => {
          const meta = DISTRICT_META[key];
          const selected = active === key;
          const h = Math.max(8, Math.round((count / max) * 36));
          return (
            <button
              key={key}
              type="button"
              onClick={() => onSelect(selected ? null : key)}
              className={`shrink-0 w-14 border-2 px-1 pt-2 pb-1 flex flex-col items-center justify-end gap-1 ${
                selected
                  ? 'border-[#f9e2af] bg-[#1e1e2e]'
                  : 'border-[#313244] bg-[#11111b] hover:border-[#585b70]'
              }`}
            >
              <div
                className="w-full"
                style={{
                  height: h,
                  backgroundColor: selected ? '#f9e2af' : '#89b4fa',
                  opacity: 0.35 + (count / max) * 0.65,
                }}
              />
              <span className="text-[8px] font-mono text-[#cdd6f4] leading-none">
                {isEn ? meta.labelEn.slice(0, 4) : meta.labelZh}
              </span>
              <span className="text-[8px] font-mono text-[#585b70]">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
