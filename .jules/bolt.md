## 2024-12-28 - [JSON Payload Optimization]
**Learning:** Large Base64 encoded images embedded directly within JSON data files significantly inflate file sizes, causing performance issues with parsing, memory usage, and version control (diffs are huge).
**Action:** Extract Base64 strings into separate image files in an `assets/` directory and replace the data in the JSON with relative file paths. This keeps the data clean, lightweight, and performant. Also, ensure JSON validity (e.g., remove trailing commas) to prevent parsing errors in strictly compliant parsers.
