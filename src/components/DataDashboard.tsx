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
        <div className="bg-gray-950 border border-gray-800 p-3.5 rounded-lg shadow-xl text-left">
          <p className="text-xs font-mono font-bold text-amber-500 mb-1.5">
            {isEn ? `Year: ${label}` : `年份: ${label}年`}
          </p>
          <div className="space-y-1">
            {payload.map((item: any, idx: number) => (
              <p key={idx} className="text-xs flex items-center justify-between gap-4">
                <span className="text-gray-400">{item.name}:</span>
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
        return <Users className="w-4 h-4 text-blue-400" />;
      case 'healthcare':
        return <Heart className="w-4 h-4 text-rose-400" />;
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
      <div className="flex border-b border-gray-800">
        <button
          onClick={() => setActiveTab('demographics')}
          className={`py-3 px-6 font-bold text-base md:text-lg flex items-center gap-2 border-b-2 transition-all duration-300 ${
            activeTab === 'demographics'
              ? 'border-blue-500 text-blue-400 bg-blue-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-900/20'
          }`}
        >
          <Users className="w-5 h-5" />
          {isEn ? 'Demographics Dashboard' : '人口变迁数据面板'}
        </button>
        <button
          onClick={() => setActiveTab('healthcare')}
          className={`py-3 px-6 font-bold text-base md:text-lg flex items-center gap-2 border-b-2 transition-all duration-300 ${
            activeTab === 'healthcare'
              ? 'border-rose-500 text-rose-400 bg-rose-500/5'
              : 'border-transparent text-gray-400 hover:text-gray-200 hover:bg-gray-900/20'
          }`}
        >
          <Heart className="w-5 h-5" />
          {isEn ? 'Healthcare Dashboard' : '医疗卫生数据面板'}
        </button>
      </div>

      {/* DEMOGRAPHICS TAB */}
      {activeTab === 'demographics' && (
        <div className="space-y-10">
          
          {/* Chart 1: Population Structure */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart Container */}
            <div className="lg:col-span-2 bg-gray-900/30 border border-gray-800 rounded-xl p-5 shadow-xl flex flex-col h-[400px]">
              <div className="mb-4">
                <h3 className="font-bold text-white text-base md:text-lg">
                  {isEn ? 'Shanghai Population Growth & Migration (1970-2026)' : '上海人口增长与流动趋势 (1970-2026)'}
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  {isEn ? 'Comparing Registered Hukou and Floating (Migrant) Population in Millions' : '户籍人口与外来（流动）人口对比（单位：百万人）'}
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
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorFloating" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="year" stroke="#6b7280" fontSize={11} fontFamily="monospace" />
                    <YAxis stroke="#6b7280" fontSize={11} fontFamily="monospace" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                    <Area 
                      type="monotone" 
                      name={isEn ? "Registered Hukou" : "户籍人口"} 
                      dataKey="registeredHukou" 
                      stroke="#3b82f6" 
                      fillOpacity={1} 
                      fill="url(#colorHukou)" 
                      unit="M"
                    />
                    <Area 
                      type="monotone" 
                      name={isEn ? "Floating Population" : "外来流动人口"} 
                      dataKey="floatingPopulation" 
                      stroke="#10b981" 
                      fillOpacity={1} 
                      fill="url(#colorFloating)" 
                      unit="M"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="lg:col-span-1 bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {isEn ? 'Demographic Analysis' : '人口学趋势分析'}
                </h4>
                <div className="space-y-3 text-sm leading-relaxed text-gray-300">
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
              <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-lg flex items-start gap-2.5 text-xs text-blue-300">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Analysis Panel */}
            <div className="lg:col-span-1 bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex flex-col justify-between order-2 lg:order-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {isEn ? 'The Demographics Squeeze' : '人口结构双重挤压'}
                </h4>
                <div className="space-y-3 text-sm leading-relaxed text-gray-300">
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
              <div className="mt-6 p-4 bg-purple-500/5 border border-purple-500/10 rounded-lg flex items-start gap-2.5 text-xs text-purple-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  {isEn 
                    ? 'A 65+ aging rate above 20% marks a "super-aged" society, placing immense pressure on pension funds and healthcare infrastructure.' 
                    : '65岁以上人口占比超过20%即标志着进入“超高龄社会”，这给养老保险基金和医疗卫生基础设施带来了巨大压力。'}
                </p>
              </div>
            </div>

            {/* Chart Container */}
            <div className="lg:col-span-2 bg-gray-900/30 border border-gray-800 rounded-xl p-5 shadow-xl flex flex-col h-[400px] order-1 lg:order-2">
              <div className="mb-4">
                <h3 className="font-bold text-white text-base md:text-lg">
                  {isEn ? 'Aging Rate vs. Birth Rate (1970-2026)' : '老龄化率与出生率演变趋势 (1970-2026)'}
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  {isEn ? 'Aging Rate (% of population aged 65+) and Birth Rate (Births per 1,000 people)' : '65岁以上老年人口比例（%）与人口出生率（‰）对比'}
                </p>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={demographicsData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="year" stroke="#6b7280" fontSize={11} fontFamily="monospace" />
                    <YAxis stroke="#6b7280" fontSize={11} fontFamily="monospace" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                    <Line 
                      type="monotone" 
                      name={isEn ? "Aging Rate (65+)" : "65岁及以上老龄化率"} 
                      dataKey="agingRate65Plus" 
                      stroke="#a855f7" 
                      strokeWidth={2.5}
                      activeDot={{ r: 6 }}
                      unit="%"
                    />
                    <Line 
                      type="monotone" 
                      name={isEn ? "Birth Rate" : "人口出生率"} 
                      dataKey="birthRate" 
                      stroke="#f43f5e" 
                      strokeWidth={2.5}
                      activeDot={{ r: 6 }}
                      unit="‰"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Related Demographics Archive Items */}
          <div className="space-y-4 pt-4 border-t border-gray-800">
            <h3 className="text-lg font-bold text-white">
              {isEn ? 'Related Demographics Archives' : '关联人口学历史档案'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedDemoItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item.id)}
                  className="p-4 bg-gray-900/40 border border-gray-800 rounded-lg cursor-pointer hover:border-blue-500/40 hover:bg-blue-500/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold text-blue-400 uppercase flex items-center gap-1">
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">{item.exactYear}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm line-clamp-1 hover:text-blue-400 transition-colors">
                      {isEn ? item.titleEn : item.titleZh}
                    </h4>
                    <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                      {isEn ? item.summaryEn : item.summaryZh}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-800/40 text-[10px] text-gray-500">
                    <span className="capitalize flex items-center gap-1">
                      {getItemTypeIcon(item.itemType)}
                      {item.itemType.replace('_', ' ')}
                    </span>
                    <span className="text-blue-400 font-semibold flex items-center gap-0.5">
                      {isEn ? 'Read' : '阅读'}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Chart Container */}
            <div className="lg:col-span-2 bg-gray-900/30 border border-gray-800 rounded-xl p-5 shadow-xl flex flex-col h-[400px]">
              <div className="mb-4">
                <h3 className="font-bold text-white text-base md:text-lg">
                  {isEn ? 'Shanghai Life Expectancy & Hospital Capacity (1970-2026)' : '上海人均预期寿命与医疗机构规模 (1970-2026)'}
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  {isEn ? 'Average Life Expectancy (Years) and Number of Major Hospitals' : '人均预期寿命（岁）与主要医院数量（家）对比'}
                </p>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={healthcareData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="year" stroke="#6b7280" fontSize={11} fontFamily="monospace" />
                    <YAxis stroke="#6b7280" fontSize={11} fontFamily="monospace" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                    <Line 
                      type="monotone" 
                      name={isEn ? "Life Expectancy (Years)" : "人均预期寿命（岁）"} 
                      dataKey="lifeExpectancy" 
                      stroke="#f43f5e" 
                      strokeWidth={2.5}
                      activeDot={{ r: 6 }}
                      unit=" yrs"
                    />
                    <Line 
                      type="monotone" 
                      name={isEn ? "Major Hospitals" : "主要医院数量（家）"} 
                      dataKey="hospitalCount" 
                      stroke="#eab308" 
                      strokeWidth={2.5}
                      activeDot={{ r: 6 }}
                      unit=" hospitals"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Analysis Panel */}
            <div className="lg:col-span-1 bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {isEn ? 'Healthcare Transition' : '医疗卫生跨越式转型'}
                </h4>
                <div className="space-y-3 text-sm leading-relaxed text-gray-300">
                  <p>
                    {isEn 
                      ? 'Shanghai\'s healthcare indicators are among the highest in the world. Life expectancy has risen from 71.2 years in 1970 to 84.8 years in 2026, surpassing many developed Western countries.' 
                      : '上海的卫生健康指标已处于全球最前列。人均预期寿命从1970年的71.2岁提高到2026年的84.8岁，超越了众多西方发达国家。'}
                  </p>
                  <p>
                    {isEn 
                      ? 'This longevity is supported by a massive expansion of medical infrastructure. The number of major hospitals grew from 142 in 1970 to 465 in 2026, establishing world-class medical centers like Ruijin and Huashan.' 
                      : '长寿长寿的背后是医疗基础设施的巨大扩张。主要医院数量从1970年的142家增长到2026年的465家，确立了瑞金、华山等世界级医学中心的领先地位。'}
                  </p>
                </div>
              </div>
              <div className="mt-6 p-4 bg-rose-500/5 border border-rose-500/10 rounded-lg flex items-start gap-2.5 text-xs text-rose-300">
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Analysis Panel */}
            <div className="lg:col-span-1 bg-gray-900/50 border border-gray-800 rounded-xl p-6 flex flex-col justify-between order-2 lg:order-1 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {isEn ? 'Eradicating Mortality Risks' : '孕产妇与婴儿死亡率骤降'}
                </h4>
                <div className="space-y-3 text-sm leading-relaxed text-gray-300">
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
              <div className="mt-6 p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-lg flex items-start gap-2.5 text-xs text-emerald-300">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <p>
                  {isEn 
                    ? 'These figures place Shanghai\'s maternal and child safety indicators on par with or better than top global cities like Tokyo and Singapore.' 
                    : '这些指标使上海的妇幼安全水平与东京、新加坡等全球顶尖城市并驾齐驱，甚至更为优异。'}
                </p>
              </div>
            </div>

            {/* Chart Container */}
            <div className="lg:col-span-2 bg-gray-900/30 border border-gray-800 rounded-xl p-5 shadow-xl flex flex-col h-[400px] order-1 lg:order-2">
              <div className="mb-4">
                <h3 className="font-bold text-white text-base md:text-lg">
                  {isEn ? 'Maternal & Infant Mortality Rates (1970-2026)' : '孕产妇与婴儿死亡率下降趋势 (1970-2026)'}
                </h3>
                <p className="text-gray-400 text-xs mt-0.5">
                  {isEn ? 'Infant Mortality (per 1,000 live births) and Maternal Mortality (per 100,000 live births)' : '婴儿死亡率（‰）与孕产妇死亡率（1/10万）对比'}
                </p>
              </div>
              <div className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={healthcareData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="year" stroke="#6b7280" fontSize={11} fontFamily="monospace" />
                    <YAxis stroke="#6b7280" fontSize={11} fontFamily="monospace" />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
                    <Line 
                      type="monotone" 
                      name={isEn ? "Infant Mortality Rate" : "婴儿死亡率"} 
                      dataKey="infantMortalityRate" 
                      stroke="#10b981" 
                      strokeWidth={2.5}
                      activeDot={{ r: 6 }}
                      unit="‰"
                    />
                    <Line 
                      type="monotone" 
                      name={isEn ? "Maternal Mortality Rate" : "孕产妇死亡率"} 
                      dataKey="maternalMortalityRate" 
                      stroke="#f43f5e" 
                      strokeWidth={2.5}
                      activeDot={{ r: 6 }}
                      unit="/100k"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>

          {/* Related Healthcare Archive Items */}
          <div className="space-y-4 pt-4 border-t border-gray-800">
            <h3 className="text-lg font-bold text-white">
              {isEn ? 'Related Healthcare Archives' : '关联医疗卫生历史档案'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {relatedHealthItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectItem(item.id)}
                  className="p-4 bg-gray-900/40 border border-gray-800 rounded-lg cursor-pointer hover:border-rose-500/40 hover:bg-rose-500/5 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-mono font-bold text-rose-400 uppercase flex items-center gap-1">
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                      <span className="text-[10px] font-mono text-gray-500">{item.exactYear}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm line-clamp-1 hover:text-rose-400 transition-colors">
                      {isEn ? item.titleEn : item.titleZh}
                    </h4>
                    <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed">
                      {isEn ? item.summaryEn : item.summaryZh}
                    </p>
                  </div>
                  <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-800/40 text-[10px] text-gray-500">
                    <span className="capitalize flex items-center gap-1">
                      {getItemTypeIcon(item.itemType)}
                      {item.itemType.replace('_', ' ')}
                    </span>
                    <span className="text-rose-400 font-semibold flex items-center gap-0.5">
                      {isEn ? 'Read' : '阅读'}
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
