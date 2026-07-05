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
        <span class="absolute inline-flex h-6 w-6 rounded-none bg-[#a6e3a1]/30 ${isActive ? 'animate-ping' : ''}"></span>
        <div class="relative rounded-none h-4 w-4 bg-[#a6e3a1] border-2 border-[#11111b] flex items-center justify-center shadow-md">
          <div class="h-1.5 w-1.5 bg-[#11111b]"></div>
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-180px)] min-h-[600px] py-2">
      
      {/* Left Sidebar: Controls & List */}
      <div className="lg:col-span-1 flex flex-col space-y-4 h-full overflow-y-auto pr-2 text-left">
        
        {/* Time Slider Card */}
        <div className="nes-container is-dark with-title p-5 space-y-4">
          <p className="title text-[10px] font-mono font-bold text-[#f9e2af]">
            {isEn ? 'HISTORICAL TIME SLIDER' : '历史时间轴'}
          </p>
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-white text-xs flex items-center gap-2 uppercase">
              <Calendar className="w-4 h-4 text-[#f9e2af]" />
              {isEn ? 'Select Decade' : '选择年代'}
            </h3>
            <span className="text-sm font-mono font-black text-[#f9e2af]">{selectedDecade}s</span>
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
            className="w-full h-2 bg-[#313244] border-2 border-[#11111b] appearance-none cursor-pointer accent-[#f5c2e4]"
          />
          <div className="flex justify-between text-[9px] font-mono text-[#a6adc8] font-bold">
            <span>1970s</span>
            <span>1990s</span>
            <span>2010s</span>
            <span>2020s</span>
          </div>
        </div>

        {/* Historical Overlay Card */}
        <div className="nes-container is-dark p-4 space-y-2 relative overflow-hidden border-emerald-500/30">
          <h4 className="text-[10px] font-black text-[#a6e3a1] uppercase tracking-wider flex items-center gap-1.5 border-b border-[#313244] pb-1.5">
            <Info className="w-3.5 h-3.5" />
            {isEn ? 'URBAN GEOGRAPHY CONTEXT' : '城市地理历史背景'}
          </h4>
          <h3 className="font-black text-white text-xs md:text-sm uppercase tracking-wide">
            {isEn ? activeOverlay.titleEn : activeOverlay.titleZh}
          </h3>
          <p className="text-[#a6adc8] text-[10px] md:text-[11px] leading-relaxed">
            {isEn ? activeOverlay.descEn : activeOverlay.descZh}
          </p>
        </div>

        {/* Planning Items List */}
        <div className="flex-1 bg-[#11111b] border-4 border-[#313244] p-4 flex flex-col space-y-3 overflow-hidden shadow-[4px_4px_0px_0px_rgba(49,50,68,1)]">
          <div className="flex items-center justify-between border-b-4 border-[#313244] pb-2">
            <h3 className="font-black text-white text-xs flex items-center gap-2 uppercase tracking-wide">
              <Navigation className="w-4 h-4 text-[#a6e3a1]" />
              {isEn ? 'Urban Landmarks' : '城市规划地标'}
            </h3>
            <button 
              onClick={handleResetView}
              className="text-[10px] text-[#f9e2af] hover:text-white font-bold uppercase"
            >
              {isEn ? 'RESET' : '重置'}
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {planningItems.map((item) => {
              const isVisible = item.decade <= selectedDecade;
              const isSelected = activeItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => isVisible && handleFlyToItem(item)}
                  className={`p-3 rounded-none border-4 text-left transition-all duration-300 ${
                    !isVisible 
                      ? 'opacity-30 cursor-not-allowed border-[#181825] bg-[#11111b]/20' 
                      : isSelected
                        ? 'border-[#a6e3a1] bg-[#a6e3a1]/5 cursor-pointer'
                        : 'border-[#313244] bg-[#181825]/60 hover:border-gray-500 cursor-pointer'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[9px] font-mono text-[#a6e3a1] font-bold uppercase">
                      {item.planning.district}
                    </span>
                    <span className="text-[9px] font-mono text-[#9399b2] font-bold">
                      {item.exactYear}
                    </span>
                  </div>
                  <h4 className={`font-black text-xs mt-1 ${isSelected ? 'text-[#a6e3a1]' : 'text-white'}`}>
                    {isEn ? item.titleEn : item.titleZh}
                  </h4>
                  <p className="text-[#a6adc8] text-[10px] mt-1 line-clamp-2 leading-relaxed">
                    {isEn ? item.summaryEn : item.summaryZh}
                  </p>
                  
                  {isVisible && (
                    <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#313244] text-[9px]">
                      <span className="font-mono uppercase bg-[#313244] text-[#cdd6f4] px-1.5 py-0.5">
                        {item.planning.scale}
                      </span>
                      <span className="text-[#f9e2af] font-black flex items-center gap-1">
                        {isEn ? 'LOCATE' : '定位'}
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
      <div className="lg:col-span-2 border-4 border-[#313244] overflow-hidden shadow-[8px_8px_0px_0px_rgba(49,50,68,1)] relative h-full min-h-[400px]">
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
                  <div className="p-3 space-y-2 text-left bg-[#11111b] text-white border-2 border-[#313244] rounded-none max-w-[240px]">
                    <div className="flex justify-between items-center gap-2 border-b border-[#313244] pb-1">
                      <span className="text-[9px] font-mono font-bold text-[#a6e3a1] uppercase">
                        {item.planning.district}
                      </span>
                      <span className="text-[9px] font-mono text-[#a6adc8] font-bold">
                        {item.exactYear}
                      </span>
                    </div>
                    <h4 className="font-black text-xs text-white leading-tight">
                      {isEn ? item.titleEn : item.titleZh}
                    </h4>
                    <p className="text-[#a6adc8] text-[10px] line-clamp-3 leading-relaxed">
                      {isEn ? item.summaryEn : item.summaryZh}
                    </p>
                    <button
                      onClick={() => onSelectItem(item.id)}
                      className="w-full py-1 bg-[#f9e2af] text-[#11111b] text-[10px] font-black rounded-none flex items-center justify-center gap-1 transition-colors mt-2 border-2 border-[#11111b]"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      {isEn ? 'EXPLORE ARCHIVE' : '深入探索档案'}
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
