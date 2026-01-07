## 2025-01-07 - JSON Data Optimization
**Learning:** Large Base64 encoded images embedded in JSON files often contain unnecessary whitespace (newlines) which increases file size. Additionally, unminified JSON with indentation consumes significant space.
**Action:** When working with data-heavy JSON files, especially those with embedded assets, always strip whitespace from Base64 strings and minify the JSON structure to improve load times and reduce bandwidth. Also ensure trailing commas are removed as they are invalid in standard JSON.
