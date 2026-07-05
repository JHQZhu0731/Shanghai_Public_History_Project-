import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { getJoinedUrbanPlanningItems } from '../data/db';
import type { JoinedUrbanPlanningItem } from '../data/types';
import { Calendar, Navigation, Info, ZoomIn, Eye } from 'lucide-react';

// Fix Leaflet default icon issues by creating custom SVG DivIcons
const createCustomIcon = (isActive: boolean) => {
  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        <span class="absolute inline-flex h-6 w-6 rounded-full bg-emerald-400/30 ${isActive ? 'animate-ping' : ''}"></span>
        <div class="relative rounded-full h-4.5 w-4.5 bg-emerald-500 border-2 border-white flex items-center justify-center shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="w-2.5 h-2.5 text-white">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      </div>
    `,
    className: 'custom-marker-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12]
  });
};

// Helper component to handle map flyTo animations
interface MapControllerProps {
  center: [number, number];
  zoom: number;
}

const MapController: React.FC<MapControllerProps> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5,
      easeLinearity: 0.25
    });
  }, [center, zoom, map]);
  return null;
};

interface MapViewProps {
  language: 'en' | 'zh';
  onSelectItem: (id: string) => void;
}

export const MapView: React.FC<MapViewProps> = ({ language, onSelectItem }) => {
  const isEn = language === 'en';
  const [selectedDecade, setSelectedDecade] = useState<number>(1990);
  const [activeItem, setActiveItem] = useState<JoinedUrbanPlanningItem | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number]>([31.2304, 121.4737]); // People's Square
  const [mapZoom, setMapZoom] = useState<number>(11);

  const planningItems = getJoinedUrbanPlanningItems();
  
  // Filter items by selected decade or earlier to show the "cumulative" growth of the city
  const visibleItems = planningItems.filter(item => item.decade <= selectedDecade);

  // Historical descriptions of Shanghai's urban growth by decade
  const mapDecadeOverlays = {
    1970: {
      titleEn: '1970s: The Horizontal, River-Bound City',
      titleZh: '1970年代：横向延展与大江阻隔的城市',
      descEn: 'Shanghai was concentrated entirely in Puxi. Pudong was mostly farmland and shipyards. There were no bridges across the Huangpu River in central Shanghai; residents relied entirely on crowded ferries to cross.',
      descZh: '上海市区完全集中在浦西，浦东主要是农田和船厂。当时中心城区没有跨越黄浦江的大桥，两岸往来完全依赖拥挤的轮渡。'
    },
    1980: {
      titleEn: '1980s: Dawn of Expansion',
      titleZh: '1980年代：城市扩张的曙光',
      descEn: 'The city began expanding outward. The first plans for Pudong development were drafted. Overcrowding in Puxi prompted the construction of the first modern suburban residential quarters.',
      descZh: '城市开始向外围扩张，开发浦东的构想开始酝酿。浦西中心城区的高度拥挤促使了首批现代郊区居住小区的建设。'
    },
    1990: {
      titleEn: '1990s: The Great Leap & Pudong Development',
      titleZh: '1990年代：浦东开发与跨江大跃进',
      descEn: 'The opening of Pudong New Area in 1990 triggered an infrastructure boom. Nanpu and Yangpu Bridges opened, and the iconic Oriental Pearl Tower and Jin Mao Tower redefined the skyline.',
      descZh: '1990年浦东新区的设立引发了基础设施建设狂潮。南浦、杨浦大桥相继开通，东方明珠和金茂大厦重塑了城市天际线。'
    },
    2000: {
      titleEn: '2000s: Rapid Suburbanization & Metro Boom',
      titleZh: '2000年代：轨道交通大发展与郊区化',
      descEn: 'The Metro network expanded exponentially. Shanghai adopted the "One City, Nine Towns" plan, building massive European-style satellite cities in the suburbs to decentralize the core population.',
      descZh: '地铁网络呈指数级扩张。上海实施了“一城九镇”规划，在郊区建设了多座欧洲风情卫星城，以疏解中心城区人口。'
    },
    2010: {
      titleEn: '2010s: The Post-Expo Waterfront Integration',
      titleZh: '2010年代：后世博滨江贯通与生态回归',
      descEn: 'Following the 2010 World Expo, urban planning shifted from raw expansion to quality of life. The Huangpu River and Suzhou Creek waterfronts were cleaned up and connected as public parks.',
      descZh: '2010年世博会后，城市规划从粗放扩张转向品质提升。黄浦江和苏州河两岸公共空间实现贯通，转型为市民休闲公园。'
    },
    2020: {
      titleEn: '2020s: The Smart, Regenerative Megacity',
      titleZh: '2020年代：智慧微更新与艺术滨江',
      descEn: 'Focus shifted to "micro-regeneration" of historic lanes and turning industrial brownfields like the Xuhui waterfront (West Bund) into world-class art corridors and high-tech clusters.',
      descZh: '规划重点转向历史里弄的“微更新”，以及将徐汇滨江（西岸）等工业遗存改建为世界级的艺术走廊和高科技产业集群。'
    }
  };

  const activeOverlay = mapDecadeOverlays[selectedDecade as keyof typeof mapDecadeOverlays];

  const handleFlyToItem = (item: JoinedUrbanPlanningItem) => {
    setActiveItem(item);
    setMapCenter([item.planning.latitude, item.planning.longitude]);
    setMapZoom(14);
  };

  const handleResetView = () => {
    setActiveItem(null);
    setMapCenter([31.2304, 121.4737]);
    setMapZoom(11);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-180px)] min-h-[600px] py-2">
      
      {/* Left Sidebar: Controls & List */}
      <div className="lg:col-span-1 flex flex-col space-y-4 h-full overflow-y-auto pr-2 text-left">
        
        {/* Time Slider Card */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-amber-500" />
              {isEn ? 'Historical Time Slider' : '历史时间轴滑块'}
            </h3>
            <span className="text-lg font-mono font-bold text-amber-400">{selectedDecade}s</span>
          </div>

          <input
            type="range"
            min="1970"
            max="2020"
            step="10"
            value={selectedDecade}
            onChange={(e) => {
              setSelectedDecade(Number(e.target.value));
              setActiveItem(null);
            }}
            className="w-full h-1.5 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-xs font-mono text-gray-500">
            <span>1970s</span>
            <span>1990s</span>
            <span>2010s</span>
            <span>2020s</span>
          </div>
        </div>

        {/* Historical Overlay Card */}
        <div className="bg-gray-900/30 border border-gray-800 rounded-xl p-5 space-y-2 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
          <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5" />
            {isEn ? 'Urban Geography Context' : '城市地理历史背景'}
          </h4>
          <h3 className="font-bold text-white text-sm md:text-base">
            {isEn ? activeOverlay.titleEn : activeOverlay.titleZh}
          </h3>
          <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
            {isEn ? activeOverlay.descEn : activeOverlay.descZh}
          </p>
        </div>

        {/* Planning Items List */}
        <div className="flex-1 bg-gray-900/20 border border-gray-800 rounded-xl p-4 flex flex-col space-y-3 overflow-hidden">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-400" />
              {isEn ? 'Urban Planning Landmarks' : '城市规划地标'}
            </h3>
            <button 
              onClick={handleResetView}
              className="text-xs text-amber-500 hover:text-amber-400 font-medium"
            >
              {isEn ? 'Reset Map' : '重置视角'}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
            {planningItems.map((item) => {
              const isVisible = item.decade <= selectedDecade;
              const isSelected = activeItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => isVisible && handleFlyToItem(item)}
                  className={`p-3.5 rounded-lg border text-left transition-all duration-300 ${
                    !isVisible 
                      ? 'opacity-40 cursor-not-allowed border-gray-900 bg-gray-950/10' 
                      : isSelected
                        ? 'border-emerald-500 bg-emerald-500/10 cursor-pointer shadow-md'
                        : 'border-gray-800/80 bg-gray-900/40 hover:border-gray-700 cursor-pointer'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-xs font-mono text-emerald-400 font-semibold">
                      {item.planning.district}
                    </span>
                    <span className="text-xs font-mono text-gray-500">
                      {item.exactYear}
                    </span>
                  </div>
                  <h4 className={`font-bold text-sm mt-1 ${isSelected ? 'text-emerald-300' : 'text-white'}`}>
                    {isEn ? item.titleEn : item.titleZh}
                  </h4>
                  <p className="text-gray-400 text-xs mt-1 line-clamp-2 leading-relaxed">
                    {isEn ? item.summaryEn : item.summaryZh}
                  </p>
                  
                  {isVisible && (
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-800/50">
                      <span className="text-[10px] font-mono uppercase bg-gray-800 text-gray-400 px-1.5 py-0.5 rounded">
                        {item.planning.scale}
                      </span>
                      <span className="text-xs text-amber-500 font-semibold flex items-center gap-1">
                        {isEn ? 'Locate' : '定位'}
                        <ZoomIn className="w-3 h-3" />
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Right Map Container */}
      <div className="lg:col-span-2 rounded-xl overflow-hidden border border-gray-800 shadow-2xl relative h-full min-h-[400px]">
        <MapContainer 
          center={mapCenter} 
          zoom={mapZoom} 
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          {/* Use a beautiful custom dark-themed map tile layer */}
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
          
          {/* Map Controller for FlyTo animations */}
          <MapController center={mapCenter} zoom={mapZoom} />

          {/* Markers */}
          {visibleItems.map((item) => {
            const isSelected = activeItem?.id === item.id;
            return (
              <Marker
                key={item.id}
                position={[item.planning.latitude, item.planning.longitude]}
                icon={createCustomIcon(isSelected)}
                eventHandlers={{
                  click: () => handleFlyToItem(item)
                }}
              >
                <Popup className="custom-leaflet-popup">
                  <div className="p-3 space-y-2 text-left bg-gray-900 text-white rounded-lg max-w-[240px]">
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                        {item.planning.district}
                      </span>
                      <span className="text-[10px] font-mono text-gray-400">
                        {item.exactYear}
                      </span>
                    </div>
                    <h4 className="font-bold text-sm text-white leading-tight">
                      {isEn ? item.titleEn : item.titleZh}
                    </h4>
                    <p className="text-gray-300 text-xs line-clamp-3 leading-relaxed">
                      {isEn ? item.summaryEn : item.summaryZh}
                    </p>
                    <button
                      onClick={() => onSelectItem(item.id)}
                      className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-gray-950 text-xs font-bold rounded flex items-center justify-center gap-1 transition-colors mt-2"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {isEn ? 'Explore Archive' : '深入探索档案'}
                    </button>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

    </div>
  );
};
