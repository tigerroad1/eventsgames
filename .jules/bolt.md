## 2025-02-18 - [JSON Image Extraction]
**Learning:** Storing images as Base64 strings in JSON files dramatically increases file size and parsing overhead. Python's `base64` module is strict about padding and length; corrupted base64 (e.g. `len % 4 == 1`) requires heuristic repair (stripping whitespace, trimming last char, re-padding).
**Action:** Always externalize binary assets. When dealing with legacy/dirty data, implement robust decoding with fallback heuristics.
