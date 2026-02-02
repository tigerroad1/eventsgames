## 2025-02-02 - Base64 Image Extraction
**Learning:** Storing large base64 images directly in JSON data files significantly bloats file sizes (e.g. 126KB vs 5KB) and can lead to syntax errors if generation scripts are buggy (trailing commas, truncated strings).
**Action:** Always externalize binary assets. When dealing with legacy/broken data generation, validate JSON syntax and base64 padding before processing.
