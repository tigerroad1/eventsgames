## 2026-01-24 - [JSON Syntax Impact]
**Learning:** Invalid JSON (specifically trailing commas) breaks strict parsers (like Python's `json`), potentially causing application crashes or forcing the use of slower, non-standard parsers.
**Action:** Validate static JSON data files against the standard. Use regex or dedicated tools to strip trailing commas before deployment or during maintenance.
