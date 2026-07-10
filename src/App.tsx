import { useState } from 'react';
import { CollectionView } from './components/CollectionView';
import { MapExploreView } from './components/MapExploreView';
import { CardDetailModal } from './components/CardDetailModal';
import heroBanner from './assets/pixel-scenes/hero-banner-shanghai.webp';
import { Library, MapPin, Globe, Compass, Languages } from 'lucide-react';

type TabType = 'collection' | 'map';
type LanguageType = 'en' | 'zh';

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('collection');
  const [language, setLanguage] = useState<LanguageType>('zh');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const isEn = language === 'en';

  return (
    <div className="min-h-screen bg-[#0c0d14] text-[#e2e8f0] flex flex-col crt-monitor selection:bg-[#f5c2e4] selection:text-[#11111b]">
      <div className="scanlines" />

      <header className="sticky top-0 z-40 bg-[#0c0d14]/95 border-b-4 border-[#313244] px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 shrink-0 bg-[#f9e2af] border-4 border-[#11111b] flex items-center justify-center text-[#11111b] shadow-[4px_4px_0px_0px_rgba(49,50,68,1)]">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg md:text-2xl font-black text-[#f5c2e4] tracking-wider m-0 uppercase">
                {isEn ? 'SHANGHAI PIXEL ARCHIVE' : '上海像素档案馆'}
              </h1>
              <p className="text-[10px] md:text-xs text-[#a6adc8] font-mono mt-1 tracking-widest">
                {isEn
                  ? 'MUSIC · MOVIE · SPORTS · FOOD · SOCIAL STUDY · PUBLIC HEALTH'
                  : '音乐 · 电影 · 体育 · 美食 · 社会研究 · 公共卫生'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3">
            <button
              type="button"
              onClick={() => setLanguage((prev) => (prev === 'en' ? 'zh' : 'en'))}
              className="nes-btn is-warning text-xs font-bold flex items-center gap-1.5"
            >
              <Languages className="w-4 h-4" />
              <span>{isEn ? '中文' : 'English'}</span>
            </button>

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

      <div className="relative w-full h-36 md:h-52 overflow-hidden border-b-4 border-[#313244] shrink-0">
        <img
          src={heroBanner}
          alt="Shanghai Pixel Art Skyline"
          className="w-full h-full object-cover"
          style={{ imageRendering: 'pixelated' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0d14] via-[#0c0d14]/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 gap-1">
          <h2 className="text-xs md:text-lg font-black text-white uppercase tracking-widest [text-shadow:3px_3px_0px_rgba(0,0,0,0.85)]">
            {isEn ? 'Collectible cards · Landmark map · Pixel stories' : '可收集卡片 · 地标地图 · 像素故事'}
          </h2>
          <p className="text-[9px] md:text-xs text-[#f9e2af] font-mono tracking-widest [text-shadow:2px_2px_0px_rgba(0,0,0,0.85)]">
            {isEn ? 'An easy-to-browse Shanghai archive' : '轻量可读的上海数字档案'}
          </p>
        </div>
      </div>

      <nav className="bg-[#11111b] border-b-4 border-[#313244] px-4 md:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-3 md:gap-6 py-3">
          <button
            type="button"
            onClick={() => setActiveTab('collection')}
            className={`nes-btn text-xs font-bold ${activeTab === 'collection' ? 'is-primary' : ''}`}
          >
            <span className="flex items-center gap-1.5">
              <Library className="w-4 h-4" />
              {isEn ? 'Collection' : '馆藏卡片'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('map')}
            className={`nes-btn text-xs font-bold ${activeTab === 'map' ? 'is-success' : ''}`}
          >
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              {isEn ? 'Landmark Map' : '地标地图'}
            </span>
          </button>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-8">
        {activeTab === 'collection' && (
          <CollectionView language={language} onSelectItem={setSelectedItemId} />
        )}
        {activeTab === 'map' && (
          <MapExploreView language={language} onSelectItem={setSelectedItemId} />
        )}
      </main>

      <footer className="bg-[#11111b] border-t-4 border-[#313244] py-8 px-4 md:px-8 text-center text-xs text-[#a6adc8] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()}{' '}
            {isEn ? 'SHANGHAI PIXEL ARCHIVE' : '上海像素档案馆'}.
          </p>
          <p className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#f5c2e4]" />
            <span>{isEn ? 'DESIGNED BY JEREMY ZHU' : '设计与开发：JEREMY ZHU'}</span>
          </p>
        </div>
      </footer>

      {selectedItemId && (
        <CardDetailModal
          itemId={selectedItemId}
          language={language}
          onClose={() => setSelectedItemId(null)}
        />
      )}
    </div>
  );
}

export default App;
