## 2025-01-03 - JSON Data Issues
**Learning:** The project contains multiple JSON files (`sorties_2025-2026.json`, `sport.json`, `strategie.json`) which had trailing commas, causing standard JSON parsers to fail. Additionally, `consoles` and `online` are JSON files without extensions.
**Action:** When working with data files in this repo, always implement a robust JSON parsing strategy that can handle or clean trailing commas before parsing. Minification was effective in fixing these errors and reducing file size.
