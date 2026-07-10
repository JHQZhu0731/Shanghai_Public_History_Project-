# Shanghai Pixel Archive (上海像素档案馆)

A visually engaging, easy-to-browse digital archive of Shanghai — organized as **digestible content cards** with collectible pixel avatars, landmark tags, and an interactive city map.

👉 **Live Site:** [https://JHQZhu0731.github.io/Shanghai_Public_History_Project-/](https://JHQZhu0731.github.io/Shanghai_Public_History_Project-/)

---

## Genres

| Genre | 中文 |
|-------|------|
| Music | 音乐 |
| Movie | 电影 |
| Sports | 体育 |
| Food | 美食 |
| Social Study | 社会研究 |
| Public Health | 公共卫生 |

---

## What each card includes

Every archive entry is a short, scannable card with:

- **Title** + year / era
- **Short summary** (one or two sentences)
- **Genre label**
- **Landmark + district**
- **Custom pixel avatar** (unique per entry, genre-colored)
- **Source link** to the original article / encyclopedia page
- **Work link** to the film, venue, club, or primary reference when available
- **Map coordinates** when the story is place-based

### Example model

**《芙蓉镇》(1986)：谢晋的后文革反思史诗杰作**

- Director: Xie Jin (谢晋)
- Studio: Shanghai Film Studio (上海电影制片厂)
- Landmark: Shanghai Film Studio · Xuhui
- Links: film encyclopedia + IMDb

---

## Core experiences

### 1. Collection (馆藏卡片)
Browse and filter cards by genre, decade, or search. The signature **pixel map of Shanghai** sits beside the collection intro as a collectible archival visual.

### 2. Landmark Map (地标地图)
An interactive Leaflet map with **pixel-avatar markers** pinned to real Shanghai sites. Click a pin or sidebar site to fly to the landmark, then open the full archive card.

---

## Design direction

- Archival clarity without dense academic walls of text
- Editorial, fast browsing
- Retro pixel-art charm (avatars + signature district map)
- Map-centered exploration of cultural and historical places

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

---

## Data

Cards live in `src/data/archiveCards.ts`. Types and genre metadata are in `src/data/types.ts`. Query helpers are in `src/data/db.ts`.

Pixel avatars are generated deterministically from each card’s `avatarSeed` + genre in `src/components/PixelAvatar.tsx`.
