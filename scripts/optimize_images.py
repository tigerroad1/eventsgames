import json
import os
import base64
import hashlib
import re
import mimetypes

FILES = ['jeux_2025.json', 'sorties_2025-2026.json', 'Sorties2025', 'online', 'consoles']
IMAGES_DIR = 'images'

def load_json_relaxed(filepath):
    """Loads JSON file, handling trailing commas."""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Remove trailing commas
    # This regex looks for a comma followed by whitespace and then a closing brace or bracket
    content = re.sub(r',(\s*?[\]}])', r'\1', content)

    return json.loads(content)

def get_extension(mime_type):
    if mime_type == 'image/jpeg':
        return '.jpg'
    if mime_type == 'image/png':
        return '.png'
    ext = mimetypes.guess_extension(mime_type)
    return ext if ext else '.bin'

def process_value(value):
    if isinstance(value, str) and value.startswith('data:image/'):
        try:
            header, encoded = value.split(',', 1)
            mime_type = header.split(';')[0].split(':')[1]

            encoded = encoded.strip() # Remove whitespaces

            # Heuristic fix for "len % 4 == 1" which is invalid base64
            if len(encoded) % 4 == 1:
                # Try removing last char
                encoded = encoded[:-1]

            # Fix padding
            missing_padding = len(encoded) % 4
            if missing_padding:
                encoded += '=' * (4 - missing_padding)

            try:
                data = base64.b64decode(encoded)
            except Exception as e:
                print(f"Error decoding base64 (len={len(encoded)}): {e}")
                return value, False

            # Hash content
            md5_hash = hashlib.md5(data).hexdigest()
            ext = get_extension(mime_type)
            filename = f"{md5_hash}{ext}"
            filepath = os.path.join(IMAGES_DIR, filename)

            # Save file if not exists
            if not os.path.exists(filepath):
                with open(filepath, 'wb') as f:
                    f.write(data)
                # print(f"Saved {filepath}")

            return filepath, True
        except Exception as e:
            print(f"Error processing image string: {e}")
            return value, False
    return value, False

def traverse_and_process(data):
    changed = False
    if isinstance(data, dict):
        for k, v in data.items():
            if k == 'logo' and isinstance(v, str) and v.startswith('data:image/'):
                new_val, did_change = process_value(v)
                if did_change:
                    data[k] = new_val
                    changed = True
            else:
                # Recurse
                if traverse_and_process(v):
                    changed = True
    elif isinstance(data, list):
        for i, item in enumerate(data):
            if traverse_and_process(item):
                changed = True
    return changed

def main():
    if not os.path.exists(IMAGES_DIR):
        os.makedirs(IMAGES_DIR)

    for filepath in FILES:
        if not os.path.exists(filepath):
            print(f"Skipping {filepath} (not found)")
            continue

        print(f"Processing {filepath}...")
        try:
            data = load_json_relaxed(filepath)
            if traverse_and_process(data):
                print(f"  Updates found. Saving {filepath}...")
                with open(filepath, 'w', encoding='utf-8') as f:
                    json.dump(data, f, indent=4, ensure_ascii=False)
            else:
                print(f"  No changes needed for {filepath}.")
        except Exception as e:
            print(f"Failed to process {filepath}: {e}")

if __name__ == "__main__":
    main()
