import { useState } from 'react';
import { TimelineView } from './components/TimelineView';
import { MapView } from './components/MapView';
import { DataDashboard } from './components/DataDashboard';
import { FilmArchive } from './components/FilmArchive';
import { ItemModal } from './components/ItemModal';
import { 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Film, 
  Globe, 
  Compass,
  Languages
} from 'lucide-react';

type TabType = 'timeline' | 'map' | 'dashboard' | 'film';
type LanguageType = 'en' | 'zh';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('timeline');
  const [language, setLanguage] = useState<LanguageType>('zh'); // Default to Chinese for local context
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const isEn = language === 'en';

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'zh' : 'en'));
  };

  return (
    <div className="min-h-screen bg-[#0c0d14] text-[#e2e8f0] flex flex-col crt-monitor selection:bg-[#f5c2e4] selection:text-[#11111b]">
      
      {/* Scanline overlay for CRT monitor retro feel */}
      <div className="scanlines" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#0c0d14]/90 border-b-4 border-[#313244] px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 shrink-0 bg-[#f9e2af] border-4 border-[#11111b] flex items-center justify-center text-[#11111b] shadow-[4px_4px_0px_0px_rgba(49,50,68,1)]">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-black text-[#f5c2e4] tracking-wider m-0 uppercase">
                {isEn ? 'SHANGHAI PIXEL ARCHIVE' : '上海像素历史档案馆'}
              </h1>
              <p className="text-[10px] md:text-xs text-[#a6adc8] font-mono mt-1 tracking-widest">
                {isEn ? 'URBAN PLANNING • POPULATION • HEALTHCARE • CINEMA' : '城市规划 • 人口变迁 • 医疗卫生 • 电影艺术 (1970-2026)'}
              </p>
            </div>
          </div>

          {/* Controls & Nav */}
          <div className="flex items-center justify-between md:justify-end gap-3">
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="nes-btn is-warning text-xs font-bold flex items-center gap-1.5"
            >
              <Languages className="w-4 h-4" />
              <span>{isEn ? '中文' : 'English'}</span>
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/JHQZhu0731/Shanghai_Public_History_Project-"
              target="_blank"
              rel="noopener noreferrer"
              className="nes-btn text-xs p-1"
              title="View GitHub Repository"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>

        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-[#11111b] border-b-4 border-[#313244] px-4 md:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-3 md:gap-6 py-3">
          
          {/* Timeline Tab */}
          <button
            onClick={() => setActiveTab('timeline')}
            className={`nes-btn text-xs font-bold ${activeTab === 'timeline' ? 'is-primary' : ''}`}
          >
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {isEn ? 'Timeline' : '年代纪'}
            </span>
          </button>

          {/* Map Tab */}
          <button
            onClick={() => setActiveTab('map')}
            className={`nes-btn text-xs font-bold ${activeTab === 'map' ? 'is-success' : ''}`}
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {isEn ? 'Pixel Map' : '像素地图'}
            </span>
          </button>

          {/* Dashboard Tab */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`nes-btn text-xs font-bold ${activeTab === 'dashboard' ? 'is-error' : ''}`}
          >
            <span className="flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4" />
              {isEn ? 'Stats' : '数据面板'}
            </span>
          </button>

          {/* Film Tab */}
          <button
            onClick={() => setActiveTab('film')}
            className={`nes-btn text-xs font-bold ${activeTab === 'film' ? 'is-warning' : ''}`}
          >
            <span className="flex items-center gap-1.5">
              <Film className="w-4 h-4" />
              {isEn ? 'Cinema' : '光影画廊'}
            </span>
          </button>

        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        
        {/* Render Active View */}
        {activeTab === 'timeline' && (
          <TimelineView 
            language={language} 
            onSelectItem={setSelectedItemId} 
          />
        )}

        {activeTab === 'map' && (
          <MapView 
            language={language} 
            onSelectItem={setSelectedItemId} 
          />
        )}

        {activeTab === 'dashboard' && (
          <DataDashboard 
            language={language} 
            onSelectItem={setSelectedItemId} 
          />
        )}

        {activeTab === 'film' && (
          <FilmArchive 
            language={language} 
            onSelectItem={setSelectedItemId} 
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-[#11111b] border-t-4 border-[#313244] py-8 px-4 md:px-8 text-center text-xs text-[#a6adc8] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} {isEn ? 'SHANGHAI PIXEL HISTORY ARCHIVE' : '上海像素历史数字档案馆'}.
          </p>
          <p className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#f5c2e4]" />
            <span>{isEn ? 'DESIGNED BY JEREMY ZHU' : '设计与开发：JEREMY ZHU'}</span>
          </p>
        </div>
      </footer>

      {/* Detail Modal */}
      {selectedItemId && (
        <ItemModal
          itemId={selectedItemId}
          language={language}
          onClose={() => setSelectedItemId(null)}
        />
      )}

    </div>
  );
}

export default App;
