## 2025-01-27 - Redundant Data Duplication
**Learning:** The repository contained three identical copies of the main data file (`sorties_2025-2026.json`, `jeux_2025.json`, `Sorties2025`). This triples the storage requirement for the data.
**Action:** When working with data repositories, always check for file duplication using `diff` or checksums before attempting complex optimizations. Removing duplicates is the safest and most effective first step.
