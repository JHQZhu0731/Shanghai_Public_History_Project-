import type { ArchiveItem, FilmMetadata } from '../types';

const THUMB = [
  'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=800&q=80',
];

export const filmExtraItems: ArchiveItem[] = [
  // --- 1970s ---
  {
    id: 'film_yangbanxi_1970',
    titleEn: 'The Age of Revolutionary Model Operas (Yangbanxi)',
    titleZh: '革命样板戏的时代',
    decade: 1970,
    exactYear: 1972,
    category: 'film',
    itemType: 'video',
    summaryEn: 'A study of how Shanghai Film Studio\'s output in the early 1970s was dominated by filmed adaptations of revolutionary model operas (Yangbanxi), leaving almost no room for the studio\'s pre-1949 artistic traditions.',
    summaryZh: '一份研究，探讨70年代初上海电影制片厂的创作如何被革命样板戏的电影改编所主导，几乎没有为该厂1949年前的艺术传统留下任何空间。',
    contentMarkdownEn: `### Eight Approved Works for a Nation of a Billion

Throughout the early 1970s, nearly all film production approved for public release in China—including at the historically prestigious Shanghai Film Studio—consisted of filmed versions of the eight officially sanctioned **"Model Operas" (样板戏)**, such as "The Red Detachment of Women" and "Taking Tiger Mountain by Strategy."

#### A Studio Stripped of Its Identity
- **From Melodrama to Ideology**: Shanghai Film Studio, once famous for 1930s-40s melodramas and 1950s-60s socialist realist dramas, was redirected almost entirely toward faithfully filming stage productions of Yangbanxi with minimal cinematic interpretation.
- **Technical Innovation Amid Restriction**: Despite the narrow ideological bandwidth, cinematographers experimented with color technology and multi-camera stage-to-screen techniques, developing technical skills that would later serve the studio's 1980s creative renaissance.
- **Audience Experience**: For much of the decade, Yangbanxi film screenings were essentially the only cinematic entertainment available to ordinary Shanghai citizens, shown repeatedly in workplace and neighborhood screening halls.

The rigid ideological control of this period makes the studio's rapid creative rebound in the late 1970s and 1980s—epitomized by directors like Xie Jin—all the more remarkable.`,
    contentMarkdownZh: `### 十亿人的“八个样板”

整个70年代初，中国获批公映的几乎所有电影——包括历史上享有盛誉的上海电影制片厂出品的作品——都是对八部官方认可**“样板戏”**（如《红色娘子军》《智取威虎山》）的电影化改编。

#### 一个失去自我风格的制片厂
- **从情节剧到意识形态**：曾以三四十年代情节剧和五六十年代社会主义现实主义题材著称的上海电影制片厂，几乎被完全导向对样板戏舞台演出的忠实电影化拍摄，几乎不带任何电影化的艺术再创作。
- **限制之中的技术创新**：尽管意识形态空间极为狭窄，摄影师们仍在色彩技术和舞台到银幕的多机位拍摄技法上进行了探索，为该厂80年代的创作复兴积累了宝贵的技术经验。
- **观众的观影体验**：在这十年的大部分时间里，样板戏电影几乎是普通上海市民唯一能接触到的电影娱乐，在单位和社区放映厅里被反复放映。

正是这一时期严苛的意识形态管控，使得该厂在70年代末及80年代——以谢晋等导演为代表——迅速实现的创作复兴显得尤为难能可贵。`,
    thumbnailUrl: THUMB[0],
    tags: ['Yangbanxi', 'Model Operas', 'Shanghai Film Studio', '1970s']
  },

  // --- 1990s ---
  {
    id: 'film_shanghai_triad_1990',
    titleEn: 'Shanghai Triad (1995): Zhang Yimou\'s Gangster-Era Nostalgia',
    titleZh: '《摇啊摇，摇到外婆桥》(1995)：张艺谋镜头下的旧上海帮派往事',
    decade: 1990,
    exactYear: 1995,
    category: 'film',
    itemType: 'video',
    summaryEn: 'An exploration of Zhang Yimou\'s "Shanghai Triad," a lavish 1930s-set gangster drama that used old Shanghai\'s glamour and violence as a metaphor filtered through 1990s Chinese cinema\'s international art-house ambitions.',
    summaryZh: '探索张艺谋执导的《摇啊摇，摇到外婆桥》。这部以30年代为背景的华丽帮派题材电影，通过90年代中国电影走向国际艺术院线的雄心，将旧上海的浮华与暴力转化为一则时代隐喻。',
    contentMarkdownEn: `### Old Shanghai as International Spectacle

Released in 1995 and starring Gong Li, **Shanghai Triad (摇啊摇，摇到外婆桥)** depicted the glamorous, violent world of 1930s Shanghai gangster bosses through the eyes of a young boy recruited into a triad household—part of Zhang Yimou's broader 1990s cycle of visually opulent, internationally-oriented Chinese art films.

#### Cinema as International Ambassador
- **International Co-Production Model**: Financed partly through French co-production money, the film exemplified how 1990s Chinese directors increasingly relied on international financing and festival circuits (it competed at Cannes) to fund ambitious historical dramas.
- **Old Shanghai Mythology**: The film contributed to a broader 1990s cultural nostalgia industry romanticizing pre-1949 "Old Shanghai" glamour—cheongsams, jazz clubs, and gangster intrigue—that would echo decades later in productions like "Blossoms Shanghai."
- **Domestic Reception Tension**: While celebrated internationally, the film faced mixed domestic reception and censorship scrutiny, reflecting the era's broader tension between Chinese cinema's global art-house ambitions and domestic political sensitivities.

Shanghai Triad remains a key text for understanding how 1990s Chinese cinema packaged the city's pre-revolutionary past for both international audiences and a domestic public newly nostalgic for the "roaring" old Shanghai.`,
    contentMarkdownZh: `### 作为国际奇观的旧上海

1995年上映、由巩俐主演的《**摇啊摇，摇到外婆桥**》，通过一个被卷入帮派家族的男孩视角，描绘了30年代上海帮派老大浮华而暴力的世界——这是张艺谋90年代一系列视觉华丽、面向国际市场的中国艺术电影中的一部。

#### 电影作为国际形象大使
- **国际合拍模式**：这部影片部分依靠法国合拍资金完成制作，充分体现了90年代中国导演如何日益依赖国际融资和电影节渠道（该片曾入围戛纳电影节）来支持雄心勃勃的历史题材创作。
- **旧上海神话的建构**：这部电影助推了90年代一股更为广泛的文化怀旧产业——将1949年前的“老上海”浮华（旗袍、爵士俱乐部、帮派恩怨）浪漫化——这股风潮数十年后仍在《繁花》等作品中回响。
- **国内接受度的张力**：尽管在国际上广受赞誉，这部电影在国内的接受度却褒贬不一，并受到审查方面的严格审视，折射出那个时代中国电影在国际艺术院线雄心与国内政治敏感性之间更为广泛的张力。

《摇啊摇，摇到外婆桥》至今仍是理解90年代中国电影如何将上海的革命前历史，包装呈现给国际观众与重新怀念“旧上海”风华的国内公众的关键文本。`,
    thumbnailUrl: THUMB[1],
    tags: ['Shanghai Triad', 'Zhang Yimou', 'Old Shanghai Nostalgia', '1990s']
  },

  // --- 2010s ---
  {
    id: 'film_indie_2010',
    titleEn: 'The Shanghai International Film Festival Comes of Age',
    titleZh: '上海国际电影节的成熟与崛起',
    decade: 2010,
    exactYear: 2013,
    category: 'film',
    itemType: 'text',
    summaryEn: 'A study of the Shanghai International Film Festival\'s transformation in the 2010s from a modest regional event into one of Asia\'s premier film markets, reflecting the city\'s ambitions as a global cultural capital.',
    summaryZh: '一份研究，探讨上海国际电影节在2010年代从一个规模有限的区域性活动，转型为亚洲顶级电影市场之一，折射出这座城市迈向全球文化之都的雄心。',
    contentMarkdownEn: `### From Regional Showcase to Global Film Market

Founded in 1993, the **Shanghai International Film Festival (SIFF, 上海国际电影节)** spent its first two decades as a respectable but secondary event on the world festival circuit. In the 2010s, expanded municipal investment transformed it into a major industry event.

#### Building Global Relevance
- **The Film Market Expansion**: SIFF's accompanying film market grew dramatically, becoming a key venue for Hollywood studios and independent producers alike to negotiate China distribution deals, reflecting Shanghai's growing importance in the global box office.
- **A-List Status**: SIFF achieved recognition as one of only a handful of "Class A" competitive festivals accredited by the International Federation of Film Producers Associations (FIAPF), placing it alongside Cannes, Venice, and Berlin.
- **Platform for Chinese Independent Cinema**: The festival's "Asian New Talent Award" section became an important launching pad for emerging Chinese independent directors, offering visibility that had been historically difficult to obtain outside state-sanctioned distribution channels.

SIFF's 2010s rise paralleled Shanghai's broader ambitions to become a global "culture and creativity" hub, complementing physical developments like the West Bund's museum and art district.`,
    contentMarkdownZh: `### 从区域性活动到全球电影市场

创立于1993年的**上海国际电影节**，在最初二十年间一直是国际电影节体系中一个受人尊敬但相对次要的活动。进入2010年代后，市政府投入的大幅增加使其转型为一场重要的行业盛事。

#### 构建全球影响力
- **电影市场的扩容**：上海国际电影节配套的电影市场迅速壮大，成为好莱坞制片公司和独立制片人洽谈中国发行合约的重要平台，折射出上海在全球票房版图中日益提升的重要性。
- **A类电影节地位**：上海国际电影节获得国际电影制片人协会联合会（FIAPF）认证的少数几个“A类”竞赛型国际电影节之一的地位，与戛纳、威尼斯、柏林比肩而立。
- **中国独立电影的舞台**：电影节的“亚洲新人奖”单元，成为中国新兴独立导演的重要展示平台，为他们提供了在官方渠道发行体系之外历来难以获得的关注度。

上海国际电影节在2010年代的崛起，与这座城市迈向全球“文化创意”中心的更宏大雄心相呼应，与西岸博物馆与艺术区等物理空间的发展相得益彰。`,
    thumbnailUrl: THUMB[2],
    tags: ['Shanghai International Film Festival', 'Film Market', 'Chinese Independent Cinema', '2010s']
  },

  // --- 2020s (additional) ---
  {
    id: 'film_bformbusy_2020',
    titleEn: 'B for Busy (2021): The Shanghainese-Dialect Renaissance Hit',
    titleZh: '《爱情神话》(2021)：沪语方言复兴的现象级作品',
    decade: 2020,
    exactYear: 2021,
    category: 'film',
    itemType: 'video',
    summaryEn: 'An exploration of "B for Busy" (Myth of Love), a surprise arthouse box-office hit shot almost entirely in Shanghainese dialect, celebrating the city\'s middle-class Puxi lifestyle and reviving pride in local dialect cinema.',
    summaryZh: '探索《爱情神话》，一部几乎全程使用沪语方言拍摄的黑马艺术片票房黑马，展现了这座城市浦西中产阶级的生活方式，并重新点燃了市民对本土方言电影的自豪感。',
    contentMarkdownEn: `### A Love Letter to Puxi, Spoken in Shanghainese

Directed by Sheng Zhimin and released in December 2021, **B for Busy (爱情神话)** followed a middle-aged Puxi painter navigating romance among a circle of stylish, articulate Shanghainese friends—becoming a surprise box-office and critical hit almost entirely performed in the Shanghainese dialect.

#### Reviving Local Identity Through Cinema
- **Dialect as Cultural Statement**: At a time when Mandarin-only education policies had eroded younger generations' fluency in Shanghainese, the film's near-total use of the dialect became a celebrated act of cultural preservation and civic pride.
- **A Portrait of Puxi Sophistication**: The film's setting—art-house cinemas, wonton shops, and tree-lined former French Concession streets—offered an affectionate, unglamorized portrait of everyday middle-class Puxi life, distinct from the flashy Pudong skyline imagery typically associated with Shanghai on screen.
- **Critical and Commercial Success**: The film earned strong reviews and unexpectedly robust box office for a modestly budgeted dialect film, sparking wider industry interest in regional-dialect filmmaking across China.

B for Busy's success arrived alongside "Blossoms Shanghai" as part of a broader early-2020s cultural wave reviving Shanghainese dialect and identity in popular media.`,
    contentMarkdownZh: `### 一封写给浦西的沪语情书

由邵艺辉执导、于2021年12月上映的《**爱情神话**》，讲述了一位浦西中年画家周旋于一群时髦健谈的上海朋友之间的情感故事——这部几乎全程使用沪语方言演绎的作品，意外成为票房与口碑双丰收的黑马之作。

#### 用电影重新点燃本土身份认同
- **方言作为文化宣言**：在普通话教育政策已使年轻一代沪语流利度日渐衰退的当下，这部影片近乎全程使用方言的做法，被广泛誉为一次值得称道的文化保护与市民自豪感的彰显。
- **浦西格调的生活写照**：影片取景于艺术影院、馄饨小店与法租界梧桐掩映的老街道，呈现出一幅充满温情、去浮华化的浦西中产阶级日常生活图景，与银幕上惯常呈现的浦东摩天大楼形象截然不同。
- **口碑与票房的双重成功**：这部制作成本不高的方言电影获得了广泛好评，票房表现也出人意料地强劲，激发了整个行业对方言电影创作更广泛的关注与兴趣。

《爱情神话》的成功，与《繁花》一道，共同构成了21世纪20年代初重新复兴沪语方言与本土身份认同在大众媒体中回归的更大文化浪潮。`,
    thumbnailUrl: THUMB[0],
    tags: ['B for Busy', 'Shanghainese Dialect', 'Puxi Lifestyle', '2020s']
  }
];

