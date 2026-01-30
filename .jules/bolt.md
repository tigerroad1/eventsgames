## 2025-01-30 - JSON Bloat due to Base64 Images
**Learning:** Storing large binary data (like images) as Base64 strings within JSON files significantly increases file size and parsing overhead. It also breaks some parsers if the base64 string is truncated or malformed (padding issues).
**Action:** Always externalize binary assets to separate files and reference them by path or URL. When processing legacy data, be robust to JSON syntax errors like trailing commas.
