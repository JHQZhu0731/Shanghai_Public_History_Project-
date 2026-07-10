import { GENRE_META, GENRE_ORDER, type ArchiveGenre } from '../data/types';

interface GenreLayerBarProps {
  language: 'en' | 'zh';
  active: ArchiveGenre[];
  counts?: Partial<Record<ArchiveGenre, number>>;
  onChange: (next: ArchiveGenre[]) => void;
}

export function GenreLayerBar({
  language,
  active,
  counts,
  onChange,
}: GenreLayerBarProps) {
  const isEn = language === 'en';
  const allOn = active.length === GENRE_ORDER.length;

  const toggle = (g: ArchiveGenre) => {
    if (allOn) {
      onChange([g]);
      return;
    }
    if (active.includes(g)) {
      const next = active.filter((x) => x !== g);
      onChange(next.length === 0 ? [...GENRE_ORDER] : next);
    } else {
      const next = [...active, g];
      onChange(next.length === GENRE_ORDER.length ? [...GENRE_ORDER] : next);
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[9px] font-mono text-[#f9e2af] m-0 tracking-widest">
          {isEn ? 'GENRE LAYERS · CITY DATA GATES' : '文化数据入口 · 图层开关'}
        </p>
        <button
          type="button"
          className="text-[9px] font-mono text-[#89b4fa] underline"
          onClick={() => onChange([...GENRE_ORDER])}
        >
          {isEn ? 'All layers' : '全部图层'}
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {GENRE_ORDER.map((g) => {
          const meta = GENRE_META[g];
          const on = allOn || active.includes(g);
          const count = counts?.[g];
          return (
            <button
              key={g}
              type="button"
              onClick={() => toggle(g)}
              className="text-left border-4 p-2 transition-colors"
              style={{
                borderColor: on ? meta.color : '#313244',
                backgroundColor: on ? `${meta.color}22` : '#11111b',
              }}
            >
              <div
                className="text-[10px] font-bold"
                style={{ color: on ? meta.color : '#a6adc8' }}
              >
                {isEn ? meta.labelEn : meta.labelZh}
                {typeof count === 'number' && (
                  <span className="text-[#585b70] font-mono"> · {count}</span>
                )}
              </div>
              <div className="text-[8px] text-[#585b70] font-mono mt-0.5 leading-snug">
                {isEn ? meta.roleEn : meta.roleZh}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
