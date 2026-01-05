## 2025-01-05 - JSON Data Optimization
**Learning:** The repository contained redundant JSON data files (`jeux_2025.json`, `Sorties2025`) that were identical to the consolidated `sorties_2025-2026.json`. Additionally, the JSON files (including `consoles` and `online`) were not minified, despite containing large embedded Base64 strings.
**Action:** Removed redundant files to save space and reduce confusion. Minified all JSON assets to reduce file size and improve parsing efficiency for consumers. This reinforces the principle of efficient data storage for static assets.
