# Shanghai Public History Archive (上海公共历史数字档案馆)

An interactive, relational digital history platform dedicated to archiving and visualizing the modern evolution of Shanghai since the 1970s. This project explores the city's history through four intersecting thematic lenses: **Urban Planning**, **Demographics**, **Healthcare**, and **Film & Cinema**.

👉 **Live Site:** [https://JHQZhu0731.github.io/Shanghai_Public_History_Project-/](https://JHQZhu0731.github.io/Shanghai_Public_History_Project-/) (Deployed automatically via GitHub Actions)

---

## 🗺️ Core Modules & Features

### 1. ⏳ Decadal Timeline (年代纪事轴)
Explore Shanghai decade-by-decade from the 1970s to the 2020s. Selecting a decade displays a unified historical summary of how all four thematic areas intersected during that era. For example, selecting the **1990s** shows:
- **Urban Planning**: The opening of Pudong New Area (1990) and the construction of Puxi's elevated highways.
- **Demographics**: The massive influx of migrant workers following Deng Xiaoping's 1992 Southern Tour.
- **Healthcare**: The rapid modernization of medical institutions.
- **Film**: Cinematic representations of old neighborhood demolitions and the bittersweet displacement of residents.

### 2. 📍 Interactive Spatial Map (城市规划地图)
An interactive dark-themed map of Shanghai powered by **Leaflet.js** and **React-Leaflet**:
- **Time Slider**: Slide through the decades (1970s–2020s) to see the physical growth of Shanghai's urban boundaries and infrastructure.
- **Pulsing Markers**: Custom SVG pulsing markers represent major urban planning landmarks (e.g., Shikumen neighborhoods in Huangpu, Lujiazui skyscrapers, Xuhui West Bund regeneration).
- **Fly-to Animations**: Click landmarks in the sidebar to smoothly fly the map to their exact coordinates.

### 3. 📈 Social & Healthcare Data Dashboard (社会卫生数据)
Interactive, responsive charts powered by **Recharts** visualizing Shanghai's long-term statistical transitions from 1970 to 2026:
- **Demographics Tab**:
  - *Population Structure*: Compare the registered Hukou population against the dramatic rise of the "Floating Population" (外来流动人口).
  - *Demographic Squeeze*: Track the climbing aging rate (65+ population) alongside the declining birth rate.
- **Healthcare Tab**:
  - *Life Expectancy vs. Capacity*: Correlate the rise in average life expectancy (surpassing 84 years) with the expansion of major hospitals.
  - *Mortality Rates*: View the plummeting infant and maternal mortality rates, which now rank among the lowest in the world.

### 4. 🎬 Cinematic Shanghai (光影历史画廊)
A curated video and research gallery exploring Shanghai through the lens of cinema:
- Search and filter films by release year, director, and urban themes (e.g., *Nostalgia*, *Industrial Decay*, *Cultural Reflection*).
- Read detailed academic research essays analyzing films like Xie Jin's *Hibiscus Town* (1986), Lou Ye's *Suzhou River* (2000), and Wong Kar-wai's *Blossoms Shanghai* (2023).

---

## 🗄️ Relational Database Schema

The platform is powered by a structured, relational client-side database layer defined in TypeScript (`src/data/`):

```
                     ┌───────────────────────┐
                     │     archive_items     │ (Master Catalog)
                     └───────────┬───────────┘
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│ urban_planning  │     │   healthcare    │     │      film       │ (Theme Metadata)
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

- **`archive_items`**: Holds master records for every historical entry (English/Chinese titles, summaries, decade, exact year, category, media URLs, tags, and full Markdown content).
- **`urban_planning_metadata`**: Extends planning items with spatial coordinates (`latitude`, `longitude`), `district`, `scale`, and `key_figures`.
- **`healthcare_records`**: Maps healthcare items to specific historical eras (`barefoot_doctors`, `marketization`, etc.), life expectancy, and hospital counts.
- **`film_metadata`**: Maps cinematic items to `director`, `studio`, `genre`, `cast`, and urban themes.

---

## 🛠️ Technology Stack

- **Frontend Framework**: React 19 + Vite 8 + TypeScript 6
- **Styling**: Tailwind CSS v4 (using `@tailwindcss/vite` plugin)
- **Icons**: Lucide React
- **Mapping**: Leaflet.js + React-Leaflet
- **Data Visualization**: Recharts
- **Deployment**: GitHub Actions + GitHub Pages

---

## 🚀 Local Development

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) (version 22 or higher) and `npm` installed.

### 1. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to view the app.

### 3. Build for Production
```bash
npm run build
```
This compiles and bundles the application into highly optimized static assets in the `dist/` directory.

---

## 📦 Deployment

The project is configured with a modern **GitHub Actions** workflow (`.github/workflows/deploy.yml`). 

Whenever you push changes to the `main` branch, the workflow will automatically:
1. Checkout the repository.
2. Install dependencies.
3. Build the production-ready static assets.
4. Securely upload and deploy the assets directly to **GitHub Pages**.

To enable this, make sure to go to your GitHub Repository Settings:
1. Navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, select **GitHub Actions**.
