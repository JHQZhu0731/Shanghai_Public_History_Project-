import React, { useState } from 'react';
import { getJoinedFilmItems } from '../data/db';
import { Film, Play, Calendar, User, Clapperboard, Tag, Search, ArrowRight } from 'lucide-react';

interface FilmArchiveProps {
  language: 'en' | 'zh';
  onSelectItem: (id: string) => void;
}

export const FilmArchive: React.FC<FilmArchiveProps> = ({ language, onSelectItem }) => {
  const isEn = language === 'en';
  const filmItems = getJoinedFilmItems();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedDecade] = useState<string>('all');

  // Extract all unique themes across films
  const allThemes = Array.from(
    new Set(filmItems.flatMap(item => item.film.shanghaiThemes))
  );

  // Filter films based on search query and selected theme
  const filteredFilms = filmItems.filter(item => {
    const matchesSearch = 
      item.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.titleZh.includes(searchQuery) ||
      item.film.director.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.film.studio.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTheme = 
      selectedTheme === 'all' || 
      item.film.shanghaiThemes.includes(selectedTheme);

    return matchesSearch && matchesTheme;
  });

  return (
    <div className="space-y-8 py-4 text-left">
      
      {/* Intro Header */}
      <div className="nes-container is-dark with-title shadow-[8px_8px_0px_0px_rgba(49,50,68,1)]">
        <p className="title text-xs font-bold font-mono text-[#f9e2af]">
          {isEn ? 'CINEMATIC SHANGHAI' : '光影上海'}
        </p>
        <div className="space-y-3">
          <h2 className="text-lg md:text-xl font-black text-[#f5c2e4] uppercase tracking-wider flex items-center gap-2.5">
            <Film className="w-5 h-5 text-[#f9e2af]" />
            {isEn ? 'Film & Urban History Gallery' : '电影与城市历史画廊'}
          </h2>
          <p className="text-[#cdd6f4] text-xs md:text-sm leading-relaxed">
            {isEn 
              ? 'Cinema is a mirror to Shanghai\'s soul. Through the lens of legendary directors and independent filmmakers, explore how Shanghai\'s physical transformation, social stratification, and cultural identity have been captured on screen from the post-Cultural Revolution era of the 1980s to the roaring stock market booms of the 1990s and the modern digital renaissance.'
              : '电影是上海城市灵魂的一面镜子。通过传奇导演与独立电影人的镜头，探索从20世纪80年代文革后的反思，到90年代狂飙的股票热潮，再到现代数字时代的文化复兴，上海的物理空间变迁、社会分层与文化认同是如何被定格在银幕之上的。'}
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-[#11111b] border-4 border-[#313244] p-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder={isEn ? "Search films, directors..." : "搜索电影、导演、制片厂..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#0c0d14] border-4 border-[#313244] text-xs text-gray-300 placeholder-gray-500 focus:outline-none focus:border-[#f9e2af] transition-colors"
          />
        </div>

        {/* Theme Filter */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-[10px] font-mono text-[#a6adc8] shrink-0">
            {isEn ? 'THEME:' : '主题:'}
          </span>
          <select
            value={selectedTheme}
            onChange={(e) => setSelectedDecade(e.target.value)}
            className="w-full md:w-48 px-3 py-1.5 bg-[#0c0d14] border-4 border-[#313244] text-[10px] text-gray-300 focus:outline-none focus:border-[#f9e2af] transition-colors"
          >
            <option value="all">{isEn ? 'All Themes' : '所有主题'}</option>
            {allThemes.map((theme, idx) => (
              <option key={idx} value={theme}>{theme}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Films Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {filteredFilms.length === 0 ? (
          <div className="col-span-full nes-container is-dark text-center py-16 text-gray-500">
            {isEn ? 'No films match your search filters.' : '没有找到符合筛选条件的电影。'}
          </div>
        ) : (
          filteredFilms.map((item) => {
            const title = isEn ? item.titleEn : item.titleZh;
            const summary = isEn ? item.summaryEn : item.summaryZh;
            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className="group bg-[#11111b] border-4 border-[#313244] overflow-hidden cursor-pointer hover:border-[#f9e2af] hover:shadow-[6px_6px_0px_0px_rgba(49,50,68,1)] transition-all duration-300 flex flex-col h-full"
              >
                {/* Poster Image / Video Thumbnail */}
                <div className="relative h-52 overflow-hidden bg-black shrink-0 border-b-4 border-[#313244]">
                  <img
                    src={item.thumbnailUrl}
                    alt={title}
                    className="w-full h-full object-cover image-rendering-pixelated transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 rounded-none bg-[#f9e2af] border-4 border-[#11111b] flex items-center justify-center text-gray-950 shadow-md scale-90 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-current ml-1" />
                    </div>
                  </div>

                  {/* Year Tag */}
                  <span className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold bg-[#f9e2af] text-gray-950 border-2 border-[#11111b] shadow-md">
                    <Calendar className="w-3.5 h-3.5" />
                    {item.film.releaseYear}
                  </span>
                </div>

                {/* Info Content */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="font-black text-sm text-white group-hover:text-[#f9e2af] transition-colors line-clamp-1">
                      {title}
                    </h3>
                    <p className="text-[#a6adc8] text-[10px] md:text-[11px] line-clamp-3 leading-relaxed">
                      {summary}
                    </p>
                  </div>

                  {/* Metadata List */}
                  <div className="space-y-2 pt-3 border-t border-[#313244] text-[10px] text-[#a6adc8]">
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-[#f9e2af]" />
                      <span className="text-[#9399b2]">{isEn ? 'Director:' : '导演:'}</span>
                      <span className="text-[#cdd6f4] font-bold">{item.film.director}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clapperboard className="w-3.5 h-3.5 text-[#f9e2af]" />
                      <span className="text-[#9399b2]">{isEn ? 'Studio:' : '出品方:'}</span>
                      <span className="text-[#cdd6f4] font-bold line-clamp-1">{item.film.studio}</span>
                    </div>
                    <div className="flex items-start gap-2 pt-1">
                      <Tag className="w-3.5 h-3.5 text-[#f9e2af] mt-0.5" />
                      <div className="flex flex-wrap gap-1">
                        {item.film.shanghaiThemes.slice(0, 3).map((theme: string, idx: number) => (
                          <span key={idx} className="px-1.5 py-0.5 bg-[#313244] text-[#cdd6f4] text-[9px] rounded">
                            {theme}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Footer */}
                  <div className="pt-3 border-t border-[#313244] flex items-center justify-between text-[10px]">
                    <span className="text-[#9399b2] font-mono">
                      {item.decade}s {isEn ? 'Cinema' : '年代电影'}
                    </span>
                    <span className="text-[#f9e2af] font-black flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      {isEn ? 'READ ESSAY' : '阅读学术分析'}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
