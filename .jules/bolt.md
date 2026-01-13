## 2025-01-13 - Rejected Micro-optimization (Minification)
**Learning:** Minifying source JSON files for performance was rejected because it sacrifices readability and maintainability. Optimization should not come at the cost of DX (Developer Experience) for source files, unless they are treated as build artifacts.
**Action:** Focus on correctness (like fixing trailing commas) or optimizations that don't degrade readability for source files. Keep pretty-printing for files that are already pretty-printed.