export const filmExtraMetadata: FilmMetadata[] = [
  {
    itemId: 'film_yangbanxi_1970',
    director: 'Various (Shanghai Film Studio Collective)',
    studio: 'Shanghai Film Studio (上海电影制片厂)',
    genre: ['Revolutionary Opera', 'Propaganda', 'Musical'],
    shanghaiThemes: ['Ideological Control', 'Studio System', 'Cultural Revolution'],
    releaseYear: 1972,
    cast: ['Various Stage Ensemble Performers']
  },
  {
    itemId: 'film_shanghai_triad_1990',
    director: 'Zhang Yimou (张艺谋)',
    studio: 'Sino-Foreign Joint (Shanghai Film Studio, Alpha Films France)',
    genre: ['Drama', 'Crime', 'Period Piece'],
    shanghaiThemes: ['1930s Old Shanghai', 'Gangster Culture', 'International Co-Production'],
    releaseYear: 1995,
    cast: ['Gong Li (巩俐)', 'Li Baotian (李保田)', 'Wang Xiaoxiao (王小小)']
  },
  {
    itemId: 'film_indie_2010',
    director: 'Various (Festival Selections)',
    studio: 'Shanghai International Film Festival',
    genre: ['Festival', 'Independent', 'International'],
    shanghaiThemes: ['Global Film Market', 'Cultural Capital Ambitions'],
    releaseYear: 2013
  },
  {
    itemId: 'film_bformbusy_2020',
    director: 'Sheng Zhimin (邵艺辉)',
    studio: 'Independent',
    genre: ['Romantic Comedy', 'Drama'],
    shanghaiThemes: ['Shanghainese Dialect', 'Puxi Lifestyle', 'Former French Concession'],
    releaseYear: 2021,
    cast: ['Xu Zheng (徐峥)', 'Ma Yili (马伊琍)', 'Wu Yue (吴越)']
  }
];
