import {
  X,
  MapPin,
  ExternalLink,
  Clapperboard,
  Link2,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { getCardById, getRelatedCards, primaryDistrict } from '../data/db';
import { GENRE_META, DISTRICT_META } from '../data/types';
import { PixelAvatar } from './PixelAvatar';

interface RecordPanelProps {
  itemId: string;
  language: 'en' | 'zh';
  onClose: () => void;
  onSelectRelated: (id: string) => void;
  onJumpToMap?: (id: string) => void;
}

export function RecordPanel({
  itemId,
  language,
  onClose,
  onSelectRelated,
  onJumpToMap,
}: RecordPanelProps) {
  const card = getCardById(itemId);
  const isEn = language === 'en';

  if (!card) return null;

  const genre = GENRE_META[card.genre];
  const related = getRelatedCards(card, 3);
  const district = primaryDistrict(card);
  const districtLabel = district
    ? isEn
      ? DISTRICT_META[district].labelEn
      : DISTRICT_META[district].labelZh
    : isEn
      ? card.districtEn
      : card.districtZh;

  const Trail = ({
    title,
    items,
  }: {
    title: string;
    items: typeof related.sameGenre;
  }) => {
    if (items.length === 0) return null;
    return (
      <div className="space-y-2">
        <p className="text-[9px] font-mono text-[#585b70] m-0 tracking-wider">{title}</p>
        <div className="space-y-1.5">
          {items.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelectRelated(c.id)}
              className="w-full text-left flex items-center gap-2 border-2 border-[#313244] hover:border-[#f5c2e4] bg-[#11111b] p-2"
            >
              <PixelAvatar
                seed={c.avatarSeed}
                genre={c.genre}
                decade={c.decade}
                size={28}
              />
              <span className="text-[10px] text-[#cdd6f4] line-clamp-1 flex-1">
                {isEn ? c.titleEn : c.titleZh}
              </span>
              <ArrowRight className="w-3 h-3 text-[#585b70] shrink-0" />
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[94vh] overflow-y-auto bg-[#0c0d14] border-4 border-[#f5c2e4]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Trace breadcrumb */}
        <div className="bg-[#11111b] border-b-2 border-[#313244] px-4 py-2 flex flex-wrap gap-x-2 gap-y-1 text-[8px] font-mono text-[#585b70]">
          <span className="text-[#89b4fa]">
            1. {isEn ? 'Place' : '地点'} · {districtLabel}
          </span>
          <span>→</span>
          <span className="text-[#a6e3a1]">
            2. {isEn ? 'Event' : '事件'} · {card.year}
          </span>
          <span>→</span>
          <span className="text-[#f5c2e4]">
            3. {isEn ? 'Content' : '内容'}
          </span>
          <span>→</span>
          <span className="text-[#f9e2af]">
            4. {isEn ? 'Source' : '来源'}
          </span>
        </div>

        <header className="sticky top-0 z-10 flex items-start justify-between gap-4 bg-[#11111b] border-b-4 border-[#313244] p-4">
          <div className="flex gap-4 min-w-0">
            <div className="border-4 border-[#313244] bg-[#181825] p-1 shrink-0">
              <PixelAvatar
                seed={card.avatarSeed}
                genre={card.genre}
                decade={card.decade}
                size={80}
              />
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
              <p className="text-[10px] text-[#a6adc8] m-0 flex items-center gap-1 font-mono">
                <Calendar className="w-3 h-3" />
                {card.decade}s · {isEn ? genre.roleEn : genre.roleZh}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="nes-btn text-xs p-1 shrink-0"
            onClick={onClose}
            aria-label="Close"
          >
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

          {(card.credits?.director ||
            card.credits?.studio ||
            card.credits?.artist ||
            card.credits?.venue) && (
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

          <div className="flex items-start justify-between gap-3 text-[11px] text-[#89b4fa] bg-[#11111b] border-2 border-[#313244] p-3">
            <div className="flex items-start gap-2 min-w-0">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold">
                  {isEn ? card.landmarkEn : card.landmarkZh}
                </div>
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
            {onJumpToMap && card.latitude != null && (
              <button
                type="button"
                className="text-[9px] font-mono underline shrink-0 text-[#f9e2af]"
                onClick={() => onJumpToMap(card.id)}
              >
                {isEn ? 'Show on atlas' : '在图志上显示'}
              </button>
            )}
          </div>

          {/* Provenance Block — hard requirement */}
          <div className="border-4 border-[#f9e2af] bg-[#11111b] p-4 space-y-3">
            <p className="text-[9px] font-mono text-[#f9e2af] m-0 tracking-widest">
              {isEn ? 'PROVENANCE BLOCK' : '来源追溯块'}
            </p>
            <p className="text-[10px] text-[#a6adc8] m-0 leading-relaxed">
              {isEn
                ? 'Every record must keep an original source. Media, research, and reports link out when available.'
                : '每条档案必须保留原始出处。电影、研究、报道在适用时附外链。'}
            </p>
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

          {/* Trail — related jumps */}
          <div className="space-y-4 border-t-2 border-[#313244] pt-4">
            <p className="text-[9px] font-mono text-[#f5c2e4] m-0 tracking-widest">
              {isEn ? 'TRAIL · RELATED RECORDS' : '关联轨迹'}
            </p>
            <Trail
              title={isEn ? 'Same landmark' : '同地标'}
              items={related.sameLandmark}
            />
            <Trail
              title={isEn ? 'Same decade' : '同年代'}
              items={related.sameDecade}
            />
            <Trail
              title={isEn ? 'Same genre' : '同类型'}
              items={related.sameGenre}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
