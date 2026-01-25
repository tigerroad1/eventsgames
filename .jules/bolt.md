## 2025-01-25 - [Data Corruption and Redundancy]
**Learning:** Found corrupted Base64 data in `online` file (IGN logo) causing unnecessary bloat. Also identified `jeux_2025.json` and `Sorties2025` as redundant copies of `sorties_2025-2026.json`.
**Action:** Remove corrupted data to optimize file size and delete redundant files to clean up the repository.
