import { MapPin, ExternalLink, Calendar } from 'lucide-react';
import type { ArchiveCard } from '../data/types';
import { GENRE_META } from '../data/types';
import { PixelAvatar } from './PixelAvatar';

interface ArchiveCardTileProps {
  card: ArchiveCard;
  language: 'en' | 'zh';
  onSelect: (id: string) => void;
}

export function ArchiveCardTile({ card, language, onSelect }: ArchiveCardTileProps) {
  const isEn = language === 'en';
  const genre = GENRE_META[card.genre];

  return (
    <button
      type="button"
      onClick={() => onSelect(card.id)}
      className="group text-left w-full bg-[#11111b] border-4 border-[#313244] hover:border-[#f5c2e4] transition-colors shadow-[6px_6px_0px_0px_rgba(49,50,68,1)] hover:shadow-[6px_6px_0px_0px_rgba(245,194,228,0.35)] p-4 flex gap-4"
    >
      <div className="shrink-0 border-4 border-[#313244] bg-[#181825] p-1 group-hover:border-[#f5c2e4]">
        <PixelAvatar seed={card.avatarSeed} genre={card.genre} size={72} title={isEn ? card.titleEn : card.titleZh} />
      </div>

      <div className="min-w-0 flex-1 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="text-[9px] font-bold px-2 py-0.5 border-2 border-[#11111b]"
            style={{ backgroundColor: genre.color, color: genre.accent }}
          >
            {isEn ? genre.labelEn : genre.labelZh}
          </span>
          <span className="text-[9px] text-[#a6adc8] font-mono flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {card.year}
          </span>
        </div>

        <h3 className="text-sm font-bold text-[#e2e8f0] leading-snug line-clamp-2 m-0">
          {isEn ? card.titleEn : card.titleZh}
        </h3>

        <p className="text-[11px] text-[#a6adc8] leading-relaxed line-clamp-2 m-0">
          {isEn ? card.summaryEn : card.summaryZh}
        </p>

        <div className="flex items-center gap-1.5 text-[10px] text-[#89b4fa] font-mono">
          <MapPin className="w-3 h-3 shrink-0" />
          <span className="truncate">
            {isEn ? card.landmarkEn : card.landmarkZh}
            <span className="text-[#585b70]"> · {isEn ? card.districtEn : card.districtZh}</span>
          </span>
        </div>
      </div>

      <ExternalLink className="w-4 h-4 text-[#585b70] shrink-0 opacity-0 group-hover:opacity-100 transition-opacity self-start mt-1" />
    </button>
  );
}
