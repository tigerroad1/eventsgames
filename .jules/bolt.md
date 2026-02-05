## 2025-02-05 - Base64 Image Storage Anti-Pattern
**Learning:** Storing images as Base64 strings in JSON data files significantly inflates file size and parsing time. In this project, multiple data files contained large Base64 strings, some of which were even malformed (e.g., length not a multiple of 4).
**Action:** Always prefer external image files referenced by path. When extracting Base64 data, implement robust error handling for malformed strings (e.g., `len % 4 == 1` padding issues) as standard libraries can be strict.
