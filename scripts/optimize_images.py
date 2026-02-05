import os
import json
import base64
import hashlib
import re

TARGET_FILES = [
    'jeux_2025.json',
    'Sorties2025',
    'consoles',
    'online',
    'sorties_2025-2026.json',
    'sport.json',
    'strategie.json'
]

IMAGES_DIR = 'images'

def sanitize_json(content):
    # Remove trailing commas
    return re.sub(r',(\s*?[\]}])', r'\1', content)

def process_data(data):
    if isinstance(data, dict):
        for key, value in data.items():
            if isinstance(value, str) and value.startswith('data:image/'):
                data[key] = save_image(value)
            else:
                process_data(value)
    elif isinstance(data, list):
        for item in data:
            process_data(item)

def save_image(base64_string):
    try:
        header, encoded = base64_string.split(',', 1)
    except ValueError:
        return base64_string

    # Extract extension from header: data:image/jpeg;base64
    match = re.search(r'data:image/(\w+);base64', header)
    if match:
        ext = match.group(1)
        if ext == 'jpeg':
            ext = 'jpg'
    else:
        ext = 'bin' # Fallback

    # Clean up encoded string (remove newlines, etc)
    encoded = encoded.strip()

    # Attempt to fix length if it's 1 mod 4 (impossible in standard base64)
    if len(encoded) % 4 == 1:
        # Try removing the last character
        encoded = encoded[:-1]

    # Fix padding if necessary
    missing_padding = len(encoded) % 4
    if missing_padding:
        encoded += '=' * (4 - missing_padding)

    try:
        image_data = base64.b64decode(encoded)
    except Exception as e:
        print(f"Error decoding base64: {e}")
        # Try to recover by ignoring errors? No, better to leave as is if fails
        return base64_string

    # Generate MD5 hash
    image_hash = hashlib.md5(image_data).hexdigest()
    filename = f"{image_hash}.{ext}"
    filepath = os.path.join(IMAGES_DIR, filename)

    # Save file if it doesn't exist
    if not os.path.exists(filepath):
        with open(filepath, 'wb') as f:
            f.write(image_data)
        print(f"Saved image: {filepath}")
    else:
        pass
        # print(f"Image already exists: {filepath}")

    return filepath

def main():
    if not os.path.exists(IMAGES_DIR):
        os.makedirs(IMAGES_DIR)

    for filepath in TARGET_FILES:
        if not os.path.exists(filepath):
            print(f"File not found: {filepath}")
            continue

        print(f"Processing {filepath}...")
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Sanitization
            content = sanitize_json(content)

            try:
                data = json.loads(content)
            except json.JSONDecodeError as e:
                print(f"JSON decode error in {filepath}: {e}")
                continue

            process_data(data)

            with open(filepath, 'w', encoding='utf-8') as f:
                json.dump(data, f, indent=4, ensure_ascii=False)

            print(f"Finished processing {filepath}")

        except Exception as e:
            print(f"Error processing {filepath}: {e}")

if __name__ == "__main__":
    main()
