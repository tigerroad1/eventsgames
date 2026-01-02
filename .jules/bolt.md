# Bolt's Performance Journal

## 2025-02-18 - JSON Data Management
**Learning:** The repository relies heavily on flat JSON files for data storage. Redundancy between files (e.g. `jeux_2025.json` vs `sorties_2025-2026.json`) can lead to bloated repository size and potential confusion/double-loading if not managed.
**Action:** When working with data repositories, always check for deprecated or redundant data files that can be removed to save space and reduce clutter.
