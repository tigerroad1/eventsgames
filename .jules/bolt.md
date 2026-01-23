## 2024-01-24 - Data Redundancy and Invalid JSON
**Learning:** The repository contained identical copies of large JSON datasets (`jeux_2025.json`, `Sorties2025`, `sorties_2025-2026.json`), wasting storage. Furthermore, the JSON files contained trailing commas, making them invalid and unparsable by standard libraries.
**Action:** Always validate JSON syntax and check for file duplication in data-heavy repositories. Prefer a single source of truth.
