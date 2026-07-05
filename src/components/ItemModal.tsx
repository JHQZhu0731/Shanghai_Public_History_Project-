import React from 'react';
import { X, Calendar, MapPin, Film, Heart, Tag, BookOpen, Video, Camera } from 'lucide-react';
import { getItemById } from '../data/db';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ItemModalProps {
  itemId: string;
  language: 'en' | 'zh';
  onClose: () => void;
}

export const ItemModal: React.FC<ItemModalProps> = ({ itemId, language, onClose }) => {
  const itemWithMetadata = getItemById(itemId);

  if (!itemWithMetadata) return null;

  const isEn = language === 'en';
  const title = isEn ? itemWithMetadata.titleEn : itemWithMetadata.titleZh;
  const summary = isEn ? itemWithMetadata.summaryEn : itemWithMetadata.summaryZh;
  const content = isEn ? itemWithMetadata.contentMarkdownEn : itemWithMetadata.contentMarkdownZh;

  // Get category icon
  const getCategoryIcon = () => {
    switch (itemWithMetadata.category) {
      case 'urban_planning':
        return <MapPin className="w-4 h-4 text-[#a6e3a1]" />;
      case 'demographics':
        return <Tag className="w-4 h-4 text-[#89b4fa]" />;
      case 'healthcare':
        return <Heart className="w-4 h-4 text-[#f38ba8]" />;
      case 'film':
        return <Film className="w-4 h-4 text-[#f9e2af]" />;
    }
  };

  // Get item type icon
  const getItemTypeIcon = () => {
    switch (itemWithMetadata.itemType) {
      case 'video':
        return <Video className="w-3.5 h-3.5" />;
      case 'text':
      case 'research_paper':
        return <BookOpen className="w-3.5 h-3.5" />;
      case 'photograph':
        return <Camera className="w-3.5 h-3.5" />;
      default:
        return <BookOpen className="w-3.5 h-3.5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#11111b] border-4 border-[#313244] overflow-hidden flex flex-col max-h-[90vh] shadow-[10px_10px_0px_0px_rgba(49,50,68,1)]">
        
        {/* Header */}
        <div className="flex items-start justify-between p-5 border-b-4 border-[#313244] bg-[#181825]">
          <div className="flex-1 pr-4 text-left">
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold rounded-none bg-[#313244] text-[#cdd6f4] border-2 border-[#11111b]">
                {getCategoryIcon()}
                <span className="capitalize">{itemWithMetadata.category.replace('_', ' ')}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-none bg-[#f9e2af]/10 text-[#f9e2af] border-2 border-[#f9e2af]/20">
                <Calendar className="w-3.5 h-3.5" />
                {itemWithMetadata.exactYear}
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold rounded-none bg-[#cba6f7]/10 text-[#cba6f7] border-2 border-[#cba6f7]/20 capitalize">
                {getItemTypeIcon()}
                {itemWithMetadata.itemType.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-base md:text-xl font-black text-white uppercase tracking-wide leading-snug">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="nes-btn is-error text-xs p-1.5 shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-6 text-left">
          
          {/* Cover Image or Video Placeholder */}
          {itemWithMetadata.thumbnailUrl && (
            <div className="relative w-full h-48 md:h-80 overflow-hidden border-4 border-[#313244] bg-black">
              <img 
                src={itemWithMetadata.thumbnailUrl} 
                alt={title}
                className="w-full h-full object-cover image-rendering-pixelated"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-4">
                <p className="text-[#cdd6f4] text-[10px] md:text-xs font-medium leading-relaxed max-w-2xl">
                  "{summary}"
                </p>
              </div>
            </div>
          )}

          {/* Relationally Joined Metadata Box */}
          <div className="p-4 bg-[#181825] border-4 border-[#313244]">
            <h4 className="text-[10px] font-black text-[#f9e2af] uppercase tracking-widest mb-3 border-b border-[#313244] pb-1.5">
              {isEn ? 'ARCHIVE RELATION METADATA' : '档案关联元数据'}
            </h4>
            
            {/* Urban Planning Metadata */}
            {itemWithMetadata.category === 'urban_planning' && itemWithMetadata.planning && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
                <div>
                  <span className="text-[#9399b2] block mb-0.5">{isEn ? 'District' : '区域'}</span>
                  <span className="text-white font-bold">{itemWithMetadata.planning.district}</span>
                </div>
                <div>
                  <span className="text-[#9399b2] block mb-0.5">{isEn ? 'Planning Type' : '规划类型'}</span>
                  <span className="text-white font-bold capitalize">{itemWithMetadata.planning.planningType.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-[#9399b2] block mb-0.5">{isEn ? 'Coordinates' : '地理坐标'}</span>
                  <span className="text-white font-mono font-bold">
                    {itemWithMetadata.planning.latitude.toFixed(4)}°N, {itemWithMetadata.planning.longitude.toFixed(4)}°E
                  </span>
                </div>
                {itemWithMetadata.planning.keyFigures && itemWithMetadata.planning.keyFigures.length > 0 && (
                  <div className="md:col-span-3">
                    <span className="text-[#9399b2] block mb-0.5">{isEn ? 'Key Planners / Figures' : '关键规划者 / 历史人物'}</span>
                    <span className="text-white font-bold">{itemWithMetadata.planning.keyFigures.join(', ')}</span>
                  </div>
                )}
              </div>
            )}

            {/* Healthcare Metadata */}
            {itemWithMetadata.category === 'healthcare' && itemWithMetadata.healthcare && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
                <div>
                  <span className="text-[#9399b2] block mb-0.5">{isEn ? 'Healthcare Era' : '医疗历史时期'}</span>
                  <span className="text-white font-bold capitalize">{itemWithMetadata.healthcare.eraType.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-[#9399b2] block mb-0.5">{isEn ? 'Life Expectancy (Shanghai)' : '上海人均预期寿命'}</span>
                  <span className="text-white font-bold">{itemWithMetadata.healthcare.lifeExpectancy ? `${itemWithMetadata.healthcare.lifeExpectancy} ${isEn ? 'years' : '岁'}` : 'N/A'}</span>
                </div>
                <div>
                  <span className="text-[#9399b2] block mb-0.5">{isEn ? 'Major Hospitals' : '主要医疗机构数量'}</span>
                  <span className="text-white font-bold">{itemWithMetadata.healthcare.hospitalCount || 'N/A'}</span>
                </div>
                {itemWithMetadata.healthcare.keyDiseases && itemWithMetadata.healthcare.keyDiseases.length > 0 && (
                  <div className="md:col-span-3">
                    <span className="text-[#9399b2] block mb-0.5">{isEn ? 'Key Health Challenges / Diseases' : '主要疾病与健康挑战'}</span>
                    <span className="text-white font-bold">{itemWithMetadata.healthcare.keyDiseases.join(', ')}</span>
                  </div>
                )}
              </div>
            )}

            {/* Film Metadata */}
            {itemWithMetadata.category === 'film' && itemWithMetadata.film && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-[11px]">
                <div>
                  <span className="text-[#9399b2] block mb-0.5">{isEn ? 'Director' : '导演'}</span>
                  <span className="text-white font-bold">{itemWithMetadata.film.director}</span>
                </div>
                <div>
                  <span className="text-[#9399b2] block mb-0.5">{isEn ? 'Production Studio' : '制片厂/出品方'}</span>
                  <span className="text-white font-bold">{itemWithMetadata.film.studio}</span>
                </div>
                <div>
                  <span className="text-[#9399b2] block mb-0.5">{isEn ? 'Release Year' : '上映年份'}</span>
                  <span className="text-white font-bold">{itemWithMetadata.film.releaseYear}</span>
                </div>
                {itemWithMetadata.film.cast && itemWithMetadata.film.cast.length > 0 && (
                  <div className="md:col-span-3">
                    <span className="text-[#9399b2] block mb-0.5">{isEn ? 'Key Cast' : '领衔主演'}</span>
                    <span className="text-white font-bold">{itemWithMetadata.film.cast.join(', ')}</span>
                  </div>
                )}
                {itemWithMetadata.film.shanghaiThemes && itemWithMetadata.film.shanghaiThemes.length > 0 && (
                  <div className="md:col-span-3">
                    <span className="text-[#9399b2] block mb-0.5">{isEn ? 'Shanghai Urban Themes Represented' : '影片呈现的上海城市主题'}</span>
                    <div className="flex flex-wrap gap-1.5 mt-1.5">
                      {itemWithMetadata.film.shanghaiThemes.map((theme: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 bg-[#f9e2af]/10 text-[#f9e2af] text-[9px] rounded border border-[#f9e2af]/20">
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Detailed Historical Essay / Content */}
          <div className="border-t-4 border-[#313244] pt-5">
            <h3 className="text-xs md:text-sm font-black text-white mb-4 flex items-center gap-2 uppercase tracking-wide">
              <BookOpen className="w-4 h-4 text-[#f9e2af]" />
              {isEn ? 'HISTORICAL RESEARCH ESSAY' : '历史叙事与学术探究'}
            </h3>
            <div className="bg-[#11111b] p-5 border-4 border-[#313244]">
              <MarkdownRenderer content={content} />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t-4 border-[#313244]">
            <span className="text-[10px] font-bold text-[#9399b2] uppercase tracking-wider mr-1">Tags:</span>
            {itemWithMetadata.tags.map((tag: string, idx: number) => (
              <span key={idx} className="px-2 py-0.5 bg-[#313244] text-[#cdd6f4] text-[9px] border border-[#45475a]">
                #{tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
