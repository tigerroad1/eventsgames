## 2024-05-23 - Data Consistency and Validity
**Learning:** The JSON data files `sorties_2025-2026.json`, `jeux_2025.json`, and `Sorties2025` are hard-linked, meaning changes to one affect all. Additionally, these files contained trailing commas, making them invalid JSON for standard parsers.
**Action:** Always verify JSON validity before processing. Be aware of file system links when modifying data files that appear to be duplicates.
