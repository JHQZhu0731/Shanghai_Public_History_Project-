import { getDecades } from '../data/db';

interface TimelineBandProps {
  language: 'en' | 'zh';
  decade: number | 'all';
  counts?: { decade: number; count: number }[];
  onChange: (decade: number | 'all') => void;
}

export function TimelineBand({
  language,
  decade,
  counts,
  onChange,
}: TimelineBandProps) {
  const isEn = language === 'en';
  const decades = getDecades();
  const countMap = new Map(counts?.map((c) => [c.decade, c.count]));
  const max = Math.max(1, ...(counts?.map((c) => c.count) ?? [1]));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[9px] font-mono text-[#a6e3a1] m-0 tracking-widest">
          {isEn ? 'TIMELINE · DECADE LAYER' : '时间线 · 年代层'}
        </p>
        <button
          type="button"
          className={`text-[9px] font-mono px-2 py-0.5 border-2 ${
            decade === 'all'
              ? 'border-[#a6e3a1] text-[#a6e3a1]'
              : 'border-[#313244] text-[#585b70]'
          }`}
          onClick={() => onChange('all')}
        >
          {isEn ? 'All decades' : '全部年代'}
        </button>
      </div>
      <div className="flex items-end gap-1 overflow-x-auto pb-1">
        {decades.map((d) => {
          const count = countMap.get(d) ?? 0;
          const selected = decade === d;
          const h = Math.max(10, Math.round((count / max) * 40));
          return (
            <button
              key={d}
              type="button"
              onClick={() => onChange(selected ? 'all' : d)}
              className={`shrink-0 min-w-[52px] border-2 px-1.5 pt-2 pb-1 flex flex-col items-center gap-1 ${
                selected
                  ? 'border-[#a6e3a1] bg-[#1e1e2e]'
                  : 'border-[#313244] bg-[#11111b] hover:border-[#585b70]'
              }`}
            >
              <div
                className="w-full"
                style={{
                  height: h,
                  backgroundColor: selected ? '#a6e3a1' : '#45475a',
                }}
              />
              <span
                className={`text-[9px] font-mono ${
                  selected ? 'text-[#a6e3a1]' : 'text-[#a6adc8]'
                }`}
              >
                {d}s
              </span>
              <span className="text-[8px] font-mono text-[#585b70]">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
