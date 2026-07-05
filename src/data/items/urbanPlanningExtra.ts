import type { ArchiveItem, UrbanPlanningMetadata } from '../types';

const THUMB = [
  'https://images.unsplash.com/photo-1547983659-115c24d38418?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542640244-7e672d6cef4e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
];

export const urbanPlanningExtraItems: ArchiveItem[] = [
  // --- 1970s ---
  {
    id: 'up_yangshupu_1970',
    titleEn: 'The Yangshupu Industrial Belt: Shanghai\'s Riverfront Engine Room',
    titleZh: '杨树浦工业带：黄浦江畔的城市动力心脏',
    decade: 1970,
    exactYear: 1973,
    category: 'urban_planning',
    itemType: 'research_paper',
    summaryEn: 'A study of the Yangshupu industrial corridor, once the densest concentration of textile mills, power plants, and waterworks in Asia, which defined Shanghai\'s riverfront land use throughout the 1970s.',
    summaryZh: '一份研究报告，探讨杨树浦工业走廊。这里曾是亚洲纺织厂、发电厂与自来水厂最密集的产业带，贯穿整个70年代定义了上海的沿江土地使用格局。',
    contentMarkdownEn: `### The Engine Room of Socialist Shanghai

Stretching along the northern bank of the Huangpu River, the **Yangshupu (杨树浦)** industrial belt housed some of Asia's largest textile mills, the Yangshupu Power Plant, and the Yangshupu Waterworks—infrastructure dating to the treaty-port era but repurposed as the backbone of state-owned industrial production in the 1970s.

#### A Zone Defined by Production, Not Living
- **Continuous Shift Work**: Factories operated around the clock, and workers' dormitories crowded the district's interior streets, creating one of Shanghai's most population-dense industrial-residential zones.
- **Environmental Cost**: Decades of unregulated industrial discharge left the adjacent Huangpu riverbank heavily polluted, a legacy that would take until the 2010s West Bund-style waterfront campaigns to reverse.
- **No Public Riverfront Access**: Unlike today's continuous public promenades, the entire Yangshupu waterfront in the 1970s was walled off behind factory gates, completely inaccessible to ordinary citizens.

Yangshupu's industrial dominance would not begin reversing until the 2000s deindustrialization wave, eventually transforming this exact stretch of riverfront into the celebrated "Yangpu Riverside" public park and innovation corridor of the 2020s.`,
    contentMarkdownZh: `### 社会主义上海的“动力心脏”

沿黄浦江北岸延伸的**杨树浦**工业带，曾坐落着亚洲规模最大的一批纺织厂、杨树浦发电厂和杨树浦自来水厂——这些基础设施可追溯至租界时期，却在70年代被改造为国营工业生产的核心支柱。

#### 一个以生产而非居住为核心的区域
- **昼夜不息的轮班制**：工厂全天候运转，工人宿舍密布于街区内部，形成了上海人口密度最高的工业-居住混合区之一。
- **沉重的环境代价**：数十年不受监管的工业排放，使毗邻的黄浦江沿岸遭受了严重污染，这一历史遗留问题直到2010年代西岸式滨江治理运动兴起后才逐步得到扭转。
- **完全封闭的滨江岸线**：与如今连续贯通的公共滨江步道不同，70年代整个杨树浦沿江地带被工厂围墙完全封闭，普通市民根本无法进入。

杨树浦的工业主导地位直到21世纪初的去工业化浪潮才开始逆转，最终在2020年代将这段江岸转型为广受赞誉的“杨浦滨江”公共公园与科创走廊。`,
    thumbnailUrl: THUMB[0],
    tags: ['Yangshupu', 'Industrial Belt', 'Riverfront', '1970s']
  },

  // --- 1980s ---
  {
    id: 'up_commercial_housing_1980',
    titleEn: 'The First Commercial Housing Pilot Projects',
    titleZh: '商品房试点：住房市场化的第一步',
    decade: 1980,
    exactYear: 1981,
    category: 'urban_planning',
    itemType: 'research_paper',
    summaryEn: 'An examination of Shanghai\'s earliest experiments with commercial (for-sale) housing in the early 1980s, a radical departure from decades of state-allocated Danwei housing that laid the groundwork for the 1990s real estate boom.',
    summaryZh: '一份研究报告，探讨上海80年代初最早的商品房（可购买住房）试点。这是对数十年单位分配福利住房体制的一次激进突破，为90年代的房地产大发展奠定了基础。',
    contentMarkdownEn: `### Buying a Home for the First Time in Decades

In 1981, Shanghai launched some of China's first **commercial housing (商品房)** pilot projects, allowing a small number of citizens—and notably, some overseas Chinese and Hong Kong buyers—to purchase apartments directly, rather than waiting for state work-unit (Danwei) allocation.

#### A Tentative First Step
- **Limited Scale**: Early pilot developments, such as the Quyang New Village expansion, remained small and experimental, serving only a fraction of the city's overwhelming housing demand.
- **Dual-Track System**: Commercial housing existed alongside the dominant Danwei allocation system for years, creating a "dual-track" housing economy that would persist well into the 1990s.
- **Testing Market Mechanisms**: These pilots allowed planners to test pricing, financing, and property rights concepts largely absent from the socialist planned economy, informing the much larger housing reforms of the following decade.

Though modest in scale, this pilot program represented the first crack in the state monopoly over urban housing—a crack that would widen into a full market transformation by the mid-1990s.`,
    contentMarkdownZh: `### 数十年来第一次“买房”

1981年，上海启动了中国最早的一批**商品房**试点项目，允许一小部分市民——尤其值得注意的是部分海外华侨与香港购房者——直接购买公寓，而无需再等待单位福利分房。

#### 一次谨慎的先行探索
- **规模有限**：曲阳新村扩建等早期试点项目规模较小、带有实验性质，仅能满足全市庞大住房需求中的极小一部分。
</br>
- **双轨制并存**：商品房与占主导地位的单位分配体制并存多年，形成了一种持续到90年代的“双轨制”住房经济格局。
- **市场机制的试验田**：这些试点让规划者得以尝试计划经济体制中几乎完全缺失的定价、融资与产权理念，为下一个十年更大规模的住房制度改革积累了经验。

尽管规模有限，这一试点项目标志着国家对城市住房垄断出现的第一道裂痕——这道裂痕将在90年代中期扩展为一场全面的市场化转型。`,
    thumbnailUrl: THUMB[1],
    tags: ['Commercial Housing', 'Housing Reform', 'Danwei System', '1980s']
  },
  {
    id: 'up_nanjingroad_1980',
    titleEn: 'Nanjing Road\'s First Steps Toward Pedestrianization',
    titleZh: '南京路步行化改造的第一步',
    decade: 1980,
    exactYear: 1985,
    category: 'urban_planning',
    itemType: 'research_paper',
    summaryEn: 'A study of early 1980s traffic management experiments on Nanjing Road, Shanghai\'s premier shopping street, which planted the seeds for the pedestrian mall that would fully open in 1999.',
    summaryZh: '一份研究报告，探讨80年代初在南京路（上海顶级商业街）开展的交通管理试验。这些早期探索为1999年最终建成的步行街埋下了伏笔。',
    contentMarkdownEn: `### Taming the Busiest Street in China

By the mid-1980s, **Nanjing Road (南京路)** had become dangerously overcrowded, with an estimated 1 million pedestrians per day competing for space with trams, bicycles, and delivery carts on a street never designed for such volume.

#### Early Traffic Experiments
- **Restricted Vehicle Hours**: Planners began experimenting with time-restricted vehicle access, banning most motorized traffic during peak shopping hours on weekends.
- **Widened Sidewalks**: Several storefront renovations pushed building setbacks to widen pedestrian space, a modest but symbolically important shift in priority from vehicle throughput to pedestrian comfort.
- **Retail Modernization Pressure**: As department stores like the Number One Department Store modernized their storefronts, planners recognized that a fully pedestrianized street would better showcase Shanghai's retail renaissance.

These incremental 1980s experiments proved that full pedestrianization was feasible, directly informing the decision to close Nanjing Road entirely to vehicle traffic in the celebrated 1999 pedestrian mall project.`,
    contentMarkdownZh: `### 驯服中国最繁忙的一条街

到80年代中期，**南京路**已变得极度拥挤，日均约100万人次的行人，不得不与有轨电车、自行车和送货三轮车争夺这条从未按此人流量设计的街道空间。

#### 早期交通管理试验
- **限时限行**：规划者开始试行分时段限制车辆通行，周末购物高峰时段禁止大部分机动车驶入。
- **拓宽人行道**：多家沿街商铺在改造中后退建筑退线以拓宽人行空间，这一举措规模虽小，却标志着城市规划重心从车辆通行效率向行人舒适度的重要转变。
- **零售业现代化的推动**：随着第一百货商店等老字号商场陆续更新门面，规划者意识到，一条完全步行化的街道将更能展现上海零售业复兴的崭新面貌。

这些80年代的渐进式试验证明了全面步行化的可行性，直接为1999年南京路步行街这一著名工程——彻底禁止车辆通行——的最终决策提供了依据。`,
    thumbnailUrl: THUMB[2],
    tags: ['Nanjing Road', 'Pedestrianization', 'Retail Planning', '1980s']
  },
  {
    id: 'up_bridge_debate_1980',
    titleEn: 'The Great Bridge Debate: How to Cross the Huangpu',
    titleZh: '跨江大论战：如何跨越黄浦江',
    decade: 1980,
    exactYear: 1987,
    category: 'urban_planning',
    itemType: 'research_paper',
    summaryEn: 'A record of the intense 1980s engineering and policy debate over how to finally connect Puxi and Pudong—by bridge, tunnel, or ferry expansion—which set the stage for the bridge-building boom of the 1990s.',
    summaryZh: '一份记录，探讨80年代关于如何最终连接浦西与浦东的激烈工程与政策论战——是建桥、挖隧道，还是扩大轮渡运力，这场论战为90年代的建桥热潮铺平了道路。',
    contentMarkdownEn: `### A River That Divided a City for a Century

For over a century, crossing the Huangpu River between Puxi and the farmland of Pudong meant relying on slow, overcrowded ferries. By the late 1980s, with Pudong's development under serious consideration, planners engaged in fierce debate over the best crossing method.

#### The Three Camps
- **The Bridge Advocates**: Argued that a suspension or cable-stayed bridge would be faster and cheaper to build, with the added benefit of an iconic skyline silhouette—ultimately winning out with the Nanpu Bridge design.
- **The Tunnel Advocates**: Pointed to Shanghai's soft alluvial soil as a serious engineering risk for bridge foundations, and favored underwater tunnels to preserve unobstructed river shipping lanes.
- **The Ferry Expansion Camp**: A more conservative faction argued for simply expanding the existing ferry fleet, wary of the enormous capital cost of permanent crossings during a period of limited state budgets.

The bridge advocates ultimately prevailed, and the resulting **Nanpu Bridge (1991)** and **Yangpu Bridge (1993)** became defining symbols of Shanghai's 1990s transformation—proof that the seemingly abstract planning debates of the 1980s directly shaped the city's most iconic infrastructure.`,
    contentMarkdownZh: `### 一条分隔了这座城市整整一个世纪的大江

一个多世纪以来，往返于浦西与浦东农田之间，市民只能依靠缓慢而拥挤的轮渡。到80年代末，随着浦东开发提上议事日程，规划者们围绕最佳跨江方案展开了激烈论战。

#### 三大阵营
- **建桥派**：主张悬索桥或斜拉桥造价更低、建设速度更快，还能塑造标志性的城市天际线剪影——这一方案最终以南浦大桥的设计胜出。
- **隧道派**：指出上海松软的冲积土质对桥梁基础构成严重工程风险，主张建设水下隧道以保持江面航道畅通无阻。
- **扩大轮渡派**：一派更为保守的意见主张仅需扩充现有轮渡船队规模，对在国家财政有限的时期投入巨资建设永久性跨江设施持谨慎态度。

建桥派最终胜出，随后建成的**南浦大桥（1991年）**与**杨浦大桥（1993年）**，成为了90年代上海城市转型的标志性象征——证明了80年代看似抽象的规划论战，直接塑造了这座城市最具代表性的基础设施面貌。`,
    thumbnailUrl: THUMB[3],
    tags: ['Nanpu Bridge', 'Huangpu River Crossing', 'Infrastructure Debate', '1980s']
  },

  // --- 1990s ---
  {
    id: 'up_metro_line1_1990',
    titleEn: 'Shanghai Metro Line 1 Opens: The First Rail Line',
    titleZh: '上海地铁1号线开通：轨道交通新纪元',
    decade: 1990,
    exactYear: 1995,
    category: 'urban_planning',
    itemType: 'research_paper',
    summaryEn: 'A study of the 1995 full opening of Shanghai Metro Line 1, the city\'s very first rapid transit line, which connected the railway station to the southern suburbs and launched the world\'s fastest-growing metro network.',
    summaryZh: '一份研究报告，探讨1995年上海地铁1号线全线通车。这是这座城市的第一条轻轨交通线路，连接火车站与南部郊区，开启了全球发展最快地铁网络的序幕。',
    contentMarkdownEn: `### The First Ride Underground

On **April 10, 1995**, Shanghai Metro **Line 1** opened in full, running 16.1 km from Shanghai Railway Station south to Xinzhuang. It was the first rapid transit line not just in Shanghai, but the first fully operational metro in mainland China outside Beijing.

#### A Cautious, Costly Beginning
- **Foreign Financing and Technology**: Given the lack of domestic expertise in soft-soil tunnel boring, Shanghai partnered with German and other foreign firms for critical engineering and rolling stock technology.
- **Skeptical Public Reception**: Many citizens, accustomed to buses and bicycles, were initially unfamiliar with underground rail travel, and ridership took years to build to capacity.
- **A Test Bed for Expansion**: Line 1's success—engineering-wise and in gradually winning public trust—validated the feasibility of large-scale metro construction in Shanghai's notoriously soft, water-logged soil, directly enabling the aggressive multi-line expansion of the 2000s Expo era.

What began as a single, uncertain 16 km line would, within 15 years, grow into the world's longest metro network by track length—a transformation that started with this single 1995 opening.`,
    contentMarkdownZh: `### 第一次乘坐地下列车

**1995年4月10日**，上海地铁**1号线**全线通车，全长16.1公里，从上海火车站一路南下直达莘庄。这不仅是上海的第一条轻轨交通线路，也是中国大陆除北京之外第一条全面运营的地铁线路。

#### 一次谨慎而代价高昂的开端
- **依靠外国融资与技术**：由于国内缺乏软土盾构隧道施工经验，上海与德国等外国企业合作，引进关键工程技术和列车车辆。
- **市民反应起初谨慎**：许多习惯了公交车和自行车出行的市民，最初对地下轨道交通十分陌生，客运量花了数年时间才逐步攀升至满负荷水平。
- **扩张的试验田**：1号线在工程建设与逐步赢得市民信任两方面的成功，验证了在上海这种以松软含水土质著称的地质条件下，大规模建设地铁网络的可行性，为2000年代世博前后大刀阔斧的多线扩张铺平了道路。

这条最初仅有16公里、前景尚不确定的单一线路，在短短15年内发展成为全球轨道里程最长的地铁网络——而这一切，正是从1995年的这次开通开始的。`,
    thumbnailUrl: THUMB[0],
    tags: ['Metro Line 1', 'Rapid Transit', 'Infrastructure Milestone', '1990s']
  },

  // --- 2000s ---
  {
    id: 'up_xintiandi_2000',
    titleEn: 'Xintiandi and the Birth of Heritage-Commercial Adaptive Reuse',
    titleZh: '新天地：历史建筑保护性商业开发的诞生',
    decade: 2000,
    exactYear: 2001,
    category: 'urban_planning',
    itemType: 'research_paper',
    summaryEn: 'A study of the 2001 opening of Xintiandi, a Shikumen-lane redevelopment that pioneered the model of preserving historic building facades while inserting upscale retail and dining—later replicated across China.',
    summaryZh: '一份研究报告，探讨2001年开业的新天地——一个开创性的石库门里弄改造项目，保留历史建筑立面的同时注入高端零售与餐饮业态，此后这一模式在全国被广泛复制。',
    contentMarkdownEn: `### Preserving the Shell, Reinventing the Interior

Opened in 2001, **Xintiandi (新天地)** transformed a decaying Shikumen lane neighborhood near the site of the First National Congress of the Communist Party into Shanghai's first successful heritage-commercial adaptive reuse project, developed by Hong Kong's Shui On Land.

#### The Adaptive Reuse Formula
- **Facade Preservation, Interior Transformation**: Original grey-brick Shikumen facades and stone gate frames were meticulously restored, while building interiors were completely rebuilt to house international restaurants, bars, and boutiques.
- **Displacement Controversy**: The project required relocating hundreds of original working-class residents, sparking early debates about gentrification and the authenticity of "museumified" heritage architecture serving wealthy consumers rather than the communities who once lived there.
- **A Replicable Template**: Despite the controversy, Xintiandi's commercial success made it the template for dozens of subsequent "Tiandi"-branded and similar projects across Chinese cities, fundamentally changing how developers approached historic urban fabric.

Xintiandi's legacy remains deeply contested: celebrated internationally as innovative heritage preservation, while criticized domestically as an early symbol of culture-washed displacement that foreshadowed larger resettlement projects like Zhoujiadu.`,
    contentMarkdownZh: `### 保留外壳，重塑内核

2001年开业的**新天地**，将中共一大会址附近一片破败的石库门里弄社区，改造为上海首个取得商业成功的历史建筑保护性商业开发项目，由香港瑞安集团开发。

#### 保护性再利用的公式
- **立面保留，内部重塑**：原有的青砖石库门立面与石料门框被精心修复，而建筑内部则被彻底改建，用以容纳国际化的餐厅、酒吧与精品店。
- **动迁争议**：该项目需要搬迁数百户原住的工人阶级居民，由此引发了关于绅士化以及“博物馆化”历史建筑是否真正服务于当年在此生活的社区，而非富裕消费群体的早期争论。
- **一套可复制的模板**：尽管争议不断，新天地的商业成功仍使其成为此后中国各大城市数十个“天地”品牌及类似项目的效仿模板，从根本上改变了开发商对待历史城市肌理的方式。

新天地的历史遗产至今仍充满争议：国际上它被誉为创新的历史保护典范，而在国内则常被批评为文化包装下动迁行为的早期象征，为周家渡等更大规模的动迁项目埋下了伏笔。`,
    thumbnailUrl: THUMB[1],
    tags: ['Xintiandi', 'Adaptive Reuse', 'Gentrification', '2000s']
  },

  // --- 2010s ---
  {
    id: 'up_riverfront_2010',
    titleEn: 'The 45km Huangpu Riverfront Connection Project',
    titleZh: '黄浦江45公里滨江公共空间贯通工程',
    decade: 2010,
    exactYear: 2017,
    category: 'urban_planning',
    itemType: 'research_paper',
    summaryEn: 'A study of the landmark 2017 completion of the Huangpu River public waterfront connection project, which opened 45 continuous kilometers of riverbank to pedestrians for the first time in the city\'s modern history.',
    summaryZh: '一份研究报告，探讨具有里程碑意义的黄浦江滨江公共空间贯通工程于2017年完工。该工程首次在这座城市的现代历史上，将45公里连续的江岸向行人开放。',
    contentMarkdownEn: `### Giving the River Back to the People

For over a century, Shanghai's Huangpu riverbank was almost entirely walled off by factories, docks, and private developments. In **2017**, the city completed a landmark project connecting **45 kilometers** of continuous public riverfront space from the Yangpu Bridge to the Xupu Bridge.

#### An Unprecedented Urban Achievement
- **Reclaiming Industrial Land**: The project required negotiating the removal or repurposing of dozens of factory sites, private docks, and military-use land parcels that had blocked public access for generations.
- **Unified Design Language**: Despite passing through vastly different districts—from the industrial heritage of Yangpu to the financial towers of Lujiazui to the art spaces of West Bund—the project maintained a continuous, walkable, and cyclable public path.
- **Ecological and Recreational Integration**: New sections incorporated wetland restoration, public art installations, running tracks, and riverside cafes, transforming a purely industrial asset into shared civic space.

This project stands as one of the most significant public space achievements in Shanghai's modern urban planning history, directly enabling the cultural renaissance of districts like West Bund in the years that followed.`,
    contentMarkdownZh: `### 将母亲河还给市民

一个多世纪以来，上海黄浦江沿岸几乎完全被工厂、码头和私人开发项目所围蔽。**2017年**，上海完成了一项具有里程碑意义的工程，将从杨浦大桥至徐浦大桥长达**45公里**的连续滨江公共空间彻底贯通。

#### 一项前所未有的城市成就
- **收回工业用地**：该工程需要协调拆除或改造数十处工厂遗址、私人码头以及长期阻碍公众进入的军事用地地块。
- **统一的设计语言**：尽管沿线穿越了差异巨大的区域——从杨浦的工业遗存，到陆家嘴的金融摩天大楼，再到西岸的艺术空间——工程始终保持了一条连续、可步行、可骑行的公共廊道。
- **生态与休闲功能的融合**：新建路段融入了湿地修复、公共艺术装置、跑步道和滨江咖啡馆，将一块纯工业属性的资产转化为全民共享的公共空间。

这一工程堪称上海现代城市规划史上最具意义的公共空间成就之一，直接为此后数年西岸等区域的文化复兴创造了条件。`,
    thumbnailUrl: THUMB[2],
    tags: ['Huangpu Riverfront', 'Public Space', 'Waterfront Connection', '2010s']
  },

  // --- 2020s ---
  {
    id: 'up_microregen_2020',
    titleEn: 'The 15-Minute Community Life Circle & Micro-Regeneration',
    titleZh: '“15分钟社区生活圈”与历史街区微更新',
    decade: 2020,
    exactYear: 2021,
    category: 'urban_planning',
    itemType: 'research_paper',
    summaryEn: 'A study of Shanghai\'s "15-Minute Community Life Circle" planning framework and its associated "micro-regeneration" approach to upgrading historic neighborhoods without wholesale demolition.',
    summaryZh: '一份研究报告，探讨上海“15分钟社区生活圈”规划框架，以及与之相配套的、在不进行大规模拆除的前提下对历史街区进行提升改造的“微更新”方法。',
    contentMarkdownEn: `### Everything You Need, a Short Walk Away

Formalized in Shanghai's planning guidelines in the early 2020s, the **"15-Minute Community Life Circle" (15分钟社区生活圈)** policy mandates that essential daily services—groceries, healthcare clinics, elderly day-care, schools, and green space—be accessible within a 15-minute walk of every residential community.

#### Micro-Regeneration Over Demolition
- **A Philosophical Shift**: Rather than the large-scale demolition-and-rebuild approach that defined the 1990s-2000s, planners now favor "micro-regeneration" (微更新)—targeted, small-scale upgrades to existing historic lanes, courtyards, and buildings.
- **Community Co-Design**: Many micro-regeneration projects, particularly in historic Jing'an and Huangpu lane neighborhoods, actively involve residents in redesigning shared courtyards, adding accessible entrances, and installing modern plumbing without displacing the original community.
- **Balancing Preservation and Modernization**: The approach explicitly tries to avoid the displacement controversies of earlier projects like Xintiandi, aiming to upgrade quality of life for existing residents rather than replacing them with upscale commercial tenants.

This planning philosophy represents Shanghai's maturation from an era of rapid physical expansion into one focused on livability, social equity, and the preservation of everyday urban fabric rather than only monumental landmarks.`,
    contentMarkdownZh: `### 出门15分钟，满足所有生活所需

21世纪20年代初正式写入上海规划指导文件的**“15分钟社区生活圈”**政策，要求每个居住社区步行15分钟范围内，都能获取生鲜采购、医疗诊所、老年人日间照料、学校和绿地等基本日常服务。

#### 以“微更新”取代大拆大建
- **理念上的转变**：与定义了90至21世纪初的大规模拆除重建模式不同，如今的规划者更倾向于“微更新”——对现存历史里弄、天井和建筑进行有针对性的小规模提升改造。
- **社区共建共治**：许多微更新项目（尤其是静安、黄浦等历史里弄社区）积极邀请居民共同参与共享天井的重新设计、无障碍出入口加装以及现代化管道设施的安装，且不搬迁原有社区居民。
- **在保护与现代化之间寻求平衡**：这一方法明确力图避免新天地等早期项目所引发的动迁争议，致力于提升现有居民的生活品质，而非以高端商业租户取而代之。

这一规划理念标志着上海已从快速物理扩张的时代，走向以宜居性、社会公平与日常城市肌理保护（而非仅仅是纪念性地标）为核心的成熟发展阶段。`,
    thumbnailUrl: THUMB[3],
    tags: ['15-Minute Life Circle', 'Micro-Regeneration', 'Community Planning', '2020s']
  }
];

