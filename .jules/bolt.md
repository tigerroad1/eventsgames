## 2025-05-23 - JSON Validity Bottleneck
**Learning:** The "active data files" were strictly invalid JSON due to trailing commas, which would cause any standard parser to crash. This was a critical correctness issue masquerading as a performance issue (or rather, a complete blocker). Additionally, large Base64 strings had whitespace that needed stripping.
**Action:** Always verify JSON validity with strict parsers before assuming data integrity. When optimizing, prioritize correctness first (valid JSON), then efficiency (file size reduction).
