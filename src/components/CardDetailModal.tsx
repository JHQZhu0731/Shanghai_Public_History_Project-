import { X, MapPin, ExternalLink, Clapperboard, Link2 } from 'lucide-react';
import { getCardById } from '../data/db';
import { GENRE_META } from '../data/types';
import { PixelAvatar } from './PixelAvatar';

interface CardDetailModalProps {
  itemId: string;
  language: 'en' | 'zh';
  onClose: () => void;
}

export function CardDetailModal({ itemId, language, onClose }: CardDetailModalProps) {
  const card = getCardById(itemId);
  const isEn = language === 'en';

  if (!card) return null;

  const genre = GENRE_META[card.genre];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0c0d14] border-4 border-[#f5c2e4] shadow-[12px_12px_0px_0px_rgba(49,50,68,1)]"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-[#11111b] border-b-4 border-[#313244] p-4">
          <div className="flex gap-4 min-w-0">
            <div className="border-4 border-[#313244] bg-[#181825] p-1 shrink-0">
              <PixelAvatar seed={card.avatarSeed} genre={card.genre} size={80} />
            </div>
            <div className="min-w-0 space-y-2">
              <span
                className="inline-block text-[9px] font-bold px-2 py-0.5 border-2 border-[#11111b]"
                style={{ backgroundColor: genre.color, color: genre.accent }}
              >
                {isEn ? genre.labelEn : genre.labelZh} · {card.year}
              </span>
              <h2 className="text-sm md:text-base font-bold text-[#e2e8f0] m-0 leading-snug">
                {isEn ? card.titleEn : card.titleZh}
              </h2>
            </div>
          </div>
          <button type="button" className="nes-btn text-xs p-1 shrink-0" onClick={onClose} aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </header>

        <div className="p-4 md:p-6 space-y-5 text-left">
          <p className="text-xs text-[#cdd6f4] leading-relaxed m-0">
            {isEn ? card.summaryEn : card.summaryZh}
          </p>

          <p className="text-[11px] text-[#a6adc8] leading-relaxed m-0 border-l-4 border-[#313244] pl-3">
            {isEn ? card.contextEn : card.contextZh}
          </p>

          {(card.credits?.director || card.credits?.studio || card.credits?.artist) && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px] font-mono">
              {card.credits.director && (
                <div className="bg-[#11111b] border-2 border-[#313244] p-2">
                  <div className="text-[#585b70]">{isEn ? 'Director' : '导演'}</div>
                  <div className="text-[#f9e2af]">{card.credits.director}</div>
                </div>
              )}
              {card.credits.studio && (
                <div className="bg-[#11111b] border-2 border-[#313244] p-2">
                  <div className="text-[#585b70]">{isEn ? 'Studio' : '制片'}</div>
                  <div className="text-[#f9e2af]">{card.credits.studio}</div>
                </div>
              )}
              {card.credits.artist && (
                <div className="bg-[#11111b] border-2 border-[#313244] p-2">
                  <div className="text-[#585b70]">{isEn ? 'Artist' : '艺人'}</div>
                  <div className="text-[#f9e2af]">{card.credits.artist}</div>
                </div>
              )}
              {card.credits.venue && (
                <div className="bg-[#11111b] border-2 border-[#313244] p-2">
                  <div className="text-[#585b70]">{isEn ? 'Venue' : '场馆'}</div>
                  <div className="text-[#f9e2af]">{card.credits.venue}</div>
                </div>
              )}
            </div>
          )}

          <div className="flex items-start gap-2 text-[11px] text-[#89b4fa] bg-[#11111b] border-2 border-[#313244] p-3">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            <div>
              <div className="font-bold">{isEn ? card.landmarkEn : card.landmarkZh}</div>
              <div className="text-[#585b70] font-mono">
                {isEn ? card.districtEn : card.districtZh}
                {card.latitude != null && card.longitude != null && (
                  <span>
                    {' '}
                    · {card.latitude.toFixed(4)}, {card.longitude.toFixed(4)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href={card.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="nes-btn is-primary text-[10px] flex items-center justify-center gap-2 flex-1"
            >
              <Link2 className="w-3.5 h-3.5" />
              {isEn ? card.sourceLabelEn : card.sourceLabelZh}
              <ExternalLink className="w-3 h-3" />
            </a>
            {card.workUrl && (
              <a
                href={card.workUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="nes-btn is-warning text-[10px] flex items-center justify-center gap-2 flex-1"
              >
                <Clapperboard className="w-3.5 h-3.5" />
                {isEn ? card.workLabelEn : card.workLabelZh}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="text-[9px] font-mono px-2 py-0.5 border-2 border-[#313244] text-[#a6adc8]"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
