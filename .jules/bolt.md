## 2024-05-23 - Initial Optimization Assessment
**Learning:** The application stores images as large base64 strings directly within JSON data files.
**Action:** Extract base64 images into separate files and reference them by path to reduce JSON file size and improve loading performance.
