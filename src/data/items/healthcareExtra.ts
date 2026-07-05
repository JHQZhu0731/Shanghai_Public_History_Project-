import type { ArchiveItem, HealthcareMetadata } from '../types';

const THUMB = [
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1584036561566-baf241830990?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
];

export const healthcareExtraItems: ArchiveItem[] = [
  // --- 1970s ---
  {
    id: 'health_familyplanning_clinics_1970',
    titleEn: 'The Family Planning Clinic Network Emerges',
    titleZh: '计划生育服务网络的萌芽',
    decade: 1970,
    exactYear: 1973,
    category: 'healthcare',
    itemType: 'research_paper',
    summaryEn: 'A study of Shanghai\'s early 1970s "later, longer, fewer" (晚稀少) family planning campaign, which pre-dated the formal One-Child Policy and laid the institutional groundwork for later population control efforts.',
    summaryZh: '一份研究报告，探讨上海70年代初的“晚、稀、少”计划生育运动。这场运动早于正式的独生子女政策，为此后的人口控制工作奠定了制度基础。',
    contentMarkdownEn: `### Before the One-Child Policy

Years before the formal 1980 One-Child Policy, Shanghai's health system began promoting the **"Later, Longer, Fewer" (晚稀少)** campaign in the early 1970s—encouraging later marriage, longer intervals between births, and fewer total children.

#### Building the Infrastructure
- **Neighborhood Clinics**: Family planning stations were established within existing factory and neighborhood clinics, staffed by nurses trained in contraceptive counseling and distribution.
- **Workplace Integration**: Danwei-based health workers tracked women's reproductive health as part of routine workplace medical services, integrating family planning into the fabric of daily working life.
- **Voluntary Framing**: Unlike the coercive elements of the 1980s policy, the 1970s campaign relied primarily on political education and social pressure rather than direct sanctions, achieving significant voluntary compliance in urban Shanghai.

This clinic network, built through the 1970s, became the direct institutional foundation upon which the far stricter One-Child Policy enforcement mechanisms of the 1980s would later be constructed.`,
    contentMarkdownZh: `### 独生子女政策出台之前

早在1980年正式推行独生子女政策的数年前，上海卫生系统就已在70年代初开始推广**“晚、稀、少”**运动——鼓励晚婚、延长生育间隔、减少子女总数。

#### 基础网络的搭建
- **社区诊所**：计划生育服务站设立在现有的工厂与社区诊所内，由受过避孕咨询与药具发放培训的护士负责运作。
- **融入单位体系**：以单位为基础的卫生工作者将女性生殖健康纳入日常工作医疗服务的常规内容，使计划生育深度融入日常工作生活的肌理之中。
- **以自愿为主的宣传框架**：与80年代政策中的强制性成分不同，70年代的运动主要依靠政治教育和社会舆论压力，而非直接的行政处罚，在上海城区取得了相当程度的自愿配合。

这套在70年代建立起来的诊所网络，成为了80年代更为严格的独生子女政策执行机制得以建立的直接制度基础。`,
    thumbnailUrl: THUMB[0],
    tags: ['Family Planning', 'Later Longer Fewer Campaign', 'Public Health', '1970s']
  },

  // --- 1980s ---
  {
    id: 'health_tcm_revival_1980',
    titleEn: 'The Revival of Traditional Chinese Medicine',
    titleZh: '中医药的复兴之路',
    decade: 1980,
    exactYear: 1983,
    category: 'healthcare',
    itemType: 'research_paper',
    summaryEn: 'A study of the institutional revival of Traditional Chinese Medicine (TCM) in Shanghai during the 1980s, as hospitals re-established dedicated TCM departments after years of politicized marginalization.',
    summaryZh: '一份研究报告，探讨80年代上海中医药的制度性复兴。经过多年政治化边缘化后，各大医院重新设立了专门的中医科室。',
    contentMarkdownEn: `### Rebuilding a Suppressed Tradition

After years of ideological turbulence during the Cultural Revolution, Shanghai's hospitals began systematically rebuilding **Traditional Chinese Medicine (TCM, 中医)** departments in the early 1980s, supported by renewed state investment in "integrating Chinese and Western medicine" (中西医结合).

#### Institutional Rebuilding
- **Shanghai University of TCM Expansion**: The Shanghai University of Traditional Chinese Medicine, founded in 1956 but disrupted for over a decade, resumed full academic operations, training a new generation of practitioners.
- **Hospital-Level Integration**: Major hospitals like Longhua Hospital and Yueyang Hospital expanded dedicated TCM wards, offering acupuncture, herbal medicine, and tui na alongside Western clinical departments.
- **Export and International Interest**: Shanghai's revived TCM institutions began attracting early international medical tourism and academic exchange, particularly around acupuncture anesthesia techniques that had drawn global attention in the 1970s.

This 1980s institutional revival cemented Shanghai's TCM hospitals as some of the most prestigious in China, a status they retain today as centers combining traditional practice with modern clinical research.`,
    contentMarkdownZh: `### 重建一个曾被压制的传统

经历文化大革命期间的意识形态动荡后，上海各大医院在80年代初开始系统性地重建**中医**科室，并获得了国家对“中西医结合”事业的重新投入与支持。

#### 制度重建之路
- **上海中医学院的恢复扩展**：创立于1956年却中断了十余年的上海中医学院恢复全面教学运作，培养了新一代的中医从业者。
- **医院层面的整合**：龙华医院、岳阳医院等大型医院扩建了专门的中医病区，在西医临床科室之外，提供针灸、中草药和推拿等诊疗服务。
- **国际影响力的萌芽**：上海复兴后的中医机构开始吸引早期的国际医疗交流与学术合作，尤其是围绕70年代曾引发全球关注的针刺麻醉技术。

这场80年代的制度复兴，巩固了上海各大中医院在全国范围内的顶尖地位——这一地位延续至今，使其成为传统诊疗实践与现代临床研究相结合的重要中心。`,
    thumbnailUrl: THUMB[1],
    tags: ['Traditional Chinese Medicine', 'TCM Revival', 'Longhua Hospital', '1980s']
  },

  // --- 1990s ---
  {
    id: 'health_insurance_reform_1990',
    titleEn: 'The Medical Insurance Reform Pilot',
    titleZh: '公费医疗制度改革试点',
    decade: 1990,
    exactYear: 1996,
    category: 'healthcare',
    itemType: 'research_paper',
    summaryEn: 'A study of Shanghai\'s pioneering 1990s pilot reform of the "Public Expense Medical Care" (公费医疗) system, transitioning from fully state-subsidized care toward a contributory social medical insurance model.',
    summaryZh: '一份研究报告，探讨上海在90年代率先开展的“公费医疗”制度改革试点，从完全由国家补贴的医疗模式，逐步过渡至缴费型社会医疗保险模式。',
    contentMarkdownEn: `### From Free Care to Shared Contribution

Since the 1950s, urban state employees had enjoyed **"Public Expense Medical Care" (公费医疗)**—essentially free healthcare fully subsidized by their work unit or the state. By the mid-1990s, this model had become financially unsustainable amid economic reform and rising medical costs.

#### The Shanghai Pilot
- **Basic Medical Insurance Launch**: Shanghai became one of the first Chinese cities to pilot a contributory **Basic Medical Insurance (基本医疗保险)** system in 1996, requiring both employer and employee contributions into individual and pooled accounts.
- **Cost-Sharing Introduced**: For the first time, patients faced co-payments and deductibles for many services, a jarring change for a population accustomed to nominal or zero out-of-pocket costs.
- **Private Sector Growth**: The reform coincided with the rapid expansion of private clinics and hospitals, as the state gradually loosened its historic monopoly on healthcare delivery.

This pilot became the template for China's nationwide medical insurance reforms in the early 2000s, though it also introduced the persistent inequality between the newly insured urban Hukou population and the still largely uninsured floating migrant workforce.`,
    contentMarkdownZh: `### 从免费医疗到共同分担

自50年代以来，城市国企职工一直享有**“公费医疗”**——即由所在单位或国家全额补贴的近乎免费医疗服务。到90年代中期，随着经济改革推进与医疗成本不断上升，这一模式已难以为继。

#### 上海的试点探索
- **基本医疗保险的启动**：1996年，上海成为中国最早试点缴费型**基本医疗保险**制度的城市之一，要求用人单位与职工双方共同向个人账户及统筹账户缴费。
- **费用分担机制的引入**：患者首次需要为许多医疗服务承担共付费用与起付线，对于习惯了名义上乃至零自付费用的市民而言，这是一次令人不适的巨大转变。
- **民营医疗的兴起**：这场改革恰逢私营诊所和医院的快速扩张，国家逐步放松了对医疗服务供给长期以来的垄断地位。

这一试点成为了21世纪初中国全国医疗保险改革的范本，但也由此埋下了新参保城市户籍人口与仍大多缺乏医保覆盖的外来流动务工人员之间持续存在的不平等问题。`,
    thumbnailUrl: THUMB[2],
    tags: ['Medical Insurance Reform', 'Public Expense Medical Care', 'Healthcare Marketization', '1990s']
  },

  // --- 2000s ---
  {
    id: 'health_sars_2000',
    titleEn: 'The 2003 SARS Outbreak and the Birth of Shanghai CDC',
    titleZh: '2003年SARS疫情与上海疾控中心的诞生',
    decade: 2000,
    exactYear: 2003,
    category: 'healthcare',
    itemType: 'research_paper',
    summaryEn: 'A study of Shanghai\'s relatively successful containment of the 2003 SARS outbreak compared to Beijing and Guangzhou, and the resulting overhaul of the city\'s public health surveillance infrastructure.',
    summaryZh: '一份研究报告，探讨相较于北京和广州，上海在2003年SARS疫情中相对成功的防控经验，以及由此推动的城市公共卫生监测基础设施全面改革。',
    contentMarkdownEn: `### A Near Miss That Changed Everything

While Beijing and Guangzhou suffered severe SARS outbreaks in 2003, Shanghai recorded remarkably few cases—a relative success attributed to early port screening, given the city's status as a major international transit hub, and rapid quarantine protocols.

#### Rebuilding Public Health Infrastructure
- **Shanghai CDC Strengthening**: The Shanghai Center for Disease Control and Prevention was significantly expanded and modernized in the outbreak's aftermath, establishing what would become one of China's most sophisticated disease surveillance networks.
- **Community-Level Reporting Systems**: SARS exposed critical gaps in real-time disease reporting between community clinics and higher-level authorities, prompting investment in networked electronic reporting systems.
- **Hospital Isolation Protocols**: Major hospitals developed dedicated infectious disease isolation wards and emergency response protocols that would prove crucial in managing subsequent outbreaks, including H1N1 in 2009 and COVID-19 two decades later.

The lessons and infrastructure built in SARS's aftermath directly shaped Shanghai's public health emergency response capacity for the following two decades.`,
    contentMarkdownZh: `### 一次“擦肩而过”却改变了一切

尽管北京和广州在2003年遭受了严重的SARS疫情冲击，上海记录到的病例却出奇地少——这一相对成功的防控成果，得益于作为国际重要交通枢纽而实施的早期口岸筛查以及快速的隔离处置流程。

#### 重建公共卫生基础设施
- **上海疾控中心的强化**：疫情之后，上海市疾病预防控制中心得到大幅扩建与现代化升级，逐步建立起中国最为完善的疾病监测网络之一。
- **社区层面的报告体系**：SARS疫情暴露出社区诊所与上级卫生部门之间实时疫情报告存在严重缺口，由此推动了对联网电子报告系统的投资建设。
- **医院隔离规程**：各大医院建立了专门的传染病隔离病区和应急响应流程，这些机制在此后应对2009年甲流乃至二十年后的新冠疫情中，均发挥了至关重要的作用。

SARS疫情之后总结的经验与建立的基础设施，直接塑造了上海此后二十年应对公共卫生突发事件的能力。`,
    thumbnailUrl: THUMB[0],
    tags: ['SARS 2003', 'Shanghai CDC', 'Public Health Infrastructure', '2000s']
  },

  // --- 2010s ---
  {
    id: 'health_familydoctor_2010',
    titleEn: 'The Family Doctor Contracted Service System',
    titleZh: '家庭医生签约服务制度',
    decade: 2010,
    exactYear: 2011,
    category: 'healthcare',
    itemType: 'research_paper',
    summaryEn: 'A study of Shanghai\'s pioneering 2011 introduction of the family doctor contracted service system, which assigned community-based primary care physicians to residents in an effort to reduce overcrowding at major hospitals.',
    summaryZh: '一份研究报告，探讨上海于2011年率先推行的家庭医生签约服务制度。该制度为居民指定社区基层全科医生，以缓解大型医院的就诊拥挤压力。',
    contentMarkdownEn: `### A Family Doctor for Every Household

Facing chronic overcrowding at tertiary hospitals, where patients with minor ailments often waited hours to see specialists, Shanghai launched the **Family Doctor Contracted Service (家庭医生签约服务)** system in Changning District in 2011 before expanding citywide.

#### Reshaping the Referral Pyramid
- **Signed Contracts**: Residents could voluntarily "sign" with a designated community health center physician, who would manage their routine care, chronic disease monitoring, and referrals.
- **The "1-3-1" Tiered System**: The reform was part of a broader push toward a tiered referral system, encouraging patients to seek initial treatment at 1 community clinic, before escalating to district-level or top-tier hospitals only when necessary.
- **Chronic Disease Management Focus**: Family doctors placed particular emphasis on managing hypertension, diabetes, and other chronic conditions among Shanghai's rapidly aging population, reducing unnecessary hospital visits.

By the late 2010s, the majority of Shanghai's registered elderly residents had signed with a family doctor, marking a significant structural shift toward primary-care-centered healthcare delivery.`,
    contentMarkdownZh: `### 让每个家庭都拥有自己的医生

面对三级医院长期拥挤的问题——许多患有轻微病症的患者往往需要排队数小时才能挂上专科号——上海于2011年率先在长宁区推出**家庭医生签约服务**制度，随后逐步向全市推广。

#### 重塑分级诊疗体系
- **自愿签约模式**：居民可自愿与指定的社区卫生服务中心全科医生“签约”，由其负责日常诊疗、慢性病监测及转诊安排。
- **“1-3-1”分级诊疗体系**：这项改革是更大范围分级诊疗体系推进工作的一部分，鼓励患者优先前往1家社区卫生服务中心就诊，仅在必要时才逐级转诊至区级或顶级医院。
- **聚焦慢性病管理**：家庭医生尤其注重管理上海快速老龄化人口中的高血压、糖尿病等慢性疾病，从而减少不必要的医院就诊次数。

到2010年代末，上海绝大多数户籍老年居民已与家庭医生签约，标志着医疗服务体系向以基层诊疗为核心的模式实现了重大结构性转变。`,
    thumbnailUrl: THUMB[1],
    tags: ['Family Doctor System', 'Tiered Referral', 'Primary Care', '2010s']
  }
];

export const healthcareExtraMetadata: HealthcareMetadata[] = [
  {
    itemId: 'health_familyplanning_clinics_1970',
    eraType: 'barefoot_doctors',
    keyDiseases: ['Reproductive Health'],
    innovationType: 'Public Health Policy'
  },
  {
    itemId: 'health_tcm_revival_1980',
    eraType: 'marketization',
    innovationType: 'Traditional Chinese Medicine'
  },
  {
    itemId: 'health_insurance_reform_1990',
    eraType: 'marketization',
    hospitalCount: 340,
    innovationType: 'Public Health Policy'
  },
  {
    itemId: 'health_sars_2000',
    eraType: 'universal_insurance',
    keyDiseases: ['SARS'],
    innovationType: 'Public Health Policy'
  },
  {
    itemId: 'health_familydoctor_2010',
    eraType: 'universal_insurance',
    lifeExpectancy: 82.5,
    innovationType: 'Public Health Policy'
  }
];
