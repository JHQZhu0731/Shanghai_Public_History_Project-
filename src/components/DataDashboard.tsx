import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { demographicsData } from '../data/demographics';
import { healthcareData } from '../data/healthcare';
import { searchItems } from '../data/db';
import { Users, Heart, TrendingUp, AlertCircle, ArrowRight, BookOpen, Video, Camera } from 'lucide-react';

interface DataDashboardProps {
  language: 'en' | 'zh';
  onSelectItem: (id: string) => void;
}

export const DataDashboard: React.FC<DataDashboardProps> = ({ language, onSelectItem }) => {
  const isEn = language === 'en';
  const [activeTab, setActiveTab] = useState<'demographics' | 'healthcare'>('demographics');

  // Get related archive items
  const relatedDemoItems = searchItems('', 'demographics', 'all');
  const relatedHealthItems = searchItems('', 'healthcare', 'all');

  // Custom Tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#11111b] border-4 border-[#313244] p-3 rounded-none text-left">
          <p className="text-[10px] font-mono font-bold text-[#f9e2af] mb-1.5">
            {isEn ? `Year: ${label}` : `年份: ${label}年`}
          </p>
          <div className="space-y-1">
            {payload.map((item: any, idx: number) => (
              <p key={idx} className="text-[10px] flex items-center justify-between gap-4">
                <span className="text-[#a6adc8]">{item.name}:</span>
                <span className="font-mono font-bold" style={{ color: item.color }}>
                  {item.value} {item.unit || ''}
                </span>
              </p>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'demographics':
        return <Users className="w-4 h-4 text-[#89b4fa]" />;
      case 'healthcare':
        return <Heart className="w-4 h-4 text-[#f38ba8]" />;
      default:
        return null;
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
    <div className="space-y-10 py-4 text-left">
      
      {/* Dashboard Selector */}
      <div className="flex gap-4 border-b-4 border-[#313244] pb-1">
        <button
          onClick={() => setActiveTab('demographics')}
          className={`nes-btn text-xs font-bold ${activeTab === 'demographics' ? 'is-primary' : ''}`}
        >
          <span className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {isEn ? 'DEMOGRAPHICS' : '人口数据'}
          </span>
        </button>
        <button
          onClick={() => setActiveTab('healthcare')}
          className={`nes-btn text-xs font-bold ${activeTab === 'healthcare' ? 'is-error' : ''}`}
        >
          <span className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            {isEn ? 'HEALTHCARE' : '医疗卫生'}
          </span>
        </button>
      </div>

      {/* DEMOGRAPHICS TAB */}
      {activeTab === 'demographics' && (
        <div className="space-y-10">
          
          {/* Chart 1: Population Structure */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Chart Container */}
            <div className="lg:col-span-2 bg-[#11111b] border-4 border-[#313244] p-4 flex flex-col h-[400px] shadow-[6px_6px_0px_0px_rgba(49,50,68,1)]">
              <div className="mb-4 border-b border-[#313244] pb-2">
                <h3 className="font-black text-white text-xs md:text-sm uppercase tracking-wide">
                  {isEn ? 'Population Growth & Migration (1970-2026)' : '上海人口增长与流动趋势 (1970-2026)'}
                </h3>
                <p className="text-[#a6adc8] text-[10px] mt-0.5">
                  {isEn ? 'Registered Hukou vs. Floating Population in Millions' : '户籍人口与外来（流动）人口对比（单位：百万人）'}
                </p>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={demographicsData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorHukou" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#89b4fa" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#89b4fa" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorFloating" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#a6e3a1" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#a6e3a1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#313244" />
                    <XAxis dataKey="year" stroke="#9399b2" fontSize={10} fontFamily="monospace" />
                    <YAxis stroke="#9399b2" fontSize={10} fontFamily="monospace" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="square" wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
                    <Area 
                      type="monotone" 
                      name={isEn ? "Registered Hukou" : "户籍人口"} 
                      dataKey="registeredHukou" 
                      stroke="#89b4fa" 
                      fillOpacity={1} 
                      fill="url(#colorHukou)" 
                      unit="M"
                    />
                    <Area 
                      type="monotone" 
                      name={isEn ? "Floating Population" : "外来流动人口"} 
                      dataKey="floatingPopulation" 
                      stroke="#a6e3a1" 
                      fillOpacity={1} 
                      fill="url(#colorFloating)" 
                      unit="M"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="lg:col-span-1 nes-container is-dark text-left flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(49,50,68,1)]">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-[#89b4fa] uppercase tracking-widest flex items-center gap-1.5 border-b border-[#313244] pb-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {isEn ? 'Demographic Analysis' : '人口学趋势分析'}
                </h4>
                <div className="space-y-3 text-[11px] leading-relaxed text-[#cdd6f4]">
                  <p>
                    {isEn 
                      ? 'The data shows two distinct eras. From 1970 to 1990, Shanghai was a closed city. The registered Hukou population grew slowly, and the floating population was virtually non-existent due to strict household controls.' 
                      : '数据呈现出两个截然不同的时代。从1970年到1990年，上海是一座封闭的城市。户籍人口增长缓慢，由于严格的户口管制，外来流动人口几乎为零。'}
                  </p>
                  <p>
                    {isEn 
                      ? 'Following Deng Xiaoping\'s 1992 Southern Tour, the floating population exploded. Over 10 million migrant workers arrived to construct Pudong and the metro networks, serving as the physical engine of Shanghai\'s global rise.' 
                      : '1992年邓小平南方谈话后，外来人口呈爆发式增长。超过1000万外来建设者涌入上海参与浦东和地铁网络建设，成为上海全球崛起最强劲的物理引擎。'}
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-[#89b4fa]/5 border-2 border-[#89b4fa]/20 rounded-none flex items-start gap-2 text-[10px] text-[#89b4fa]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  {isEn 
                    ? 'Note the plateau in total population after 2015, reflecting strict municipal population caps and rising living costs.' 
                    : '值得注意的是，2015年之后上海总人口进入平台期，这反映了城市人口规模调控政策以及生活成本上升的双重作用。'}
                </p>
              </div>
            </div>

          </div>

          {/* Chart 2: Aging & Birth Rates */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Analysis Panel */}
            <div className="lg:col-span-1 nes-container is-dark text-left flex flex-col justify-between order-2 lg:order-1 shadow-[6px_6px_0px_0px_rgba(49,50,68,1)]">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-[#cba6f7] uppercase tracking-widest flex items-center gap-1.5 border-b border-[#313244] pb-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {isEn ? 'The Demographics Squeeze' : '人口结构双重挤压'}
                </h4>
                <div className="space-y-3 text-[11px] leading-relaxed text-[#cdd6f4]">
                  <p>
                    {isEn 
                      ? 'Shanghai is experiencing a severe demographic squeeze. The aging rate (65+) has climbed from 4.5% in 1970 to over 22% in 2026, making it China\'s oldest city.' 
                      : '上海正经历着严峻的人口结构双重挤压。65岁及以上老年人口比例从1970年的4.5%一路攀升至2026年的22.5%以上，成为中国老龄化程度最高的超级大都市。'}
                  </p>
                  <p>
                    {isEn 
                      ? 'Concurrently, the birth rate has plummeted. The introduction of the One-Child Policy in 1979 caused a sharp drop, and despite recent policy relaxations, high costs of education and housing keep birth rates at historic lows.' 
                      : '与此同时，人口出生率急剧下降。1979年独生子女政策的实施导致出生率骤降。尽管近年来生育政策逐步放宽，但高昂的教育与住房成本使年轻一代生育意愿低迷，出生率持续走低。'}
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-[#cba6f7]/5 border-2 border-[#cba6f7]/20 rounded-none flex items-start gap-2 text-[10px] text-[#cba6f7]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  {isEn 
                    ? 'A 65+ aging rate above 20% marks a "super-aged" society, placing immense pressure on pension funds and healthcare infrastructure.' 
                    : '65岁以上人口占比超过20%即标志着进入“超高龄社会”，这给养老保险基金和医疗卫生基础设施带来了巨大压力。'}
                </p>
              </div>
            </div>

            {/* Chart Container */}
            <div className="lg:col-span-2 bg-[#11111b] border-4 border-[#313244] p-4 flex flex-col h-[400px] order-1 lg:order-2 shadow-[6px_6px_0px_0px_rgba(49,50,68,1)]">
              <div className="mb-4 border-b border-[#313244] pb-2">
                <h3 className="font-black text-white text-xs md:text-sm uppercase tracking-wide">
                  {isEn ? 'Aging Rate vs. Birth Rate (1970-2026)' : '老龄化率与出生率演变趋势 (1970-2026)'}
                </h3>
                <p className="text-[#a6adc8] text-[10px] mt-0.5">
                  {isEn ? 'Aging Rate (% of population aged 65+) and Birth Rate (Births per 1,000 people)' : '65岁以上老年人口比例（%）与人口出生率（‰）对比'}
                </p>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={demographicsData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#313244" />
                    <XAxis dataKey="year" stroke="#9399b2" fontSize={10} fontFamily="monospace" />
                    <YAxis stroke="#9399b2" fontSize={10} fontFamily="monospace" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="square" wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
                    <Line 
                      type="monotone" 
                      name={isEn ? "Aging Rate (65+)" : "65岁及以上老龄化率"} 
                      dataKey="agingRate65Plus" 
                      stroke="#cba6f7" 
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                      unit="%"
                    />
                    <Line 
                      type="monotone" 
                      name={isEn ? "Birth Rate" : "人口出生率"} 
                      dataKey="birthRate" 
                      stroke="#f38ba8" 
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                      unit="‰"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Related Demographics Archive Items */}
          <div className="space-y-4 pt-4 border-t-4 border-[#313244]">
            <h3 className="text-xs md:text-sm font-black text-white uppercase tracking-wide">
              {isEn ? 'Related Demographics Archives' : '关联人口学历史档案'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedDemoItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item.id)}
                  className="p-4 bg-[#11111b] border-4 border-[#313244] cursor-pointer hover:border-[#89b4fa] hover:bg-[#89b4fa]/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-[#89b4fa] uppercase flex items-center gap-1">
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                      <span className="text-[9px] font-mono text-[#9399b2]">{item.exactYear}</span>
                    </div>
                    <h4 className="font-black text-white text-xs line-clamp-1 hover:text-[#89b4fa] transition-colors">
                      {isEn ? item.titleEn : item.titleZh}
                    </h4>
                    <p className="text-[#a6adc8] text-[10px] line-clamp-2 leading-relaxed">
                      {isEn ? item.summaryEn : item.summaryZh}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#313244] text-[9px] text-[#9399b2]">
                    <span className="capitalize flex items-center gap-1">
                      {getItemTypeIcon(item.itemType)}
                      {item.itemType.replace('_', ' ')}
                    </span>
                    <span className="text-[#89b4fa] font-black flex items-center gap-0.5">
                      {isEn ? 'READ' : '阅读'}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* HEALTHCARE TAB */}
      {activeTab === 'healthcare' && (
        <div className="space-y-10">
          
          {/* Chart 1: Life Expectancy */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Chart Container */}
            <div className="lg:col-span-2 bg-[#11111b] border-4 border-[#313244] p-4 flex flex-col h-[400px] shadow-[6px_6px_0px_0px_rgba(49,50,68,1)]">
              <div className="mb-4 border-b border-[#313244] pb-2">
                <h3 className="font-black text-white text-xs md:text-sm uppercase tracking-wide">
                  {isEn ? 'Life Expectancy & Hospital Capacity (1970-2026)' : '上海人均预期寿命与医疗机构规模 (1970-2026)'}
                </h3>
                <p className="text-[#a6adc8] text-[10px] mt-0.5">
                  {isEn ? 'Average Life Expectancy (Years) and Number of Major Hospitals' : '人均预期寿命（岁）与主要医院数量（家）对比'}
                </p>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={healthcareData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#313244" />
                    <XAxis dataKey="year" stroke="#9399b2" fontSize={10} fontFamily="monospace" />
                    <YAxis stroke="#9399b2" fontSize={10} fontFamily="monospace" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="square" wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
                    <Line 
                      type="monotone" 
                      name={isEn ? "Life Expectancy (Years)" : "人均预期寿命（岁）"} 
                      dataKey="lifeExpectancy" 
                      stroke="#f38ba8" 
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                      unit=" yrs"
                    />
                    <Line 
                      type="monotone" 
                      name={isEn ? "Major Hospitals" : "主要医院数量（家）"} 
                      dataKey="hospitalCount" 
                      stroke="#f9e2af" 
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                      unit=" hospitals"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="lg:col-span-1 nes-container is-dark text-left flex flex-col justify-between shadow-[6px_6px_0px_0px_rgba(49,50,68,1)]">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-[#f38ba8] uppercase tracking-widest flex items-center gap-1.5 border-b border-[#313244] pb-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {isEn ? 'Healthcare Transition' : '医疗卫生跨越式转型'}
                </h4>
                <div className="space-y-3 text-[11px] leading-relaxed text-[#cdd6f4]">
                  <p>
                    {isEn 
                      ? 'Shanghai\'s healthcare indicators are among the highest in the world. Life expectancy has risen from 71.2 years in 1970 to 84.8 years in 2026, surpassing many developed Western countries.' 
                      : '上海的卫生健康指标已处于全球最前列。人均预期寿命从1970年的71.2岁提高到2026年的84.8岁，超越了众多西方发达国家。'}
                  </p>
                  <p>
                    {isEn 
                      ? 'This longevity is supported by a massive expansion of medical infrastructure. The number of major hospitals grew from 142 in 1970 to 465 in 2026, establishing world-class medical centers like Ruijin and Huashan.' 
                      : '长寿的背后是医疗基础设施的巨大扩张。主要医院数量从1970年的142家增长到2026年的465家，确立了瑞金、华山等世界级医学中心的领先地位。'}
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-[#f38ba8]/5 border-2 border-[#f38ba8]/20 rounded-none flex items-start gap-2 text-[10px] text-[#f38ba8]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  {isEn 
                    ? 'Shanghai\'s life expectancy is highly correlated with its economic growth, public health campaigns, and the transition to smart digital medicine.' 
                    : '上海市民预期寿命的稳步攀升，与城市经济的高速增长、爱国卫生运动的普及以及智慧医疗数字化转型高度相关。'}
                </p>
              </div>
            </div>

          </div>

          {/* Chart 2: Mortality Rates */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Analysis Panel */}
            <div className="lg:col-span-1 nes-container is-dark text-left flex flex-col justify-between order-2 lg:order-1 shadow-[6px_6px_0px_0px_rgba(49,50,68,1)]">
              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-[#a6e3a1] uppercase tracking-widest flex items-center gap-1.5 border-b border-[#313244] pb-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {isEn ? 'Eradicating Mortality Risks' : '孕产妇与婴儿死亡率骤降'}
                </h4>
                <div className="space-y-3 text-[11px] leading-relaxed text-[#cdd6f4]">
                  <p>
                    {isEn 
                      ? 'Infant and maternal mortality rates are the gold standards of public health. In Shanghai, infant mortality dropped from 26.5 per 1,000 in 1970 to an extremely low 1.5 per 1,000 in 2026.' 
                      : '婴儿和孕产妇死亡率是衡量一个地区公共卫生水平的金标准。在上海，婴儿死亡率从1970年的26.5‰骤降至2026年的1.5‰，处于世界极低水平。'}
                  </p>
                  <p>
                    {isEn 
                      ? 'Similarly, maternal mortality plummeted from 48.2 per 100,000 to just 2.3 per 100,000. This reflects the success of universal hospital births, prenatal screening, and community maternal care networks.' 
                      : '同样地，孕产妇死亡率从10万分之48.2骤降至10万分之2.3。这反映了全面推行住院分娩、产前筛查以及社区妇幼保健网建设的巨大成功。'}
                  </p>
                </div>
              </div>
              <div className="mt-4 p-3 bg-[#a6e3a1]/5 border-2 border-[#a6e3a1]/20 rounded-none flex items-start gap-2 text-[10px] text-[#a6e3a1]">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  {isEn 
                    ? 'These figures place Shanghai\'s maternal and child safety indicators on par with or better than top global cities like Tokyo and Singapore.' 
                    : '这些指标使上海的妇幼安全水平与东京、新加坡等全球顶尖城市并驾齐驱，甚至更为优异。'}
                </p>
              </div>
            </div>

            {/* Chart Container */}
            <div className="lg:col-span-2 bg-[#11111b] border-4 border-[#313244] p-4 flex flex-col h-[400px] order-1 lg:order-2 shadow-[6px_6px_0px_0px_rgba(49,50,68,1)]">
              <div className="mb-4 border-b border-[#313244] pb-2">
                <h3 className="font-black text-white text-xs md:text-sm uppercase tracking-wide">
                  {isEn ? 'Maternal & Infant Mortality Rates (1970-2026)' : '孕产妇与婴儿死亡率下降趋势 (1970-2026)'}
                </h3>
                <p className="text-[#a6adc8] text-[10px] mt-0.5">
                  {isEn ? 'Infant Mortality (per 1,000 live births) and Maternal Mortality (per 100,000 live births)' : '婴儿死亡率（‰）与孕产妇死亡率（1/10万）对比'}
                </p>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={healthcareData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#313244" />
                    <XAxis dataKey="year" stroke="#9399b2" fontSize={10} fontFamily="monospace" />
                    <YAxis stroke="#9399b2" fontSize={10} fontFamily="monospace" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="square" wrapperStyle={{ fontSize: 10, fontFamily: 'monospace' }} />
                    <Line 
                      type="monotone" 
                      name={isEn ? "Infant Mortality Rate" : "婴儿死亡率"} 
                      dataKey="infantMortalityRate" 
                      stroke="#a6e3a1" 
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                      unit="‰"
                    />
                    <Line 
                      type="monotone" 
                      name={isEn ? "Maternal Mortality Rate" : "孕产妇死亡率"} 
                      dataKey="maternalMortalityRate" 
                      stroke="#f38ba8" 
                      strokeWidth={3}
                      activeDot={{ r: 6 }}
                      unit="/100k"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Related Healthcare Archive Items */}
          <div className="space-y-4 pt-4 border-t-4 border-[#313244]">
            <h3 className="text-xs md:text-sm font-black text-white uppercase tracking-wide">
              {isEn ? 'Related Healthcare Archives' : '关联医疗卫生历史档案'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedHealthItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item.id)}
                  className="p-4 bg-[#11111b] border-4 border-[#313244] cursor-pointer hover:border-[#f38ba8] hover:bg-[#f38ba8]/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] font-bold text-[#f38ba8] uppercase flex items-center gap-1">
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                      <span className="text-[9px] font-mono text-[#9399b2]">{item.exactYear}</span>
                    </div>
                    <h4 className="font-black text-white text-xs line-clamp-1 hover:text-[#f38ba8] transition-colors">
                      {isEn ? item.titleEn : item.titleZh}
                    </h4>
                    <p className="text-[#a6adc8] text-[10px] line-clamp-2 leading-relaxed">
                      {isEn ? item.summaryEn : item.summaryZh}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-[#313244] text-[9px] text-[#9399b2]">
                    <span className="capitalize flex items-center gap-1">
                      {getItemTypeIcon(item.itemType)}
                      {item.itemType.replace('_', ' ')}
                    </span>
                    <span className="text-[#f38ba8] font-black flex items-center gap-0.5">
                      {isEn ? 'READ' : '阅读'}
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
};
