# 🌱 Vegetation Drought Response Index (Vegitation-Drought-Responses-Index)

[![Earth Engine](https://img.shields.io/badge/Platform-Google%20Earth%20Engine-2EB67D?style=flat&logo=google)](https://earthengine.google.com/) [![Repository](https://img.shields.io/badge/Repo-TEJASCHAVAN22/Vegitataion--Drought--Respoances--Index-blue?style=flat)](https://github.com/TEJASCHAVAN22/Vegitataion-Drought-Respoances-Index)

A compact Earth Engine project to measure and visualize vegetation responses to drought using remote-sensing indices and district-level analysis.

---

## 📚 Introduction
This repository contains code and documentation for a Vegetation Drought Response Index workflow built with Google Earth Engine (GEE). The project focuses on evaluating how vegetation in a selected administrative area responds to drought events by analyzing time-series of vegetation indices and environmental variables.

Why this matters:
- Detect drought impacts on vegetation early to support mitigation and adaptation.
- Produce maps and time-series that inform agriculture, forestry, and land management decisions.

---

## 🎯 Aim
To develop reproducible, spatially-explicit analyses that quantify vegetation response to drought at the district scale using GEE, and to produce visual outputs (maps, charts, tables) that illustrate the severity and temporal dynamics of vegetation stress.

---

## 📝 Objectives
- Identify and subset the Area of Interest (AOI) at district level. 🗺️
- Compute vegetation indices (e.g., NDVI) and drought-related indices/metrics. 📈
- Generate time-series, anomaly maps, and summary statistics per administrative unit. 🧾
- Export processed maps and CSV summaries for downstream use. 📤

---

## 🛠️ Method
High-level workflow:
1. Define the AOI (district polygon(s)).  
2. Load and preprocess remote-sensing imagery (e.g., Sentinel-2, MODIS, Landsat).  
3. Compute vegetation indices (NDVI, EVI) and drought proxies (NDVI anomaly, percentile, SPI if meteorological input available).  
4. Mask clouds and apply quality filters. ☁️🚫  
5. Aggregate by time window (monthly, seasonal) and by district. 🕒  
6. Detect anomalies & trends and visualize results. 🔍

Example: defining AOI in GEE (provided snippet)
```javascript
var aoi = ee.FeatureCollection('projects/gee-trial2/assets/Shapfile/WMH_Distric')
            .filter(ee.Filter.eq('dt_code', 530));
Map.centerObject(aoi);
```

Notes:
- Replace `dt_code` and asset path with your local asset names as needed.
- Typical further steps: load Sentinel-2/MODIS collections, compute NDVI, apply cloud masks, create monthly composites, compute anomalies relative to baseline.

---

## 🔬 Analysis
Suggested analyses and derived products:
- Time-series plots of mean NDVI per district (monthly/seasonal). 📊
- NDVI anomaly maps (current period vs. long-term baseline). ⚖️
- Trend analysis (Mann–Kendall / Sen’s slope). 📈
- Percentile-based drought maps showing severity classes (e.g., normal, moderate, severe). 🟥🟧🟨
- Zonal statistics and CSV exports for districts (mean, median, min, max, percentiles). 🧮

Interpretation tips:
- Rapid NDVI drops during a known dry period indicate strong vegetation stress.
- Combine remote-sensing indices with meteorological drought indicators (SPI, precipitation anomaly) for robust attribution.

---

## 📤 Output
You will typically produce:
- Interactive GEE map assets showing NDVI, NDVI anomaly, drought severity. 🗺️
- Time-series charts (PNG/SVG) and interactive charts (Chart.js/GEE UI). 📈
- CSV/GeoJSON exports per district with aggregated statistics. 📑
- Final report or dashboard summarizing key findings. 📋

---

## 🧾 How to run (quick start)
1. Open the Google Earth Engine Code Editor: https://code.earthengine.google.com/  
2. Create or upload the required shapefile asset (district boundaries) to your GEE assets.  
3. Paste/extend the snippet above to select AOI, then add imagery processing steps (cloud mask, NDVI calc, aggregation).  
4. Run and inspect Map and Charts; export results to Drive/Assets as needed.

Helpful functions to implement:
- cloudMasking(image)
- computeNDVI(image)
- monthlyComposite(collection)
- computeAnomalies(baselineCollection, targetCollection)
- zonalStats(featureCollection, image)

---

## 🧑‍💻 Example snippet (extended skeleton)
```javascript
// AOI
var aoi = ee.FeatureCollection('projects/gee-trial2/assets/Shapfile/WMH_Distric')
            .filter(ee.Filter.eq('dt_code', 530));
Map.centerObject(aoi);

// Example: load Sentinel-2 (pseudo)
var s2 = ee.ImageCollection('COPERNICUS/S2_SR')
           .filterBounds(aoi)
           .filterDate('2019-01-01', '2021-12-31');
// (Add cloud mask, NDVI, composites, aggregation, exports...)
```

---

## ✨ Visual & Symbol Guide
- 🌱 Vegetation index (NDVI/EVI)
- 🌵 Drought/Stress
- 📈 Time-series / Trend
- 🗺️ Spatial maps & zonal statistics
- 📤 Exported assets (CSV/GeoJSON/Images)

---

## ✍️ Author / Contact

Tejas Chavan  
* GIS Expert at Government Of Maharashtra Revenue & Forest Department  
* tejaskchavan22@gmail.com  
* +91 7028338510  

---

## 📚 References & Further Reading
- Google Earth Engine documentation: https://developers.google.com/earth-engine  
- NDVI and drought monitoring workflows: numerous community scripts in GEE Code Editor (search for "NDVI anomaly", "drought monitoring").

---

## 📜 License
Add your preferred license file (e.g., MIT). If unsure, include a LICENSE.md with the license you choose.

---

If you want, I can:
- add a ready-to-run Earth Engine script (full NDVI + anomaly + export),
- create example exports (CSV/GeoJSON) templates,
- or generate a LICENSE.md and CONTRIBUTING.md for this repo.
