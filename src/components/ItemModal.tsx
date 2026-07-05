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
        return <MapPin className="w-5 h-5 text-emerald-400" />;
      case 'demographics':
        return <Tag className="w-5 h-5 text-blue-400" />;
      case 'healthcare':
        return <Heart className="w-5 h-5 text-rose-400" />;
      case 'film':
        return <Film className="w-5 h-5 text-amber-400" />;
    }
  };

  // Get item type icon
  const getItemTypeIcon = () => {
    switch (itemWithMetadata.itemType) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'text':
      case 'research_paper':
        return <BookOpen className="w-4 h-4" />;
      case 'photograph':
        return <Camera className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-gray-900 border border-gray-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b border-gray-800 bg-gray-950/50">
          <div className="flex-1 pr-4">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full bg-gray-800 text-gray-300 border border-gray-700">
                {getCategoryIcon()}
                <span className="capitalize">{itemWithMetadata.category.replace('_', ' ')}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Calendar className="w-3.5 h-3.5" />
                {itemWithMetadata.exactYear}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 capitalize">
                {getItemTypeIcon()}
                {itemWithMetadata.itemType.replace('_', ' ')}
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{title}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">
          
          {/* Cover Image or Video Placeholder */}
          {itemWithMetadata.thumbnailUrl && (
            <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden border border-gray-800 shadow-inner">
              <img 
                src={itemWithMetadata.thumbnailUrl} 
                alt={title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <p className="text-gray-200 text-sm md:text-base italic max-w-2xl font-light">
                  "{summary}"
                </p>
              </div>
            </div>
          )}

          {/* Relationally Joined Metadata Box */}
          <div className="p-5 bg-gray-950/40 border border-gray-800/80 rounded-lg">
            <h4 className="text-sm font-semibold text-amber-500 uppercase tracking-wider mb-3">
              {isEn ? 'Archive Metadata & Relations' : '档案关联元数据'}
            </h4>
            
            {/* Urban Planning Metadata */}
            {itemWithMetadata.category === 'urban_planning' && itemWithMetadata.planning && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block mb-0.5">{isEn ? 'District' : '区域'}</span>
                  <span className="text-white font-medium">{itemWithMetadata.planning.district}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5">{isEn ? 'Planning Type' : '规划类型'}</span>
                  <span className="text-white font-medium capitalize">{itemWithMetadata.planning.planningType.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5">{isEn ? 'Coordinates' : '地理坐标'}</span>
                  <span className="text-white font-mono font-medium">
                    {itemWithMetadata.planning.latitude.toFixed(4)}°N, {itemWithMetadata.planning.longitude.toFixed(4)}°E
                  </span>
                </div>
                {itemWithMetadata.planning.keyFigures && itemWithMetadata.planning.keyFigures.length > 0 && (
                  <div className="md:col-span-3">
                    <span className="text-gray-500 block mb-0.5">{isEn ? 'Key Planners / Figures' : '关键规划者 / 历史人物'}</span>
                    <span className="text-white font-medium">{itemWithMetadata.planning.keyFigures.join(', ')}</span>
                  </div>
                )}
              </div>
            )}

            {/* Healthcare Metadata */}
            {itemWithMetadata.category === 'healthcare' && itemWithMetadata.healthcare && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block mb-0.5">{isEn ? 'Healthcare Era' : '医疗历史时期'}</span>
                  <span className="text-white font-medium capitalize">{itemWithMetadata.healthcare.eraType.replace('_', ' ')}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5">{isEn ? 'Life Expectancy (Shanghai)' : '上海人均预期寿命'}</span>
                  <span className="text-white font-medium">{itemWithMetadata.healthcare.lifeExpectancy ? `${itemWithMetadata.healthcare.lifeExpectancy} ${isEn ? 'years' : '岁'}` : 'N/A'}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5">{isEn ? 'Major Hospitals' : '主要医疗机构数量'}</span>
                  <span className="text-white font-medium">{itemWithMetadata.healthcare.hospitalCount || 'N/A'}</span>
                </div>
                {itemWithMetadata.healthcare.keyDiseases && itemWithMetadata.healthcare.keyDiseases.length > 0 && (
                  <div className="md:col-span-3">
                    <span className="text-gray-500 block mb-0.5">{isEn ? 'Key Health Challenges / Diseases' : '主要疾病与健康挑战'}</span>
                    <span className="text-white font-medium">{itemWithMetadata.healthcare.keyDiseases.join(', ')}</span>
                  </div>
                )}
              </div>
            )}

            {/* Film Metadata */}
            {itemWithMetadata.category === 'film' && itemWithMetadata.film && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-500 block mb-0.5">{isEn ? 'Director' : '导演'}</span>
                  <span className="text-white font-medium">{itemWithMetadata.film.director}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5">{isEn ? 'Production Studio' : '制片厂/出品方'}</span>
                  <span className="text-white font-medium">{itemWithMetadata.film.studio}</span>
                </div>
                <div>
                  <span className="text-gray-500 block mb-0.5">{isEn ? 'Release Year' : '上映年份'}</span>
                  <span className="text-white font-medium">{itemWithMetadata.film.releaseYear}</span>
                </div>
                {itemWithMetadata.film.cast && itemWithMetadata.film.cast.length > 0 && (
                  <div className="md:col-span-3">
                    <span className="text-gray-500 block mb-0.5">{isEn ? 'Key Cast' : '领衔主演'}</span>
                    <span className="text-white font-medium">{itemWithMetadata.film.cast.join(', ')}</span>
                  </div>
                )}
                {itemWithMetadata.film.shanghaiThemes && itemWithMetadata.film.shanghaiThemes.length > 0 && (
                  <div className="md:col-span-3">
                    <span className="text-gray-500 block mb-0.5">{isEn ? 'Shanghai Urban Themes Represented' : '影片呈现的上海城市主题'}</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {itemWithMetadata.film.shanghaiThemes.map((theme: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 bg-amber-500/10 text-amber-400 text-xs rounded border border-amber-500/20">
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
          <div className="border-t border-gray-800 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              {isEn ? 'Historical Narrative & Research' : '历史叙事与学术探究'}
            </h3>
            <div className="bg-gray-950/20 p-6 rounded-lg border border-gray-800/50">
              <MarkdownRenderer content={content} />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-gray-800">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider mr-1">Tags:</span>
            {itemWithMetadata.tags.map((tag: string, idx: number) => (
              <span key={idx} className="px-2.5 py-1 bg-gray-800 text-gray-300 text-xs rounded-md border border-gray-700">
                #{tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};
