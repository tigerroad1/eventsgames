import json
import os
import base64
import re
import hashlib

DATA_FILES = ['jeux_2025.json', 'sorties_2025-2026.json', 'consoles', 'online', 'sport.json', 'strategie.json', 'Sorties2025']
IMAGE_DIR = 'images'

if not os.path.exists(IMAGE_DIR):
    os.makedirs(IMAGE_DIR)

def save_image(base64_string):
    match = re.match(r'data:image/(\w+);base64,(.+)', base64_string)
    if not match:
        return None

    ext = match.group(1)
    data = match.group(2)

    if ext == 'jpeg':
        ext = 'jpg'

    try:
        # First attempt: just decode
        image_data = base64.b64decode(data)
    except Exception:
        # Second attempt: fix padding or remove extra char
        try:
            if len(data) % 4 == 1:
                # Likely one extra char, remove it
                image_data = base64.b64decode(data[:-1])
            else:
                # Likely missing padding
                missing_padding = len(data) % 4
                if missing_padding:
                    data += '=' * (4 - missing_padding)
                image_data = base64.b64decode(data)
        except Exception as e:
            if "base64_image_data_here" in data:
                 print(f"Skipping placeholder data")
            else:
                 print(f"Error decoding base64: {e} (Start: {data[:20]}...)")
            return None

    image_hash = hashlib.md5(image_data).hexdigest()
    filename = f"{image_hash}.{ext}"
    filepath = os.path.join(IMAGE_DIR, filename)

    if not os.path.exists(filepath):
        with open(filepath, 'wb') as f:
            f.write(image_data)

    return filepath

def process_data(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if key == "logo" and isinstance(value, str) and value.startswith("data:image"):
                new_path = save_image(value)
                if new_path:
                    data[key] = new_path
            else:
                process_data(value)
    elif isinstance(data, list):
        for item in data:
            process_data(item)

def clean_json(content):
    # Remove trailing commas in objects and arrays
    content = re.sub(r',\s*}', '}', content)
    content = re.sub(r',\s*]', ']', content)
    return content

for filename in DATA_FILES:
    if not os.path.exists(filename):
        print(f"File not found: {filename}")
        continue

    print(f"Processing {filename}...")
    try:
        with open(filename, 'r') as f:
            content = f.read()

        content = clean_json(content)
        data = json.loads(content)

        process_data(data)

        with open(filename, 'w') as f:
            json.dump(data, f, indent=4, ensure_ascii=False)

    except Exception as e:
        print(f"Error processing {filename}: {e}")

print("Optimization complete.")
