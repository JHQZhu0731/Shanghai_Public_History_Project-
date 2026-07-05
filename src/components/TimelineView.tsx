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
        return <MapPin className="w-5 h-5 text-emerald-400" />;
      case 'demographics':
        return <Tag className="w-5 h-5 text-blue-400" />;
      case 'healthcare':
        return <Heart className="w-5 h-5 text-rose-400" />;
      case 'film':
        return <Film className="w-5 h-5 text-amber-400" />;
      default:
        return null;
    }
  };

  const getCategoryColorClass = (category: string) => {
    switch (category) {
      case 'urban_planning':
        return 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40';
      case 'demographics':
        return 'border-blue-500/20 bg-blue-500/5 hover:border-blue-500/40';
      case 'healthcare':
        return 'border-rose-500/20 bg-rose-500/5 hover:border-rose-500/40';
      case 'film':
        return 'border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40';
      default:
        return 'border-gray-800 bg-gray-900/50';
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
        {/* Timeline Line */}
        <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-gray-800 -translate-y-1/2 z-0 hidden md:block" />
        
        <div className="relative z-10 flex flex-wrap md:flex-nowrap justify-between gap-4 md:gap-2">
          {decadeSummaries.map((summary) => {
            const isActive = summary.decade === selectedDecade;
            return (
              <button
                key={summary.decade}
                onClick={() => setSelectedDecade(summary.decade)}
                className={`flex-1 min-w-[100px] py-4 px-3 rounded-xl border text-center transition-all duration-300 ${
                  isActive
                    ? 'bg-amber-500 text-gray-950 border-amber-400 font-bold shadow-lg shadow-amber-500/20 scale-105'
                    : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-700 hover:text-white'
                }`}
              >
                <span className="block text-lg md:text-xl font-mono">{summary.decade}s</span>
                <span className="text-xs opacity-80 block truncate mt-0.5">
                  {isEn ? `${summary.decade}-${summary.decade + 9}` : `${summary.decade}年代`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Decade Overview Card */}
      <div className="bg-gray-900/40 border border-gray-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="space-y-2">
          <span className="text-xs font-bold text-amber-500 uppercase tracking-widest font-mono">
            {isEn ? 'Historical Era Overview' : '历史时期概览'}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            {isEn ? activeSummary.titleEn : activeSummary.titleZh}
          </h2>
          <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-4xl text-left">
            {isEn ? activeSummary.overviewEn : activeSummary.overviewZh}
          </p>
        </div>

        {/* Cross-Disciplinary 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
          
          {/* Urban Planning */}
          <div className="p-5 bg-gray-950/40 border border-emerald-500/10 rounded-xl space-y-3 flex flex-col justify-between text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <h3 className="font-semibold text-emerald-100 text-base">
                  {isEn ? 'Urban Planning' : '城市规划'}
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {isEn ? activeSummary.urbanPlanningEn : activeSummary.urbanPlanningZh}
              </p>
            </div>
          </div>

          {/* Demographics */}
          <div className="p-5 bg-gray-950/40 border border-blue-500/10 rounded-xl space-y-3 flex flex-col justify-between text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-blue-400" />
                <h3 className="font-semibold text-blue-100 text-base">
                  {isEn ? 'Demographics' : '人口变迁'}
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {isEn ? activeSummary.demographicsEn : activeSummary.demographicsZh}
              </p>
            </div>
          </div>

          {/* Healthcare */}
          <div className="p-5 bg-gray-950/40 border border-rose-500/10 rounded-xl space-y-3 flex flex-col justify-between text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400" />
                <h3 className="font-semibold text-rose-100 text-base">
                  {isEn ? 'Healthcare' : '医疗卫生'}
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {isEn ? activeSummary.healthcareEn : activeSummary.healthcareZh}
              </p>
            </div>
          </div>

          {/* Film */}
          <div className="p-5 bg-gray-950/40 border border-amber-500/10 rounded-xl space-y-3 flex flex-col justify-between text-left">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-amber-400" />
                <h3 className="font-semibold text-amber-100 text-base">
                  {isEn ? 'Film & Cinema' : '电影艺术'}
                </h3>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {isEn ? activeSummary.filmEn : activeSummary.filmZh}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Decade Specific Archive Items */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-gray-800 pb-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5.5 h-5.5 text-amber-500" />
            {isEn ? `Curated Archive Catalog (${selectedDecade}s)` : `${selectedDecade}年代精选历史档案`}
          </h3>
          <span className="text-xs font-mono text-gray-500">
            {isEn ? `${decadeItems.length} items found` : `共找到 ${decadeItems.length} 份档案`}
          </span>
        </div>

        {decadeItems.length === 0 ? (
          <div className="text-center py-12 bg-gray-900/20 border border-gray-800 rounded-xl text-gray-500">
            {isEn ? 'No archive items for this decade yet.' : '该年代暂无精选档案。'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {decadeItems.map((item) => {
              const itemTitle = isEn ? item.titleEn : item.titleZh;
              const itemSummary = isEn ? item.summaryEn : item.summaryZh;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item.id)}
                  className={`group flex flex-col md:flex-row rounded-xl border overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${getCategoryColorClass(
                    item.category
                  )}`}
                >
                  {/* Thumbnail */}
                  {item.thumbnailUrl && (
                    <div className="w-full md:w-40 h-40 shrink-0 overflow-hidden relative bg-gray-950">
                      <img
                        src={item.thumbnailUrl}
                        alt={itemTitle}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>
                  )}

                  {/* Info */}
                  <div className="p-5 flex flex-col justify-between flex-1 text-left space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-gray-400 capitalize">
                          {getCategoryIcon(item.category)}
                          {item.category.replace('_', ' ')}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-mono text-amber-500">
                          {item.exactYear}
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-base md:text-lg group-hover:text-amber-400 transition-colors line-clamp-1">
                        {itemTitle}
                      </h4>
                      <p className="text-gray-400 text-xs md:text-sm line-clamp-2 leading-relaxed">
                        {itemSummary}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-800/40">
                      <span className="inline-flex items-center gap-1 text-xs text-purple-400 font-mono capitalize">
                        {getItemTypeIcon(item.itemType)}
                        {item.itemType.replace('_', ' ')}
                      </span>
                      <span className="text-xs text-amber-500 font-semibold inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        {isEn ? 'Explore' : '深入探索'}
                        <ArrowRight className="w-3.5 h-3.5" />
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
