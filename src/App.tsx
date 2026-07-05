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
  const [language, setLanguage] = useState<LanguageType>('zh'); // Default to Chinese for local context, easily toggleable
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const isEn = language === 'en';

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'zh' : 'en'));
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col font-sans selection:bg-amber-500 selection:text-gray-950">
      
      {/* Header */}
      <header className="sticky top-0 z-40 bg-gray-950/80 backdrop-blur-md border-b border-gray-900 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3 text-left">
            <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-gray-950 shadow-md shadow-amber-500/10">
              <Compass className="w-6 h-6 animate-spin-slow" />
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white tracking-tight leading-tight m-0">
                {isEn ? 'Shanghai Public History Archive' : '上海公共历史数字档案馆'}
              </h1>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                {isEn ? 'Urban Evolution, Demographics, Healthcare & Film (1970-Today)' : '城市规划、人口变迁、医疗卫生与电影艺术 (1970-至今)'}
              </p>
            </div>
          </div>

          {/* Controls & Nav */}
          <div className="flex items-center justify-between md:justify-end gap-4">
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg text-xs font-semibold text-amber-400 hover:text-amber-300 transition-all duration-300"
            >
              <Languages className="w-4 h-4" />
              <span>{isEn ? '中文' : 'English'}</span>
            </button>

            {/* GitHub Link */}
            <a
              href="https://github.com/JHQZhu0731/Shanghai_Public_History_Project-"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-900 hover:bg-gray-800 border border-gray-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              title="View GitHub Repository"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>

        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-gray-950 border-b border-gray-900 px-4 md:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-2 md:gap-4 py-2">
          
          {/* Timeline Tab */}
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 shrink-0 ${
              activeTab === 'timeline'
                ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/10'
                : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
            }`}
          >
            <Calendar className="w-4 h-4" />
            {isEn ? 'Decadal Timeline' : '年代纪事轴'}
          </button>

          {/* Map Tab */}
          <button
            onClick={() => setActiveTab('map')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 shrink-0 ${
              activeTab === 'map'
                ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/10'
                : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
            }`}
          >
            <MapPin className="w-4 h-4" />
            {isEn ? 'Interactive Map' : '城市规划地图'}
          </button>

          {/* Dashboard Tab */}
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 shrink-0 ${
              activeTab === 'dashboard'
                ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/10'
                : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            {isEn ? 'Data Dashboard' : '社会卫生数据'}
          </button>

          {/* Film Tab */}
          <button
            onClick={() => setActiveTab('film')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 shrink-0 ${
              activeTab === 'film'
                ? 'bg-amber-500 text-gray-950 shadow-lg shadow-amber-500/10'
                : 'text-gray-400 hover:text-white hover:bg-gray-900/50'
            }`}
          >
            <Film className="w-4 h-4" />
            {isEn ? 'Cinematic Shanghai' : '光影历史画廊'}
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
      <footer className="bg-gray-950 border-t border-gray-900 py-8 px-4 md:px-8 text-center text-xs text-gray-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} {isEn ? 'Shanghai Public History Project' : '上海公共历史数字档案馆'}. {isEn ? 'All Rights Reserved.' : '保留所有权利。'}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>{isEn ? 'Designed by Jeremy Zhu' : '设计与开发：Jeremy Zhu'}</span>
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
