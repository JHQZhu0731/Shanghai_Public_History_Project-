import { MapPin, Calendar, Link2 } from 'lucide-react';
import type { ArchiveCard } from '../data/types';
import { GENRE_META } from '../data/types';
import { PixelAvatar } from './PixelAvatar';

interface ArchiveCardTileProps {
  card: ArchiveCard;
  language: 'en' | 'zh';
  onSelect: (id: string) => void;
  compact?: boolean;
  selected?: boolean;
}

export function ArchiveCardTile({
  card,
  language,
  onSelect,
  compact = false,
  selected = false,
}: ArchiveCardTileProps) {
  const isEn = language === 'en';
  const genre = GENRE_META[card.genre];

  return (
    <button
      type="button"
      onClick={() => onSelect(card.id)}
      className={`group text-left w-full bg-[#11111b] border-4 transition-colors p-3 flex gap-3 ${
        selected
          ? 'border-[#f5c2e4] shadow-[4px_4px_0px_0px_rgba(245,194,228,0.35)]'
          : 'border-[#313244] hover:border-[#f5c2e4] shadow-[4px_4px_0px_0px_rgba(49,50,68,1)]'
      }`}
    >
      <div
        className={`shrink-0 border-2 bg-[#181825] p-0.5 ${
          selected ? 'border-[#f5c2e4]' : 'border-[#313244] group-hover:border-[#f5c2e4]'
        }`}
      >
        <PixelAvatar
          seed={card.avatarSeed}
          genre={card.genre}
          decade={card.decade}
          size={compact ? 40 : 64}
          title={isEn ? card.titleEn : card.titleZh}
        />
      </div>

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className="text-[8px] font-bold px-1.5 py-0.5 border border-[#11111b]"
            style={{ backgroundColor: genre.color, color: genre.accent }}
          >
            {isEn ? genre.labelEn : genre.labelZh}
          </span>
          <span className="text-[8px] text-[#a6adc8] font-mono flex items-center gap-0.5">
            <Calendar className="w-2.5 h-2.5" />
            {card.year}
          </span>
          {card.latitude != null && (
            <span className="text-[8px] text-[#585b70] font-mono">MAP</span>
          )}
        </div>

        <h3
          className={`font-bold text-[#e2e8f0] leading-snug m-0 ${
            compact ? 'text-[11px] line-clamp-2' : 'text-sm line-clamp-2'
          }`}
        >
          {isEn ? card.titleEn : card.titleZh}
        </h3>

        {!compact && (
          <p className="text-[10px] text-[#a6adc8] leading-relaxed line-clamp-2 m-0">
            {isEn ? card.summaryEn : card.summaryZh}
          </p>
        )}

        <div className="flex items-center gap-1 text-[9px] text-[#89b4fa] font-mono">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">
            {isEn ? card.landmarkEn : card.landmarkZh}
            <span className="text-[#585b70]">
              {' '}
              · {isEn ? card.districtEn : card.districtZh}
            </span>
          </span>
        </div>

        {!compact && (
          <div className="flex items-center gap-1 text-[8px] text-[#585b70] font-mono">
            <Link2 className="w-2.5 h-2.5" />
            {isEn ? 'Source + media links' : '出处 + 媒介链接'}
          </div>
        )}
      </div>
    </button>
  );
}
