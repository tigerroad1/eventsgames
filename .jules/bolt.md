## 2024-05-23 - Corrupted Base64 Data in JSON
**Learning:** While extracting base64 images from JSON files to optimize size, I discovered that `online` file contained invalid base64 strings (incorrect length/padding) for some entries (e.g., 'IGN').
**Action:** When performing data migration or optimization, always implement robust error handling to skip or log corrupted data points instead of crashing the entire process.
