import { getAllCards, getPlaceClusters } from '../data/db';
import { GENRE_ORDER } from '../data/types';

interface ArchiveStatsProps {
  language: 'en' | 'zh';
}

export function ArchiveStats({ language }: ArchiveStatsProps) {
  const isEn = language === 'en';
  const cards = getAllCards();
  const places = getPlaceClusters(cards);
  const decades = [...new Set(cards.map((c) => c.decade))].length;

  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[9px] font-mono text-[#585b70]">
      <span>
        <span className="text-[#f5c2e4]">{cards.length}</span>{' '}
        {isEn ? 'records' : '条档案'}
      </span>
      <span>
        <span className="text-[#89b4fa]">{places.length}</span>{' '}
        {isEn ? 'places' : '个地点'}
      </span>
      <span>
        <span className="text-[#a6e3a1]">{GENRE_ORDER.length}</span>{' '}
        {isEn ? 'genres' : '大类型'}
      </span>
      <span>
        <span className="text-[#f9e2af]">{decades}</span>{' '}
        {isEn ? 'decades' : '个年代'}
      </span>
    </div>
  );
}
