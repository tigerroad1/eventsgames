## 2025-01-05 - Invalid JSON Blocking Optimization
**Learning:** The JSON data files contained syntax errors (trailing commas) which prevented standard JSON parsers from reading them. This forces consumers to use lenient (slower/custom) parsers or fail.
**Action:** Always validate JSON syntax before attempting advanced optimizations like minification. Fixing the syntax enables standard, faster parsers.
