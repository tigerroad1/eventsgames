## 2025-01-22 - JSON Optimization & Validity
**Learning:** Embedded Base64 strings in the data files were already optimized (no whitespace). Attempting to "optimize" them by re-serializing the JSON resulted in slightly larger files due to standard indentation (`indent=4`) being applied to files that might have had inconsistent or minimal whitespace.
**Action:** Always check if "optimization" targets (like base64 whitespace) actually exist before applying transformations that might have side effects (like re-formatting).
**Learning:** Several key data files (`Sorties2025`, `jeux_2025.json`, etc.) contained invalid JSON (trailing commas), which prevents standard parsing.
**Action:** Prioritize correctness (valid JSON) over micro-optimizations. A fast app that crashes on data load is useless.