export const urbanPlanningExtraMetadata: UrbanPlanningMetadata[] = [
  {
    itemId: 'up_yangshupu_1970',
    district: 'Yangpu',
    planningType: 'infrastructure',
    latitude: 31.2649,
    longitude: 121.5133,
    keyFigures: ['Shanghai Textile Bureau', 'Yangshupu Power Plant Administration'],
    scale: 'District'
  },
  {
    itemId: 'up_commercial_housing_1980',
    district: 'Hongkou',
    planningType: 'residential_reform',
    latitude: 31.2646,
    longitude: 121.4855,
    keyFigures: ['Shanghai Housing Bureau'],
    scale: 'Neighborhood'
  },
  {
    itemId: 'up_nanjingroad_1980',
    district: 'Huangpu',
    planningType: 'infrastructure',
    latitude: 31.2359,
    longitude: 121.4799,
    keyFigures: ['Shanghai Urban Planning Bureau', 'Nanjing Road Commercial Association'],
    scale: 'Neighborhood'
  },
  {
    itemId: 'up_bridge_debate_1980',
    district: 'Huangpu',
    planningType: 'transportation',
    latitude: 31.2058,
    longitude: 121.4917,
    keyFigures: ['Shanghai Municipal Engineering Design Institute'],
    scale: 'City-wide'
  },
  {
    itemId: 'up_metro_line1_1990',
    district: 'Xuhui',
    planningType: 'transportation',
    latitude: 31.1929,
    longitude: 121.3958, // Xinzhuang terminus area
    keyFigures: ['Shanghai Shentong Metro Group', 'German Rail Engineering Partners'],
    scale: 'City-wide'
  },
  {
    itemId: 'up_xintiandi_2000',
    district: 'Huangpu',
    planningType: 'heritage_preservation',
    latitude: 31.2197,
    longitude: 121.4726,
    keyFigures: ['Shui On Land', 'Benjamin Wood'],
    scale: 'Neighborhood'
  },
  {
    itemId: 'up_riverfront_2010',
    district: 'All',
    planningType: 'heritage_preservation',
    latitude: 31.2100,
    longitude: 121.4900,
    keyFigures: ['Shanghai Huangpu River Waterfront Development Office'],
    scale: 'City-wide'
  },
  {
    itemId: 'up_microregen_2020',
    district: "Jing'an",
    planningType: 'residential_reform',
    latitude: 31.2270,
    longitude: 121.4478,
    keyFigures: ['Shanghai Urban Renewal Bureau', 'Community Resident Committees'],
    scale: 'Neighborhood'
  }
];
