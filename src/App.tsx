import { useState } from 'react';
import { AtlasView } from './components/AtlasView';
import { IndexView } from './components/IndexView';
import { MapExploreView } from './components/MapExploreView';
import { RecordPanel } from './components/RecordPanel';
import { GENRE_ORDER, type ArchiveFilters, type LanguageType } from './data/types';
import { Compass, Map, Library, MapPinned, Languages, Globe } from 'lucide-react';

type TabType = 'atlas' | 'index' | 'map';

const DEFAULT_FILTERS: ArchiveFilters = {
  genres: [...GENRE_ORDER],
  decade: 'all',
  district: null,
  query: '',
};

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('atlas');
  const [language, setLanguage] = useState<LanguageType>('zh');
  const [filters, setFilters] = useState<ArchiveFilters>(DEFAULT_FILTERS);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [mapFocusId, setMapFocusId] = useState<string | null>(null);

  const isEn = language === 'en';

  const openRecord = (id: string) => setSelectedItemId(id);

  const jumpToMap = (id: string) => {
    setMapFocusId(id);
    setActiveTab('map');
    setSelectedItemId(null);
  };

  const tabs: { id: TabType; labelEn: string; labelZh: string; icon: typeof Map }[] = [
    { id: 'atlas', labelEn: 'Atlas', labelZh: '图志', icon: Map },
    { id: 'index', labelEn: 'Index', labelZh: '索引', icon: Library },
    { id: 'map', labelEn: 'Geo Map', labelZh: '地理图', icon: MapPinned },
  ];

  return (
    <div className="min-h-screen bg-[#0c0d14] text-[#e2e8f0] flex flex-col crt-monitor selection:bg-[#f5c2e4] selection:text-[#11111b]">
      <div className="scanlines" />

      <header className="sticky top-0 z-40 bg-[#0c0d14]/95 border-b-4 border-[#313244] px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="flex items-center gap-3 text-left">
            <div className="w-11 h-11 shrink-0 bg-[#f9e2af] border-4 border-[#11111b] flex items-center justify-center text-[#11111b]">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base md:text-xl font-black text-[#f5c2e4] tracking-wider m-0 uppercase">
                {isEn ? 'SHANGHAI PIXEL ARCHIVE' : '上海像素档案馆'}
              </h1>
              <p className="text-[9px] md:text-[10px] text-[#a6adc8] font-mono mt-0.5 tracking-widest m-0">
                {isEn
                  ? 'PLACE → EVENT → CONTENT → SOURCE'
                  : '地点 → 事件 → 内容 → 来源'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setLanguage((prev) => (prev === 'en' ? 'zh' : 'en'))}
              className="nes-btn is-warning text-xs font-bold flex items-center gap-1.5"
            >
              <Languages className="w-3.5 h-3.5" />
              <span>{isEn ? '中文' : 'EN'}</span>
            </button>
            <a
              href="https://github.com/JHQZhu0731/Shanghai_Public_History_Project-"
              target="_blank"
              rel="noopener noreferrer"
              className="nes-btn text-xs p-1"
              title="GitHub"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Six genre gates as primary structure — no hero banner */}
      <div className="bg-[#11111b] border-b-4 border-[#313244] px-4 md:px-8 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-x-3 gap-y-1 text-[9px] font-mono text-[#585b70]">
          <span className="text-[#cba6f7]">Music</span>
          <span className="text-[#f38ba8]">Movie</span>
          <span className="text-[#a6e3a1]">Sports</span>
          <span className="text-[#fab387]">Food</span>
          <span className="text-[#89b4fa]">Social Study</span>
          <span className="text-[#94e2d5]">Public Health</span>
          <span className="text-[#45475a] hidden sm:inline">·</span>
          <span className="text-[#a6adc8] hidden sm:inline">
            {isEn
              ? 'Six city-culture data gates · pixel atlas as narrative spine'
              : '六大城市文化数据入口 · 像素图志为叙事骨架'}
          </span>
        </div>
      </div>

      <nav className="bg-[#0c0d14] border-b-4 border-[#313244] px-4 md:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex gap-2 md:gap-3 py-2.5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const on = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`nes-btn text-xs font-bold ${on ? 'is-primary' : ''}`}
              >
                <span className="flex items-center gap-1.5">
                  <Icon className="w-3.5 h-3.5" />
                  {isEn ? tab.labelEn : tab.labelZh}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 md:px-8 py-6">
        {activeTab === 'atlas' && (
          <AtlasView
            language={language}
            filters={filters}
            onFiltersChange={setFilters}
            onSelectItem={openRecord}
            focusCardId={mapFocusId}
          />
        )}
        {activeTab === 'index' && (
          <IndexView
            language={language}
            filters={filters}
            onFiltersChange={setFilters}
            onSelectItem={openRecord}
          />
        )}
        {activeTab === 'map' && (
          <MapExploreView
            language={language}
            filters={filters}
            onFiltersChange={setFilters}
            onSelectItem={openRecord}
            focusCardId={mapFocusId}
          />
        )}
      </main>

      <footer className="bg-[#11111b] border-t-4 border-[#313244] py-6 px-4 md:px-8 text-center text-[10px] text-[#a6adc8] font-mono">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="m-0">
            © {new Date().getFullYear()}{' '}
            {isEn ? 'SHANGHAI PIXEL ARCHIVE' : '上海像素档案馆'}
            {' · '}
            {isEn ? 'Explorable · Searchable · Traceable' : '可探索 · 可检索 · 可追溯'}
          </p>
          <p className="flex items-center gap-2 m-0">
            <Globe className="w-3.5 h-3.5 text-[#f5c2e4]" />
            <span>JEREMY ZHU</span>
          </p>
        </div>
      </footer>

      {selectedItemId && (
        <RecordPanel
          itemId={selectedItemId}
          language={language}
          onClose={() => setSelectedItemId(null)}
          onSelectRelated={openRecord}
          onJumpToMap={jumpToMap}
        />
      )}
    </div>
  );
}

export default App;
