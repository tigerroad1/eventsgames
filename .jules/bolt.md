## 2025-01-18 - JSON Data Optimization
**Learning:** Found that JSON data files (`sorties_2025-2026.json`, etc.) contained invalid trailing commas, preventing standard parsers from reading them. Also, `consoles` and `online` were expected to be minified but were pretty-printed.
**Action:** Always validate JSON syntax (including trailing commas) when working with data files. Minification of data files without extensions should be verified against actual content, not just filenames or documentation.
