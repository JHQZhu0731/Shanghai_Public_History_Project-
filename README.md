# Shanghai Pixel Archive (上海像素档案馆)

An explorable digital archive of Shanghai culture — **pixel atlas as narrative spine**, six city-culture data gates, digestible records, and a mandatory provenance chain:

**Place → Event → Content → Source**

👉 **Live Site:** [https://JHQZhu0731.github.io/Shanghai_Public_History_Project-/](https://JHQZhu0731.github.io/Shanghai_Public_History_Project-/)

---

## Six genre gates (一级结构)

| Genre | 中文 | City role |
|-------|------|-----------|
| Music | 音乐 | Sound & stage |
| Movie | 电影 | Image & studio |
| Sports | 体育 | Arena & body |
| Food | 美食 | Taste & daily life |
| Social Study | 社会研究 | Structure & people |
| Public Health | 公共卫生 | Body & institution |

These are **city-culture data layers**, not blog tags. Toggling a genre filters Atlas pins, Index cards, and Geo Map together.

---

## Interfaces

| Screen | Role |
|--------|------|
| **Atlas（图志）** | Default home — illustrated pixel Shanghai map, genre layers, decade band, district density strip, index drawer |
| **Index（索引）** | Digestible card wall synced to the same filters |
| **Geo Map（地理图）** | Leaflet + pixel-avatar landmark pins |
| **Record（档案）** | Full trace: place → event → content → **Provenance Block** + related trails |

---

## Every record must include

- Title + one-line summary + short context
- Genre · year · decade
- Landmark · district · map coordinates (when place-based)
- **Pixel avatar** (deterministic from seed × genre × decade)
- **`sourceUrl`** — original article / interview / primary report (required)
- **`workUrl`** — film, research, documentary, or media link when applicable
- Credits (director / studio / artist / venue) when relevant

No source → not publishable.

---

## Design principles

- Atlas-first (no hero-banner + waterfall as the main pattern)
- Visual language from **point density, district clusters, decade layers, genre color**
- Retro pixel aesthetics with archival seriousness
- Bilingual EN / 中文

---

## Tech stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4 + NES.css
- Leaflet / React-Leaflet
- GitHub Pages via GitHub Actions

---

## Local development

```bash
npm install --legacy-peer-deps
npm run dev
```

Build:

```bash
npm run build
```
