import React, { useState } from 'react';
import { decadeSummaries } from '../data/decadeSummaries';
import { searchItems } from '../data/db';
import { MapPin, Tag, Heart, Film, Calendar, BookOpen, Camera, Video, ArrowRight } from 'lucide-react';

interface TimelineViewProps {
  language: 'en' | 'zh';
  onSelectItem: (id: string) => void;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ language, onSelectItem }) => {
  const [selectedDecade, setSelectedDecade] = useState<number>(1990);
  const isEn = language === 'en';

  const activeSummary = decadeSummaries.find(s => s.decade === selectedDecade)!;
  
  // Get archive items for this decade
  const decadeItems = searchItems('', 'all', selectedDecade);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'urban_planning':
        return <MapPin className="w-4 h-4 text-[#a6e3a1]" />;
      case 'demographics':
        return <Tag className="w-4 h-4 text-[#89b4fa]" />;
      case 'healthcare':
        return <Heart className="w-4 h-4 text-[#f38ba8]" />;
      case 'film':
        return <Film className="w-4 h-4 text-[#f9e2af]" />;
      default:
        return null;
    }
  };

  const getCategoryColorClass = (category: string) => {
    switch (category) {
      case 'urban_planning':
        return 'border-[#a6e3a1]/40 bg-[#a6e3a1]/5 hover:border-[#a6e3a1]';
      case 'demographics':
        return 'border-[#89b4fa]/40 bg-[#89b4fa]/5 hover:border-[#89b4fa]';
      case 'healthcare':
        return 'border-[#f38ba8]/40 bg-[#f38ba8]/5 hover:border-[#f38ba8]';
      case 'film':
        return 'border-[#f9e2af]/40 bg-[#f9e2af]/5 hover:border-[#f9e2af]';
      default:
        return 'border-[#313244] bg-[#11111b]';
    }
  };

  const getItemTypeIcon = (type: string) => {
    switch (type) {
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
    <div className="space-y-10 py-4">
      
      {/* Decade Selector */}
      <div className="relative">
        <div className="relative z-10 flex flex-wrap justify-center gap-3 md:gap-4">
          {decadeSummaries.map((summary) => {
            const isActive = summary.decade === selectedDecade;
            return (
              <button
                key={summary.decade}
                onClick={() => setSelectedDecade(summary.decade)}
                className={`nes-btn text-xs font-bold ${isActive ? 'is-primary' : ''}`}
                style={{ minWidth: '110px' }}
              >
                <span className="block font-mono text-sm">{summary.decade}s</span>
                <span className="text-[9px] opacity-80 block truncate mt-0.5">
                  {isEn ? `${summary.decade}-${summary.decade + 9}` : `${summary.decade}年代`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Decade Overview Card */}
      <div className="nes-container is-dark with-title text-left space-y-6 shadow-[8px_8px_0px_0px_rgba(49,50,68,1)]">
        <p className="title text-xs font-bold font-mono text-[#f9e2af]">
          {isEn ? `${selectedDecade}s OVERVIEW` : `${selectedDecade}年代 历史概览`}
        </p>
        
        <div className="space-y-2">
          <h2 className="text-lg md:text-xl font-black text-[#f5c2e4] uppercase tracking-wider">
            {isEn ? activeSummary.titleEn : activeSummary.titleZh}
          </h2>
          <p className="text-[#cdd6f4] text-xs md:text-sm leading-relaxed max-w-5xl">
            {isEn ? activeSummary.overviewEn : activeSummary.overviewZh}
          </p>
        </div>

        {/* Cross-Disciplinary 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          
          {/* Urban Planning */}
          <div className="nes-container is-dark p-4 flex flex-col justify-between text-left border-emerald-500/30">
            <div className="space-y-2">
              <div className="flex items-center gap-2 border-b border-[#313244] pb-2">
                <MapPin className="w-4 h-4 text-[#a6e3a1]" />
                <h3 className="font-bold text-[#a6e3a1] text-xs uppercase">
                  {isEn ? 'Planning' : '城市规划'}
                </h3>
              </div>
              <p className="text-[#a6adc8] text-[11px] leading-relaxed">
                {isEn ? activeSummary.urbanPlanningEn : activeSummary.urbanPlanningZh}
              </p>
            </div>
          </div>

          {/* Demographics */}
          <div className="nes-container is-dark p-4 flex flex-col justify-between text-left border-blue-500/30">
            <div className="space-y-2">
              <div className="flex items-center gap-2 border-b border-[#313244] pb-2">
                <Tag className="w-4 h-4 text-[#89b4fa]" />
                <h3 className="font-bold text-[#89b4fa] text-xs uppercase">
                  {isEn ? 'Demography' : '人口变迁'}
                </h3>
              </div>
              <p className="text-[#a6adc8] text-[11px] leading-relaxed">
                {isEn ? activeSummary.demographicsEn : activeSummary.demographicsZh}
              </p>
            </div>
          </div>

          {/* Healthcare */}
          <div className="nes-container is-dark p-4 flex flex-col justify-between text-left border-rose-500/30">
            <div className="space-y-2">
              <div className="flex items-center gap-2 border-b border-[#313244] pb-2">
                <Heart className="w-4 h-4 text-[#f38ba8]" />
                <h3 className="font-bold text-[#f38ba8] text-xs uppercase">
                  {isEn ? 'Healthcare' : '医疗卫生'}
                </h3>
              </div>
              <p className="text-[#a6adc8] text-[11px] leading-relaxed">
                {isEn ? activeSummary.healthcareEn : activeSummary.healthcareZh}
              </p>
            </div>
          </div>

          {/* Film */}
          <div className="nes-container is-dark p-4 flex flex-col justify-between text-left border-yellow-500/30">
            <div className="space-y-2">
              <div className="flex items-center gap-2 border-b border-[#313244] pb-2">
                <Film className="w-4 h-4 text-[#f9e2af]" />
                <h3 className="font-bold text-[#f9e2af] text-xs uppercase">
                  {isEn ? 'Cinema' : '电影艺术'}
                </h3>
              </div>
              <p className="text-[#a6adc8] text-[11px] leading-relaxed">
                {isEn ? activeSummary.filmEn : activeSummary.filmZh}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Decade Specific Archive Items */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b-4 border-[#313244] pb-3">
          <h3 className="text-sm md:text-base font-black text-white flex items-center gap-2 uppercase tracking-wide">
            <Calendar className="w-5 h-5 text-[#f9e2af]" />
            {isEn ? `ARCHIVE CATALOG (${selectedDecade}s)` : `${selectedDecade}年代 精选历史档案`}
          </h3>
          <span className="text-[10px] font-mono text-[#a6adc8]">
            {isEn ? `[${decadeItems.length} ITEMS]` : `[共 ${decadeItems.length} 份档案]`}
          </span>
        </div>

        {decadeItems.length === 0 ? (
          <div className="nes-container is-dark text-center py-12 text-gray-500">
            {isEn ? 'No archive items for this decade yet.' : '该年代暂无精选档案。'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {decadeItems.map((item) => {
              const itemTitle = isEn ? item.titleEn : item.titleZh;
              const itemSummary = isEn ? item.summaryEn : item.summaryZh;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item.id)}
                  className={`flex flex-col md:flex-row rounded-none border-4 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.01] hover:shadow-[6px_6px_0px_0px_rgba(49,50,68,1)] ${getCategoryColorClass(
                    item.category
                  )}`}
                >
                  {/* Thumbnail */}
                  {item.thumbnailUrl && (
                    <div className="w-full md:w-36 h-36 shrink-0 overflow-hidden relative bg-[#11111b] border-b-4 md:border-b-0 md:border-r-4 border-[#11111b]">
                      <img
                        src={item.thumbnailUrl}
                        alt={itemTitle}
                        className="w-full h-full object-cover image-rendering-pixelated"
                      />
                      <div className="absolute inset-0 bg-black/10" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-4 flex flex-col justify-between flex-1 text-left space-y-3 bg-[#11111b]/80">
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center">
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
                          {getCategoryIcon(item.category)}
                          <span className="text-[#cdd6f4]">{item.category.replace('_', ' ')}</span>
                        </span>
                        <span className="text-[10px] font-mono text-[#f9e2af] font-bold">
                          {item.exactYear}
                        </span>
                      </div>
                      <h4 className="font-black text-white text-xs md:text-sm line-clamp-1 group-hover:text-[#f9e2af] transition-colors">
                        {itemTitle}
                      </h4>
                      <p className="text-[#a6adc8] text-[10px] md:text-[11px] line-clamp-2 leading-relaxed">
                        {itemSummary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#313244] text-[10px]">
                      <span className="inline-flex items-center gap-1 text-[#cba6f7] font-mono capitalize">
                        {getItemTypeIcon(item.itemType)}
                        {item.itemType.replace('_', ' ')}
                      </span>
                      <span className="text-[#f9e2af] font-black inline-flex items-center gap-1 hover:translate-x-1 transition-transform">
                        {isEn ? 'EXPLORE' : '深入探索'}
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
